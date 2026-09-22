import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ShieldCheck, MessageSquare, RefreshCw } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { API_BASE_URL } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '342916923065-rokjue4c8lrac2kpahnsua3et0c5qjpd.apps.googleusercontent.com';

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const executeLogin = async (identifier, authMethod) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, { 
        identifier, 
        authMethod,
        otpToken: otp || undefined 
      });
      toast.success('Welcome back!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 5) return toast.error('Valid Identity Required');
    setLoading(true);
    try {
      const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;
      await axios.post(`${API_BASE_URL}/api/auth/send-sms-otp`, { mobile: formattedPhone });
      
      setStep(2);
      toast.success('Terminal OTP dispatched - Check Backend Logs');
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
      
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, { 
        identifier: formattedPhone, 
        authMethod: 'sms',
        otpToken: otp
      });
      
      toast.success('Welcome back!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      executeLogin(decoded.email, 'google');
    } catch(e) { toast.error("Error decoding Google token"); }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="auth-container">
        <div id="recaptcha-container"></div>
        <div className="glass-panel" style={{ display: 'flex', maxWidth: '900px', width: '100%', overflow: 'hidden', padding: 0 }}>
          
          {/* Left Branding Pane */}
          <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.05))', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
             <MessageSquare size={48} color="#3b82f6" style={{ marginBottom: '24px' }}/>
             <h1 style={{ fontSize: '36px', lineHeight: 1.2, marginBottom: '24px' }}>Welcome back.</h1>
             <p className="text-muted" style={{ fontSize: '18px', lineHeight: 1.6 }}>Sign in to continue orchestrating powerful conversational campaigns and reviewing your omni-channel analytics.</p>
             <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldCheck size={20} color="#10b981"/>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>Secure Passwordless Portal</span>
             </div>
          </div>

          {/* Right Form Pane */}
          <div style={{ flex: 1, padding: '48px', position: 'relative' }}>
            {step === 1 ? (
              <>
                <h2 style={{ marginBottom: '8px' }}>Sign in</h2>
                <p className="text-muted" style={{ marginBottom: '24px' }}>Access your enterprise dashboard.</p>
                
                <button 
                  type="button"
                  className="btn" 
                  style={{ width: '100%', marginBottom: '20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.3) 100%)', border: '1px solid rgba(139,92,246,0.5)', color: 'white', fontWeight: 'bold', padding: '12px', fontSize: '14px' }}
                  onClick={() => {
                    const demoUser = {
                      id: 999,
                      name: 'Acme Retail Ltd',
                      email: 'demo@advera.io',
                      mobile: '+1 (555) 019-2831',
                      is_premium: true,
                      available_credits: 5000,
                      permissionsGranted: true
                    };
                    localStorage.setItem('user', JSON.stringify(demoUser));
                    localStorage.setItem('token', 'demo-jwt-token-2026');
                    toast.success('Logged in as Demo Enterprise User!');
                    navigate('/dashboard');
                  }}
                >
                  ⚡ Quick Demo Account Access
                </button>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error('Google Sign-In Failed')} useOneTap shape="rectangular" theme="filled_black" text="signin_with" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0', opacity: 0.5 }}>
                  <div style={{ flex: 1, height: '1px', background: 'white' }}></div>
                  <span style={{ padding: '0 12px', fontSize: '12px', letterSpacing: '1px' }}>OR LOGIN WITH MOBILE</span>
                  <div style={{ flex: 1, height: '1px', background: 'white' }}></div>
                </div>

                <form onSubmit={handleSendOTP}>
                  <label className="text-muted" style={{ fontSize: '13px', display: 'block', marginBottom: '6px' }}>Registered Mobile Number</label>
                  <input className="input-field" type="tel" placeholder="+91823908xxx" value={phone} onChange={e=>setPhone(e.target.value)} required />

                  <button className="btn" type="submit" disabled={loading} style={{ width: '100%', marginTop: '16px' }}>
                    {loading ? <RefreshCw className="pulse-animation" size={18} /> : 'Send Magic OTP'}
                  </button>
                  <p className="text-muted" style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px' }}>New here? <Link to="/register" style={{color: 'var(--primary)'}}>Register Business</Link></p>
                </form>
              </>
            ) : (
              <>
                 <button onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }} disabled={loading}>← Back</button>
                 <h2 style={{ marginBottom: '8px' }}>Security Check</h2>
                 <p className="text-muted" style={{ marginBottom: '32px', lineHeight: 1.5 }}>Enter the 6-digit code we just sent to <strong>{phone}</strong>.</p>
                 
                 <form onSubmit={handleVerifyOTP}>
                    <label className="text-muted" style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#10b981' }}>Secure Access Code</label>
                    <input className="input-field" type="text" placeholder="------" value={otp} onChange={e=>setOtp(e.target.value)} maxLength={6} style={{ letterSpacing: '8px', fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }} required />
                    
                    <button className="btn" type="submit" disabled={loading} style={{ width: '100%', marginTop: '24px', background: '#10b981' }}>
                       {loading ? <RefreshCw className="pulse-animation" size={18} /> : 'Validate & Log In'}
                    </button>
                 </form>
              </>
            )}
          </div>

        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
