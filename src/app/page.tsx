import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { items } from '@/lib/data';
import { ItemCard } from '@/components/item-card';
import { Search } from 'lucide-react';

export default function Home() {
  const approvedItems = items.filter(item => item.status === 'approved');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">
          Find Your Next Treasure
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse through a universe of unique items or auction your own.
        </p>
      </header>

      <div className="bg-card p-4 rounded-lg shadow-sm mb-8 sticky top-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for books, consoles, and more..."
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="collectibles">Collectibles</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full bg-accent hover:bg-accent/90">
            Search
          </Button>
        </div>
      </div>

      <section>
        <h2 className="text-3xl font-headline font-semibold text-primary mb-6">
          Featured Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {approvedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
