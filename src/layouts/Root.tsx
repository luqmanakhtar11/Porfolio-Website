import type { CSSProperties } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useTheme } from '../hooks/useTheme';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import Ticker from '../components/Ticker';

export default function Root() {
  const { dark, toggle } = useTheme();
  const { pathname } = useLocation();

  // The IraqPay case study provides its own sticky navigation bar,
  // so the global portfolio navbar is hidden on that route.
  const hideNav = pathname === '/work/amentum-onpoint' || pathname === '/work/iraq-pay' || pathname === '/resume' || pathname === '/work/cdm-cashpro';

  return (
    <div
      className={pathname === '/' ? 'glass-page' : undefined}
      style={{
        background: 'var(--bg)',
        color: 'var(--fg)',
        minHeight: '100svh',
        '--ticker-h': hideNav ? '0px' : '36px',
      } as CSSProperties}
    >
      <div className="hidden lg:block">
        <Cursor />
      </div>
      {!hideNav && <Ticker />}
      {!hideNav && <Nav dark={dark} onToggle={toggle} />}
      <Outlet />
      <Footer />
    </div>
  );
}