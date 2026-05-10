import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { Button } from '../ui/Button.js';
import { Bot, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zoo-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ZOO<span className="text-zoo-400">Automation</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-zoo-400' : 'text-dark-300 hover:text-white'}`}>Home</Link>
            <Link to="/services" className={`text-sm font-medium transition-colors ${isActive('/services') ? 'text-zoo-400' : 'text-dark-300 hover:text-white'}`}>Services</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-zoo-400' : 'text-dark-300 hover:text-white'}`}>Contact</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <span className="text-sm text-dark-400">{user?.name}</span>
                <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-dark-300" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark-800 border-t border-dark-700 px-4 py-4 space-y-3">
          <Link to="/" className="block text-dark-300 hover:text-white" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/services" className="block text-dark-300 hover:text-white" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link to="/contact" className="block text-dark-300 hover:text-white" onClick={() => setMobileOpen(false)}>Contact</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block text-dark-300 hover:text-white" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <Button variant="secondary" size="sm" onClick={() => { logout(); setMobileOpen(false); }}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-dark-300 hover:text-white" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)}>
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
