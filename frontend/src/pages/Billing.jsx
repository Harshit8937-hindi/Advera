import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Send, LogOut, CheckCircle, CreditCard, ShieldCheck, Smartphone, Wallet, Building, X, Users, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import { toast } from 'sonner';

export default function Billing() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [timeLeft, setTimeLeft] = useState(300);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  useEffect(() => {
    let countdownInterval;
    let autoResolveTimeout;

    if (paymentMethod && !paymentProcessing && !paymentSuccess) {
      setTimeLeft(300);
      
      countdownInterval = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // Simulate webhook from gateway after 5 seconds of viewing the method
      autoResolveTimeout = setTimeout(() => {
        executeAutoPayment();
      }, 5000);
    }

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(autoResolveTimeout);
    };
  }, [paymentMethod, paymentProcessing, paymentSuccess]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const executeAutoPayment = async () => {
    setPaymentProcessing(true);
    try {
      await axios.post(`${API_BASE_URL}/api/payments/upgrade`, { userId: user.id, plan: selectedPlan.id });
      
      const newCredits = user.available_credits || 0;
      let updatedUser = { ...user };
      if (selectedPlan.id === 'starter') updatedUser.available_credits = newCredits + 75;
      else if (selectedPlan.id === 'normal') updatedUser.available_credits = newCredits + 1000;
      else if (selectedPlan.id === 'premium') updatedUser.is_premium = true;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      toast.success(`Payment successfully received!`);
      
      setTimeout(() => {
        setSelectedPlan(null);
        setPaymentMethod(null);
        setPaymentSuccess(false);
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      toast.error('Payment verification failed.');
      setPaymentProcessing(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const renderPaymentModal = () => {
    if (!selectedPlan) return null;
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '40px', position: 'relative' }}>
          <button onClick={() => { setSelectedPlan(null); setPaymentMethod(null); setPaymentSuccess(false); }} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
          
          {!paymentMethod ? (
            <>
              <h2 style={{ marginBottom: '8px', textAlign: 'center' }}>Secure Checkout</h2>
              <p className="text-muted" style={{ textAlign: 'center', marginBottom: '32px' }}>Select Payment Method for <strong>₹{selectedPlan.price}</strong></p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} onClick={() => setPaymentMethod('GPay')}><Smartphone size={18}/> GPay</button>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} onClick={() => setPaymentMethod('Paytm')}><Wallet size={18}/> Paytm</button>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} onClick={() => setPaymentMethod('PhonePe')}><Smartphone size={18}/> PhonePe</button>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} onClick={() => setPaymentMethod('Razorpay')}><ShieldCheck size={18}/> Razorpay</button>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} onClick={() => setPaymentMethod('Card')}><CreditCard size={18}/> Credit/Debit Card</button>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} onClick={() => setPaymentMethod('Bill Payment')}><Building size={18}/> Bill Payment</button>
              </div>
            </>
          ) : paymentSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
               <CheckCircle size={64} color="#10b981" style={{ marginBottom: '16px', display: 'inline-block' }}/>
               <h2>Payment Successful!</h2>
               <p className="text-muted">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '24px' }}>
                {paymentMethod === 'Card' ? <CreditCard size={48} color="var(--primary)" /> : 
                 paymentMethod === 'Bill Payment' ? <Building size={48} color="var(--primary)" /> :
                 paymentMethod === 'Razorpay' ? <ShieldCheck size={48} color="#3b82f6" /> :
                 <Smartphone size={48} color="#10b981" />}
              </div>
              <h2 style={{ marginBottom: '8px' }}>Pay via {paymentMethod}</h2>
              <h1 style={{ color: 'var(--primary)', marginBottom: '8px' }}>₹{selectedPlan.price}</h1>
              
              <div style={{ marginBottom: '24px', padding: '12px 24px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontSize: '14px', display: 'inline-block', fontWeight: '500' }}>
                Time to complete payment: <strong>{formatTime(timeLeft)}</strong>
              </div>
              
              {paymentMethod === 'Card' && (
                <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                   <input className="input-field" type="text" placeholder="Card Number" style={{ marginBottom: '12px' }}/>
                   <div style={{ display: 'flex', gap: '12px' }}>
                     <input className="input-field" type="text" placeholder="MM/YY" />
                     <input className="input-field" type="text" placeholder="CVV" />
                   </div>
                </div>
              )}
              
              {(['GPay', 'PhonePe', 'Paytm'].includes(paymentMethod)) && (
                <div style={{ padding: '24px', background: 'white', borderRadius: '16px', display: 'inline-block', marginBottom: '24px' }}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=mock@upi&pn=AdsManager&am=${selectedPlan.price}`} alt="UPI QR" />
                  <p style={{ color: 'black', fontSize: '12px', marginTop: '12px', fontWeight: 'bold', margin: '12px 0 0 0' }}>Scan to Pay with {paymentMethod}</p>
                </div>
              )}

              {paymentProcessing ? (
                <div style={{ padding: '16px', color: 'var(--primary)', fontWeight: 'bold' }} className="pulse-animation">
                  Verifying Transaction...
                </div>
              ) : (
                <div className="text-muted" style={{ fontSize: '15px', marginTop: '8px', marginBottom: '16px' }}>
                  <RefreshCw size={16} className="pulse-animation" style={{ verticalAlign: 'text-bottom', marginRight: '8px' }}/>
                  Awaiting payment confirmation...
                </div>
              )}
              
              <button className="btn-text" style={{ display: 'block', width: '100%', textAlign: 'center', cursor: 'pointer', background: 'transparent', border: 'none' }} onClick={() => setPaymentMethod(null)} disabled={paymentProcessing}>Cancel Payment</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!user) return null;

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <div className="sidebar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0 }}>
        <Link to="/tour" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', textDecoration: 'none', color: 'inherit' }}>
          <img src="/advera-logo.png" alt="Advera Logo" style={{ height: '36px', objectFit: 'contain' }} />
        </Link>
        <Link to="/dashboard" className="nav-link"><LayoutDashboard size={20}/> Dashboard</Link>

        <Link to="/composer" className="nav-link"><Send size={20}/> Send Ads</Link>
        <Link to="/billing" className="nav-link active"><CreditCard size={20}/> Billing</Link>
        <div style={{ flex: 1 }}></div>
        <button onClick={handleLogout} className="nav-link"><LogOut size={20}/> Logout</button>
      </div>
      
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '1000px', width: '100%', marginTop: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Pricing Plans</h1>
            <p className="text-muted" style={{ fontSize: '18px' }}>Choose the right volume for your business growth.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            {/* Starter Plan */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Starter</h3>
              <h2 style={{ fontSize: '42px', margin: '0 0 24px 0' }}>₹75</h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', flex: 1 }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><CheckCircle color="#10b981" size={18} /> 75 SMS & WhatsApp Messages</li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><CheckCircle color="#10b981" size={18} /> Basic Delivery Tools</li>
              </ul>
              <button className="btn" onClick={() => setSelectedPlan({id: 'starter', name: 'Starter', price: 75})}>Select Plan</button>
            </div>

            {/* Normal Plan */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', transform: 'scale(1.05)', borderColor: 'var(--primary)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}>
              <div className="badge" style={{ alignSelf: 'flex-start', marginBottom: '16px', background: 'var(--primary)', color: 'white' }}>Most Popular</div>
              <h3 style={{ color: 'var(--primary)', margin: '0 0 8px 0' }}>Normal</h3>
              <h2 style={{ fontSize: '42px', margin: '0 0 24px 0' }}>₹750</h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', flex: 1 }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><CheckCircle color="#10b981" size={18} /> 1000 SMS & WhatsApp Messages</li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><CheckCircle color="#10b981" size={18} /> Standard Delivery Priorities</li>
              </ul>
              <button className="btn" onClick={() => setSelectedPlan({id: 'normal', name: 'Normal', price: 750})}>Select Plan</button>
            </div>

          </div>
        </div>
      </div>
      {renderPaymentModal()}
    </div>
  );
}
