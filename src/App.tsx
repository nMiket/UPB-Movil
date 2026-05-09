/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Calendar, 
  ShoppingBasket, 
  History, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  Check, 
  ChevronRight,
  Info,
  Smartphone,
  Mail,
  User,
  X,
  FastForward,
  Utensils,
  History as HistoryIcon,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CAFETERIAS, PRODUCTS, HISTORY } from './data';
import { Screen, Cafeteria, Product, CartItem, Order } from './types';

export default function App() {
  const [isLaunching, setIsLaunching] = useState(true);
  const [currentPage, setCurrentPage] = useState<Screen>('home');
  // ... rest of state remain the same
  const [selectedCafeteria, setSelectedCafeteria] = useState<Cafeteria | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todo');

  useMemo(() => {
    // Simulate app boot
    const timer = setTimeout(() => setIsLaunching(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // ... rest of logic remains the same (addToCart, removeFromCart, etc.)
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: Math.random().toString(), product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCafeteriaClick = (cafeteria: Cafeteria) => {
    setSelectedCafeteria(cafeteria);
    setCurrentPage('menu');
  };

  const handleProductClick = (product: Product) => {
    if (!product.available) return;
    setSelectedProduct(product);
    setCurrentPage('product_detail');
  };

  // Helper components
  const TopAppBar = ({ title, showBack = false, onBack = () => setCurrentPage('home') }: { title: string, showBack?: boolean, onBack?: () => void }) => (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center px-5 h-16 bg-white shadow-sm border-b border-surface-container">
      {showBack && (
        <button 
          onClick={onBack}
          className="mr-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:scale-95"
        >
          <ArrowLeft className="text-primary w-6 h-6" />
        </button>
      )}
      <h1 className="text-xl font-bold text-primary">{title}</h1>
    </nav>
  );

  const BottomNavBar = () => (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-2 bg-white rounded-t-2xl shadow-[0px_-8px_20px_rgba(0,0,0,0.05)] border-t border-surface-container">
      <button 
        onClick={() => setCurrentPage('home')}
        className={`flex flex-col items-center justify-center px-6 py-2 rounded-2xl transition-all ${currentPage === 'home' ? 'text-secondary bg-secondary-fixed/30' : 'text-on-surface-variant'}`}
      >
        <Calendar className={`w-6 h-6 ${currentPage === 'home' ? 'fill-current' : ''}`} />
        <span className="text-[10px] font-bold mt-1">Servicios</span>
      </button>
      <button 
        onClick={() => setCurrentPage('cart')}
        className={`flex flex-col items-center justify-center px-6 py-2 rounded-2xl transition-all ${['menu', 'cart', 'checkout', 'product_detail'].includes(currentPage) ? 'text-secondary bg-secondary-fixed/30' : 'text-on-surface-variant'}`}
      >
        <ShoppingBasket className={`w-6 h-6 ${['menu', 'cart', 'checkout', 'product_detail'].includes(currentPage) ? 'fill-current' : ''}`} />
        <span className="text-[10px] font-bold mt-1">Pedido</span>
      </button>
      <button 
        onClick={() => setCurrentPage('history')}
        className={`flex flex-col items-center justify-center px-6 py-2 rounded-2xl transition-all ${['history', 'tracking'].includes(currentPage) ? 'text-secondary bg-secondary-fixed/30' : 'text-on-surface-variant'}`}
      >
        <HistoryIcon className={`w-6 h-6 ${['history', 'tracking'].includes(currentPage) ? 'fill-current' : ''}`} />
        <span className="text-[10px] font-bold mt-1">Historial</span>
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-surface select-none">
      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                <Utensils className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter">UPB Móvil</h1>
              <p className="text-white/60 text-sm mt-2 font-medium tracking-widest uppercase">Campus Digital</p>
            </motion.div>
            <div className="absolute bottom-12 flex flex-col items-center gap-4">
               <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
               <p className="text-xs text-white/40">Iniciando servicios...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pt-20 px-5"
          >
            <TopAppBar title="UPB Móvil" />
            
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Buscar productos, menús..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-full text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-primary outline-none shadow-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <h2 className="text-xl font-bold text-primary mb-4">Cafeterías</h2>
            <div className="space-y-4">
              {CAFETERIAS.map(cafeteria => (
                <button 
                  key={cafeteria.id}
                  onClick={() => handleCafeteriaClick(cafeteria)}
                  className="w-full bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,30,154,0.04)] p-4 flex gap-4 items-center hover:bg-surface-container-high transition-colors text-left"
                >
                  <img src={cafeteria.image} alt={cafeteria.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-on-surface truncate">{cafeteria.name}</h3>
                      {cafeteria.status === 'Alta demanda' && (
                        <span className="bg-error-container text-on-error-container text-[10px] px-2 py-0.5 rounded-md font-bold whitespace-nowrap">
                          {cafeteria.status}
                        </span>
                      )}
                      {cafeteria.status === 'Abierto' && (
                        <span className="bg-tertiary-container/10 text-on-tertiary-container border border-on-tertiary-container/30 text-[10px] px-2 py-0.5 rounded-md font-bold whitespace-nowrap">
                          {cafeteria.status}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-on-surface-variant mb-2">
                      <MapPin className="w-4 h-4" /> {cafeteria.location}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-primary">
                      <Clock className="w-4 h-4" /> Tiempo est: {cafeteria.waitTime}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentPage === 'menu' && selectedCafeteria && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pt-20 px-5"
          >
            <TopAppBar title={selectedCafeteria.name} showBack onBack={() => setCurrentPage('home')} />
            
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Buscar producto..."
                className="w-full pl-12 pr-4 py-3 bg-surface-container-high rounded-xl text-on-surface-variant placeholder:text-outline outline-none"
              />
            </div>

            <div className="flex overflow-x-auto gap-2 pb-4 hide-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {PRODUCTS.filter(p => selectedCategory === 'Todo' || p.category === selectedCategory).map(product => (
                <div 
                  key={product.id}
                  className={`bg-white rounded-xl p-4 flex gap-4 shadow-[0px_4px_12px_rgba(0,30,154,0.04)] border border-surface-variant transition-opacity ${!product.available ? 'opacity-75' : ''}`}
                >
                  <div 
                    className="relative w-28 h-28 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg group"
                    onClick={() => handleProductClick(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${!product.available ? 'grayscale' : ''}`} 
                    />
                    {!product.available && (
                      <span className="absolute top-2 right-2 bg-error-container text-on-error-container text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Agotado
                      </span>
                    )}
                    {product.available && (
                      <span className="absolute top-2 right-2 bg-tertiary-container text-on-tertiary-container text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Disponible
                      </span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="cursor-pointer" onClick={() => handleProductClick(product)}>
                      <h3 className="font-bold text-lg text-on-surface leading-tight mb-1">{product.name}</h3>
                      <p className="text-sm text-on-surface-variant line-clamp-2 mb-2">{product.description}</p>
                      <p className="text-xl font-bold text-primary">${product.price.toLocaleString()}</p>
                    </div>
                    {product.available ? (
                      <button 
                        onClick={() => addToCart(product)}
                        className="mt-2 self-start flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold px-4 py-2 rounded-lg transition-colors active:scale-95"
                      >
                        <Plus className="w-4 h-4" /> Agregar
                      </button>
                    ) : (
                      <button 
                        disabled
                        className="mt-2 self-start flex items-center justify-center gap-2 bg-surface-dim text-outline font-bold px-4 py-2 rounded-lg cursor-not-allowed"
                      >
                        Agotado
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-24 left-0 w-full px-5 z-40"
              >
                <button 
                  onClick={() => setCurrentPage('cart')}
                  className="w-full bg-primary hover:bg-primary-container text-white rounded-xl p-4 flex items-center justify-between shadow-2xl active:scale-95 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold">
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </div>
                    <span className="font-bold">Ver carrito</span>
                  </div>
                  <span className="text-xl font-bold">${cartTotal.toLocaleString()}</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {currentPage === 'product_detail' && selectedProduct && (
          <motion.div 
            key="product_detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pb-40"
          >
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-white/80 backdrop-blur-md">
              <button 
                onClick={() => setCurrentPage('menu')}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high"
              >
                <ArrowLeft className="text-primary w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-primary">UPB Móvil</h1>
              <div className="w-10" />
            </nav>

            <div className="pt-16">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="px-5 mt-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-3xl font-bold text-primary">{selectedProduct.name}</h2>
                  <span className="text-2xl font-bold text-secondary">${selectedProduct.price.toLocaleString()}</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="mt-8 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Personaliza tu pedido</h3>
                    <p className="text-xs text-outline uppercase tracking-widest font-bold mb-4">Adiciones sugeridas</p>
                    <div className="space-y-3">
                      {['Huevo adicional (+$2.000)', 'Aguacate extra (+$3.500)'].map((opt, i) => (
                        <label key={i} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-transparent hover:border-primary-container cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <input type="checkbox" className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" />
                            <span className="text-lg">{opt.split(' (')[0]}</span>
                          </div>
                          <span className="text-sm font-bold text-on-surface-variant">{opt.split(' (')[1].replace(')', '')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-outline uppercase tracking-widest font-bold mb-4">¿Quitar ingredientes?</p>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 bg-surface-container rounded-full text-sm text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors flex items-center gap-1">
                        <X className="w-4 h-4" /> Sin cebolla
                      </button>
                      <button className="px-4 py-2 bg-surface-container rounded-full text-sm text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors flex items-center gap-1">
                        <X className="w-4 h-4" /> Sin cilantro
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs text-outline uppercase tracking-widest font-bold mb-4">Instrucciones especiales</h3>
                    <textarea 
                      className="w-full p-4 bg-white border border-outline-variant rounded-xl text-sm min-h-[100px] outline-none focus:border-primary transition-colors"
                      placeholder="Ej: Término de la carne, huevo muy frito..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="fixed bottom-20 left-0 w-full p-5 bg-white/80 backdrop-blur-md z-40 border-t border-surface-variant">
              <button 
                onClick={() => {
                  addToCart(selectedProduct);
                  setCurrentPage('menu');
                }}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg flex justify-between items-center px-6 active:scale-95 transition-transform"
              >
                <span>Agregar al pedido</span>
                <span>${selectedProduct.price.toLocaleString()}</span>
              </button>
            </div>
          </motion.div>
        )}

        {currentPage === 'cart' && (
          <motion.div 
            key="cart"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="pt-20 px-5 pb-40"
          >
            <TopAppBar title="UPB Móvil" showBack onBack={() => setCurrentPage('menu')} />
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-1">Resumen del Pedido</h2>
              <p className="text-sm text-on-surface-variant">Revisa tus productos y selecciona la hora de recogida.</p>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
                <ShoppingBasket className="w-20 h-20 mb-4 opacity-20" />
                <p>Tu carrito está vacío</p>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="mt-4 text-primary font-bold"
                >
                  Ver cafeterías
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="bg-white rounded-xl p-4 shadow-sm flex gap-4 border border-surface-variant">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-on-surface">{item.product.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-error p-1 hover:bg-error-container rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-on-surface-variant mt-1">Sin cebolla, extra queso.</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-primary">${(item.product.price * item.quantity).toLocaleString()}</span>
                          <div className="flex items-center bg-surface-container-low rounded-full">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-primary"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-primary"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4" /> Instrucciones Generales
                  </h3>
                  <div className="bg-white rounded-xl border border-outline-variant p-1 focus-within:border-primary transition-colors">
                    <textarea 
                      className="w-full bg-transparent p-3 text-sm outline-none resize-none h-24"
                      placeholder="Ej: Empacar por separado, incluir servilletas extra..."
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4" /> Hora de Recogida
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                    <button className="flex-shrink-0 px-6 py-3 rounded-xl border-2 border-secondary bg-secondary-fixed/20 flex flex-col items-center justify-center min-w-[120px]">
                      <span className="font-bold text-secondary text-sm">Lo antes posible</span>
                      <span className="text-[10px] text-secondary/70">~15 min</span>
                    </button>
                    {['12:30 PM', '1:00 PM', '1:30 PM'].map(time => (
                      <button key={time} className="flex-shrink-0 px-6 py-3 rounded-xl border border-outline-variant bg-white hover:bg-surface-container-low whitespace-nowrap min-w-[100px]">
                        <span className="text-sm font-bold">{time}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-variant mb-8">
                  <h3 className="text-xl font-bold text-primary mb-4">Resumen de Pago</h3>
                  <div className="space-y-2 text-on-surface-variant text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-on-surface">${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">Cargo por servicio <Info className="w-3 h-3 text-outline" /></span>
                      <span className="text-on-surface">$1.500</span>
                    </div>
                    <div className="h-[1px] bg-surface-variant my-2" />
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xl font-bold text-primary">Total</span>
                      <span className="text-xl font-bold text-primary">${(cartTotal + 1500).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-20 left-0 w-full p-5 bg-white/90 backdrop-blur-md z-40 border-t border-surface-variant">
                  <button 
                    onClick={() => setCurrentPage('checkout')}
                    className="w-full bg-primary hover:bg-primary-container text-white rounded-xl py-4 flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                  >
                    <span className="font-bold uppercase tracking-wide">Confirmar pedido</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {currentPage === 'checkout' && (
          <motion.div 
            key="checkout"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-20 px-5"
          >
            <TopAppBar title="UPB Móvil" showBack onBack={() => setCurrentPage('cart')} />
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary mb-1">Identificación</h2>
              <p className="text-on-surface-variant">Paso 2 de 3 • Finaliza tu pedido</p>
            </div>

            <div className="bg-primary/5 rounded-xl p-4 flex gap-4 mb-8 border border-primary-container/10">
              <Info className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-primary mb-1">Datos para entrega</h3>
                <p className="text-sm text-on-surface-variant">
                  Como no tienes una sesión iniciada, necesitamos esta información para contactarte y coordinar la entrega de tu pedido en el campus.
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider pl-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Ej. Juan Pérez"
                    className="w-full h-14 pl-12 pr-4 bg-white border border-outline-variant rounded-xl focus:border-primary outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider pl-1">Número de Teléfono</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                  <input 
                    type="tel" 
                    placeholder="Ej. 71234567"
                    className="w-full h-14 pl-12 pr-4 bg-white border border-outline-variant rounded-xl focus:border-primary outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider pl-1">Correo Institucional</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                  <input 
                    type="email" 
                    placeholder="usuario@upb.edu"
                    className="w-full h-14 pl-12 pr-4 bg-white border border-outline-variant rounded-xl focus:border-primary outline-none transition-all shadow-sm"
                  />
                </div>
                <p className="text-[10px] text-outline mt-2 pl-1">Enviaremos tu recibo a esta dirección.</p>
              </div>
            </form>

            <div className="fixed bottom-20 left-0 w-full p-5 bg-white/80 backdrop-blur-md z-40 border-t border-surface-variant">
              <button 
                onClick={() => {
                  setCart([]);
                  setCurrentPage('tracking');
                }}
                className="w-full h-14 rounded-full bg-primary-container text-white font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <span>Continuar al pago</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {currentPage === 'tracking' && (
          <motion.div 
            key="tracking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-20 px-5"
          >
            <TopAppBar title="UPB Móvil" showBack onBack={() => setCurrentPage('home')} />
            
            <h2 className="text-xl font-bold text-primary mb-6">Seguimiento de Pedido</h2>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-surface-container mb-6">
              <div className="space-y-8 relative">
                <div className="absolute left-3 top-6 bottom-6 w-[2px] bg-surface-container-high" />
                
                <div className="flex gap-6 relative">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10 ring-4 ring-white">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Recibido</h3>
                    <p className="text-sm text-on-surface-variant">10:45 AM - Orden confirmada</p>
                  </div>
                </div>

                <div className="flex gap-6 relative">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10 ring-4 ring-white">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Preparando</h3>
                    <p className="text-sm text-on-surface-variant">Tu pedido está en cocina</p>
                  </div>
                </div>

                <div className="flex gap-6 relative">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-outline-variant z-10 ring-4 ring-white" />
                  <div>
                    <h3 className="font-bold text-outline-variant">Listo para recoger</h3>
                    <p className="text-sm text-outline">Te avisaremos cuando esté listo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-container mb-6">
              <h3 className="text-xl font-bold text-primary mb-4">Resumen del pedido</h3>
              <div className="space-y-3 mb-6 pb-4 border-b border-surface-variant">
                <div className="flex justify-between">
                  <span className="text-sm">1x Menú Ejecutivo - Pollo al Horno</span>
                  <span className="font-bold">Bs. 25.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">1x Jugo de Maracuyá</span>
                  <span className="font-bold">Bs. 5.00</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-on-surface-variant">Total</span>
                <span className="text-2xl font-bold text-primary">Bs. 30.00</span>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-lg">
                <MapPin className="text-primary w-5 h-5" />
                <span className="text-sm text-on-surface-variant">Recoger en: Cafetería Central</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="flex items-center gap-2 text-error font-bold px-6 py-2 hover:bg-error-container rounded-full transition-colors">
                <X className="w-5 h-5" /> Cancelar Pedido
              </button>
            </div>
          </motion.div>
        )}

        {currentPage === 'history' && (
          <motion.div 
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-20 px-5"
          >
            <TopAppBar title="UPB Móvil" showBack onBack={() => setCurrentPage('home')} />
            
            <section className="mb-10">
              <h2 className="text-xl font-bold text-primary mb-4">Pedido Activo</h2>
              <div 
                onClick={() => setCurrentPage('tracking')}
                className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-secondary cursor-pointer hover:bg-surface-container-low transition-all active:scale-95"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">Café Central</h3>
                  <span className="bg-secondary-fixed/20 text-on-secondary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    En preparación
                  </span>
                </div>
                <div className="flex items-center gap-3 py-3 border-y border-surface-variant/50 my-3">
                  <Utensils className="text-secondary w-5 h-5" />
                  <p className="text-sm text-on-surface-variant">1x Bandeja Paisa, 1x Jugo de Mora</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-primary">Total: Bs. 32.500</p>
                  <span className="flex items-center gap-1 text-secondary text-sm font-bold">
                    Rastrear pedido <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary mb-6">Historial de Pedidos</h2>
              
              <div className="space-y-10">
                {['Hoy', 'Ayer', '15 de Mayo'].map(date => (
                  <div key={date}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-[1px] flex-1 bg-outline-variant" />
                      <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{date}</span>
                      <div className="h-[1px] flex-1 bg-outline-variant" />
                    </div>
                    
                    <div className="space-y-4">
                      {HISTORY.filter(h => h.date === date).map(order => (
                        <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-surface-container hover:bg-surface-container-high transition-colors cursor-pointer group">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center">
                                <Utensils className="text-primary w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="font-bold text-on-surface">{order.cafeteriaName}</h4>
                                <p className="text-xs text-on-surface-variant line-clamp-1">
                                  {order.items.length > 0 ? order.items.map(i => i.product.name).join(', ') : 'Pedido cargando...'}
                                </p>
                                <p className="text-xs font-bold text-primary mt-1">Bs. {order.total.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded-md">
                                {order.status}
                              </span>
                              <ChevronRight className="w-5 h-5 text-outline group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNavBar />
    </div>
  );
}
