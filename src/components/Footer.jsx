import React from 'react';

export default function Footer() {
  return (
    <footer id="contacto" className="site-footer">
      <div className="container footer-inner">
        <div>
          <h3>Contacto</h3>
          <p>Email: <a href="mailto:tu@ejemplo.com">acardenada@gmail.com</a></p>
          <p className="muted">{/* Envíos a todo el país.  */}Consultas por stock y personalización.</p>
        </div>
        <div class="Whatsapp_container">
        <button class="btn_whatsapp">
          <img src="/public/images/whatsapp-logo-popular-social-media-button-icon-free-png.webp" alt="" />
            <a
                href="http://wa.me/+542613410395?text=Hola,%20visité%20la%20áagina%20y%20quiero%20consultar%20por%20las%20Macetas%20">
                <i class="bi bi-whatsapp">envianos tu consulta</i>

            </a>
        </button>
    </div>
        <div>
          <p>&copy; {new Date().getFullYear()} Macetas Artesanales</p>
        </div>
      </div>
    </footer>
  );
}