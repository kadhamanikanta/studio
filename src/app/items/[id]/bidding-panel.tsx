'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Gavel, Lightbulb, Loader2 } from 'lucide-react';
import { type Item } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import {
  suggestBidIncrement,
  SuggestBidIncrementOutput,
} from '@/ai/flows/suggest-bid-increment';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';

const BidFormSchema = z.object({
  amount: z.number().positive('Bid must be a positive number.'),
});

type BiddingPanelProps = {
  item: Item;
};

export default function BiddingPanel({ item }: BiddingPanelProps) {
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestBidIncrementOutput | null>(null);

  const form = useForm<z.infer<typeof BidFormSchema>>({
    resolver: zodResolver(BidFormSchema),
    defaultValues: {
      amount: item.currentBid ? item.currentBid + 10 : item.price + 10,
    },
  });

  async function onSubmit(data: z.infer<typeof BidFormSchema>) {
    if (data.amount <= (item.currentBid || item.price)) {
      form.setError('amount', {
        type: 'manual',
        message: 'Your bid must be higher than the current bid.',
      });
      return;
    }
    toast({
      title: 'Bid Placed!',
      description: `You successfully bid $${data.amount.toFixed(2)} on ${item.title}.`,
    });
  }

  async function handleGetSuggestion() {
    setIsSuggesting(true);
    setSuggestion(null);
    try {
      const result = await suggestBidIncrement({
        currentBid: item.currentBid || item.price,
        itemValue: item.value || item.price * 1.5, // Fallback if value is not set
      });
      setSuggestion(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch AI suggestion.',
      });
    } finally {
      setIsSuggesting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Place Your Bid</CardTitle>
          <div className="flex items-baseline gap-4">
            <p className="text-sm text-muted-foreground">Current Bid:</p>
            <p className="text-3xl font-bold font-headline text-primary">
              ${(item.currentBid || item.price).toFixed(2)}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Bid Amount</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            type="number"
                            step="1"
                            className="pl-6"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <Button type="submit" className="w-full">
                        <Gavel className="mr-2 h-4 w-4" />
                        Place Bid
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button
            variant="outline"
            onClick={handleGetSuggestion}
            disabled={isSuggesting}
            className="w-full"
          >
            {isSuggesting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-4 w-4" />
            )}
            Get AI Bid Suggestion
          </Button>
          {suggestion && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle className="font-headline">AI Suggestion</AlertTitle>
              <AlertDescription>
                Try bidding around{' '}
                <strong>
                  $
                  {(
                    (item.currentBid || item.price) +
                    suggestion.suggestedIncrement
                  ).toFixed(2)}
                </strong>
                . {suggestion.reasoning}
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Bid History</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {item.bids?.map((bid) => (
              <li key={bid.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={bid.bidder.avatarUrl} />
                    <AvatarFallback>
                      {bid.bidder.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{bid.bidder.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(bid.timestamp), "PPp")}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-lg text-primary">
                  ${bid.amount.toFixed(2)}
                </p>
              </li>
            ))}
            {!item.bids?.length && (
              <p className="text-muted-foreground text-center py-4">
                No bids yet. Be the first!
              </p>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
