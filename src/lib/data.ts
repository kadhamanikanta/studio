import { type Item } from './types';

const now = new Date();

export const items: Item[] = [
  {
    id: '1',
    title: 'Dune by Frank Herbert',
    description:
      "First edition copy of the sci-fi classic 'Dune'. A masterpiece of speculative fiction, this novel is a must-have for any serious collector. The book is in excellent condition with its original dust jacket.",
    category: 'Books',
    imageUrl: 'https://picsum.photos/seed/book-dune/600/800',
    imageHint: 'book cover dune',
    type: 'auction',
    price: 50.0,
    currentBid: 75.0,
    value: 200,
    endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    bids: [
      {
        id: 'b1',
        amount: 75.0,
        timestamp: new Date(
          now.getTime() - 1 * 60 * 60 * 1000
        ).toISOString(),
        bidder: {
          id: 'u1',
          name: 'SciFiFan',
          avatarUrl: 'https://picsum.photos/seed/u1/40/40',
        },
      },
      {
        id: 'b2',
        amount: 60.0,
        timestamp: new Date(
          now.getTime() - 3 * 60 * 60 * 1000
        ).toISOString(),
        bidder: {
          id: 'u2',
          name: 'Bookworm',
          avatarUrl: 'https://picsum.photos/seed/u2/40/40',
        },
      },
    ],
    status: 'approved',
    sellerId: 'seller-1'
  },
  {
    id: '2',
    title: 'PlayStation 5 Console',
    description:
      'Brand new, unopened PlayStation 5 Disc Edition. Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.',
    category: 'Gaming',
    imageUrl: 'https://picsum.photos/seed/playstation-5-console/800/600',
    imageHint: 'playstation 5',
    type: 'fixed',
    price: 499.99,
    status: 'approved',
    sellerId: 'seller-2'
  },
  {
    id: '3',
    title: 'Foundation by Isaac Asimov',
    description:
      'A vintage paperback edition of the timeless classic, Foundation. The first book in the epic Foundation series, this is a cornerstone of science fiction literature.',
    category: 'Books',
    imageUrl: 'https://picsum.photos/seed/book-asimov/600/800',
    imageHint: 'book cover asimov',
    type: 'fixed',
    price: 19.99,
    status: 'approved',
    sellerId: 'seller-1'
  },
  {
    id: '4',
    title: 'Nintendo Switch OLED',
    description:
      'Lightly used Nintendo Switch OLED model with a vibrant 7-inch screen. Includes all original accessories and packaging. Perfect for gaming on the go or at home.',
    category: 'Gaming',
    imageUrl: 'https://picsum.photos/seed/nintendo-switch-oled/800/600',
    imageHint: 'nintendo switch',
    type: 'auction',
    price: 200.0,
    currentBid: 240.0,
    value: 350,
    endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    bids: [
      {
        id: 'b3',
        amount: 240.0,
        timestamp: new Date(
          now.getTime() - 2 * 60 * 60 * 1000
        ).toISOString(),
        bidder: {
          id: 'u3',
          name: 'GamerX',
          avatarUrl: 'https://picsum.photos/seed/u3/40/40',
        },
      },
    ],
    status: 'approved',
    sellerId: 'seller-2'
  },
  {
    id: '5',
    title: 'Vintage Polaroid Camera',
    description:
      'A classic Polaroid 600 series instant camera from the 1980s. Tested and working perfectly. A beautiful piece for photography enthusiasts and collectors.',
    category: 'Collectibles',
    imageUrl: 'https://picsum.photos/seed/polaroid-camera-vintage/800/600',
    imageHint: 'vintage polaroid',
    type: 'fixed',
    price: 85.0,
    status: 'approved',
    sellerId: 'seller-3'
  },
  {
    id: '6',
    title: 'The Joy of Cooking',
    description:
      'A hardcover edition of the quintessential American cookbook. Packed with timeless recipes, this book is an essential for any kitchen.',
    category: 'Books',
    imageUrl: 'https://picsum.photos/seed/cooking-book/600/800',
    imageHint: 'cookbook',
    type: 'fixed',
    price: 25.0,
    status: 'pending',
    sellerId: 'seller-1'
  },
  {
    id: '7',
    title: 'Super Mario 64 Cartridge',
    description:
      "Original Nintendo 64 game cartridge: Super Mario 64. The label is in great condition and the game plays flawlessly. A true piece of gaming history.",
    category: 'Gaming',
    imageUrl: 'https://picsum.photos/seed/mario-64-cartridge/600/600',
    imageHint: 'retro game cartridge',
    type: 'auction',
    price: 20,
    currentBid: 35,
    value: 50,
    endDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    bids: [
       {
        id: 'b4',
        amount: 35.0,
        timestamp: new Date(
          now.getTime() - 4 * 60 * 60 * 1000
        ).toISOString(),
        bidder: {
          id: 'u4',
          name: 'RetroGamer',
          avatarUrl: 'https://picsum.photos/seed/u4/40/40',
        },
      },
    ],
    status: 'approved',
    sellerId: 'seller-2'
  },
  {
    id: '8',
    title: 'The Dark Side of the Moon - Vinyl',
    description:
      'Original 1973 pressing of Pink Floyd\'s iconic album "The Dark Side of the Moon". The vinyl and sleeve are in very good condition for their age.',
    category: 'Collectibles',
    imageUrl: 'https://picsum.photos/seed/pink-floyd-vinyl-record/800/800',
    imageHint: 'vinyl record album',
    type: 'fixed',
    price: 120.0,
    status: 'pending',
    sellerId: 'seller-3'
  },
];
