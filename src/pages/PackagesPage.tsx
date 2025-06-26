import React, { useState } from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TravelPackageCard from '@/components/TravelPackageCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

// Placeholder data for travel packages
const travelPackages = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1599661046227-14e7a705a114?q=80&w=1974&auto=format&fit=crop',
    destination: 'Royal Rajasthan',
    price: 1200,
    highlights: ['Jaipur Palaces', 'Jodhpur Forts', 'Desert Safari'],
    slug: 'royal-rajasthan',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
    destination: 'Kerala Backwaters',
    price: 950,
    highlights: ['Houseboat Stay', 'Spice Plantations', 'Munnar Tea Gardens'],
    slug: 'kerala-backwaters',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1587789202102-bad98d570530?q=80&w=2070&auto=format&fit=crop',
    destination: 'Himalayan Adventure',
    price: 1500,
    highlights: ['Trekking in Leh', 'Monastery Visits', 'Mountain Vistas'],
    slug: 'himalayan-adventure',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1524293581273-79a0295f723c?q=80&w=2070&auto=format&fit=crop',
    destination: 'Goa Beach Paradise',
    price: 800,
    highlights: ['Beach Parties', 'Water Sports', 'Portuguese Architecture'],
    slug: 'goa-beach-paradise',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1564514348695-9ab2d82f7e45?q=80&w=2070&auto=format&fit=crop',
    destination: 'Mystical Varanasi',
    price: 700,
    highlights: ['Ganges River Aarti', 'Ancient Temples', 'Boat Tours'],
    slug: 'mystical-varanasi',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1603584363293-87b6a7f3d395?q=80&w=1932&auto=format&fit=crop',
    destination: 'Wonders of the South',
    price: 1100,
    highlights: ['Hampi Ruins', 'Mysore Palace', 'Coorg Coffee Estates'],
    slug: 'wonders-of-south',
  },
];

const travelStyles = [
  { id: 'adventure', label: 'Adventure' },
  { id: 'relaxation', label: 'Relaxation' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'beach', label: 'Beach' },
  { id: 'spiritual', label: 'Spiritual' },
];

const PackagesPage = () => {
  console.log('PackagesPage loaded');

  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  
  const handleStyleChange = (styleId: string) => {
    setSelectedStyles(prev => 
      prev.includes(styleId) ? prev.filter(id => id !== styleId) : [...prev, styleId]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Explore Our Packages</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover handcrafted journeys across the diverse landscapes of India. Filter by your preferences to find the perfect trip.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 shadow-sm">
              <CardHeader>
                <CardTitle>Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sort By */}
                <div className="space-y-2">
                  <Label htmlFor="sort-by">Sort by</Label>
                  <Select defaultValue="price-asc">
                    <SelectTrigger id="sort-by" className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />

                {/* Price Range */}
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="text-center font-medium text-primary">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                  <Slider
                    defaultValue={[500, 2000]}
                    min={0}
                    max={3000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-4"
                  />
                </div>
                
                <Separator />

                {/* Travel Style */}
                <div className="space-y-2">
                  <Label>Travel Style</Label>
                  <div className="space-y-3 pt-2">
                    {travelStyles.map((style) => (
                      <div key={style.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={style.id} 
                          checked={selectedStyles.includes(style.id)}
                          onCheckedChange={() => handleStyleChange(style.id)}
                        />
                        <Label htmlFor={style.id} className="font-normal cursor-pointer">
                          {style.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-4">Apply Filters</Button>
              </CardContent>
            </Card>
          </aside>

          {/* Packages Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {travelPackages.map((pkg) => (
                <TravelPackageCard
                  key={pkg.slug}
                  imageUrl={pkg.imageUrl}
                  destination={pkg.destination}
                  price={pkg.price}
                  highlights={pkg.highlights}
                  slug={pkg.slug}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PackagesPage;