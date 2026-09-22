import { useNavigate, Link } from 'react-router-dom';
import { Target, MessageCircle, Bot, Users, Rocket, Sparkles, ChevronDown } from 'lucide-react';

export default function Tour() {
  const navigate = useNavigate();
  
  const nextSlide = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="tour-container" style={{ height: '100vh', width: '100vw', overflowY: 'scroll', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth', background: '#09090b', color: 'white' }}>
      
      {/* Fixed Header */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', zIndex: 100, background: 'linear-gradient(to bottom, rgba(9,9,11,0.9), transparent)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white' }}>
          <img src="/advera-logo.png" alt="Advera" style={{ height: '36px', objectFit: 'contain' }} />
        </Link>
        <button onClick={() => navigate('/register')} className="btn" style={{ background: 'white', color: 'black' }}>Build Free 🚀</button>
      </nav>

      {/* Slide 1: Welcome */}
      <section id="slide-1" style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', zIndex: 0 }} />
        <div style={{ textAlign: 'center', zIndex: 1, maxWidth: '800px', padding: '0 20px' }}>
          <div className="badge floating-badge" style={{ margin: '0 auto 24px auto', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }}>
            <Sparkles size={14} /> Automated Growth Engine
          </div>
          <h1 style={{ fontSize: '72px', margin: '0 0 24px 0', lineHeight: 1.1, letterSpacing: '-1px' }}>Scale Commerce with <span className="text-gradient">Automation</span></h1>
          <p style={{ fontSize: '22px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '40px' }}>Stop guessing. Start growing. Advera is the ultimate conversational pipeline that turns dormant audiences into active revenue.</p>
          <button onClick={() => nextSlide('slide-2')} className="btn" style={{ background: 'transparent', border: '1px solid #3f3f46', borderRadius: '30px', padding: '12px 24px', fontSize: '16px' }}>See Tour <ChevronDown size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} /></button>
        </div>
      </section>

      {/* Slide 2: Omnichannel */}
      <section id="slide-2" style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', maxWidth: '1200px', padding: '0 40px', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <MessageCircle size={32} color="#10b981" />
            </div>
            <h2 style={{ fontSize: '48px', marginBottom: '24px', lineHeight: 1.1 }}>Omnichannel<br/>Delivery</h2>
            <p style={{ fontSize: '20px', color: '#94a3b8', lineHeight: 1.6 }}>We pipeline your promotional broadcasts directly to the lock-screens of your customers across WhatsApp, SMS, and RCS—guaranteeing mathematically perfect 98% open rates.</p>
          </div>
          <div style={{ flex: 1, minWidth: '300px' }} className="glass-panel">
            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}><MessageCircle color="#25D366" size={28}/> <span style={{ fontSize: '18px', fontWeight: 600 }}>WhatsApp Business API</span></div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}><MessageCircle color="#3b82f6" size={28}/> <span style={{ fontSize: '18px', fontWeight: 600 }}>Native SMS Routing</span></div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}><MessageCircle color="#f59e0b" size={28}/> <span style={{ fontSize: '18px', fontWeight: 600 }}>RCS Rich Messages</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: Targeting */}
      <section id="slide-3" style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row-reverse', gap: '80px', maxWidth: '1200px', padding: '0 40px', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
             <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Target size={32} color="#ef4444" />
            </div>
            <h2 style={{ fontSize: '48px', marginBottom: '24px', lineHeight: 1.1 }}>Hyper-Local<br/>Tower Targeting</h2>
            <p style={{ fontSize: '20px', color: '#94a3b8', lineHeight: 1.6 }}>Stop wasting budget on broad audiences. Use our Interactive Map to directly drop a pin on local telecom towers, geofencing the exact demographic within driving distance of your store.</p>
          </div>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
             <div className="glass-panel" style={{ height: '400px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800) center/cover' }}>
               <div style={{ background: 'rgba(0,0,0,0.6)', padding: '20px 40px', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>📍 Radius Expanded</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Slide 4: AI Copy */}
      <section id="slide-4" style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', maxWidth: '1200px', padding: '0 40px', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Bot size={32} color="#8b5cf6" />
            </div>
            <h2 style={{ fontSize: '48px', marginBottom: '24px', lineHeight: 1.1 }}>Predictive AI<br/>Copywriting</h2>
            <p style={{ fontSize: '20px', color: '#94a3b8', lineHeight: 1.6 }}>Never stare at a blank screen again. Our onboard Gemini Engine instantly crafts highly-converting scarcity hooks and perfectly localized promotional texts optimized for local sales.</p>
          </div>
          <div style={{ flex: 1, minWidth: '300px' }} className="glass-panel">
             <div style={{ padding: '40px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: '#8b5cf6' }}>
                 <Sparkles size={20} className="pulse-animation" /> Generating Live Promo...
               </div>
               <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #8b5cf6', fontSize: '18px', lineHeight: 1.5 }}>
                 "🚨 VIP FLASH SALE! Drop by our store in the next 2 hours and show this text for an instant 40% OFF your entire cart! Limited stock remaining."
               </div>
             </div>
          </div>
        </div>
      </section>



      {/* Slide 6: CTA */}
      <section id="slide-6" style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)', zIndex: 0 }} />
        <div style={{ zIndex: 1, textAlign: 'center', maxWidth: '800px', padding: '40px' }} className="glass-panel">
           <Rocket size={48} color="#3b82f6" style={{ margin: '0 auto 24px auto' }} />
           <h2 style={{ fontSize: '56px', marginBottom: '24px', lineHeight: 1.1 }}>Ready to Ignite?</h2>
           <p style={{ fontSize: '20px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '40px' }}>Join the thousands of global brands scaling their local networks securely using the Advera Automated Marketing Engine.</p>
           <button onClick={() => navigate('/register')} className="btn btn-large pulse-animation" style={{ fontSize: '18px', padding: '16px 48px' }}>Create Your Free Account</button>
        </div>
      </section>
      
    </div>
  );
}
