import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdComposer from './pages/AdComposer';
import Landing from './pages/Landing';
import Billing from './pages/Billing';
import Permissions from './pages/Permissions';

import Chatbot from './components/Chatbot';
import Growth from './pages/Growth';
import Brands from './pages/Brands';
import Tour from './pages/Tour';

import Presentation from './pages/Presentation';

function App() {
  return (
    <Router>
      <Toaster theme="dark" position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/composer" element={<AdComposer />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/permissions" element={<Permissions />} />

        <Route path="/growth" element={<Growth />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
