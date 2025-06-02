
export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    featured: boolean;
    variants: ProductVariant[];
  }
  
  export interface ProductVariant {
    id: string;
    productId: string;
    color: string;
    size: string;
    price: number | null; // If variant has different price, null means same as base
    stock: number;
    imageUrl?: string;
  }
  
  export interface CartItem {
    product: Product;
    variant: ProductVariant;
    quantity: number;
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: 'customer' | 'admin' | 'rider';
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'undelivered';
    total: number;
    createdAt: Date;
    updatedAt: Date;
    address?: string;
    riderId?: string;
  }
  
  export interface Rider {
    id: string;
    name: string;
    email: string;
    phone: string;
    orders: Order[];
  }