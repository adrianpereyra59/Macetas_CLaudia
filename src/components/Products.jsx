import React from 'react';

// Generamos una lista de productos a partir de las fotos (tú puedes ajustar títulos/precios)
const PRODUCTS = Array.from({ length: 15 }).map((_, i) => {
  const id = i + 1;
  return {
    id,
    title: `Maceta ${id}`,
    price: 2500 + (i % 5) * 300, // ejemplo de precios
    img: `/images/portfolio-${id}.jpg`,
    description: 'Maceta pintada a mano, ideal para interiores y exteriores.'
  };
});

export default function Products({ onAddToCart, onViewImage }) {
  return (
    <section id="productos" className="products container">
      <h2>Nuestras macetas</h2>
      <div className="products-grid">
        {PRODUCTS.map((p, idx) => (
          <article className="product-card" key={p.id}>
            <div className="product-media">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                onClick={() => onViewImage(idx)}
              />
            </div>
            <div className="product-body">
              <h3>{p.title}</h3>
              <p className="muted">{p.description}</p>
              <div className="product-footer">
{/*                 <div className="price">${p.price.toLocaleString()}</div>
 */}                <div>
                  <button className="btn-sm" onClick={() => onAddToCart(p)}>Agregar</button>
                  <button className="btn-link" onClick={() => onViewImage(idx)}>Ver</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}