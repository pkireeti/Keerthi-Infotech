import React from 'react';

interface KeerthiLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'badge';
  height?: number | string;
}

export const KeerthiLogo: React.FC<KeerthiLogoProps> = ({
  className = '',
  variant = 'full',
  height,
}) => {
  if (variant === 'badge') {
    return (
      <div
        className={`relative inline-flex items-center bg-[#ffffff] rounded-2xl px-4 py-2 border border-[#c0c7d1]/60 shadow-xs overflow-hidden ${className}`}
        style={height ? { height } : undefined}
      >
        <svg
          viewBox="0 0 540 126"
          className="h-full w-auto max-h-14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Emblem */}
          <g transform="translate(6, 4)">
            <path
              d="M 12 14 L 72 14 L 72 26 L 54 26 L 54 92 L 72 92 L 72 104 L 12 104 L 12 92 L 30 92 L 30 26 L 12 26 Z"
              fill="#3a3d42"
            />
            <circle cx="94" cy="22" r="11.5" fill="#3a3d42" />
            <polygon points="52,48 76,24 94,36 68,64" fill="#38a124" />
            <polygon points="62,60 98,104 116,104 116,112 88,112 52,72" fill="#38a124" />
          </g>

          {/* Typography */}
          <g transform="translate(136, 0)">
            <text
              x="0"
              y="44"
              fontFamily="'Times New Roman', Georgia, serif"
              fontWeight="900"
              fontSize="39"
              fill="#0a2550"
              letterSpacing="1"
            >
              KEERTHI
            </text>
            <text
              x="184"
              y="44"
              fontFamily="Arial, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="39"
              fill="#38a124"
              letterSpacing="0.5"
            >
              INFOTECH
            </text>

            <g transform="translate(192, 68)">
              <line x1="-188" y1="-5" x2="-164" y2="-5" stroke="#0a2550" strokeWidth="2.5" strokeLinecap="round" />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontWeight="700"
                fontSize="16"
                fill="#0a2550"
                letterSpacing="3.5"
              >
                COMPUTER EDUCATION
              </text>
              <line x1="164" y1="-5" x2="188" y2="-5" stroke="#0a2550" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            <text
              x="192"
              y="88"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              fontWeight="700"
              fontSize="12"
              fill="#0a2550"
              letterSpacing="1.2"
            >
              EMPOWERING MINDS. BUILDING FUTURES.
            </text>

            <g transform="translate(192, 112)">
              <line x1="-192" y1="-5" x2="-68" y2="-5" stroke="#38a124" strokeWidth="2" strokeLinecap="round" />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontWeight="800"
                fontSize="14.5"
                fill="#38a124"
                letterSpacing="2"
              >
                SINCE 1999
              </text>
              <line x1="68" y1="-5" x2="192" y2="-5" stroke="#38a124" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </svg>

        {/* Bottom-right authentic plaque swoop decorative corner */}
        <div className="absolute right-0 bottom-0 w-8 h-8 pointer-events-none overflow-hidden">
          <div className="absolute -right-3 -bottom-3 w-8 h-8 rounded-full border-2 border-[#f59e0b]"></div>
          <div className="absolute -right-2 -bottom-2 w-6 h-6 rounded-full bg-[#0a2550]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`} style={height ? { height } : undefined}>
      <svg
        viewBox="0 0 540 126"
        className="h-full w-auto max-h-16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Keerthi Infotech Computer Education Logo"
      >
        {/* Emblem */}
        <g transform="translate(6, 4)">
          <path
            d="M 12 14 L 72 14 L 72 26 L 54 26 L 54 92 L 72 92 L 72 104 L 12 104 L 12 92 L 30 92 L 30 26 L 12 26 Z"
            fill="#3a3d42"
          />
          <circle cx="94" cy="22" r="11.5" fill="#3a3d42" />
          <polygon points="52,48 76,24 94,36 68,64" fill="#38a124" />
          <polygon points="62,60 98,104 116,104 116,112 88,112 52,72" fill="#38a124" />
        </g>

        {/* Typography */}
        <g transform="translate(136, 0)">
          <text
            x="0"
            y="44"
            fontFamily="'Times New Roman', Georgia, serif"
            fontWeight="900"
            fontSize="39"
            fill="#0a2550"
            letterSpacing="1"
          >
            KEERTHI
          </text>
          <text
            x="184"
            y="44"
            fontFamily="Arial, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="39"
            fill="#38a124"
            letterSpacing="0.5"
          >
            INFOTECH
          </text>

          <g transform="translate(192, 68)">
            <line x1="-188" y1="-5" x2="-164" y2="-5" stroke="#0a2550" strokeWidth="2.5" strokeLinecap="round" />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              fontWeight="700"
              fontSize="16"
              fill="#0a2550"
              letterSpacing="3.5"
            >
              COMPUTER EDUCATION
            </text>
            <line x1="164" y1="-5" x2="188" y2="-5" stroke="#0a2550" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          <text
            x="192"
            y="88"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontWeight="700"
            fontSize="12"
            fill="#0a2550"
            letterSpacing="1.2"
          >
            EMPOWERING MINDS. BUILDING FUTURES.
          </text>

          <g transform="translate(192, 112)">
            <line x1="-192" y1="-5" x2="-68" y2="-5" stroke="#38a124" strokeWidth="2" strokeLinecap="round" />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              fontWeight="800"
              fontSize="14.5"
              fill="#38a124"
              letterSpacing="2"
            >
              SINCE 1999
            </text>
            <line x1="68" y1="-5" x2="192" y2="-5" stroke="#38a124" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
};
