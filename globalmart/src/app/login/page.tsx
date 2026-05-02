'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useApp } from '@/context/AppContext';
import { COUNTRIES, Country } from '@/lib/mockData';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#C9A84C', '#A8A9AD', '#E8C96A', '#6B6C70'];
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsGuest, setSelectedCountry, user } = useApp();
  const [step, setStep] = useState<'login' | 'country'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [guestMode, setGuestMode] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');

  useEffect(() => {
    if (user) router.push('/homepage');
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter email and password'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login(email, password);
    setLoading(false);
    setStep('country');
  };

  const handleGuest = () => {
    loginAsGuest();
    setGuestMode(true);
    setStep('country');
  };

  const handleCountryConfirm = () => {
    const country = COUNTRIES.find(c => c.code === selectedCountryCode) || COUNTRIES[0];
    setSelectedCountry(country);
    router.push('/homepage');
  };

  const regions = Array.from(new Set(COUNTRIES.map(c => c.region)));

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
      <ParticleCanvas />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A8A9AD]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        {step === 'login' ? (
          <div className="glass-dark border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl animate-fade-in-up">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-2 mb-3">
                <AppLogo size={44} />
                <span className="font-black text-3xl tracking-tighter text-foreground">
                  Global<span className="gold-text">Mart</span>
                </span>
              </div>
              <p className="text-sm text-[#6B6B6B] text-center">Premium global marketplace</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-[#A8A9AD]">
                <Icon name="GlobeAltIcon" size={12} />
                <span>20 Countries · 4000+ Products · Free Shipping</span>
              </div>
            </div>

            {/* Rotating Badge */}
            <div className="absolute top-6 right-6 pointer-events-none">
              <div className="relative w-16 h-16">
                <svg className="animate-rotate-badge w-full h-full" viewBox="0 0 100 100">
                  <path id="loginCirclePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text fontSize="9" fontFamily="DM Sans" fontWeight="700" letterSpacing="3px" fill="#C9A84C">
                    <textPath href="#loginCirclePath" startOffset="0%">GLOBAL · SHOP · NOW ·</textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="GlobeAltIcon" size={16} className="text-[#C9A84C]" />
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#A8A9AD] uppercase tracking-wider block mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-foreground placeholder-[#3A3A3A] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#A8A9AD] uppercase tracking-wider block mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-foreground placeholder-[#3A3A3A] focus:outline-none focus:border-[#C9A84C] transition-colors pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#A8A9AD] transition-colors">
                    <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-400 bg-red-900/20 border border-red-900/30 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3.5 rounded-xl font-black text-sm uppercase tracking-wider disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Icon name="ArrowRightOnRectangleIcon" size={16} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2A2A2A]" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-transparent text-xs text-[#6B6B6B]">or</span>
              </div>
            </div>

            <button
              onClick={handleGuest}
              className="w-full btn-ghost py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <Icon name="UserIcon" size={16} />
              Continue as Guest
            </button>

            <p className="text-center text-xs text-[#6B6B6B] mt-4">
              No account needed for guest browsing
            </p>
          </div>
        ) : (
          /* Country Selection Step */
          <div className="glass-dark border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="GlobeAltIcon" size={20} className="text-[#C9A84C]" />
                <h2 className="text-lg font-black text-foreground">Choose Your Country</h2>
              </div>
              <p className="text-xs text-[#6B6B6B]">Products will show prices in your local currency</p>
              {guestMode && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-[#A8A9AD]/20 text-[#A8A9AD] text-[10px] font-bold rounded-full uppercase">Guest Mode</span>
              )}
            </div>
            <div className="overflow-y-auto max-h-[55vh] p-4 scrollbar-thin">
              {regions.map(region => (
                <div key={region} className="mb-4">
                  <div className="text-[10px] font-black text-[#C9A84C] uppercase tracking-widest mb-2">{region}</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {COUNTRIES.filter(c => c.region === region).map((country: Country) => (
                      <button
                        key={country.code}
                        onClick={() => setSelectedCountryCode(country.code)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left ${
                          selectedCountryCode === country.code
                            ? 'border-[#C9A84C] bg-[#C9A84C]/10'
                            : 'border-[#2A2A2A] hover:border-[#C9A84C]/30 hover:bg-white/3'
                        }`}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-foreground truncate">{country.name}</div>
                          <div className="text-[10px] text-[#6B6B6B]">{country.currencySymbol} {country.currency}</div>
                        </div>
                        {selectedCountryCode === country.code && (
                          <Icon name="CheckCircleIcon" size={12} className="ml-auto text-[#C9A84C] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#2A2A2A]">
              <button
                onClick={handleCountryConfirm}
                className="w-full btn-gold py-3.5 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>{COUNTRIES.find(c => c.code === selectedCountryCode)?.flag}</span>
                Start Shopping in {COUNTRIES.find(c => c.code === selectedCountryCode)?.name}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}