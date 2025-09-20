export type Item = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageHint: string;
  type: 'auction' | 'fixed';
  price: number; // For fixed-price, this is the sale price. For auction, this is the starting price.
  endDate?: string; // For auctions
  currentBid?: number; // For auctions
  bids?: Bid[]; // For auctions
  value?: number; // Estimated value for auctions
  status?: 'pending' | 'approved' | 'rejected'; // For admin approval
  sellerId?: string;
};

export type Bid = {
  id: string;
  amount: number;
  timestamp: string;
  bidder: {
    id: string;
    name: string;
    avatarUrl: string;
  };
};

export type UserRole = 'buyer' | 'seller' | 'admin';

export type User = {
    id: string;
    name: string;
    avatarUrl: string;
    role: UserRole;
};
