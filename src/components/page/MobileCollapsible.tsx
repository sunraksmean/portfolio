import { useState, useEffect, ReactNode } from 'react';

interface MobileCollapsibleProps {
  title: string;
  children: ReactNode;
}

export default function MobileCollapsible({ title, children }: MobileCollapsibleProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [open, setOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = () => setOpen(!open);

  return (
    <section className="mobile-collapsible">
      {isMobile && (
        <button
          className="mobile-toggle"
          onClick={toggle}
          style={{
            display: 'block',
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            background: 'var(--accent-gradient)',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          {open ? `Hide ${title}` : `Show ${title}`}
        </button>
      )}
      {open && children}
    </section>
  );
}
