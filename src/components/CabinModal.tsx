import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  X,
  Users,
  Bed,
  Bath,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Ruler,
  PlayCircle,
} from "lucide-react";
import ImageViewer, { MediaItem } from "./ImageViewer";

export interface CabinData {
  id: number;
  name: string;
  sleeps: string;
  bedrooms: string;
  baths: number;
  desc: string;
  status: string;
  images: string[];
  video?: string; // Path to video file
  videoThumbnail?: string; // Path to video thumbnail image
  location?: string;
  sqFt?: string;
  features?: string[];
  sleepingArrangements?: { room: string; bed: string }[];
  amenities?: string[];
  bookingLink?: string;
}

interface CabinModalProps {
  cabin: CabinData | null;
  isOpen: boolean;
  onClose: () => void;
}

const CabinModal: React.FC<CabinModalProps> = ({ cabin, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const thumbnailsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Construct the unified gallery list (Video first, then images)
  const galleryItems: MediaItem[] = useMemo(() => {
    if (!cabin) return [];

    const items: MediaItem[] = [];

    // Add video as first item if it exists
    if (cabin.video) {
      items.push({
        type: "video",
        src: cabin.video,
        // Use videoThumbnail if available, otherwise fallback to first image
        poster: cabin.videoThumbnail || cabin.images[0],
      });
    }

    // Add all images
    cabin.images.forEach((img) => {
      items.push({ type: "image", src: img });
    });

    return items;
  }, [cabin]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Scroll active thumbnail into view when index changes
  useEffect(() => {
    if (isOpen && cabin) {
      const activeThumb = thumbnailsRef.current[currentImageIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentImageIndex, isOpen, cabin]);

  // Smart Preload: Preload the NEXT image (skip if next is video)
  useEffect(() => {
    if (isOpen && galleryItems.length > 1) {
      const nextIndex = (currentImageIndex + 1) % galleryItems.length;
      const nextItem = galleryItems[nextIndex];

      if (nextItem.type === "image") {
        const img = new Image();
        img.src = nextItem.src;
      }
    }
  }, [currentImageIndex, isOpen, galleryItems]);

  if (!isOpen || !cabin) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  const currentItem = galleryItems[currentImageIndex];

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-primary/80 backdrop-blur-sm animate-fade-in-fast"
          onClick={onClose}
        ></div>

        {/* Modal Container */}
        <div className="relative bg-white w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in">
          {/* Close Button (Mobile & Desktop) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors md:hidden"
          >
            <X size={24} />
          </button>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-stone-100 hover:bg-stone-200 text-primary rounded-full transition-colors hidden md:block"
          >
            <X size={24} />
          </button>

          {/* Left Side: Media Gallery */}
          <div className="w-full md:w-1/2 bg-stone-100 relative flex flex-col h-[40vh] md:h-full group">
            <div
              className="relative flex-grow overflow-hidden bg-black flex items-center justify-center cursor-pointer"
              onClick={() => setIsViewerOpen(true)}
            >
              {currentItem.type === "video" ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    src={currentItem.src}
                    poster={currentItem.poster}
                    className="w-full h-full object-contain opacity-90"
                    muted
                    playsInline
                    // Note: We don't autoplay here to avoid annoyance,
                    // but user can click to open full viewer which auto-plays
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle
                      size={64}
                      className="text-white/80 drop-shadow-lg"
                      fill="rgba(0,0,0,0.5)"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-accent/90 text-primary text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest">
                    Video Tour
                  </div>
                </div>
              ) : (
                <img
                  src={currentItem.src}
                  alt={cabin.name}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Photo Counter Badge */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none border border-white/10 shadow-sm">
                {currentImageIndex + 1} / {galleryItems.length}
              </div>

              {/* Fullscreen Icon Hint */}
              <div className="absolute top-4 left-4 bg-black/30 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Maximize2 size={20} />
              </div>

              {/* Navigation Overlays */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="p-2 bg-black/30 hover:bg-black/50 text-white rounded-full pointer-events-auto transition-colors transform hover:scale-110"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="p-2 bg-black/30 hover:bg-black/50 text-white rounded-full pointer-events-auto transition-colors transform hover:scale-110"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            {/* Thumbnails strip */}
            <div className="h-20 bg-primary/5 flex overflow-x-auto snap-x scrollbar-hide">
              {galleryItems.map((item, idx) => (
                <button
                  key={idx}
                  ref={(el) => {
                    thumbnailsRef.current[idx] = el;
                  }}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-24 h-full relative snap-start transition-all duration-200 border-r border-white/10 ${currentImageIndex === idx ? "opacity-100 ring-2 ring-inset ring-secondary z-10" : "opacity-60 hover:opacity-100"}`}
                >
                  {item.type === "video" ? (
                    <div className="w-full h-full relative bg-black">
                      <img
                        src={item.poster}
                        alt="Video Thumbnail"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle
                          size={24}
                          className="text-white drop-shadow-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={`thumbnail ${idx}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 bg-white flex flex-col h-[60vh] md:h-full">
            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-8 custom-scrollbar">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-stone-500 text-sm mb-2">
                  <MapPin size={14} className="text-accent" />
                  <span className="uppercase tracking-widest">
                    {cabin.location || "Odessa, MO"}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
                  {cabin.name}
                </h2>

                {/* Quick Stats Grid */}
                <div className="flex flex-wrap gap-4 md:gap-8 py-6 border-y border-stone-100">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-accent" />
                    <span className="font-bold text-stone-700">
                      {cabin.sleeps} Guests
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={20} className="text-accent" />
                    <span className="font-bold text-stone-700">
                      {cabin.bedrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={20} className="text-accent" />
                    <span className="font-bold text-stone-700">
                      {cabin.baths} Baths
                    </span>
                  </div>
                  {cabin.sqFt && (
                    <div className="flex items-center gap-2">
                      <Ruler size={20} className="text-accent" />
                      <span className="font-bold text-stone-700">
                        {cabin.sqFt} Sq Ft
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold font-serif text-primary mb-3">
                  About the Space
                </h3>
                <p className="text-stone-600 leading-relaxed font-light">
                  {cabin.desc}
                </p>
              </div>

              {/* Sleeping Arrangements */}
              {cabin.sleepingArrangements && (
                <div>
                  <h3 className="text-lg font-bold font-serif text-primary mb-4">
                    Sleeping Arrangements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cabin.sleepingArrangements.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-50 p-4 rounded-sm border border-stone-100"
                      >
                        <span className="block text-xs font-bold uppercase text-stone-400 mb-1">
                          {item.room}
                        </span>
                        <span className="block font-medium text-primary">
                          {item.bed}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features/Amenities */}
              {cabin.features && (
                <div>
                  <h3 className="text-lg font-bold font-serif text-primary mb-4">
                    Property Highlights
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cabin.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-stone-600 text-sm"
                      >
                        <Check
                          size={16}
                          className="text-secondary mt-0.5 shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky Footer Action */}
            <div className="p-6 border-t border-stone-100 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">
                  Status
                </p>
                <p
                  className={`font-bold ${cabin.status === "Available" ? "text-green-600" : "text-stone-400"}`}
                >
                  {cabin.status}
                </p>
              </div>

              {cabin.status === "Available" && cabin.bookingLink ? (
                <a
                  href={cabin.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded-sm bg-primary text-white hover:bg-secondary shadow-lg hover:shadow-xl inline-block text-center"
                >
                  Book Now
                </a>
              ) : (
                <button
                  className={`px-8 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded-sm ${
                    cabin.status === "Available"
                      ? "bg-primary text-white hover:bg-secondary shadow-lg hover:shadow-xl"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed"
                  }`}
                  disabled={cabin.status !== "Available"}
                >
                  {cabin.status === "Available" ? "Book Now" : "Coming Soon"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ImageViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        media={galleryItems}
        initialIndex={currentImageIndex}
      />
    </>
  );
};

export default CabinModal;
