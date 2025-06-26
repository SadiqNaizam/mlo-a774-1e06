import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TicketPercent } from 'lucide-react';

interface OfferBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title = "Seasonal Savings Spectacle",
  subtitle = "Get up to 30% off on select destination packages. Don't miss out on the adventure of a lifetime!",
  ctaText = "Explore All Offers",
  ctaLink = "/packages",
  imageUrl = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop", // A placeholder image of the Taj Mahal
}) => {
  console.log('OfferBanner loaded');

  return (
    <section className="relative w-full rounded-xl overflow-hidden group">
      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-orange-400/30 blur-3xl transition-all duration-500 group-hover:bg-orange-400/40"></div>
      
      {/* Background Image and Overlay */}
      <div
        className="relative w-full h-80 sm:h-96 bg-cover bg-center rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-lg"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-12 text-white z-10">
        <div className="flex items-center gap-3 mb-2">
          <TicketPercent className="h-6 w-6 text-yellow-400" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-shadow-lg">
            {title}
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-base md:text-lg text-gray-200 text-shadow">
          {subtitle}
        </p>
        <Button asChild size="lg" className="mt-6 bg-yellow-500 text-black hover:bg-yellow-600 transition-transform duration-300 group-hover:scale-105">
          <Link to={ctaLink}>
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default OfferBanner;