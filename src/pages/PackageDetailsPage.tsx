import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import shadcn/ui Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Import Icons
import { MapPin, Star, CheckCircle2, XCircle, Users, Calendar, Sun } from 'lucide-react';

// Placeholder Data
const packageDetails = {
  name: 'Enchanting Rajasthan Royal Tour',
  location: 'Rajasthan, India',
  duration: '7 Days / 6 Nights',
  rating: 4.8,
  reviewsCount: 152,
  price: '45,999',
  images: [
    'https://images.unsplash.com/photo-1599661046227-147253503153?w=1200&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544941321-4b36d5b2447d?w=1200&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617200277313-9034f3c7469a?w=1200&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593710265249-1c6f71a0709f?w=1200&h=600&fit=crop&q=80',
  ],
  itinerary: [
    { day: 1, title: 'Arrival in Jaipur - The Pink City', description: 'Arrive at Jaipur airport/railway station and transfer to your hotel. In the evening, visit Chokhi Dhani for a traditional Rajasthani dinner.' },
    { day: 2, title: 'Jaipur Sightseeing', description: 'Explore Amber Fort, Jaigarh Fort, City Palace, Jantar Mantar, and Hawa Mahal. Enjoy an evening of shopping in the local bazaars.' },
    { day: 3, title: 'Jaipur to Jodhpur (The Blue City)', description: 'Drive to Jodhpur, check into your hotel. Spend the evening at leisure exploring the local market near the Clock Tower.' },
    { day: 4, title: 'Jodhpur Sightseeing', description: 'Visit the majestic Mehrangarh Fort, Jaswant Thada, and Umaid Bhawan Palace Museum.' },
    { day: 5, title: 'Jodhpur to Udaipur (The City of Lakes)', description: 'Proceed to Udaipur. En route, visit the famous Ranakpur Jain Temples. Check into your hotel in Udaipur and enjoy an evening boat ride on Lake Pichola.' },
    { day: 6, title: 'Udaipur Sightseeing', description: 'Discover the City Palace, Jagdish Temple, Saheliyon-ki-Bari, and the Fateh Sagar Lake.' },
    { day: 7, title: 'Departure from Udaipur', description: 'After breakfast, transfer to Udaipur airport/railway station for your onward journey with royal memories.' },
  ],
  inclusions: ['Accommodation in 4-star hotels', 'Daily breakfast', 'Private AC car for all transfers and sightseeing', 'All toll taxes, parking fees, and driver allowances', 'Boat ride in Udaipur'],
  exclusions: ['Flights or train tickets', 'Lunch and Dinner', 'Entry fees to monuments', 'Personal expenses', 'Anything not mentioned in inclusions'],
  reviews: [
    { id: 1, name: 'Anjali Sharma', rating: 5, comment: 'An absolutely magical experience! The arrangements were flawless. Highly recommended.' },
    { id: 2, name: 'Rohan Verma', rating: 4, comment: 'Great trip overall. The guide in Jaipur was fantastic. Hotels were good, but food could be better.' },
    { id: 3, name: 'Priya Singh', rating: 5, comment: "Udaipur was the highlight. Incredible India team did a great job coordinating everything." },
  ]
};

const PackageDetailsPage: React.FC = () => {
  console.log('PackageDetailsPage loaded');
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booking'); // Navigate to the booking page route from App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* --- Image Carousel Section --- */}
          <section className="mb-8">
            <Carousel className="w-full rounded-lg overflow-hidden shadow-lg">
              <CarouselContent>
                {packageDetails.images.map((src, index) => (
                  <CarouselItem key={index}>
                    <img src={src} alt={`View of ${packageDetails.name} ${index + 1}`} className="w-full h-auto md:h-[500px] object-cover" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4" />
              <CarouselNext className="absolute right-4" />
            </Carousel>
          </section>

          {/* --- Main Content Grid --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{packageDetails.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {packageDetails.location}</div>
                <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {packageDetails.rating} ({packageDetails.reviewsCount} reviews)</div>
              </div>
              
              <Card className="mb-6 bg-muted/20 border-none">
                <CardContent className="p-6 text-muted-foreground">
                  <p>Embark on a majestic journey through the heart of Rajasthan. This tour covers the iconic cities of Jaipur, Jodhpur, and Udaipur, offering a glimpse into the opulent history, vibrant culture, and architectural marvels of the Rajputana kings.</p>
                </CardContent>
              </Card>

              {/* Itinerary Accordion */}
              <div className="mb-6">
                 <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Calendar className="h-6 w-6 text-primary" /> Day-by-Day Itinerary</h2>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  {packageDetails.itinerary.map(item => (
                    <AccordionItem key={`day-${item.day}`} value={`item-${item.day}`}>
                      <AccordionTrigger className="font-semibold text-lg hover:no-underline">Day {item.day}: {item.title}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Inclusions, Exclusions, Reviews Tabs */}
              <div>
                <Tabs defaultValue="inclusions" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="inclusions">What's Included</TabsTrigger>
                    <TabsTrigger value="exclusions">What's Not</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="inclusions" className="py-4">
                    <ul className="space-y-2">
                      {packageDetails.inclusions.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-green-500" /> {item}</li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="exclusions" className="py-4">
                     <ul className="space-y-2">
                      {packageDetails.exclusions.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground"><XCircle className="h-5 w-5 text-red-500" /> {item}</li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="reviews" className="py-4 space-y-4">
                    {packageDetails.reviews.map(review => (
                      <Card key={review.id}>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{review.name}</CardTitle>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />)}
                              {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-muted-foreground/30" />)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm">"{review.comment}"</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Column: Booking Card */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-24 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-baseline">
                    <p className="text-muted-foreground">Starting from</p>
                    <p className="text-3xl font-bold text-primary">₹{packageDetails.price}</p>
                  </div>
                   <p className="text-sm text-muted-foreground text-right">per person</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm"><span className="font-medium text-foreground flex items-center gap-2"><Sun className="h-4 w-4"/> Duration</span> <span className="text-muted-foreground">{packageDetails.duration}</span></div>
                    <div className="flex justify-between text-sm"><span className="font-medium text-foreground flex items-center gap-2"><Users className="h-4 w-4"/> Group Size</span> <span className="text-muted-foreground">Up to 12 people</span></div>
                    <Badge variant="secondary" className="w-full justify-center">Best Seller</Badge>
                  <Button size="lg" className="w-full font-bold text-lg" onClick={handleBooking}>
                    Book This Trip
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Questions? <Link to="/#contact" className="underline hover:text-primary">Contact us!</Link></p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetailsPage;