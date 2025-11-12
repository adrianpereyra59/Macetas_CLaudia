import React, { useEffect, useState, useRef } from 'react';

// Lista de imágenes (15)
const IMAGES = Array.from({ length: 15 }).map((_, i) => `/images/portfolio-${i + 1}.jpg`);

// Simple carousel/modal con animaciones CSS + control por teclado
export default function Gallery({ open = false, startIndex = 0, onClose = () => {}, onOpenAt = () => {} }) {
  const [visible, setVisible] = useState(open);
  const [index, setIndex] = useState(startIndex || 0);
  const [anim, setAnim] = useState(''); // 'left' | 'right' | ''
  const overlayRef = useRef(null);

  useEffect(() => {
    setVisible(open);
    if (typeof startIndex === 'number') setIndex(startIndex);
  }, [open, startIndex]);

  useEffect(() => {
    function onKey(e) {
      if (!visible) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, index]);

  useEffect(() => {
    // open when a custom event is triggered with index
    function handler(e) {
      const i = typeof e.detail === 'number' ? e.detail : 0;
      setIndex(i);
      setVisible(true);
    }
    window.addEventListener('open-gallery-at', handler);
    return () => window.removeEventListener('open-gallery-at', handler);
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(() => onClose(), 250);
  }

  function prev() {
    setAnim('left');
    setTimeout(() => {
      setIndex((s) => (s - 1 + IMAGES.length) % IMAGES.length);
      setAnim('');
    }, 200);
  }

  function next() {
    setAnim('right');
    setTimeout(() => {
      setIndex((s) => (s + 1) % IMAGES.length);
      setAnim('');
    }, 200);
  }

  if (!visible) return null;

  return (
    <div className="gallery-modal" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}>
      <div className="gallery-inner" role="dialog" aria-modal="true">
        <button className="close-x" onClick={handleClose} aria-label="Cerrar">✕</button>
        <div className="carousel">
          <button className="nav left" onClick={prev} aria-label="Anterior">‹</button>
          <div className={`slide ${anim}`}>
            <img src={IMAGES[index]} alt={`Trabajo ${index + 1}`} loading="lazy" />
          </div>
          <button className="nav right" onClick={next} aria-label="Siguiente">›</button>
        </div>
        <div className="thumbs">
          {IMAGES.map((src, i) => (
            <button
              key={i}
              className={`thumb ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}