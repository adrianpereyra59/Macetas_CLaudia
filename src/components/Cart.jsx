import React, { useEffect, useState } from 'react';

export default function Cart({ items = [], onRemove = () => {}, onUpdateQty = () => {}, id }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler() {
      setOpen(true);
    }
    window.addEventListener('open-cart', handler);
    return () => window.removeEventListener('open-cart', handler);
  }, []);

  const total = items.reduce((s, p) => s + p.price * p.qty, 0);

  function checkout() {
    // simple checkout: open mailto with order summary (you can integrate a real gateway)
    const body = encodeURIComponent(
      `Hola, quiero comprar:\n\n${items.map((i) => `${i.title} x${i.qty} - $${i.price}`).join('\n')}\n\nTotal: $${total}\n\nGracias.`
    );
    window.location.href = `mailto:tu@ejemplo.com?subject=Pedido macetas&body=${body}`;
  }

  if (!open) return null;

  return (
    <div className="cart-modal" onClick={(e) => { if (e.target.classList.contains('cart-modal')) setOpen(false); }}>
      <div className="cart-inner" role="dialog">
        <button className="close-x" onClick={() => setOpen(false)}>✕</button>
        <h3>Tu carrito</h3>
        {items.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div>
            <ul className="cart-list">
              {items.map((it) => (
                <li key={it.id}>
                  <img src={it.img || `/images/portfolio-${it.id}.jpg`} alt={it.title} />
                  <div>
                    <strong>{it.title}</strong>
                    <div className="muted">${it.price.toLocaleString()}</div>
                    <div className="cart-actions">
                      <input
                        type="number"
                        min="1"
                        value={it.qty}
                        onChange={(e) => onUpdateQty(it.id, Math.max(1, Number(e.target.value)))}
                        aria-label="Cantidad"
                      />
                      <button className="btn-sm" onClick={() => onRemove(it.id)}>Eliminar</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <div>Total: <strong>${total.toLocaleString()}</strong></div>
              <div>
                <button className="btn" onClick={checkout}>Finalizar compra</button>
                <button className="btn-muted" onClick={() => { window.localStorage.removeItem('cart'); window.location.reload(); }} style={{ marginLeft: '0.5rem' }}>Vaciar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}