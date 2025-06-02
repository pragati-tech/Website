import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'PlayStation 5',
    slug: 'playstation-5',
    description: 'Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.',
    price: 499.99,
    imageUrl: '/images/playstation5.jpg',
    category: 'consoles',
    featured: true,
    variants: [
      {
        id: '1-1',
        productId: '1',
        color: 'White',
        size: 'Standard Edition',
        price: 499.99,
        stock: 10,
        imageUrl: '/images/ps5.png',
      },
      {
        id: '1-2',
        productId: '1',
        color: 'White',
        size: 'Digital Edition',
        price: 399.99,
        stock: 15,
        imageUrl: '/images/ps5-digital.png',
      },
      {
        id: '1-3',
        productId: '1',
        color: 'Black',
        size: 'Standard Edition',
        price: 549.99,
        stock: 5,
        imageUrl: '/images/ps5-black.png',
      }
    ]
  },
  {
    id: '2',
    name: 'Xbox Series X',
    slug: 'xbox-series-x',
    description: 'The most powerful Xbox ever. Explore rich new worlds with 12 teraflops of raw graphic processing power, DirectX ray tracing, a custom SSD, and 4K gaming.',
    price: 499.99,
    imageUrl: '/images/xbox-x.png',
    category: 'consoles',
    featured: true,
    variants: [
      {
        id: '2-1',
        productId: '2',
        color: 'Black',
        size: 'Standard',
        price: 499.99,
        stock: 8,
        imageUrl: '/images/xbox-x.png',
      }
    ]
  },
  {
    id: '3',
    name: 'Xbox Series S',
    slug: 'xbox-series-s',
    description: 'The smallest, sleekest Xbox ever. Experience the speed and performance of a next-gen all-digital console at an accessible price point.',
    price: 299.99,
    imageUrl: '/images/xbox-s.png',
    category: 'consoles',
    featured: false,
    variants: [
      {
        id: '3-1',
        productId: '3',
        color: 'White',
        size: 'Digital Edition',
        price: 299.99,
        stock: 12,
        imageUrl: '/images/xbox-s.png',
      },
      {
        id: '3-2',
        productId: '3',
        color: 'Black',
        size: 'Digital Edition',
        price: 349.99,
        stock: 6,
        imageUrl: '/images/xbox-s-black.png',
      }
    ]
  },
  {
    id: '4',
    name: 'Nintendo Switch OLED',
    slug: 'nintendo-switch-oled',
    description: 'Featuring a vibrant 7-inch OLED screen, a wide adjustable stand, a dock with a wired LAN port, 64 GB of internal storage, and enhanced audio.',
    price: 349.99,
    imageUrl: '/images/switch-oled.png',
    category: 'consoles',
    featured: true,
    variants: [
      {
        id: '4-1',
        productId: '4',
        color: 'White',
        size: 'OLED Model',
        price: 349.99,
        stock: 15,
        imageUrl: '/images/switch-oled.png',
      },
      {
        id: '4-2',
        productId: '4',
        color: 'Neon Blue/Red',
        size: 'OLED Model',
        price: 349.99,
        stock: 10,
        imageUrl: '/images/switch-oled-neon.png',
      }
    ]
  },
  {
    id: '5',
    name: 'PS5 DualSense Controller',
    slug: 'ps5-dualsense-controller',
    description: 'Discover a deeper, highly immersive gaming experience with the innovative new PS5 controller, featuring haptic feedback and dynamic trigger effects.',
    price: 69.99,
    imageUrl: '/images/dualsense.png',
    category: 'accessories',
    featured: false,
    variants: [
      {
        id: '5-1',
        productId: '5',
        color: 'White',
        size: 'Standard',
        price: 69.99,
        stock: 20,
        imageUrl: '/images/dualsense.png',
      },
      {
        id: '5-2',
        productId: '5',
        color: 'Midnight Black',
        size: 'Standard',
        price: 69.99,
        stock: 18,
        imageUrl: '/images/dualsense-black.png',
      },
      {
        id: '5-3',
        productId: '5',
        color: 'Cosmic Red',
        size: 'Standard',
        price: 74.99,
        stock: 15,
        imageUrl: '/images/dualsense-red.png',
      }
    ]
  },
  {
    id: '6',
    name: 'Xbox Elite Controller Series 2',
    slug: 'xbox-elite-controller-series-2',
    description: `The world's most advanced controller. Designed to meet the needs of today's competitive gamers with new interchangeable thumbsticks and paddle shapes.`,
    price: 179.99,
    imageUrl: '/images/xbox-elite.png',
    category: 'accessories',
    featured: true,
    variants: [
      {
        id: '6-1',
        productId: '6',
        color: 'Black',
        size: 'Elite',
        price: 179.99,
        stock: 8,
        imageUrl: '/images/xbox-elite.png',
      },
      {
        id: '6-2',
        productId: '6',
        color: 'White',
        size: 'Elite',
        price: 179.99,
        stock: 5,
        imageUrl: '/images/xbox-elite-white.png',
      }
    ]
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
export const getAllProducts = (): Product[] => {
  return products;
};