export function IndonesiaFlagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#fff" />
      <path d="M0 10a10 10 0 0 1 20 0z" fill="#e2101b" />
    </svg>
  );
}

export function TopupNavIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="6" width="19" height="13" rx="3.5" />
      <path d="M2.5 10.5h19" />
      <circle cx="17.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TransaksiNavIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 2.5h12v19l-2.2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21.5z" />
      <path d="M9 8h6M9 12h6M9 16h3.5" />
    </svg>
  );
}

export function LeaderboardNavIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 21V13M12 21V5M20 21v-9" />
      <path d="M2.5 21h19" />
    </svg>
  );
}

export function KalkulatorNavIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3v4M4 7h16" />
      <path d="M4 7l2.5 6a2.5 2.5 0 0 0 5 0L14 7M14 7l2.5 6a2.5 2.5 0 0 0 5 0L19 7" />
      <path d="M2.5 21h19" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="3.5" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" stroke="#fff" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1.1" fill="#fff" />
    </svg>
  );
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#111" />
      <path
        d="M15.6 6.2c.4 1.3 1.3 2.2 2.7 2.4v1.9c-.9 0-1.8-.3-2.7-.8v4.6a4 4 0 1 1-3.5-4v1.9a2.1 2.1 0 1 0 1.6 2v-8h1.9z"
        fill="#fff"
      />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#ff0000" />
      <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#fff" />
    </svg>
  );
}
