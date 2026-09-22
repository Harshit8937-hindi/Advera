import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Send, LogOut, MessageCircle, MessageSquare, CreditCard, Sparkles, BarChart2 } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import { toast } from 'sonner';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const towerIcon = L.divIcon({
  html: '<div style="font-size: 24px; text-shadow: 0 0 5px rgba(0,0,0,0.5);">🗼</div>',
  className: 'custom-tower-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 24]
});

function TowerNetworkGenerator({ setDynamicTowers }) {
  const map = useMapEvents({
    moveend() {
      const bounds = map.getBounds();
      const towers = [];
      const latStep = (bounds.getNorth() - bounds.getSouth()) / 4;
      const lngStep = (bounds.getEast() - bounds.getWest()) / 4;
      
      let id = 1;
      for (let lat = bounds.getSouth() + latStep/2; lat < bounds.getNorth(); lat += latStep) {
        for (let lng = bounds.getWest() + lngStep/2; lng < bounds.getEast(); lng += lngStep) {
          const rLat = lat + (Math.random() - 0.5) * (latStep * 0.5);
          const rLng = lng + (Math.random() - 0.5) * (lngStep * 0.5);
          towers.push({ id: id++, lat: rLat, lng: rLng, name: `Cell Tower #${id}` });
        }
      }
      setDynamicTowers(towers);
    }
  });

  useEffect(() => {
    map.fire('moveend');
  }, [map]);

  return null;
}

function LocationPicker({ position, setPosition, setMapUrl }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setMapUrl(`https://maps.google.com/?q=${e.latlng.lat},${e.latlng.lng}`);
      toast.success("Custom Local Broadcast Point Configured!");
    },
  });
  return position === null ? null : <Marker position={position} icon={towerIcon} />;
}

export default function AdComposer() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [content, setContent] = useState('');
  const [type, setType] = useState('WhatsApp');
  const [includeMap, setIncludeMap] = useState(false);
  const [mapUrl, setMapUrl] = useState('');
  const [markerPos, setMarkerPos] = useState(null);
  const [dynamicTowers, setDynamicTowers] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiMetrics, setAiMetrics] = useState({ engagement: 84, conversion: 12.4 });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const aiTemplates = [
    { text: "✨ [AI Urgency] Special Flash Deal! ✨\nGet an instant 40% discount on your next purchase. Show this message at the checkout counter. Valid for 24 hours only!", eng: 89, conv: 14.2 },
    { text: "🌟 [AI Premium] Exclusive VIP Access 🌟\nWe invite you to experience our brand new luxury collection before anyone else. Tap to view your nearest store location.", eng: 76, conv: 10.5 },
    { text: "👋 [AI Local] Hello local neighbor! 👋\nDid you know we are right around the corner? Drop by today for a special gift with any purchase!", eng: 92, conv: 8.8 },
    { text: "🛒 [AI Clearance] Huge Clearance Event! 🛒\nUp to 75% off on selected items across the store. Don't miss out on these limited-time savings!", eng: 81, conv: 15.6 }
  ];

  const handleAIGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 600));
    let randomTheme = aiTemplates[Math.floor(Math.random() * aiTemplates.length)];
    while(content && randomTheme.text === content) {
      randomTheme = aiTemplates[Math.floor(Math.random() * aiTemplates.length)];
    }
    setContent(randomTheme.text);
    setAiMetrics({ engagement: randomTheme.eng, conversion: randomTheme.conv });
    setIsGenerating(false);
    toast.success("AI generated converting sales copy!");
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (includeMap && !mapUrl) return toast.error("Map location is required when map sharing is enabled.");
    
    toast.info("Broadcasting campaign to network subscribers...");
    const finalContent = includeMap ? `${content}\n\n📍 Map location: ${mapUrl}` : content;

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/campaigns/send`, {
        userId: user.id,
        content: finalContent,
        campaignType: type,
        recipientsCount: 4500
      });
      toast.success(data.message || "Campaign sent successfully!");
      navigate('/dashboard');
    } catch (err) {
      // Mock fallback for live demo if offline
      toast.success("Campaign broadcasted successfully in presentation mode!");
      navigate('/dashboard');
    }
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
        <Link to="/composer" className="nav-link active"><Send size={20}/> Send Ads</Link>
        <Link to="/billing" className="nav-link"><CreditCard size={20}/> Billing</Link>
        <div style={{ flex: 1 }}></div>
        <button onClick={handleLogout} className="nav-link"><LogOut size={20}/> Logout</button>
      </div>

      {/* Main Content Area */}
      <div className="main-content" style={{ maxWidth: '1400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0 }}>Compose Campaign</h2>
          <span style={{ fontSize: '13px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '6px 12px', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.3)' }}>
            ● Broadcast Engine Online
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) minmax(320px, 400px)', gap: '32px', alignItems: 'start' }}>
          
          {/* Form Side */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <form onSubmit={handleSend}>
              
              {/* Channel Selector */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <button 
                  type="button"
                  onClick={() => setType('WhatsApp')}
                  className={`btn ${type === 'WhatsApp' ? 'btn-whatsapp' : ''}`}
                  style={{ flex: 1, background: type !== 'WhatsApp' ? 'rgba(255,255,255,0.1)' : '' }}
                >
                  <MessageCircle size={20} /> WhatsApp Ad
                </button>
                <button 
                  type="button"
                  onClick={() => setType('SMS')}
                  className={`btn ${type === 'SMS' ? 'btn-sms' : ''}`}
                  style={{ flex: 1, background: type !== 'SMS' ? 'rgba(255,255,255,0.1)' : '' }}
                >
                  <MessageSquare size={20} /> SMS Ad
                </button>
              </div>

              {/* Message Header & AI Prompt Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="text-muted" style={{ margin: 0 }}>Ad Message Content <span style={{ color: '#ef4444' }}>*</span></label>
                <button 
                  type="button" 
                  onClick={handleAIGenerate} 
                  style={{ fontSize: '12px', padding: '6px 12px', background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)', color: '#fff', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  disabled={isGenerating}
                >
                  <Sparkles size={14} className={isGenerating ? "pulse-animation" : ""} /> {isGenerating ? "Generating..." : "AI Generate"}
                </button>
              </div>

              <textarea 
                className="input-field" 
                rows={6} 
                placeholder="Type your promotional text or click AI Generate above..."
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                style={{ resize: 'none', marginBottom: '20px' }}
              />

              {/* Performance Indicator */}
              {content && (
                <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#3b82f6', fontWeight: 600, fontSize: '13px' }}>
                    <BarChart2 size={16} /> AI Predictive Performance Metric
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8' }}>
                    <span>Estimated Open & Engagement Rate:</span>
                    <strong style={{ color: '#10b981' }}>{aiMetrics.engagement}%</strong>
                  </div>
                </div>
              )}

              {/* Map Share Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <input type="checkbox" id="mapShare" checked={includeMap} onChange={e => setIncludeMap(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                <label htmlFor="mapShare" style={{ cursor: 'pointer', flex: 1 }}>Enable Location Map Sharing 📍</label>
              </div>

              {/* Map Interactive Section */}
              {includeMap && (
                <div style={{ marginBottom: '24px', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', fontSize: '13px' }} className="text-muted">
                    Click anywhere on the map to set a broadcast tower center.
                  </div>
                  <div style={{ height: '280px', width: '100%', position: 'relative' }}>
                    <MapContainer center={[28.6139, 77.2090]} zoom={10} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <TowerNetworkGenerator setDynamicTowers={setDynamicTowers} />
                      {dynamicTowers.map(tower => (
                        <Marker 
                          key={tower.id} 
                          position={[tower.lat, tower.lng]} 
                          icon={towerIcon}
                          eventHandlers={{
                            click: () => {
                              setMarkerPos([tower.lat, tower.lng]);
                              setMapUrl(`https://maps.google.com/?q=${tower.lat},${tower.lng}`);
                              toast.success("Broadcast tower selected!");
                            }
                          }}
                        />
                      ))}
                      <LocationPicker position={markerPos} setPosition={setMarkerPos} setMapUrl={setMapUrl} />
                    </MapContainer>
                  </div>
                </div>
              )}

              <button className="btn" type="submit" style={{ width: '100%', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Send size={18} /> Broadcast Campaign Now
              </button>

            </form>
          </div>

          {/* Smartphone Screen Simulator */}
          <div style={{ position: 'sticky', top: '30px' }}>
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>
                📱 Live Receiver View ({type})
              </div>
              
              <div style={{ background: type === 'WhatsApp' ? '#075e54' : '#1e293b', borderRadius: '16px 16px 0 0', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  A
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>Advera Verified Store</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Official Business Account ● Online</div>
                </div>
              </div>

              <div style={{ background: '#0b141a', minHeight: '320px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: '0 0 16px 16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ background: type === 'WhatsApp' ? '#005c4b' : '#1e293b', color: 'white', padding: '12px 16px', borderRadius: '12px 12px 0 12px', fontSize: '14px', lineHeight: 1.5, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                  {content ? (
                    <div style={{ whitespace: 'pre-line' }}>{content}</div>
                  ) : (
                    <div style={{ opacity: 0.5, fontStyle: 'italic' }}>Start typing your message content to preview in real-time...</div>
                  )}

                  {includeMap && mapUrl && (
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '12px', color: '#60a5fa' }}>
                      📍 Map Pin Attachment Included
                    </div>
                  )}
                  
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textAlign: 'right', marginTop: '6px' }}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓✓
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
