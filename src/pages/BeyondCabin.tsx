import React from "react";
import Hero from "../components/Hero";
import {
  MapPin,
  Trophy,
  Music,
  ShoppingBag,
  Utensils,
  ArrowRight,
  Building2,
  Clock,
  Compass,
  Navigation,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const BeyondCabin: React.FC = () => {
  return (
    <div className="bg-stone-50">
      <SEO
        title="Things to Do in Odessa & Kansas City"
        description="Discover hiking trails, lake activities, and the vibrant culture of Kansas City just a short drive away from East Pointe. The best of both worlds."
        url="https://www.eastpointekc.com/beyond"
      />

      <Hero
        title="Explore the Region"
        subtitle="Your ideal lake getaway, just a quick drive from the heart of Kansas City."
        image="/Explore/ExploreHero.webp"
        height="large"
      />

      {/* Intro Section: Quick Drive */}
      <section className="py-24 bg-white border-b border-stone-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <span className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                The Best of Both Worlds
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                A Quick Drive from KC
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed font-light mb-6">
                Escape the hustle and bustle of the city and enjoy a stay at our
                charming lake cabins in Odessa, MO. Perfectly situated just
                outside the Kansas City Metropolitan area, East Pointe offers
                the ultimate compromise: rugged seclusion when you want it, and
                city excitement when you need it.
              </p>
              <p className="text-stone-600 text-lg leading-relaxed font-light">
                Whether you are in town for a Chiefs game, a Royals match, or
                simply exploring the rich culture of the Midwest, our cabins
                serve as your adventurous basecamp.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute top-4 left-4 w-full h-full border-2 border-accent rounded-sm z-0"></div>
              <img
                src="/Explore/QuickDrive.webp"
                alt="Scenic Drive"
                className="relative z-10 w-full h-[400px] object-cover rounded-sm shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Statement Section (Replaces Marquee) */}
      <section
        className="relative py-32 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920")',
        }}
      >
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mb-10 flex justify-center">
            <div className="p-4 border border-white/20 rounded-full text-accent backdrop-blur-sm bg-white/5">
              <Compass size={32} strokeWidth={1} />
            </div>
          </div>
          <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight max-w-5xl mx-auto drop-shadow-xl">
            "Experience the tranquility of lakeside living while maintaining
            easy access to the city's excitement."
          </h3>
          <div className="w-24 h-[1px] bg-accent mx-auto mt-12 opacity-60"></div>
        </div>
      </section>

      {/* Discover KC Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
            Discover Kansas City
          </h2>
          <p className="text-stone-500 text-lg font-light leading-relaxed">
            Explore the vibrant city known for its rich history, cultural
            attractions, and exciting entertainment options. From world-class
            BBQ to championship sports, it's all within reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Sports */}
          <div className="group relative overflow-hidden rounded-sm h-[400px] shadow-lg">
            <img
              src="/Explore/ChiefsAndRoyals.jpeg"
              alt="KC Sports"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 flex flex-col justify-end">
              <div className="flex items-center gap-3 text-accent mb-2">
                <Trophy size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Championship City
                </span>
              </div>
              <h3 className="text-3xl font-serif text-white mb-4">
                Chiefs & Royals
              </h3>
              <p className="text-stone-300 font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                Experience the thrill of Arrowhead Stadium or a classic ballgame
                at Kauffman Stadium. A short drive for an unforgettable game
                day.
              </p>
            </div>
          </div>

          {/* Card 2: Culture */}
          <div className="group relative overflow-hidden rounded-sm h-[400px] shadow-lg">
            <img
              src="/Explore/UnionStation.webp"
              alt="Union Station"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 flex flex-col justify-end">
              <div className="flex items-center gap-3 text-accent mb-2">
                <Building2 size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  History & Arts
                </span>
              </div>
              <h3 className="text-3xl font-serif text-white mb-4">
                Union Station & Museums
              </h3>
              <p className="text-stone-300 font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                Visit the iconic Union Station, the beautiful Nelson-Atkins
                Museum of Art, and the National WWI Museum.
              </p>
            </div>
          </div>

          {/* Card 3: Entertainment */}
          <div className="group relative overflow-hidden rounded-sm h-[400px] shadow-lg">
            <img
              src="/Explore/PowerAndLight.jpeg"
              alt="Nightlife"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 flex flex-col justify-end">
              <div className="flex items-center gap-3 text-accent mb-2">
                <Music size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Nightlife
                </span>
              </div>
              <h3 className="text-3xl font-serif text-white mb-4">
                Power & Light District
              </h3>
              <p className="text-stone-300 font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                Immerse yourself in the rhythm of the 18th & Vine Jazz District
                or the vibrant energy of the Power & Light District.
              </p>
            </div>
          </div>

          {/* Card 4: Shopping & Dining */}
          <div className="group relative overflow-hidden rounded-sm h-[400px] shadow-lg">
            <img
              src="/Explore/CountryPlaza.jpeg"
              alt="Plaza"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 flex flex-col justify-end">
              <div className="flex items-center gap-3 text-accent mb-2">
                <ShoppingBag size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Shopping & Dining
                </span>
              </div>
              <h3 className="text-3xl font-serif text-white mb-4">
                Country Club Plaza
              </h3>
              <p className="text-stone-300 font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                Enjoy premier shopping and indulge in legendary Kansas City BBQ
                at renowned restaurants throughout the city.
              </p>
            </div>
          </div>
        </div>

        {/* Link to Cabin Collection */}
        <div className="mt-20 text-center">
          <Link
            to="/cabins"
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-secondary transition-colors rounded-sm shadow-xl"
          >
            Book Your Basecamp <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Come See Us Section */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 skew-x-12 transform translate-x-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Text */}
            <div className="lg:w-1/2">
              <div className="inline-block p-3 border border-accent rounded-full mb-6">
                <MapPin className="text-accent" size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                Come See Us
              </h2>
              <p className="text-xl text-stone-300 mb-8 font-light">
                Visit our offices to explore our stunning lakeside cabins!
              </p>
              <p className="text-stone-400 leading-relaxed mb-10 max-w-lg">
                Experience the serene surroundings firsthand and discover your
                perfect getaway. We look forward to welcoming you!
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Location</h4>
                    <p className="text-stone-400">
                      Lake Lafayette, Odessa, MO 64076
                    </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=38.9458417,-93.9713331"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors mt-1"
                    >
                      <Navigation size={14} /> Get Directions
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Hours</h4>
                    <p className="text-stone-400">We are open year round!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map/Image */}
            <div className="lg:w-1/2 w-full h-[500px] bg-stone-800 rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12435.5!2d-93.9713331!3d38.9458417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c169965ad4a83d%3A0x1b1bb606912fe188!2sLake%20Lafayette!5e0!3m2!1sen!2sus!4v1709900000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(90%) contrast(0.8)",
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="opacity-50 group-hover:opacity-80 transition-opacity duration-700"
              ></iframe>

              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="bg-primary/90 text-white px-8 py-4 border border-accent shadow-xl text-center">
                  <span className="block text-accent text-xs font-bold uppercase tracking-widest mb-1">
                    East Pointe
                  </span>
                  <span className="font-serif text-xl">Offices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeyondCabin;
