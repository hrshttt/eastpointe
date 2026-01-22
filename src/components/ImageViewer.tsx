import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    [images.length],
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, nextImage, prevImage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-50 transition-colors"
      >
        <X size={32} />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all z-50"
          >
            <ChevronLeft size={40} strokeWidth={1.5} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all z-50"
          >
            <ChevronRight size={40} strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Main Image */}
      <div className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center p-4 md:p-10">
        <img
          src={images[currentIndex]}
          alt={`View ${currentIndex + 1}`}
          className="max-h-[85vh] max-w-full object-contain shadow-2xl rounded-sm animate-fade-in"
        />
        <div className="absolute bottom-6 left-0 w-full text-center text-white/50 text-sm tracking-widest font-mono">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
