import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { type Item } from '@/lib/types';
import { Gavel, Tag } from 'lucide-react';

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/items/${item.id}`} className="block">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={item.imageHint}
            />
            <Badge
              className="absolute top-2 right-2"
              variant={item.type === 'auction' ? 'destructive' : 'secondary'}
            >
              {item.type === 'auction' ? (
                <Gavel className="w-3 h-3 mr-1" />
              ) : (
                <Tag className="w-3 h-3 mr-1" />
              )}
              {item.type === 'auction' ? 'Auction' : 'Fixed Price'}
            </Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-lg mb-1 leading-tight">
          <Link href={`/items/${item.id}`} className="hover:text-primary">
            {item.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm">{item.category}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <p className="text-xs text-muted-foreground">
            {item.type === 'auction' ? 'Current Bid' : 'Price'}
          </p>
          <p className="text-xl font-bold font-headline text-primary">
            ${item.type === 'auction' ? item.currentBid?.toFixed(2) : item.price.toFixed(2)}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href={`/items/${item.id}`}>
            {item.type === 'auction' ? 'Bid Now' : 'View Item'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
