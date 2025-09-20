'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (role === 'admin' && email !== 'admin@vendverse.com') {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'You can only register the admin account with the designated admin email.',
      });
      setIsLoading(false);
      return;
    }
      
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      
      // Store the selected role so it can be picked up on login
      localStorage.setItem('userRole', role);

      toast({
        title: 'Account Created',
        description: 'A verification email has been sent. Please verify your email before logging in.',
      });
      router.push('/login');
    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)] py-12 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Icons.logo className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Join VendVerse to start buying and selling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="role">Sign up as</Label>
                <Select onValueChange={(value) => setRole(value as UserRole)} defaultValue={role}>
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="buyer">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                placeholder="••••••••"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="w-full">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
