'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateItemDescription } from '@/ai/flows/generate-item-description';

const sellFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  category: z.string().min(1, 'Please select a category.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  listingType: z.enum(['fixed', 'auction']),
  price: z.coerce.number().optional(),
  startingBid: z.coerce.number().optional(),
  duration: z.string().optional(),
}).refine(data => {
    if (data.listingType === 'fixed') {
        return data.price !== undefined && data.price > 0;
    }
    return true;
}, { message: "Price is required for fixed listings", path: ["price"] })
.refine(data => {
    if (data.listingType === 'auction') {
        return data.startingBid !== undefined && data.startingBid > 0;
    }
    return true;
}, { message: "Starting bid is required for auctions", path: ["startingBid"] });

export default function SellPage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof sellFormSchema>>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      listingType: 'fixed',
    },
  });

  const listingType = form.watch('listingType');

  async function handleGenerateDescription() {
    const { title, category } = form.getValues();
    if (!title || !category) {
      toast({
        variant: 'destructive',
        title: 'Title and Category Required',
        description:
          'Please fill in the title and category before generating a description.',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateItemDescription({ title, category });
      form.setValue('description', result.description, { shouldValidate: true });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate a description with AI.',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  function onSubmit(values: z.infer<typeof sellFormSchema>) {
    console.log(values);
    toast({
      title: "Item Listed!",
      description: `Your item "${values.title}" has been successfully listed.`,
    })
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-headline font-bold text-primary mb-6">
        List Your Item
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., First Edition of 'Dune'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category for your item" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Books">Books</SelectItem>
                            <SelectItem value="Gaming">Gaming</SelectItem>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Collectibles">Collectibles</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your item in detail..."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                     <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-2">
                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Lightbulb className="mr-2 h-4 w-4" />}
                        Generate with AI
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Upload Images</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop files here, or click to browse</p>
                    <Button type="button" variant="outline" className="mt-4">Select Files</Button>
                </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Listing Type & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name="listingType"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>How do you want to sell?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value="fixed" /></FormControl>
                                        <FormLabel className="font-normal">Fixed Price</FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value="auction" /></FormControl>
                                        <FormLabel className="font-normal">Auction</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {listingType === 'fixed' && (
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 29.99" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                 {listingType === 'auction' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="startingBid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Starting Bid</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 9.99" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Auction Duration</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="3">3 Days</SelectItem>
                                            <SelectItem value="5">5 Days</SelectItem>
                                            <SelectItem value="7">7 Days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                )}
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90">List Item</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
