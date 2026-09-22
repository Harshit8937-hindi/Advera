import { Link } from 'react-router-dom';
import { Zap, MessageCircle, BarChart3, ShieldCheck, Target, Pencil, Send as SendIcon, Instagram, Smartphone, Mail, Globe, MessageSquare, Bot, Video, Volume2, Facebook } from 'lucide-react';

export default function Landing() {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="landing-nav glass-panel" style={{ position: 'relative' }}>
        <Link to="/tour" className="logo" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/advera-logo.png" alt="Advera Logo" style={{ height: '42px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
             <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', marginTop: '2px', textTransform: 'uppercase' }}>Automated Growth Engine</span>
          </div>
        </Link>

        {/* Desktop Navigation Options */}
        <div style={{ display: 'none', gap: '32px', position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: '500', fontSize: '15px' }} className="desktop-nav-links">
          
          {/* Company Mega Dropdown */}
          <div className="nav-dropdown-wrapper" style={{ position: 'relative', paddingBottom: '20px', marginBottom: '-20px' }}>
            <span style={{ color: 'white', cursor: 'pointer', opacity: 0.8, transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.8}>Company ▾</span>
            
            <div className="glass-panel dropdown-menu" style={{ position: 'absolute', top: '40px', left: '-20px', width: '220px', opacity: 0, visibility: 'hidden', transition: '0.2s', display: 'flex', flexDirection: 'column', padding: '12px', zIndex: 50, border: '1px solid rgba(255,255,255,0.1)' }}>
               <Link to="/tour" style={{ padding: '8px 12px', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', transition: '0.2s' }} className="dropdown-item">Dashboard</Link>
               <a href="#" style={{ padding: '8px 12px', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', transition: '0.2s' }} className="dropdown-item">Company API</a>
               <Link to="/brands" style={{ padding: '8px 12px', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', transition: '0.2s' }} className="dropdown-item">Related Brands</Link>
            </div>
          </div>

          <a href="#service" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.8}>Service</a>
          {/* Contact Dropdown */}
          <div className="nav-dropdown-wrapper" style={{ position: 'relative', paddingBottom: '20px', marginBottom: '-20px' }}>
            <span style={{ color: 'white', cursor: 'pointer', opacity: 0.8, transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.8}>Contact ▾</span>
            
            <div className="glass-panel dropdown-menu" style={{ position: 'absolute', top: '40px', left: '-20px', width: '220px', opacity: 0, visibility: 'hidden', transition: '0.2s', display: 'flex', flexDirection: 'column', padding: '12px', zIndex: 50, border: '1px solid rgba(255,255,255,0.1)' }}>
               <a href="mailto:essentialtips89@gmail.com" className="dropdown-item" style={{ padding: '8px 12px', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Mail size={16} /> Advera
               </a>
                <a href="https://www.instagram.com/advera.in_?igsh=cWh2cTU4eGdhazV3" target="_blank" rel="noreferrer" className="dropdown-item" style={{ padding: '8px 12px', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Instagram size={16} color="#e1306c" /> Advera
                </a>
                <a href="https://www.facebook.com/share/14ZR4bTpM6C/" target="_blank" rel="noreferrer" className="dropdown-item" style={{ padding: '8px 12px', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Facebook size={16} color="#3b82f6" /> Advera
                </a>
            </div>
          </div>
        </div>
        <style>{`
          @media (min-width: 768px) { .desktop-nav-links { display: flex !important; } }
          .nav-dropdown-wrapper:hover .dropdown-menu { opacity: 1 !important; visibility: visible !important; }
          .dropdown-item:hover { background: rgba(255,255,255,0.1); }
        `}</style>
        
        <div className="nav-actions">
          <Link to="/login" className="btn-text">Login</Link>
          <Link to="/register" className="btn">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="badge floating-badge">🚀 #1 Conversational Engagement Platform</div>
          <h1 className="hero-title" style={{ fontSize: '58px' }}>Conversations that drive <span className="text-gradient">Commerce & Growth</span></h1>
          <p className="hero-subtitle text-muted">Engage customers, automate support, and skyrocket sales across WhatsApp, Instagram, SMS, and RCS. The enterprise-grade messaging API for modern businesses.</p>
          <div className="hero-cta">
            <Link to="/register" className="btn btn-large pulse-animation">
              Start Building for Free
            </Link>
            <p className="text-muted" style={{ fontSize: '14px', marginTop: '16px' }}>No credit card required to start building.</p>
          </div>

          <div style={{ marginTop: '56px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#64748b', marginBottom: '16px', fontWeight: 'bold' }}>Supported Channels</p>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontWeight: 600 }}><MessageCircle size={20} color="#25D366" /> <span>WhatsApp</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontWeight: 600 }}><MessageSquare size={20} color="#3b82f6" /> <span>SMS</span></div>
              <a href="https://www.instagram.com/advera.in_?igsh=cWh2cTU4eGdhazV3" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontWeight: 600, textDecoration: 'none' }}><Instagram size={20} color="#e1306c" /> <span>Advera</span></a>
              <a href="https://www.facebook.com/share/14ZR4bTpM6C/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontWeight: 600, textDecoration: 'none' }}><Facebook size={20} color="#3b82f6" /> <span>Advera</span></a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontWeight: 600 }}><Smartphone size={20} color="#f59e0b" /> <span>RCS</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontWeight: 600 }}><Mail size={20} color="#10b981" /> <span>Email</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontWeight: 600 }}><Globe size={20} color="#8b5cf6" /> <span>Web Chat</span></div>
            </div>
          </div>
        </div>
        
        <div className="glow-orb orb-1" style={{ background: 'rgba(139, 92, 246, 0.4)' }}></div>
        <div className="glow-orb orb-2" style={{ background: 'rgba(16, 185, 129, 0.2)' }}></div>
      </header>

      {/* Enterprise Conversational Platform moved up */}
      <section id="contact" style={{ paddingTop: '80px', paddingBottom: '40px', width: '100%' }}>
        <div style={{ width: '100%', textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', color: '#f8fafc' }}>Enterprise Contact & Support</h2>
          <p className="text-muted" style={{ fontSize: '18px' }}>Partner with Advera to scale your conversational commerce globally.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }} className="features-grid">
          <div className="feature-card glass-panel" style={{ cursor: 'pointer', margin: 0 }}>
            <div className="feature-icon"><MessageSquare size={32} color="#f59e0b" /></div>
            <h3>Omnichannel API</h3>
            <p className="text-muted" style={{ lineHeight: '1.6' }}>Build once, deploy everywhere. Route your messages intelligently across WhatsApp, SMS, RCS, and 30+ other messaging channels globally.</p>
          </div>
          <div className="feature-card glass-panel" style={{ cursor: 'pointer', margin: 0 }}>
            <div className="feature-icon"><Bot size={32} color="#3b82f6" /></div>
            <h3>Conversational AI Bots</h3>
            <p className="text-muted" style={{ lineHeight: '1.6' }}>Deploy advanced AI chatbots to automate customer support, qualify leads, and close sales seamlessly without any human intervention.</p>
          </div>
          <div className="feature-card glass-panel" style={{ cursor: 'pointer', margin: 0 }}>
            <div className="feature-icon"><ShieldCheck size={32} color="#10b981" /></div>
            <h3>Bank-Grade Security</h3>
            <p className="text-muted" style={{ lineHeight: '1.6' }}>Achieve compliance effortlessly with end-to-end encryption, integrated OTP verification services, and enterprise-level data privacy controls.</p>
          </div>
        </div>
        <style>{`.features-grid { grid-template-columns: repeat(3, 1fr) !important; } @media (max-width: 900px) { .features-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* How We Provide Our Service Section */}
      <section id="service" className="how-it-works-section" style={{ padding: '80px 20px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', marginTop: '40px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '16px', background: 'linear-gradient(to right, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Our Advertising Services</h2>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: '1.6', fontSize: '18px' }}>
          Leverage our high-throughput omnichannel infrastructure to engage your audience across multiple native formats.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="step-card glass-panel" style={{ padding: '32px 24px', position: 'relative', textAlign: 'left', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <MessageSquare size={24} color="#3b82f6" />
            </div>
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '48px', fontWeight: '900', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>1</div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>SMS Marketing</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.6' }}>Native SMS routing with 98% open rates. Deliver critical alerts and promotional blasts directly to any mobile device worldwide.</p>
          </div>
          
          <div className="step-card glass-panel" style={{ padding: '32px 24px', position: 'relative', textAlign: 'left', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: 'rgba(37, 211, 102, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <MessageCircle size={24} color="#25D366" />
            </div>
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '48px', fontWeight: '900', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>2</div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>WhatsApp Messaging</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.6' }}>Official WhatsApp Business API integration. Send rich media, interactive buttons, and catalogs to engage customers on their favorite app.</p>
          </div>
          
          <div className="step-card glass-panel" style={{ padding: '32px 24px', position: 'relative', textAlign: 'left', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Video size={24} color="#ef4444" />
            </div>
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '48px', fontWeight: '900', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>3</div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Video Ads</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.6' }}>Immersive visual storytelling. Deploy targeted video campaigns that capture attention and drive high conversion through rich media buffers.</p>
          </div>

          <div className="step-card glass-panel" style={{ padding: '32px 24px', position: 'relative', textAlign: 'left', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Volume2 size={24} color="#f59e0b" />
            </div>
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '48px', fontWeight: '900', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>4</div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Voice Ads</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.6' }}>Automated localized voice broadcasts. Reach your audience with crystal-clear audio messages that add a human touch to your marketing.</p>
          </div>
        </div>
      </section>
      
      <footer id="company" style={{ padding: '40px 20px', textAlign: 'center', opacity: 0.6, fontSize: '14px' }}>
         <p>© 2026 Advera Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
