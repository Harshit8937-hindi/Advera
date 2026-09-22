import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, MessageSquareCode } from 'lucide-react';
import api from '../api';
import { toast } from 'sonner';

export default function Permissions() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(userData);
    if (parsed.permissionsGranted) {
      navigate('/dashboard');
      return;
    }
    setUser(parsed);
  }, [navigate]);

  const handleGrantPermissions = async () => {
    setLoading(true);
    try {
      await api.post('/api/auth/permissions', { userId: user.id });
      
      const updatedUser = { ...user, permissionsGranted: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Permissions granted successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to update permissions.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="auth-container" style={{ flexDirection: 'column', gap: '24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Let's Get You Setup</h1>
        <p className="text-muted" style={{ fontSize: '18px' }}>We need a few permissions to power your automated messaging campaigns securely.</p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        


        {/* WhatsApp Business Permission */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ background: 'rgba(37, 211, 102, 0.1)', padding: '16px', borderRadius: '16px', height: 'fit-content' }}>
            <MessageSquareCode size={32} color="#25D366" />
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>WhatsApp Business Integration</h3>
            <p className="text-muted" style={{ lineHeight: '1.5', fontSize: '15px' }}>
              We register and connect through your <strong>WhatsApp Business Account</strong>. 
              <br/><br/>
              <span style={{ color: '#10b981', fontWeight: '500' }}>
                <ShieldCheck size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/>
                Don't panic! This is 100% safe.
              </span> We strictly utilize the official Meta Business API, guaranteeing your account is protected from generic spam bans.
            </p>
          </div>
        </div>

        <button 
          className="btn" 
          onClick={handleGrantPermissions} 
          disabled={loading}
          style={{ width: '100%', padding: '16px', marginTop: '16px', fontSize: '16px' }}
        >
          {loading ? 'Securing Connection...' : 'Allow Access & Continue'}
        </button>
      </div>
    </div>
  );
}
