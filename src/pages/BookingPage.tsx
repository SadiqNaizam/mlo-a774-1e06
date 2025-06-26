import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plane, Hotel, Car, IndianRupee, Lock } from 'lucide-react';

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  country: z.string().min(2, { message: 'Please select your country.' }),
  paymentMethod: z.enum(['credit-card', 'paypal', 'upi'], {
    required_error: 'You need to select a payment method.',
  }),
  cardholderName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
}).refine(data => {
  if (data.paymentMethod === 'credit-card') {
    return !!data.cardholderName && !!data.cardNumber && !!data.expiryDate && !!data.cvc;
  }
  return true;
}, {
  message: "Credit card details are required.",
  path: ["cardholderName"], // Can point to a specific field if needed
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingPage = () => {
  console.log('BookingPage loaded');

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      paymentMethod: 'credit-card',
    },
  });

  function onSubmit(data: BookingFormValues) {
    console.log(data);
    toast.success('Booking Confirmed!', {
      description: `A confirmation email has been sent to ${data.email}.`,
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-grow container py-8 md:py-12">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Complete Your Booking</h1>
            <p className="text-muted-foreground mt-2">You're just a few steps away from your incredible journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Traveler Information</CardTitle>
                    <CardDescription>Please enter the details of the primary traveler.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 123 456 7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Choose your preferred payment method.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                           <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col md:flex-row gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="credit-card" /></FormControl>
                                <FormLabel className="font-normal">Credit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="paypal" /></FormControl>
                                <FormLabel className="font-normal">PayPal</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="upi" /></FormControl>
                                <FormLabel className="font-normal">UPI</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.watch('paymentMethod') === 'credit-card' && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                             <FormField control={form.control} name="cardholderName" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                </FormItem>
                            )}/>
                             <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                <FormLabel>Card Number</FormLabel>
                                <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                                </FormItem>
                            )}/>
                             <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="cvc" render={({ field }) => (
                                <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl><Input placeholder="•••" {...field} /></FormControl>
                                </FormItem>
                            )}/>
                        </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" size="lg" className="w-full">
                      <Lock className="mr-2 h-4 w-4" /> Pay Now & Confirm Booking
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>

          {/* Itinerary Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
                <Card>
                    <CardHeader>
                        <CardTitle>Itinerary Summary</CardTitle>
                        <CardDescription>Golden Triangle Discovery</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Destination</span>
                            <span className="font-medium">Jaipur, Rajasthan</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Dates</span>
                            <span className="font-medium">Oct 15 - Oct 22, 2024</span>
                        </div>
                        <Separator />
                        <h4 className="font-semibold">Included Services</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center"><Plane className="h-4 w-4 mr-2 text-primary" /> Round-trip Flights</li>
                            <li className="flex items-center"><Hotel className="h-4 w-4 mr-2 text-primary" /> 4-Star Hotel (7 nights)</li>
                            <li className="flex items-center"><Car className="h-4 w-4 mr-2 text-primary" /> Private Cab for Sightseeing</li>
                        </ul>
                        <Separator />
                         <div className="flex items-center justify-between font-bold text-lg">
                            <span>Total Cost</span>
                            <div className="flex items-center">
                                <IndianRupee className="h-5 w-5 mr-1" />
                                <span>45,000</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;