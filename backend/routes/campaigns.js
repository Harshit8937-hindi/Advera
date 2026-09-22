const express = require('express');
const { User, Campaign } = require('../models');

const router = express.Router();
const MAX_FREE_ADS = 15;

router.post('/send', async (req, res) => {
  try {
    const { userId, content, campaignType } = req.body;
    const user = await User.findByPk(userId);
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const { Op } = require('sequelize');
    
    const campaignsToday = await Campaign.findAll({
      where: { UserId: userId, createdAt: { [Op.gte]: startOfDay } }
    });
    const adsToday = campaignsToday.reduce((sum, c) => sum + (c.recipients_count || 1), 0);
    const requiredCredits = req.body.recipientsCount || 1;
    
    if (!user.is_premium) {
      if (user.available_credits >= requiredCredits) {
        user.available_credits -= requiredCredits;
        await user.save();
      } else {
        if (adsToday + requiredCredits > 5) {
          return res.status(402).json({ 
            error: `Insufficient quota. You are trying to flash ${requiredCredits} contacts but only have ${user.available_credits} paid credits and ${Math.max(0, 5 - adsToday)} free messages left today.` 
          });
        }
      }
    }

    // Mock sending via external API (Twilio/WhatsApp)
    const simulatedDeliveryRate = 0.95; // 95% delivery rate typical
    const simulatedReadRate = 0.65; // 65% open rate typical
    
    // Ensure at least 1 reads if small batch
    const deliveredCount = Math.max(1, Math.floor(requiredCredits * simulatedDeliveryRate));
    const readCount = Math.max(0, Math.floor(deliveredCount * simulatedReadRate));
    
    const campaign = await Campaign.create({
      content,
      campaign_type: campaignType,
      status: 'sent',
      recipients_count: requiredCredits,
      delivered_count: deliveredCount,
      read_count: readCount,
      UserId: userId
    });

    res.json({
      message: `${campaignType} sent successfully!`,
      available_credits: user.available_credits,
      is_premium: user.is_premium,
      adsToday: (user.is_premium || user.available_credits > 0) ? adsToday : adsToday + 1,
      campaign
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/history/:userId', async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      where: { UserId: req.params.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
