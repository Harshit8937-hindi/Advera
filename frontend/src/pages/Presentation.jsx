import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, MessageCircle, BarChart3, ShieldCheck, Target, Bot, 
  ChevronRight, ChevronLeft, Maximize, Play, Sparkles, CheckCircle2, 
  TrendingUp, Users, Smartphone, Globe, ArrowRight, Eye, Volume2, Video
} from 'lucide-react';

export default function Presentation() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = [
    {
      id: 'title',
      badge: '🚀 EXECUTIVE PRESENTATION 2026',
      title: 'Advera Conversational Engine',
      subtitle: 'The Enterprise Omnichannel Growth & Hyper-Local Marketing Platform',
      notes: 'Welcome everyone. Today we present Advera—the next-generation conversational platform that bridges businesses and local consumers through native messaging channels like WhatsApp, SMS, and RCS.',
      content: (
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div className="glass-panel" style={{ padding: '24px 36px', textAlign: 'center', flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '48px', fontWeight: '800', color: '#10b981' }}>98%</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>Broadcast Open Rate</div>
            </div>
            <div className="glass-panel" style={{ padding: '24px 36px', textAlign: 'center', flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '48px', fontWeight: '800', color: '#3b82f6' }}>5.2x</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>Average ROAS Lift</div>
            </div>
            <div className="glass-panel" style={{ padding: '24px 36px', textAlign: 'center', flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '48px', fontWeight: '800', color: '#8b5cf6' }}>&lt; 60s</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>Campaign Creation Time</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="btn btn-large pulse-animation" onClick={() => launchDemo()}>
              <Play size={20} /> Launch Live Demo
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'problem',
      badge: '⚠️ THE INDUSTRY CHALLENGE',
      title: 'Traditional Digital Marketing is Failing',
      subtitle: 'Email open rates are at an all-time low (15-20%) and social ad costs continue to skyrocket.',
      notes: 'Highlight the pain point: consumers ignore spam emails and ad-blockers hide traditional display banners. Businesses need direct, high-trust messaging channels.',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', width: '100%', maxWidth: '1100px' }}>
          <div className="glass-panel" style={{ borderLeft: '4px solid #ef4444', padding: '32px' }}>
            <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '18px', marginBottom: '12px' }}>📉 Broken Email Outreach</div>
            <p className="text-muted" style={{ lineHeight: 1.6 }}>82% of promotional emails go unread or land in spam folders. Customer engagement is declining across standard channels.</p>
          </div>
          <div className="glass-panel" style={{ borderLeft: '4px solid #f59e0b', padding: '32px' }}>
            <div style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '18px', marginBottom: '12px' }}>💸 High Acquisition Costs</div>
            <p className="text-muted" style={{ lineHeight: 1.6 }}>Social media ad CPMs have risen 45% year-over-year while click-through rates continue to stagnate.</p>
          </div>
          <div className="glass-panel" style={{ borderLeft: '4px solid #8b5cf6', padding: '32px' }}>
            <div style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '18px', marginBottom: '12px' }}>📍 Lack of Precise Local Reach</div>
            <p className="text-muted" style={{ lineHeight: 1.6 }}>Retail & local businesses struggle to target users within direct driving distance of their physical locations.</p>
          </div>
        </div>
      )
    },
    {
      id: 'solution',
      badge: '✨ THE ADVERA SOLUTION',
      title: 'Omnichannel Conversational Automation',
      subtitle: 'Reach customers instantly on the apps they open dozens of times every day.',
      notes: 'Advera combines native mobile channels (WhatsApp, SMS, RCS) with hyper-local map geofencing and AI copywriting to deliver high-converting messages.',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', width: '100%', maxWidth: '1100px' }}>
          <div className="glass-panel" style={{ padding: '28px', textAlign: 'left' }}>
            <MessageCircle size={36} color="#25D366" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>WhatsApp Business</h3>
            <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.5 }}>Official Meta API integration with rich interactive quick-reply buttons and image attachments.</p>
          </div>
          <div className="glass-panel" style={{ padding: '28px', textAlign: 'left' }}>
            <Smartphone size={36} color="#3b82f6" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>SMS Gateway</h3>
            <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.5 }}>High-speed global carrier routing delivering instantaneous lock-screen notifications.</p>
          </div>
          <div className="glass-panel" style={{ padding: '28px', textAlign: 'left' }}>
            <Target size={36} color="#f59e0b" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Tower Geofencing</h3>
            <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.5 }}>Pinpoint telecom tower mapping to target users in specific geographic radiuses.</p>
          </div>
          <div className="glass-panel" style={{ padding: '28px', textAlign: 'left' }}>
            <Bot size={36} color="#8b5cf6" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>AI Copy Engine</h3>
            <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.5 }}>Predictive Gemini AI generating localized scarcity copy optimized for conversions.</p>
          </div>
        </div>
      )
    },
    {
      id: 'geofencing',
      badge: '📍 PROPRIETARY TECHNOLOGY',
      title: 'Hyper-Local Geofencing & Tower Radiuses',
      subtitle: 'Target real customers nearby with dynamic map pin placement and audience calculation.',
      notes: 'Demonstrate our Leaflet Map integration. Advertisers can drop a pin on any tower or store location, select a radius, and get real-time audience estimates.',
      content: (
        <div className="glass-panel" style={{ padding: '36px', maxWidth: '1000px', width: '100%', display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 'bold', color: '#60a5fa', marginBottom: '6px' }}>🎯 Pinpoint Tower Selection</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Dynamic cell tower nodes auto-generate based on map viewport navigation.</div>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 'bold', color: '#34d399', marginBottom: '6px' }}>📊 Instant Reach Metrics</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Real-time calculation of active mobile subscribers within the broadcast zone.</div>
            </div>
          </div>
          <div style={{ flex: 1.2, minWidth: '320px', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span>Target Radius: <strong>2.5 km</strong></span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>18,450 Reachable Contacts</span>
            </div>
            <div style={{ height: '180px', borderRadius: '12px', background: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800) center/cover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(9, 9, 11, 0.8)', padding: '12px 24px', borderRadius: '20px', border: '1px solid #3b82f6', color: '#3b82f6', fontWeight: 'bold' }}>
                📍 Local Broadcast Active
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'metrics',
      badge: '📈 PROVEN ROI & IMPACT',
      title: 'Unmatched Business Results',
      subtitle: 'Real enterprise benchmarks across retail, commerce, and service providers.',
      notes: 'These metrics represent our pilot customer results: 24.8% CTR compared to 2.1% industry standard, leading to 5.2x return on ad spend.',
      content: (
        <div style={{ width: '100%', maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
              <TrendingUp size={32} color="#10b981" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '36px', fontWeight: 'bold' }}>24.8%</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>Click-Through Rate</div>
            </div>
            <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
              <Users size={32} color="#3b82f6" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '36px', fontWeight: 'bold' }}>4.8x</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>Customer Retention</div>
            </div>
            <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
              <BarChart3 size={32} color="#8b5cf6" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '36px', fontWeight: 'bold' }}>88%</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>Cost Efficiency vs Ads</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'demo',
      badge: '⚡ LIVE SYSTEM SHOWCASE',
      title: 'Ready for the Live Demonstration',
      subtitle: 'Experience Advera in action with pre-loaded enterprise data and interactive AI generation.',
      notes: 'Click the button to enter the live dashboard. Show the AI campaign composer, live phone mockup, map geofencing, and billing engine.',
      content: (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', maxWidth: '750px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(16, 185, 129, 0.2))' }}>
          <Sparkles size={48} color="#a78bfa" style={{ marginBottom: '20px' }} className="pulse-animation" />
          <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Launch Interactive Demo Mode</h2>
          <p className="text-muted" style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
            Instant single-click authentication as <strong>Acme Retail Ltd</strong> with $5,000 active credits and pre-filled campaign metrics.
          </p>
          <button className="btn btn-large" onClick={() => launchDemo()} style={{ fontSize: '18px', padding: '16px 36px' }}>
            <Play size={22} style={{ marginRight: '8px' }} /> Enter Live Dashboard
          </button>
        </div>
      )
    }
  ];

  const launchDemo = () => {
    const demoUser = {
      id: 999,
      name: 'Acme Retail Ltd (Demo)',
      email: 'demo@advera.io',
      mobile: '+1 (555) 019-2831',
      is_premium: true,
      available_credits: 5000,
      permissionsGranted: true,
      role: 'Enterprise Administrator'
    };
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('token', 'demo-jwt-token-presentation-2026');
    navigate('/dashboard');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.log(err));
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#09090b', color: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Presentation Top Control Bar */}
      <nav style={{ padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/advera-logo.png" alt="Advera" style={{ height: '32px' }} />
          </Link>
          <span style={{ fontSize: '12px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', border: '1px solid rgba(139, 92, 246, 0.4)', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
            PRESENTATION MODE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '13px', padding: '8px 14px' }} onClick={() => setShowNotes(!showNotes)}>
            <Eye size={16} /> {showNotes ? 'Hide Speaker Notes' : 'Speaker Notes'}
          </button>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '13px', padding: '8px 14px' }} onClick={toggleFullscreen}>
            <Maximize size={16} /> Fullscreen
          </button>
          <button className="btn" style={{ background: 'var(--primary)', fontSize: '13px', padding: '8px 16px' }} onClick={launchDemo}>
            <Play size={16} /> Live Demo
          </button>
        </div>
      </nav>

      {/* Slide Canvas */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative' }}>
        
        {/* Background Ambient Glow */}
        <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="badge floating-badge" style={{ marginBottom: '20px', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }}>
            {slide.badge}
          </div>
          
          <h1 style={{ fontSize: '48px', fontWeight: '800', textAlign: 'center', marginBottom: '16px', letterSpacing: '-1px', lineHeight: 1.1 }}>
            {slide.title}
          </h1>

          <p style={{ fontSize: '20px', color: '#94a3b8', textAlign: 'center', maxWidth: '800px', marginBottom: '40px', lineHeight: 1.5 }}>
            {slide.subtitle}
          </p>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {slide.content}
          </div>
        </div>

        {/* Presenter Notes Box */}
        {showNotes && (
          <div style={{ position: 'absolute', bottom: '80px', left: '40px', right: '40px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px 24px', backdropFilter: 'blur(16px)', zIndex: 40 }}>
            <div style={{ color: '#3b82f6', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              🎙️ Presenter Script & Notes:
            </div>
            <div style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: 1.5 }}>
              {slide.notes}
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation Bar */}
      <footer style={{ padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(9,9,11,0.95)' }}>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          Slide <strong>{currentSlide + 1}</strong> of {slides.length}
        </div>

        {/* Slide Progress Dots */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {slides.map((s, idx) => (
            <div 
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: currentSlide === idx ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn" 
            style={{ padding: '8px 16px', opacity: currentSlide === 0 ? 0.4 : 1 }}
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide(prev => prev - 1)}
          >
            <ChevronLeft size={18} /> Prev
          </button>
          <button 
            className="btn" 
            style={{ padding: '8px 16px', opacity: currentSlide === slides.length - 1 ? 0.4 : 1 }}
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide(prev => prev + 1)}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </footer>

    </div>
  );
}
