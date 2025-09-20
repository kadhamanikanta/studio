'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { items as allItems } from '@/lib/data';
import { Item } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';
import { BackButton } from '@/components/back-button';

export default function AdminPage() {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // In a real app, this state would be managed via API calls to a database.
  // For now, we'll simulate it with local state derived from `items`.
  const [items, setItems] = useState<Item[]>(allItems);

  useEffect(() => {
    if (!loading && userRole !== 'admin') {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You do not have permission to view this page.',
      });
      router.push('/');
    }
  }, [user, userRole, loading, router, toast]);

  const handleItemStatusChange = (itemId: string, newStatus: 'approved' | 'rejected') => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
    toast({
        title: `Item ${newStatus}`,
        description: `The item has been successfully ${newStatus}.`,
    });
  };

  const pendingItems = items.filter((item) => item.status === 'pending');

  if (loading || userRole !== 'admin') {
    // AuthProvider shows a loader, but we can have one here as a fallback
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
            <BackButton />
            <h1 className="text-4xl font-headline font-bold text-primary">
                Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
                Review and manage item listings.
            </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>
            These items are waiting for your review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingItems.length > 0 ? (
                pendingItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={item.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={item.imageUrl}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.type}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleItemStatusChange(item.id, 'approved')}
                          className="text-green-500 border-green-500 hover:bg-green-500/10 hover:text-green-600"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                           onClick={() => handleItemStatusChange(item.id, 'rejected')}
                          className="text-red-500 border-red-500 hover:bg-red-500/10 hover:text-red-600"
                        >
                           <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No pending items to review.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>{pendingItems.length}</strong> pending items.
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
