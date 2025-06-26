import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Mountain, Menu, User, Briefcase, IndianRupee, Map, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  const navItems = [
    { label: 'Home', path: '/', icon: Map },
    { label: 'Packages', path: '/packages', icon: Briefcase },
    { label: 'Trip Cost Estimator', path: '/trip-cost-estimator', icon: IndianRupee },
    { label: 'Offers', path: '/#offers', icon: null, isComingSoon: true },
  ];

  const NavLinks = ({ isMobile = false }) => (
    <nav className={isMobile ? 'flex flex-col gap-4 p-4' : 'hidden md:flex items-center gap-6'}>
      {navItems.map((item) => {
        if (item.isComingSoon) {
          return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <span className="text-sm font-medium text-muted-foreground/50 cursor-not-allowed">
                  {item.label}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming Soon!</p>
              </TooltipContent>
            </Tooltip>
          );
        }
        return (
          <NavLink key={item.label} to={item.path} className={navLinkClasses}>
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden sm:inline-block">Incredible India</span>
          </Link>
        </div>

        <NavLinks />

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Link to="/" className="flex items-center gap-2">
                    <Mountain className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Incredible India</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <NavLinks isMobile={true} />
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/#profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/booking">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>My Bookings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/#settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/#logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;