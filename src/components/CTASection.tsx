import React from 'react';
import { SITE_CONFIG } from '../data/siteData';
import './cta.css';

/*
  Chamada final no padrão das outras seções:
  selo + título 3D + subtítulo + um botão de 60 px (máx. 360 px de largura).
*/
export const CTASection: React.FC = () => (
  <section className="cvc2" aria-labelledby="cvc2-titulo">
    <div className="cvc2-in">
      <p className="cvc2-selo">Vamos conversar</p>
      <h2 id="cvc2-titulo" className="cvc2-titulo">
        Pronto para tirar seu <span>projeto do papel?</span>
      </h2>
      <p className="cvc2-sub">Orçamento gratuito e sem compromisso pelo WhatsApp.</p>
      <a className="cvc2-btn" href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm4.5 11.96c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.75 4.75 0 0 0 1 2.52 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" /></svg>
        Falar no WhatsApp
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </section>
);

export default CTASection;
