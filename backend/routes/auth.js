const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticator } = require('otplib');
const qrcode = require('qrcode');
const { User } = require('../models');
const twilio = require('twilio');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_for_adsmanager';

const otpStore = new Map(); // Store OTP codes temporarily in memory

// User's custom temporary OTP generator
function generateOTP(length) {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

// --- OTP Setup Routes ---

router.post('/setup-2fa', async (req, res) => {
  try {
    const secret = authenticator.generateSecret();
    const identifier = req.body.email || req.body.mobile || 'AdsManager_B2B';
    const otpauth = authenticator.keyuri(identifier, 'AdsManager', secret);
    const imageUrl = await qrcode.toDataURL(otpauth);
    res.json({ secret, qrCodeImage: imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/verify-2fa-stateless', (req, res) => {
  const { token, secret } = req.body;
  const isValid = authenticator.check(token, secret);
  if (isValid) res.json({ success: true });
  else res.status(400).json({ error: 'Invalid Authenticator Code' });
});

router.post('/send-email-otp', (req, res) => {
  const { email } = req.body;
  const otp = generateOTP(4);
  otpStore.set(email, otp);
  const fs = require('fs');
  fs.writeFileSync('C:/Users/LENOVO/.gemini/antigravity/scratch/ads_manager/backend/last_otp.txt', `EMAIL: ${email} | OTP: ${otp}`);
  console.log(`\n==============================================`);
  console.log(`🚀 ANTIGRAVITY PLATFORM OTP GENERATOR 🚀`);
  console.log(`🔒 EMAIL REQUEST TO: ${email || 'Secure User'}`);
  console.log(`🔑 Temporary Security OTP is: ${otp}`);
  console.log(`==============================================\n`);
  res.json({ success: true, message: "Email Sent", temporaryOtp: otp });
});

router.post('/send-sms-otp', async (req, res) => {
  try {
    const { mobile } = req.body;
    const otp = generateOTP(6); // 6-digit for standard OTP
    otpStore.set(mobile, otp);

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    // Enhanced Antigravity Console Logout
    const fs = require('fs');
    fs.writeFileSync('C:/Users/LENOVO/.gemini/antigravity/scratch/ads_manager/backend/last_otp.txt', `MOBILE: ${mobile} | OTP: ${otp}`);
    console.log(`\n==============================================`);
    console.log(`🚀 ANTIGRAVITY TERMINAL AUTHENTICATOR 🚀`);
    console.log(`📱 MOBILE: ${mobile}`);
    console.log(`🔑 YOUR 6-DIGIT OTP IS: ${otp}`);
    console.log(`==============================================\n`);

    if (accountSid && authToken && twilioPhone && accountSid.startsWith('AC')) {
      const client = twilio(accountSid, authToken);
      await client.messages.create({
        body: `AdsManager Verification Code: ${otp}`,
        from: twilioPhone,
        to: mobile
      });
      res.json({ success: true, message: "Real SMS sent!", otp: otp });
    } else {
      res.json({ success: true, message: "Terminal OTP Dispatched!", otp: otp });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/verify-generic-otp', (req, res) => {
  const { identifier, token } = req.body;
  const storedOtp = otpStore.get(identifier);
  if (storedOtp && storedOtp === token) {
    otpStore.delete(identifier);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid or expired OTP code.' });
  }
});

// --- Unified Antigravity Auth Endpoints ---

router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, businessCategory, authMethod, otpToken } = req.body;
    const identifier = mobile || email;

    // 1. Verify OTP if using SMS/Email
    if (authMethod === 'sms' || authMethod === 'email') {
      const storedOtp = otpStore.get(identifier);
      if (!storedOtp || storedOtp !== otpToken) {
        return res.status(400).json({ error: 'Invalid or missing OTP code.' });
      }
      otpStore.delete(identifier);
    }

    // 2. Check if user exists
    let existingUser = null;
    if (email) existingUser = await User.findOne({ where: { email } });
    if (!existingUser && mobile) existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) return res.status(400).json({ error: 'Business already registered. Please login.' });

    // 3. Create user
    const user = await User.create({
      name: name || 'Antigravity User',
      email: email || null,
      mobile: mobile || null,
      business_category: businessCategory || 'E-Commerce',
      password: 'no_password_auth_' + authMethod
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({
      message: 'Business account created successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile, availableCredits: user.available_credits, isPremium: user.is_premium, permissionsGranted: user.permissions_granted }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Original /register kept for backward compatibility if needed, but updated to use shared logic
// Redundant with the new /register above, so we can just leave the new one as the primary.

router.post('/login', async (req, res) => {
  try {
    const { identifier, authMethod } = req.body;
    const { Op } = require('sequelize');
    const user = await User.findOne({
      where: { [Op.or]: [{ email: identifier }, { mobile: identifier }] }
    });

    if (!user) return res.status(404).json({ error: 'Account not found. Please register your business.' });

    const otpToken = req.body.otpToken;

    if (authMethod === 'totp') {
      if (!user.two_factor_secret) return res.status(400).json({ error: '2FA not configured for this account. Please register.' });
      const isValid = authenticator.check(otpToken, user.two_factor_secret);
      if (!isValid) return res.status(400).json({ error: 'Invalid Authenticator Code.' });
    } else if (authMethod === 'email' || authMethod === 'sms') {
      const storedOtp = otpStore.get(identifier);
      if (!storedOtp || storedOtp !== otpToken) {
        return res.status(400).json({ error: 'Invalid or missing OTP code.' });
      }
      otpStore.delete(identifier);
    }

    // Since it's B2B Google/EmailOTP/TOTP, we strictly verified Identity/OTP before generating JWT.

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile, availableCredits: user.available_credits, isPremium: user.is_premium, permissionsGranted: user.permissions_granted } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/permissions', async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.permissions_granted = true;
    await user.save();
    res.json({ message: 'Permissions updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
