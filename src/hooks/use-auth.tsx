'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { UserRole } from '@/lib/types';
import { Loader2 } from 'lucide-react';

type AuthContextType = {
  user: FirebaseUser | null;
  userRole: UserRole | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Retrieve role from localStorage.
        const storedRole = localStorage.getItem('userRole') as UserRole;
        if (storedRole) {
           setUserRole(storedRole);
        } else {
           // Default to buyer if role is not set.
           setUserRole('buyer');
        }
      } else {
        setUserRole(null);
        localStorage.removeItem('userRole');
      }
      setLoading(false);
    });

    // Listen for changes in localStorage to sync across tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'userRole') {
        setUserRole(event.newValue as UserRole | null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        unsubscribe();
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = async () => {
    await signOut(auth);
    // The onAuthStateChanged listener will handle clearing user and role state.
  };
  
  const value = { user, userRole, loading, logout };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
