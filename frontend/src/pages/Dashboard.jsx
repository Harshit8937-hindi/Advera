import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Send, CreditCard, LogOut, Users } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(userData);
    if (!parsed.permissionsGranted) {
      navigate('/permissions');
      return;
    }
    setUser(parsed);
    
    axios.get(`${API_BASE_URL}/api/campaigns/history/${parsed.id}`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCampaigns(res.data);
        } else {
          setCampaigns(getDemoCampaigns());
        }
      })
      .catch(() => setCampaigns(getDemoCampaigns()));
  }, []);

  const getDemoCampaigns = () => [
    {
      id: 101,
      campaign_type: 'WhatsApp Interactive',
      content: '🚨 VIP Flash Sale! Show this message in-store to receive 40% OFF your total order within 24 hours.',
      recipients_count: 4500,
      createdAt: new Date().toISOString()
    },
    {
      id: 102,
      campaign_type: 'SMS Broadcaster',
      content: 'Exclusive invite: Experience our latest collection first. Tap to view local store location.',
      recipients_count: 12800,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 103,
      campaign_type: 'RCS Rich Blast',
      content: 'Clearance Event is now live! Up to 75% savings on all featured products.',
      recipients_count: 8200,
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) return null;

  const todaysDate = new Date().toDateString();
  const adsToday = campaigns
    .filter(c => new Date(c.createdAt).toDateString() === todaysDate)
    .reduce((sum, c) => sum + (c.recipients_count || 1), 0);

  return (
    <div className="app-layout">
      <div className="sidebar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0 }}>
        <Link to="/tour" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', textDecoration: 'none', color: 'inherit' }}>
          <img src="/advera-logo.png" alt="Advera Logo" style={{ height: '36px', objectFit: 'contain' }} />
        </Link>
        <Link to="/dashboard" className="nav-link active"><LayoutDashboard size={20}/> Dashboard</Link>
        <Link to="/composer" className="nav-link"><Send size={20}/> Send Ads</Link>
        <Link to="/billing" className="nav-link"><CreditCard size={20}/> Billing</Link>
        <div style={{ flex: 1 }}></div>
        <button onClick={handleLogout} className="nav-link"><LogOut size={20}/> Logout</button>
      </div>
      
      <div className="main-content">
        <div style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)', padding: '32px', borderRadius: '16px', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, #a78bfa 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', color: 'white', boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)' }}>
             {(user.name ? user.name[0] : (user.email ? user.email[0] : (user.mobile ? user.mobile[0] : 'U'))).toUpperCase()}
          </div>
          <div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>Welcome back, {user.name || (user.email ? user.email.split('@')[0] : (user.mobile || 'User'))}! 👋</h2>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
               {user.email && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div> {user.email}</span>}
               {user.mobile && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div> {user.mobile}</span>}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="glass-panel stat-card">
            <h4 className="text-muted">Total Campaigns</h4>
            <h2>{campaigns.length}</h2>
          </div>
          <div className="glass-panel stat-card">
            <h4 className="text-muted">Available Credits</h4>
            <h2>{user.is_premium ? 'Unlimited ✨' : (user.available_credits || 0)}</h2>
            {!user.is_premium && (
              <button className="btn" style={{ marginTop: '12px', padding: '8px 16px', fontSize: '14px' }} onClick={() => navigate('/billing')}><CreditCard size={16}/> Top Up</button>
            )}
          </div>
          {(!user.is_premium && (user.available_credits || 0) === 0) && (
            <div className="glass-panel stat-card" style={{ borderColor: adsToday >= 5 ? '#ef4444' : 'var(--border)' }}>
              <h4 className="text-muted" style={{ color: adsToday >= 5 ? '#ef4444' : 'inherit' }}>Free Daily Limit</h4>
              <h2>{adsToday} / 5</h2>
            </div>
          )}
        </div>

        <h3 className="mt-4">Recent Campaigns</h3>
        <div className="campaign-list">
          {campaigns.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <p className="text-muted">No campaigns sent yet.</p>
              <Link to="/composer"><button className="btn"><Send size={18}/> Create First Ad</button></Link>
            </div>
          ) : campaigns.map(c => (
             <div key={c.id} className="glass-panel campaign-item" style={{ alignItems: 'flex-start' }}>
               <div>
                 <strong style={{ display: 'block', marginBottom: '8px' }}>{c.campaign_type} Blast</strong>
                 <span className="text-muted" style={{ fontSize: '14px', display: 'block', marginBottom: '12px' }}>{c.content.substring(0, 60)}...</span>
                 <div style={{ display: 'flex', gap: '16px', fontSize: '12px', background: 'rgba(0,0,0,0.2)', padding: '6px 12px', borderRadius: '6px' }}>
                   <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>📡 Flashed: {c.recipients_count || 1}</span>
                   <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>✓ Delivered: {c.delivered_count || 0}</span>
                   <span style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>👁️ Read: {c.read_count || 0}</span>
                 </div>
               </div>
               <span className="badge sent" style={{ marginTop: '4px' }}>Sent</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
