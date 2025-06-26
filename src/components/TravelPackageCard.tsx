import React from 'react';
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

interface TravelPackageCardProps {
  imageUrl: string;
  destination: string;
  price: number;
  highlights: string[];
  slug?: string; // Optional slug for future dynamic routing
}

const TravelPackageCard: React.FC<TravelPackageCardProps> = ({
  imageUrl,
  destination,
  price,
  highlights,
  slug, // Not used in link yet as per App.tsx, but good for future use
}) => {
  console.log('TravelPackageCard loaded for:', destination);

  // The link currently points to a static page as per App.tsx
  const destinationUrl = slug ? `/package-details/${slug}` : '/package-details';

  return (
    <Link to={destinationUrl} className="block group" aria-label={`View details for ${destination}`}>
      <Card className="w-full h-96 overflow-hidden relative text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out">
        {/* Background Image */}
        <img
          src={imageUrl}
          alt={`A scenic view of ${destination}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-colors duration-300"></div>

        <div className="relative h-full flex flex-col justify-end p-6 z-10">
          {/* Main Info - always visible, slides up on hover */}
          <div className="transform transition-transform duration-500 ease-in-out group-hover:-translate-y-24">
            <h3 className="text-3xl font-extrabold tracking-tight">{destination}</h3>
            <p className="text-lg font-semibold mt-1">Starting from ${price.toLocaleString()}</p>
          </div>

          {/* Highlights - appear on hover */}
          <div className="absolute bottom-6 left-6 right-6 opacity-0 transform translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
            <ul className="space-y-1 text-sm">
              {highlights.slice(0, 3).map((highlight, index) => ( // Show up to 3 highlights
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 flex-shrink-0 text-green-400" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default TravelPackageCard;