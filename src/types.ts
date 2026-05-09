export type Screen = 'home' | 'menu' | 'product_detail' | 'cart' | 'checkout' | 'tracking' | 'history';

export interface Cafeteria {
  id: string;
  name: string;
  location: string;
  waitTime: string;
  status: 'Alta demanda' | 'Abierto' | 'Cerrado';
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  extras?: string[];
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Recibido' | 'Preparando' | 'Listo para recoger' | 'Entregado' | 'Completado';
  date: string;
  cafeteriaName: string;
}
