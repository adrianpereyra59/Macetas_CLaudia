import React from 'react';

// Si pones public/images/hero.jpg se usará. Si no existe, se usará portfolio-1.jpg
const heroUrl = (() => {
  const heroCandidate = '/images/hero.jpg';
  return heroCandidate;
})();

export default function Hero({ onShopNow }) {
  const style = {
    backgroundImage: `url('${heroUrl || '/images/portfolio-1.jpg'}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <section className="hero hero-shop" style={style}>
      <div className="container hero-content">
        <h1>Macetas artesanales — hechas con cariño</h1>
        <p>Descubrí macetas únicas, pintadas a mano. Envíos a todo el país.</p>
        <div style={{ marginTop: '1rem' }}>
          <button className="btn" onClick={onShopNow}>Comprar ahora</button>
          <a href="#portafolio" className="btn btn-muted" style={{ marginLeft: '0.6rem' }}>Ver galería</a>
        </div>
      </div>
    </section>
  );
}