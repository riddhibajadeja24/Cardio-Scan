import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X, Activity } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Prediction', path: '/prediction' },
    { label: 'Data Insights', path: '/data-insights' },
    { label: 'Model Info', path: '/model-info' },
    { label: 'Disclaimer', path: '/disclaimer' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B132B]/90 border-b border-[#5BC0BE]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* CardioScan Logo */}
        <NavLink 
          to="/dashboard" 
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-[#5BC0BE]/15 border border-[#5BC0BE]/40 flex items-center justify-center text-[#6FFFE9] group-hover:scale-105 group-hover:bg-[#5BC0BE]/25 group-hover:border-[#6FFFE9] transition-all shadow-sm shadow-[#5BC0BE]/20">
            <Activity className="w-5 h-5 animate-heartbeat text-[#6FFFE9]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white flex items-center leading-none">
              Cardio<span className="text-[#6FFFE9]">Scan</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider text-[#5BC0BE] uppercase mt-0.5">
              ML Classification
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: active }) => {
                  const activeState = active || (item.path === '/dashboard' && location.pathname === '/');
                  return `px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
                    activeState
                      ? 'bg-[#1C2541] text-[#6FFFE9] border border-[#5BC0BE]/50 shadow-md shadow-[#5BC0BE]/15'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1C2541]/50'
                  }`;
                }}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Action Badge */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5BC0BE]/10 border border-[#5BC0BE]/30 text-[#6FFFE9] text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6FFFE9] animate-pulse"></span>
            ML Model Ready
          </span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#1C2541] border border-[#5BC0BE]/30 text-[#6FFFE9] hover:bg-[#3A506B]/30 focus:outline-none transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1C2541] border-b border-[#5BC0BE]/30 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#3A506B]/40 text-[#6FFFE9] border border-[#5BC0BE]/50 shadow-sm'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#3A506B]/20'
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
}
