import Link from 'next/link';
import { Icons } from './icons';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="flex items-center space-x-2 mb-4"
            >
              <Icons.logo className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl font-headline text-foreground">
                VendVerse
              </span>
            </Link>
            <p className="text-sm">
              Your universe for buying and selling unique items.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-3">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Auctions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Fixed Price
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-3">
              Sell
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sell" className="hover:text-primary transition-colors">
                  Create Listing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Selling Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-3">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VendVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
