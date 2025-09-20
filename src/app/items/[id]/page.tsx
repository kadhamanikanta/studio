import Image from 'next/image';
import { notFound } from 'next/navigation';
import { items } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Gavel,
  Tag,
  Timer,
  Book,
  Gamepad2,
  Gem,
  PlusCircle,
} from 'lucide-react';
import BiddingPanel from './bidding-panel';
import { Separator } from '@/components/ui/separator';
import CountdownTimer from '@/components/ui/countdown-timer';

type ItemPageProps = {
  params: {
    id: string;
  };
};

export default function ItemPage({ params }: ItemPageProps) {
  const item = items.find((i) => i.id === params.id);

  if (!item) {
    notFound();
  }

  const categoryIcons: { [key: string]: React.ReactNode } = {
    Books: <Book className="w-4 h-4" />,
    Gaming: <Gamepad2 className="w-4 h-4" />,
    Collectibles: <Gem className="w-4 h-4" />,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            data-ai-hint={item.imageHint}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="flex items-center gap-1.5">
              {categoryIcons[item.category] || <Tag className="w-4 h-4" />}
              {item.category}
            </Badge>
            <Badge
              variant={item.type === 'auction' ? 'destructive' : 'secondary'}
              className="flex items-center gap-1.5"
            >
              {item.type === 'auction' ? (
                <Gavel className="w-4 h-4" />
              ) : (
                <Tag className="w-4 h-4" />
              )}
              {item.type === 'auction' ? 'Auction' : 'Fixed Price'}
            </Badge>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">
            {item.title}
          </h1>
          <p className="text-muted-foreground mb-6">{item.description}</p>
          <Separator className="my-6" />

          {item.type === 'fixed' && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Buy Now</CardTitle>
                <CardDescription>
                  This item is available for immediate purchase.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-4xl font-bold font-headline text-primary">
                    ${item.price.toFixed(2)}
                  </p>
                  <Button size="lg" className="bg-accent hover:bg-accent/90">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {item.type === 'auction' && item.endDate && (
            <div>
              <Card className="mb-4">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Auction Ends In
                  </CardTitle>
                  <Timer className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">
                    <CountdownTimer endDate={item.endDate} />
                  </div>
                </CardContent>
              </Card>
              <BiddingPanel item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
