import React, { useState } from 'react';

export default function Header({ cartCount = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">Macetas Artesanales</div>
        <nav className={`main-nav ${open ? 'open' : ''}`}>
          <a href="#productos" onClick={() => setOpen(false)}>Productos</a>
          <a href="#portafolio" onClick={() => setOpen(false)}>Galería</a>
          <a href="#contacto" onClick={() => setOpen(false)}>Contacto</a>
        </nav>
        <div className="header-actions">
          <button
            className="btn-cart"
            id="cart-button"
            onClick={() => {
              // dispatch a custom event to open cart modal
              window.dispatchEvent(new CustomEvent('open-cart'));
            }}
            aria-label="Abrir carrito"
            title="Carrito"
          >
            🛒
            <span className="cart-count">{cartCount}</span>
          </button>
          <button className="hamb" onClick={() => setOpen((s) => !s)} aria-label="Menu">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}