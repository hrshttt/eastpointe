import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Lock body scroll during loading
    document.body.style.overflow = "hidden";

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Random increment for a more organic "loading" feel
        const next = prev + Math.random() * 3;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 30);

    // Ensure it finishes within a reasonable max time (approx 2.5s)
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    // When progress hits 100%, trigger exit sequence
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        setExit(true); // Start slide-up animation

        // Wait for animation to finish before unmounting
        const finishTimer = setTimeout(() => {
          document.body.style.overflow = "unset"; // Restore scroll
          onFinish();
        }, 1000); // Matches the duration-1000 class

        return () => clearTimeout(finishTimer);
      }, 500); // Brief pause at 100%

      return () => clearTimeout(exitTimer);
    }
  }, [progress, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-primary flex items-center justify-center transition-transform duration-[1000ms] cubic-bezier(0.76, 0, 0.24, 1) ${
        exit ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center px-4 w-full max-w-md">
        {/* Brand */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest mb-3 opacity-0 animate-fade-in-up">
          EAST POINTE
        </h1>
        <p
          className="text-accent text-[10px] md:text-xs uppercase tracking-[0.4em] mb-16 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Lake Cabin Experience
        </p>

        {/* Smooth Loading Bar */}
        <div className="w-full max-w-xs h-[1px] bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_rgba(212,197,176,0.8)] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage (Subtle) */}
        <div className="mt-4 text-white/20 font-mono text-[10px] tracking-widest">
          {Math.floor(progress).toString().padStart(3, "0")}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
