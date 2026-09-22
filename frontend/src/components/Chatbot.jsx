import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 I'm your Advera AI assistant. How can I help you grow your business today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMessage = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setMessages(prev => [...prev, { id: 'typing', text: "Responding you soon...", sender: 'bot' }]);

    const performFallback = () => {
      const lower = userText.toLowerCase();
      let botReply = "I'm sorry, I didn't quite catch that. Try asking me about our features, how to send an ad, pricing, or tower targeting!";
      if (lower.match(/register|login|loggin|log in|signup|sign in|join|create|account/)) {
        botReply = "To get started with Advera, simply click the 'Get Started' or 'Login' button at the top of the page! \n\n🔒 We use a highly secure, Passwordless B2B Authentication gateway. You can securely log in using your registered Mobile Number (OTP) or your native Google Account single sign-on. Plus, registering gives you 5 FREE broadcast credits to test the platform!";
      } else if (lower.match(/how|step|guide|tutorial/) && !lower.match(/login|loggin|auth/)) {
        botReply = "Running a campaign takes just 3 steps:\n1. Target: Go to the 'Audience' tab to sync your contacts or pick a location.\n2. Generate: Use our AI in the 'Send Ads' tool to write your copy.\n3. Broadcast: Hit send, and your message delivers instantly!";
      } else if (lower.match(/company|about|who|advera|work|run|operated/)) {
        botReply = "Advera is the #1 Enterprise-Grade Conversational Engagement Platform! 🚀 \n\nWe provide businesses with a unified API to automatically route bulk marketing and support messages across WhatsApp, SMS, RCS, and Email. We operate via high-throughput verified telecom gateways to ensure your messages arrive in blazing fast time without drop-offs.";
      } else if (lower.match(/feature|what can you do|what does this|about/)) {
        botReply = "Advera is a powerful marketing platform! Our top features include:\n• 🗼 Network Tower Geofencing: Target audiences locally using our interactive map.\n• ✨ AI Ad Generator: Automatically crafts high-converting ad copy for live sales.\n• ⚡ Flash Broadcasts: Deliver your SMS/WhatsApp ads instantly.\n• 👥 Audience CRM: Sync and segment your VIPs and Leads effortlessly.";
      } else if (lower.match(/price|cost|billing|pay|credit/)) {
        botReply = "Our platform is incredibly affordable and runs on a simple credit system! \n\n🎁 You get 5 free broadcast credits instantly just for registering! \n💳 Once you run out, you can securely top up your balance in the Billing section. We offer a standard 'Starter' plan at ₹75 for 75 messages, and a 'Normal' plan at ₹750 for 1000 messages via secure gateway (UPI, Card, Paytm).";
      } else if (lower.match(/how|step|guide|tutorial/)) {
        botReply = "Running a campaign takes just 3 steps:\n1. Target: Go to the 'Audience' tab to sync your contacts or pick a location.\n2. Generate: Use our AI in the 'Send Ads' tool to write your copy.\n3. Broadcast: Hit send, and your message delivers instantly!";
      } else if (lower.match(/tower|map|location|geofence|pin code/)) {
        botReply = "With our Interactive Tower Map, you can view and select telecom towers in your area. By placing a pin on the map, your ads are geofenced to users connected to that specific network tower, maximizing local relevance.";
      } else if (lower.match(/ai|generate|sparkle|copy/)) {
        botReply = "Our AI Ad Generator is built into the Composer! Just click the '✨ AI Generate' button, and it will dynamically cycle through different high-converting promotional themes (like Urgent Sales, Clearance, or VIP drops) and provide predictive engagement graphs!";
      } else if (lower.match(/hello|hi|hey|greetings/)) {
        botReply = "Hello! 👋 I'm your Advera AI. I can guide you through our features, pricing, and how to launch your first ad campaign. What would you like to know?";
      } else if (lower.match(/contact|audience|sync|people/)) {
        botReply = "You can seamlessly import your device contacts in the Audience tab. We even categorize them into VIPs, Leads, and Customers so you can target your broadcasts effectively.";
      } else if (lower.match(/live sale|promo|flash deal/)) {
        botReply = "Planning a Live Sale? Great! Our Ad Composer has Quick Templates specifically designed for Live Sales and Product Drops to get your audience's attention instantly.";
      } else if (lower.match(/thank/)) {
        botReply = "You're very welcome! If you need anything else to supercharge your marketing, I'm right here.";
      }

      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== 'typing'));
        setMessages(prev => [...prev, { id: Date.now() + 1, text: botReply, sender: 'bot' }]);
      }, 10);
    };

    let apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY');
    
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      try {
        apiKey = prompt("Please enter your Gemini API Key. (Click Cancel or leave blank to use the offline interactive guide instead)");
        if (apiKey) localStorage.setItem('GEMINI_API_KEY', apiKey);
      } catch(e) {}
    }

    if (!apiKey) {
      return performFallback();
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt = `You are a highly advanced AI Assistant for the 'Advera' platform. Help the user with their queries. Act smart, concise, and helpful. 
      Advera is the premier Enterprise Conversational Engagement Platform. Users can Login/Register passwordlessly using Google Auth or Mobile SMS OTP. 
      Pricing: Users get 5 free credits on signup. Top-up plans are Starter (₹75 for 75 msgs) and Normal (₹750 for 1000 msgs).
      Advera features: Omnichannel API (WhatsApp, SMS, RCS), Network Tower Geofencing for local targeting, AI Ad copy generation, and Instant Flash Delivery.
      The user says: "${userText}"`;

      const result = await model.generateContent(systemPrompt);
      const botText = result.response.text();

      setMessages(prev => prev.filter(m => m.id !== 'typing'));
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
    } catch (err) {
      console.error(err);
      performFallback();
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', width: '60px', height: '60px',
          borderRadius: '30px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
          zIndex: 9999, transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'scale(0)' : 'scale(1)'
        }}
      >
        <MessageSquare size={28} color="white" />
      </div>

      <div style={{
        position: 'fixed', bottom: '24px', right: '24px', width: '350px', height: '500px',
        maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100vh - 48px)',
        background: '#18181b', border: '1px solid #3f3f46', borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 10000,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s',
        transformOrigin: 'bottom right',
        transform: isOpen ? 'scale(1)' : 'scale(0)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}>
        <div style={{ padding: '16px', background: 'linear-gradient(135deg, #2e1065, #1e3a8a)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={20} color="#8b5cf6" />
            </div>
            <div>
              <h4 style={{ margin: 0, color: 'white' }}>Advera Assistant</h4>
              <p style={{ margin: 0, fontSize: '11px', color: '#10b981' }}>● Online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}>
             <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#09090b' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', gap: '8px', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              {msg.sender === 'bot' && <div style={{ minWidth: '24px', height: '24px', borderRadius: '12px', background: '#3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}><Bot size={14} color="white" /></div>}
              <div style={{ 
                padding: '12px 16px', 
                borderRadius: '16px', 
                borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderTopLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : '#27272a',
                color: 'white',
                fontSize: '14px',
                lineHeight: '1.5',
                border: msg.sender === 'bot' ? '1px solid #3f3f46' : 'none',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', padding: '12px', background: '#18181b', borderTop: '1px solid #3f3f46', gap: '8px' }}>
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1, background: '#27272a', border: '1px solid #3f3f46', borderRadius: '24px', padding: '8px 16px', color: 'white', outline: 'none' }}
          />
          <button type="submit" style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#3b82f6', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
            <Send size={18} style={{ marginLeft: '-2px' }} />
          </button>
        </form>
      </div>
    </>
  );
}
