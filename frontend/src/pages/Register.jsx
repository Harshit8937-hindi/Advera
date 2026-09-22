import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { MessageSquare, ShieldCheck, RefreshCw } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { API_BASE_URL } from '../api';

export default function Register() {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '342916923065-rokjue4c8lrac2kpahnsua3et0c5qjpd.apps.googleusercontent.com';

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessCategory, setBusinessCategory] = useState('E-Commerce');
  const [otp, setOtp] = useState('');

  const executeRegistration = async (emailToUse, mobileToUse, authMethod, googleName) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, { 
        name: googleName || name || 'Google User',
        email: emailToUse, 
        mobile: mobileToUse, 
        businessCategory, 
        gstin: 'PENDING_UPDATE', 
        cgstin: '', 
        authMethod,
        twoFactorSecret: null
      });
      toast.success('Account Activated!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 5) return toast.error('Valid Phone Required');
    if (!name || !email) return toast.error('Name and Email required');
    
    setLoading(true);
    try {
      const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/send-sms-otp`, { mobile: formattedPhone });
      
      toast.success('Terminal OTP Dispatched - Check Backend Logs');
      setStep(2);
    } catch (err) {
      toast.error('OTP Request Failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length < 6) return toast.error('Invalid OTP');
    setLoading(true);
    try {
      const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;
      
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, { 
        name, 
        email, 
        mobile: formattedPhone, 
        businessCategory,
        authMethod: 'sms',
        otpToken: otp
      });

      toast.success('Identity Verified & Account Created!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch(err) {
      toast.error(err.response?.data?.error || 'Verification Failed');
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      executeRegistration(decoded.email, null, 'google', decoded.name);
    } catch(e) { toast.error("Error decoding Google token"); }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="auth-container">
        <div id="recaptcha-container"></div>
        <div className="glass-panel" style={{ display: 'flex', maxWidth: '900px', width: '100%', overflow: 'hidden', padding: 0 }}>
          
          {/* Left Branding Pane */}
          <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.05))', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
             <MessageSquare size={48} color="#8b5cf6" style={{ marginBottom: '24px' }}/>
             <h1 style={{ fontSize: '36px', lineHeight: 1.2, marginBottom: '24px' }}>Ready to engage your audience?</h1>
             <p className="text-muted" style={{ fontSize: '18px', lineHeight: 1.6 }}>Deploy enterprise-grade omnichannel campaigns in seconds. Join thousands of brands scaling their messaging globally.</p>
             <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldCheck size={20} color="#10b981"/>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>Bank-grade 256-bit encryption</span>
             </div>
          </div>

          {/* Right Form Pane */}
          <div style={{ flex: 1, padding: '48px', position: 'relative' }}>
            {step === 1 ? (
              <>
                <h2 style={{ marginBottom: '8px' }}>Create your account</h2>
                <p className="text-muted" style={{ marginBottom: '32px' }}>Start your 5-ad free trial today.</p>
                
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error('Google Sign-In Failed')} useOneTap shape="rectangular" theme="filled_black" text="signup_with" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', opacity: 0.5 }}>
                  <div style={{ flex: 1, height: '1px', background: 'white' }}></div>
                  <span style={{ padding: '0 12px', fontSize: '12px', letterSpacing: '1px' }}>OR CONTINUE WITH MOBILE</span>
                  <div style={{ flex: 1, height: '1px', background: 'white' }}></div>
                </div>

                <form onSubmit={handleSendOTP}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                       <label className="text-muted" style={{ fontSize: '13px', display: 'block', marginBottom: '6px' }}>Full Name</label>
                       <input className="input-field" type="text" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)} required />
                    </div>
                    <div style={{ flex: 1 }}>
                       <label className="text-muted" style={{ fontSize: '13px', display: 'block', marginBottom: '6px' }}>Category</label>
                       <select className="input-field" value={businessCategory} onChange={e=>setBusinessCategory(e.target.value)}>
                         <option>E-Commerce</option><option>Agency</option><option>Retail</option><option>Other</option>
                       </select>
                    </div>
                  </div>
                  
                  <label className="text-muted" style={{ fontSize: '13px', display: 'block', marginBottom: '6px' }}>Business Email</label>
                  <input className="input-field" type="email" placeholder="john@company.com" value={email} onChange={e=>setEmail(e.target.value)} required />

                  <label className="text-muted" style={{ fontSize: '13px', display: 'block', marginBottom: '6px' }}>Mobile Number</label>
                  <input className="input-field" type="tel" placeholder="+91823908xxx" value={phone} onChange={e=>setPhone(e.target.value)} required />

                  <button className="btn" type="submit" disabled={loading} style={{ width: '100%', marginTop: '16px' }}>
                    {loading ? <RefreshCw className="pulse-animation" size={18} /> : 'Send Verification Code'}
                  </button>
                  <p className="text-muted" style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>Already have an account? <Link to="/login" style={{color: 'var(--primary)'}}>Login</Link></p>
                </form>
              </>
            ) : (
              <>
                 <button onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }} disabled={loading}>← Back</button>
                 <h2 style={{ marginBottom: '8px' }}>Verify your number</h2>
                 <p className="text-muted" style={{ marginBottom: '32px', lineHeight: 1.5 }}>We've sent a 6-digit verification code to <strong>{phone}</strong>.</p>
                 
                 <form onSubmit={handleVerifyOTP}>
                    <label className="text-muted" style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#10b981' }}>Enter Security Code</label>
                    <input className="input-field" type="text" placeholder="------" value={otp} onChange={e=>setOtp(e.target.value)} maxLength={6} style={{ letterSpacing: '8px', fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }} required />
                    
                    <button className="btn" type="submit" disabled={loading} style={{ width: '100%', marginTop: '24px', background: '#10b981' }}>
                       {loading ? <RefreshCw className="pulse-animation" size={18} /> : 'Create Account'}
                    </button>
                    <p className="text-muted" style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', lineHeight: 1.5 }}>By clicking Create Account, you explicitly agree to our standard Terms of Service and Privacy Policy.</p>
                 </form>
              </>
            )}
          </div>

        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
