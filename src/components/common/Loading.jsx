import { Loader2 } from 'lucide-react';

export default function Loading({ 
  size = 'md',
  fullScreen = false,
  text = 'Loading...',
  overlay = false
}) {
  // Size configurations
  const sizes = {
    sm: { logo: 'w-10 h-10', fontSize: 'text-base', dot: 'w-1.5 h-1.5', orbit: '28px', text: 'text-sm' },
    md: { logo: 'w-14 h-14', fontSize: 'text-xl', dot: 'w-2 h-2', orbit: '35px', text: 'text-base' },
    lg: { logo: 'w-16 h-16', fontSize: 'text-2xl', dot: 'w-2.5 h-2.5', orbit: '40px', text: 'text-lg' }
  };

  const currentSize = sizes[size];

  // Main UMKMVerse Loader
  const UMKMVerseLoader = () => (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-24 h-24">
        {/* Rotating Circles */}
        <div className="absolute inset-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 border-4 border-transparent rounded-full"
              style={{
                borderTopColor: ['#3B82F6', '#60A5FA', '#93C5FD'][i],
                animation: 'spin 2s linear infinite',
                animationDelay: `${i * 0.2}s`,
                transform: `scale(${1 - i * 0.2})`
              }}
            />
          ))}
        </div>

        {/* Center Pulsing Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-lg shadow-blue-500/50" />
        </div>

        {/* Orbiting Particles */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1"
            style={{
              animation: 'orbit-smooth 3s ease-in-out infinite',
              animationDelay: `${i * 0.25}s`
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow" />
          </div>
        ))}
      </div>

      {/* Loading Text */}
      {text && (
        <div className="flex items-center space-x-2">
          <p className={`${currentSize.text} font-semibold text-gray-700`}>
            {text}
          </p>
          {/* Animated Dots */}
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Full screen loading
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 z-50 flex items-center justify-center">
        <UMKMVerseLoader />
      </div>
    );
  }

  // Overlay loading
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl">
          <UMKMVerseLoader />
        </div>
      </div>
    );
  }

  // Inline loading
  return (
    <div className="flex items-center justify-center p-8">
      <UMKMVerseLoader />
    </div>
  );
}

// Skeleton Loader Component
export function Skeleton({ className = '', variant = 'text' }) {
  const variants = {
    text: 'h-4 w-full rounded',
    title: 'h-8 w-3/4 rounded-lg',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-32 rounded-lg',
    card: 'h-48 w-full rounded-xl'
  };

  return (
    <div 
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer ${variants[variant]} ${className}`}
      style={{ backgroundSize: '200% 100%' }}
    />
  );
}

// Button Spinner Component
export function ButtonSpinner({ size = 'sm', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin ${className}`} />
  );
}

// Add animations to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes orbit-smooth {
      0% {
        transform: translate(-50%, -50%) rotate(0deg) translateX(45px) rotate(0deg);
        opacity: 0.3;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg) translateX(45px) rotate(-360deg);
        opacity: 0.3;
      }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    .animate-shimmer {
      animation: shimmer 2s linear infinite;
    }
  `;
  
  if (!document.head.querySelector('#loading-animations')) {
    style.id = 'loading-animations';
    document.head.appendChild(style);
  }
}