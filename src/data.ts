import { Cafeteria, Product, Order } from './types';

export const CAFETERIAS: Cafeteria[] = [
  {
    id: '1',
    name: 'Café Central',
    location: 'Bloque 11',
    waitTime: '15 min',
    status: 'Alta demanda',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCKIee2MrK4SgLDxzmzcQMcnIkWb1Gw9qpPBq-sL-VODZ27Z2u1ZNkBqjLW66lwDGK_0hq73uP4m0VBJ8IH2mxGXgOhX1O3nWQBKBBrKztgXCDQCgQz8kEIOAswlAEXcn3SXHMgon3_6rKlAjKhiXZEvVRlkpXK0fN5kHEWRSekbnDjPT0SQ3tccnVlvxrf8uAgDDVmnA9Lc52ana6xF8F7d9L-O_bqUtGpksJYincDAnZ1n7fbsZFXYSTwfjXjNWZEM94fX7Eix8',
  },
  {
    id: '2',
    name: 'Restaurante Bienestar',
    location: 'Bloque 9',
    waitTime: '5 min',
    status: 'Abierto',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5fVoUpF8P2zRjJxxsFrfm_xZ59t45Gp2peDqvb7XycizGnO4srWYu8rWfqxQGutp4-jdap_fugi6mWs1uC301NRT3Si_CP9fjW90QKsOdkXVxCAiXEGlk3oX-0H6T32zq_B642jnm2DoMTpUsDVhLsCVUSpGjdLMivyk9gXFCdc6gvV5X886VDHWCBfp5j9eSWddx5ba9f9LQZqzYy_0aTnzvBYhJCnXyefBi1aP7SvlZuzgZ1amyKH_OzYgHMz6N4j8UryvkwZU',
  },
  {
    id: '3',
    name: 'Snack Bar',
    location: 'Bloque 7',
    waitTime: '2 min',
    status: 'Abierto',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&q=80&w=400',
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Bandeja Paisa',
    description: 'Plato tradicional con arroz, frijoles, carne molida, chicharrón, huevo frito, tajada de plátano, arepa y aguacate.',
    price: 25000,
    category: 'Almuerzos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Yy7MsnNfwwCwp9nUcP0p3QrLGuTnpn0kOgGcrM8XBR6-oWSvSTk3gdEnGuQUsOqWYGXk8o0oT5VtbdyfvrTTOipslEaXeqJvWQBiH6WSMz3djB1Lxc2Wp6uF439LfXxs2BFdZa7T_tCvSts3Kz6kmxbUzvUCnH1If_9l1Df5VeNW8h2CrtIu0ZArF2ZI4FP7FCZkERGylwXm5tFFXewqFHBJdLY76xvbYKoQCaOHNLElwcQxTw2eNJly3aHe7h156iRJGir7Uls',
    available: true
  },
  {
    id: 'p2',
    name: 'Hamburguesa Clásica',
    description: 'Carne de res 150g, queso cheddar, lechuga, tomate, cebolla caramelizada y salsa de la casa.',
    price: 18500,
    category: 'Almuerzos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6oRfRHSf6y7tJpCl7WD30-15RU4WBNJ7MHF1zAleBFF3N3Qc4bKrtY7jUA8-5Bnx29VJhoaWEuxQFpkVTa-q0iD-8m2rTfT0ik9fn0yDXKFBgn7OpVAnoW4Y572pID8QYlObp8wS_y1zc-nRCNNGoRu5SpSKbpTEY2cLiyIp9Cz0-dovL9YPssAPkR9sjixeZaJaH0BYN2_J2llUJpina2oEQx35pxilGjxbAzGniaCzPsTeZpW0Xaej_omZwGi-Ww8wejfUfGZk',
    available: true
  },
  {
    id: 'p3',
    name: 'Café Latte',
    description: 'Espresso suave con abundante leche vaporizada y una fina capa de espuma.',
    price: 5500,
    category: 'Bebidas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTvkHcyLbSgZSXtQQzAFWTRDPrCduZNz6dvff6vQ4qs-C5Djwlhkbto8IPtsTDyjaRZWhXupeMAD7guhNwfs2tHui1hW67J5Yk3HGz2PXFwj5f-qjfXvlEW1wUxmezTvnXlW9QJ35qH_sBFhSnVG-KE1HTRsRK2HWxiX50vkQ0sn4oF5yKhVQ6hJu2xdI0M8GWAj0FzM6C-BPbYaKdTmfS-3fBcxicgwiNPK739UfIU8n4W66N_V_fl_I9B-GmBV8Og-iiVWr7vm8',
    available: false
  },
  {
    id: 'p4',
    name: 'Pizza Institucional',
    description: 'Masa artesanal con salsa napolitana, queso mozzarella y orégano.',
    price: 18500,
    category: 'Snacks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuhimLOAnjmf9lS2WT4_wPk10z-UB93sK7dvq2yF3aorfE2MH8oVNidzYvxvGVY39HB1wpMZFQdltrJRSUf7c9cOp2yfKu-sQFfT8VPX7qU948xFsAi_GOBjd-1tB71HpXthSjsDp9g8_j6XK5hog-tgi2lNmtddJLzw-BTI-FOiovYlaD00ArQeQ1fV9s7cVWVUTB8YBeITlGpHFbJ3SULT6zmrWBMxX0Xgjb9YjnSSMhESioiPfKn2Hyz2Ki9m5OATl0cgI3nLA',
    available: true
  },
  {
    id: 'p5',
    name: 'Postre de Tres Leches',
    description: 'Bizcocho bañado en tres tipos de leche, cubierto con crema batida.',
    price: 6000,
    category: 'Snacks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARSQqzTwojuF9QnRYpeLRABD0VUNleorkto7AxkWFUYXbaVWg1aSdIcIYuhHJJknoxncs1U-pUIuZh4sDUxOpbzy-1IrKDCWaG7vC29ZU1Rwdr8h5zyeXZuwkprzBmoub9tVkHNMg6YW-cLOHYpzPIKD25vxMRZf5uoBt3YCJPxxFgAfcNKJD2yQHPfq0IK8ZVzoE3Pz_oulj7V3JBHIinQRHknH5ou3z4UkBjFeYTBMLWMkO-ww1-fLHRDQD-VTli4jb7Gp9TOOs',
    available: true
  }
];

export const HISTORY: Order[] = [
  {
    id: 'ord1',
    cafeteriaName: 'Café Central',
    date: 'Hoy',
    total: 8500,
    status: 'Entregado',
    items: [
      { id: 'ci1', product: PRODUCTS[4], quantity: 1 }
    ]
  },
  {
    id: 'ord2',
    cafeteriaName: 'Terraza Bloque C',
    date: 'Ayer',
    total: 22000,
    status: 'Completado',
    items: [
      { id: 'ci2', product: PRODUCTS[1], quantity: 1 }
    ]
  },
  {
    id: 'ord3',
    cafeteriaName: 'Kiosko Saludable',
    date: '15 de Mayo',
    total: 12000,
    status: 'Entregado',
    items: []
  }
];
