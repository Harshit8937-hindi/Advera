import { Link } from 'react-router-dom';
import { TrendingUp, Users, Target, Rocket, MessageCircle, ArrowRight, Zap } from 'lucide-react';

export default function Growth() {
  return (
    <div className="landing-container" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      <nav className="landing-nav glass-panel">
        <Link to="/tour" className="logo" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/advera-logo.png" alt="Advera Logo" style={{ height: '42px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
             <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', marginTop: '2px', textTransform: 'uppercase' }}>Automated Growth Engine</span>
          </div>
        </Link>
        <div className="nav-actions">
           <Link to="/register" className="btn">Deploy Free Campaign</Link>
        </div>
      </nav>

      <header style={{ textAlign: 'center', paddingTop: '120px', paddingBottom: '60px', paddingInline: '20px' }}>
        <div className="badge floating-badge" style={{ margin: '0 auto 24px auto' }}>📈 The Growth Playbook</div>
        <h1 style={{ fontSize: '56px', maxWidth: '900px', margin: '0 auto 24px auto', lineHeight: 1.2 }}>Scale your brand exponentially with <span className="text-gradient">Advera</span>.</h1>
        <p className="text-muted" style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>Discover exactly how our omnichannel API and geofencing networks convert cold leads into lifetime customers instantly.</p>
        <Link to="/register" className="btn btn-large pulse-animation">Start Growing Today <ArrowRight size={20} style={{marginLeft: '8px', verticalAlign: 'middle'}}/></Link>
      </header>

      <section style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', padding: '0 20px' }}>
         <div className="glass-panel" style={{ padding: '40px' }}>
            <TrendingUp size={48} color="#3b82f6" style={{ marginBottom: '24px' }} />
            <h2 style={{ marginBottom: '16px' }}>1. Hyper-Local Reach</h2>
            <p className="text-muted" style={{ lineHeight: 1.6, fontSize: '16px' }}>Traditional ads spread your budget too thin. Advera allows you to literally draw a circle on our Interactive Tower Map, guaranteeing only people in your immediate vicinity receive your Live Sale alerts.</p>
         </div>



         <div className="glass-panel" style={{ padding: '40px' }}>
            <Zap size={48} color="#f59e0b" style={{ marginBottom: '24px' }} />
            <h2 style={{ marginBottom: '16px' }}>3. AI Copywriting</h2>
            <p className="text-muted" style={{ lineHeight: 1.6, fontSize: '16px' }}>Never stare at a blank screen again. Click one button and Advera's Gemini 3.1 engine will instantly generate high-converting scarcity hooks and perfectly localized promotional texts.</p>
         </div>

         <div className="glass-panel" style={{ padding: '40px' }}>
            <Target size={48} color="#10b981" style={{ marginBottom: '24px' }} />
            <h2 style={{ marginBottom: '16px' }}>4. 98% Open Rates</h2>
            <p className="text-muted" style={{ lineHeight: 1.6, fontSize: '16px' }}>Emails get buried. Social posts are throttled. Advera pipes your broadcast directly to lock-screens across native SMS and WhatsApp channels, mathematically guaranteeing a 98% open rate within 3 minutes.</p>
         </div>
      </section>
      
      <div style={{ textAlign: 'center', marginTop: '80px', padding: '60px 20px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))', borderRadius: '24px', maxWidth: '1200px', margin: '80px auto 0 auto', border: '1px solid rgba(255,255,255,0.05)' }}>
         <Rocket size={48} color="var(--primary)" style={{ margin: '0 auto 24px auto' }} />
         <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>Stop hoping. Start converting.</h2>
         <p className="text-muted" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px auto' }}>Join the ecosystem that guarantees delivery. Get 5 ultra-fast broadcasts entirely free on us.</p>
         <Link to="/register" className="btn btn-large" style={{ background: 'white', color: 'black' }}>Claim Your 5 Free Credits</Link>
      </div>

    </div>
  );
}
