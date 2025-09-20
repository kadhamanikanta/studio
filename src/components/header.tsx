'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Book,
  Gavel,
  LogIn,
  Search,
  Tag,
  Menu,
  ShoppingCart,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
} from 'lucide-react';
import { Icons } from './icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export function Header() {
  const isMobile = useIsMobile();
  const { user, userRole, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const navLinks = (
    <>
      <Button variant="ghost" asChild>
        <Link href="/">
          <Book className="mr-2 h-4 w-4" />
          Books
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/">
          <Gavel className="mr-2 h-4 w-4" />
          Auctions
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/">
          <Tag className="mr-2 h-4 w-4" />
          Fixed Price
        </Link>
      </Button>
    </>
  );

  const userActions = (
    <nav className="flex items-center">
      <Button variant="ghost" size="icon">
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Cart</span>
      </Button>
      {!loading &&
        (user ? (
          <>
            <Button variant="outline" className="hidden sm:inline-flex" asChild>
              <Link href="/sell">Sell Item</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.photoURL || '/images/default-avatar.png'}
                      alt={user.displayName || 'User'}
                    />
                    <AvatarFallback>
                      {user.email ? user.email.charAt(0).toUpperCase() : '?'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userRole === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <LayoutDashboard className="mr-2" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <UserIcon className="mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button asChild>
            <Link href="/login">
              <LogIn className="mr-0 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </Button>
        ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              VendVerse
            </span>
          </Link>
          <nav className="flex items-center space-x-1">{navLinks}</nav>
        </div>

        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-4">
                <Icons.logo className="h-6 w-6 text-primary" />
                <span className="font-bold sm:inline-block font-headline text-lg">
                  VendVerse
                </span>
              </Link>
              <div className="flex flex-col space-y-2">{navLinks}</div>
            </SheetContent>
          </Sheet>
        )}

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search items..."
                  className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>
          {userActions}
        </div>
      </div>
    </header>
  );
}
