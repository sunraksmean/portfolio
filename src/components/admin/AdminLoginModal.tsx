// src/components/admin/AdminLoginModal.tsx
import { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({ onClose, onSuccess }: AdminLoginModalProps) {
  const { login } = useAuth();
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState('');
  const [shake, setShake]         = useState(false);
  const [loading, setLoading]     = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    // Small artificial delay for UX
    await new Promise(r => setTimeout(r, 400));
    setLoading(false);

    const ok = login(password);
    if (ok) {
      onSuccess();
      onClose();
    } else {
      setError('Incorrect password. Try again.');
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          animation: 'fadeIn 0.2s ease',
        }}
      >
        {/* Modal card */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            width: '100%',
            maxWidth: 400,
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            animation: shake ? 'shake 0.4s ease' : 'slideUp 0.3s ease',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute' as const,
              top: '1rem', right: '1rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '0.4rem',
            }}
          >
            <X size={18} />
          </button>

          {/* Icon */}
          <div style={{
            width: 56, height: 56,
            borderRadius: '1rem',
            background: 'var(--accent-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 8px 24px var(--accent-glow)',
          }}>
            <Lock size={24} color="#fff" />
          </div>

          <h2 style={{
            textAlign: 'center',
            fontWeight: 800,
            fontSize: '1.3rem',
            color: 'var(--text-primary)',
            marginBottom: '0.35rem',
          }}>
            Admin Access
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            marginBottom: '1.75rem',
            fontWeight: 300,
          }}>
            Enter your password to enable edit mode
          </p>

          <form onSubmit={handleSubmit}>
            {/* Password field */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input
                ref={inputRef}
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Password"
                className="form-input"
                style={{
                  paddingRight: '2.75rem',
                  borderColor: error ? '#ef4444' : undefined,
                  boxShadow: error ? '0 0 0 3px rgba(239,68,68,0.15)' : undefined,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  color: 'var(--text-muted)', cursor: 'pointer',
                  padding: 0, display: 'flex',
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p style={{
                color: '#ef4444',
                fontSize: '0.8rem',
                marginBottom: '0.75rem',
                textAlign: 'center',
                animation: 'fadeIn 0.2s ease',
              }}>
                {error}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !password.trim()}
              style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: 16, height: 16,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                    display: 'inline-block',
                  }} />
                  Verifying...
                </span>
              ) : (
                <><ShieldCheck size={16} /> Unlock Edit Mode</>
              )}
            </button>


          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes spin    { to { transform: rotate(360deg) } }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }
      `}</style>
    </>
  );
}
