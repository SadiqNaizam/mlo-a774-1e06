import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Plane, Hotel, Car, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TripCostEstimator: React.FC = () => {
  console.log('TripCostEstimator loaded');

  // State for user inputs
  const [destination, setDestination] = useState<string>('Jaipur');
  const [days, setDays] = useState<number[]>([7]);
  const [includeFlights, setIncludeFlights] = useState<boolean>(true);
  const [includeHotel, setIncludeHotel] = useState<boolean>(true);
  const [hotelStars, setHotelStars] = useState<string>('3');
  const [includeCab, setIncludeCab] = useState<boolean>(false);

  // State for calculated cost
  const [totalCost, setTotalCost] = useState<number>(0);

  // Prices (could be fetched from an API in a real app)
  const COST_PER_DAY_BASE = 50;
  const COST_FLIGHT = 400;
  const COST_HOTEL_PER_DAY = { '3': 80, '4': 150, '5': 250 };
  const COST_CAB_PER_DAY = 40;

  useEffect(() => {
    const calculateCost = () => {
      let cost = 0;
      const numDays = days[0];

      // Add flight cost (one-time)
      if (includeFlights) {
        cost += COST_FLIGHT;
      }

      // Add hotel cost (per day)
      if (includeHotel) {
        const hotelCostPerDay = COST_HOTEL_PER_DAY[hotelStars as keyof typeof COST_HOTEL_PER_DAY] || 0;
        cost += hotelCostPerDay * numDays;
      }

      // Add cab cost (per day)
      if (includeCab) {
        cost += COST_CAB_PER_DAY * numDays;
      }
      
      // Add base cost for miscellaneous expenses
      cost += COST_PER_DAY_BASE * numDays;

      setTotalCost(cost);
    };

    calculateCost();
  }, [destination, days, includeFlights, includeHotel, hotelStars, includeCab]);

  // Animated counter using Framer Motion
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, totalCost, {
      duration: 0.8,
      ease: "easeOut",
    });
    return animation.stop;
  }, [totalCost]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Trip Cost Estimator</CardTitle>
        <CardDescription>Customize your trip to see a real-time price estimate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="e.g., Goa, Kerala, Rajasthan" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="duration">Trip Duration: {days[0]} days</Label>
                <Slider id="duration" min={1} max={30} step={1} value={days} onValueChange={setDays} />
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Services</h3>
            {/* Flights Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                    <Plane className="h-6 w-6 text-primary" />
                    <Label htmlFor="flights-toggle" className="text-base">Round-trip Flights</Label>
                </div>
                <Switch id="flights-toggle" checked={includeFlights} onCheckedChange={setIncludeFlights} />
            </div>
            {/* Hotel Toggle & Options */}
            <div className="flex flex-col gap-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Hotel className="h-6 w-6 text-primary" />
                        <Label htmlFor="hotel-toggle" className="text-base">Hotel Accommodation</Label>
                    </div>
                    <Switch id="hotel-toggle" checked={includeHotel} onCheckedChange={setIncludeHotel} />
                </div>
                {includeHotel && (
                    <div className="pl-9">
                        <Label htmlFor="hotel-stars">Hotel Quality</Label>
                        <Select value={hotelStars} onValueChange={setHotelStars} disabled={!includeHotel}>
                            <SelectTrigger id="hotel-stars" className="w-full mt-1">
                                <SelectValue placeholder="Select star rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="3">3-Star Hotel</SelectItem>
                                <SelectItem value="4">4-Star Hotel</SelectItem>
                                <SelectItem value="5">5-Star Luxury Hotel</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
            {/* Cab Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                    <Car className="h-6 w-6 text-primary" />
                    <Label htmlFor="cab-toggle" className="text-base">Private Cab for Sightseeing</Label>
                </div>
                <Switch id="cab-toggle" checked={includeCab} onCheckedChange={setIncludeCab} />
            </div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">Estimated Total Cost</p>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tighter">$</span>
                <motion.h2 className="text-4xl font-bold tracking-tighter">{rounded}</motion.h2>
            </div>
        </div>
        <Button size="lg" asChild>
          <Link to="/booking">
            Save Itinerary & Book
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripCostEstimator;