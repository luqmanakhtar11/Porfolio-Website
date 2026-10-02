// ✏️ Edit these two values to update the message
const RESTOCK_DATE = '10 Oct 2026';
const PROMO_CODE = 'HIREME';

function Message() {
  return (
    <span className="ticker-item">
      <strong>
      <span>Still putting the finishing touches on this site.</span>
      <span>
        New projects landing by <b>{RESTOCK_DATE}</b>.
      </span>
      <span className="ticker-dot" aria-hidden="true">●</span></strong>
    </span>
      
  );
}

export default function Ticker() {
  return (
    <div className="ticker-bar" role="status" aria-label="High demand alert">
      <style>{`
        .ticker-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: var(--ticker-h, 36px);
          z-index: 60;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: linear-gradient(90deg, #4F46E5, #9333EA, #C026D3);
          color: #fff;
          font-family: var(--f-sans);
          font-size: 12px;
          letter-spacing: 0.04em;
        }
        .ticker-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          animation: ticker-scroll 60s linear infinite;
          will-change: transform;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding-right: 48px;
        }
        .ticker-item strong { font-weight: 800; }
        .ticker-code {
          font-family: var(--f-mono);
          font-weight: 700;
          background: #111010;
          color: #F7F6F1;
          padding: 2px 8px;
          border-radius: 4px;
          letter-spacing: 0.08em;
        }
        .ticker-dot { font-size: 8px; opacity: 0.6; }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* 4 copies, animating -50% = seamless infinite loop on any screen width */}
      <div className="ticker-track">
        <Message /><Message /><Message /><Message />
      </div>
    </div>
  );
}