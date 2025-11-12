import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Cart from './components/Cart';
import Footer from './components/Footer';
import './styles.css';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  }

  function updateQty(productId, qty) {
    setCart((prev) => prev.map((p) => (p.id === productId ? { ...p, qty } : p)));
  }

  function openGalleryAt(index) {
    setGalleryIndex(index);
    setGalleryOpen(true);
  }

  return (
    <>
      <Header cartCount={cart.reduce((s, p) => s + p.qty, 0)} onOpenCart={() => document.getElementById('cart-button')?.click()} />
      <main>
        <Hero onShopNow={() => window.scrollTo({ top: document.getElementById('productos').offsetTop - 80, behavior: 'smooth' })} />
        <Products onAddToCart={addToCart} onViewImage={openGalleryAt} />
        <section className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Galería</h2>
        </section>
        <Gallery open={galleryOpen} startIndex={galleryIndex} onClose={() => setGalleryOpen(false)} onOpenAt={openGalleryAt} />
      </main>

      <Cart
        id="cart-button"
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onClose={() => {}}
      />

      <Footer />
    </>
  );
}