import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { MapPin, Calendar as CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Link } from 'react-router-dom';

const indianDestinations = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata',
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Goa', 'Udaipur', 'Agra', 'Varanasi'
];

const DestinationSearchBar = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  console.log('DestinationSearchBar loaded');

  const filteredDestinations = useMemo(() => {
    if (!destination) {
      return [];
    }
    return indianDestinations.filter(d =>
      d.toLowerCase().includes(destination.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
  }, [destination]);

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
    if (e.target.value) {
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setDestination(suggestion);
    setIsPopoverOpen(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-full p-2 bg-white/80 backdrop-blur-sm border-2 border-white/50">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-center gap-2">
          
          {/* Destination Input with Autocomplete */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverAnchor asChild>
                <div className="relative w-full flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Where are you going?"
                    className="pl-10 h-14 text-md rounded-full border-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={destination}
                    onChange={handleDestinationChange}
                    onFocus={() => destination && setIsPopoverOpen(true)}
                  />
                </div>
            </PopoverAnchor>
            {filteredDestinations.length > 0 && (
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 mt-2" align="start">
                <ul className="py-1">
                  {filteredDestinations.map((d) => (
                    <li
                      key={d}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(d)}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            )}
          </Popover>

          <div className="h-8 w-px bg-gray-200 hidden md:block" />

          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="ghost"
                className={cn(
                  'w-full md:w-auto justify-start text-left font-normal h-14 text-md rounded-full flex-1 min-w-[280px] hover:bg-gray-100',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick your dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <Button asChild size="lg" className="rounded-full h-14 w-full md:w-auto px-8 bg-blue-600 hover:bg-blue-700 text-lg">
            <Link to="/packages">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationSearchBar;