import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  overlayOpacity?: number;
  height?: 'full' | 'large' | 'medium' | 'small';
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  image, 
  overlayOpacity = 0.4,
  height = 'medium' 
}) => {
  const heightClass = {
    full: 'h-screen',
    large: 'h-[80vh]',
    medium: 'h-[60vh]',
    small: 'h-[40vh]'
  }[height];

  return (
    <div className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out transform hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl font-light tracking-wide text-stone-100 drop-shadow-md max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;