import React from 'react';

interface EkaatraLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EkaatraLogo: React.FC<EkaatraLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  size = 'md',
}) => {
  const isLight = theme === 'light';
  const goldColor = '#C5A880';
  const textColor = isLight ? '#FAF8F5' : '#1C1917';
  const subColor = isLight ? '#D9AA82' : '#8C7355';

  // SVG Emblem matching Screenshot 2026-10-06 222135.png
  const renderEmblem = (emblemSize: number = 48) => (
    <svg
      width={emblemSize}
      height={emblemSize}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* 8 Intertwined Petal Loops */}
      <g stroke={goldColor} strokeWidth="2.5" fill="none" opacity="0.95">
        <path d="M60 15 C75 15, 88 28, 88 45 C88 58, 78 70, 60 85 C42 70, 32 58, 32 45 C32 28, 45 15, 60 15 Z" />
        <path d="M60 105 C75 105, 88 92, 88 75 C88 62, 78 50, 60 35 C42 50, 32 62, 32 75 C32 92, 45 105, 60 105 Z" />
        <path d="M15 60 C15 75, 28 88, 45 88 C58 88, 70 78, 85 60 C70 42, 58 32, 45 32 C28 32, 15 45, 15 60 Z" />
        <path d="M105 60 C105 75, 92 88, 75 88 C62 88, 50 78, 35 60 C50 42, 62 32, 75 32 C92 32, 105 45, 105 60 Z" />
        {/* Diagonal Petals */}
        <path d="M28 28 C38 18, 55 22, 65 35 C75 48, 78 62, 85 85 C62 78, 48 75, 35 65 C22 55, 18 38, 28 28 Z" opacity="0.6" />
        <path d="M92 92 C82 102, 65 98, 55 85 C45 72, 42 58, 35 35 C58 42, 72 45, 85 55 C98 65, 102 82, 92 92 Z" opacity="0.6" />
        <path d="M92 28 C102 38, 98 55, 85 65 C72 75, 58 78, 35 85 C42 62, 45 48, 55 35 C65 22, 82 18, 92 28 Z" opacity="0.6" />
        <path d="M28 92 C18 82, 22 65, 35 55 C48 45, 62 42, 85 35 C78 58, 75 72, 65 85 C55 98, 38 102, 28 92 Z" opacity="0.6" />
      </g>
      {/* Central Inner Ring */}
      <circle cx="60" cy="60" r="28" stroke={goldColor} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
      <circle cx="60" cy="60" r="22" stroke={goldColor} strokeWidth="1" opacity="0.5" />
      {/* Central 'E' Monogram in Serif */}
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="30"
        fontWeight="600"
        fill={goldColor}
      >
        E
      </text>
    </svg>
  );

  if (variant === 'mark') {
    const s = size === 'sm' ? 32 : size === 'lg' ? 64 : size === 'xl' ? 84 : 44;
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderEmblem(s)}</div>;
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {renderEmblem(size === 'sm' ? 32 : 40)}
        <div className="flex flex-col">
          <span
            className="font-serif tracking-[0.25em] font-medium leading-none"
            style={{ color: textColor, fontSize: size === 'sm' ? '15px' : '18px' }}
          >
            EKAATRA
          </span>
          <span
            className="text-[9px] tracking-[0.25em] uppercase font-sans mt-0.5"
            style={{ color: subColor }}
          >
            By PEM · Jaipur
          </span>
        </div>
      </div>
    );
  }

  // Full Brand Lockup as shown in Screenshot 2026-10-06 222135.png
  const emblemDim = size === 'sm' ? 44 : size === 'lg' ? 72 : size === 'xl' ? 96 : 56;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : size === 'xl' ? 'text-4xl' : 'text-2xl';

  return (
    <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
      {renderEmblem(emblemDim)}
      
      {/* Brand Title: E K A A T R A */}
      <h2
        className={`font-serif tracking-[0.3em] font-medium mt-3 ${titleSize}`}
        style={{ color: textColor }}
      >
        EKAATRA
      </h2>

      {/* Sub-brand: — BY PEM — */}
      <div className="flex items-center gap-2 mt-1 w-full justify-center">
        <span className="w-6 sm:w-8 h-[1px]" style={{ backgroundColor: goldColor }} />
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-medium"
          style={{ color: subColor }}
        >
          BY PEM
        </span>
        <span className="w-6 sm:w-8 h-[1px]" style={{ backgroundColor: goldColor }} />
      </div>

      {/* Location: J A I P U R */}
      <span
        className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-sans mt-0.5"
        style={{ color: textColor, opacity: 0.8 }}
      >
        JAIPUR
      </span>
    </div>
  );
};
