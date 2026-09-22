import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Facebook } from 'lucide-react';

export default function Brands() {
  return (
    <div className="landing-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav className="landing-nav glass-panel">
        <Link to="/tour" className="logo" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/advera-logo.png" alt="Advera Logo" style={{ height: '42px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
             <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', marginTop: '2px', textTransform: 'uppercase' }}>Automated Growth Engine</span>
          </div>
        </Link>
        <div className="nav-actions">
          <Link to="/login" className="btn-text">Login</Link>
          <Link to="/register" className="btn">Get Started</Link>
        </div>
      </nav>

      <section style={{ padding: '120px 20px 60px 20px', textAlign: 'center', flex: 1 }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Powering the World's Best</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 60px auto', fontSize: '18px', lineHeight: 1.6 }}>
          Leading global enterprises trust Advera's engagement network to deliver their most critical messaging at scale.
        </p>

        <div className="glass-panel" style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#64748b', marginBottom: '48px', fontWeight: 'bold' }}>Trusted by Leading Global Brands</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '64px', alignItems: 'center', opacity: 0.8 }}>
             <h2 style={{ fontFamily: 'sans-serif', fontWeight: 900, margin: 0, fontSize: '32px', color: '#3b82f6' }}>TATA</h2>
             <h2 style={{ fontFamily: 'serif', fontWeight: 700, margin: 0, fontSize: '28px', letterSpacing: '1px' }}>accenture</h2>
             <a href="https://www.instagram.com/advera.in_?igsh=cWh2cTU4eGdhazV3" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                <Instagram size={32} color="#e1306c"/> 
                <span style={{ fontFamily: 'sans-serif', fontWeight: 600, fontSize: '28px' }}>Advera</span>
             </a>
             <a href="https://www.facebook.com/share/14ZR4bTpM6C/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                <Facebook size={32} color="#3b82f6"/> 
                <span style={{ fontFamily: 'sans-serif', fontWeight: 600, fontSize: '28px' }}>Advera</span>
             </a>
             <h2 style={{ fontFamily: 'sans-serif', fontWeight: 800, margin: 0, fontSize: '28px', color: '#10b981' }}>Pathlab</h2>
             <h2 style={{ fontFamily: 'sans-serif', fontWeight: 700, margin: 0, fontSize: '30px', color: '#f59e0b' }}>Cipla</h2>
             <h2 style={{ fontFamily: 'sans-serif', fontWeight: 900, margin: 0, fontSize: '28px', color: '#ef4444', fontStyle: 'italic' }}>Mankind</h2>
          </div>
        </div>
      </section>
      
      <footer id="company" style={{ padding: '40px 20px', textAlign: 'center', opacity: 0.6, fontSize: '14px' }}>
         <p>© 2026 Advera Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
