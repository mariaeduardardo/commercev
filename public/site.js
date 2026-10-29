/*
  Commerce Visual — scripts comuns a todas as páginas (PT-BR)
  1. Banner de cookies (LGPD) no idioma da página, versão clara com a identidade do site
  Hoje o site não usa cookies de análise nem de marketing: o banner só registra a escolha.
  Se um dia forem instalados, coloque o código dentro de carregarAnalise() / carregarMarketing().
*/
(function () {
  'use strict';

  var doc = document, html = doc.documentElement;
  var LANG = 'pt-br';

  function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function gravar(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* navegação privada */ } }

  var PRIV = { 'pt-br': '/politica-de-privacidade' };

  var T = {
    'pt-br': {
      titulo: 'Sua privacidade é importante',
      texto: 'Usamos apenas recursos essenciais para o site funcionar e guardar suas escolhas. Hoje não usamos cookies de análise nem de marketing; se isso mudar, eles só serão ativados com a sua permissão.',
      politica: 'Política de Privacidade', aceitar: 'Aceitar todos', recusar: 'Recusar opcionais', personalizar: 'Personalizar',
      modal: 'Preferências de cookies', modalTxt: 'Escolha quais cookies você permite. Você pode mudar isso a qualquer momento pelo link "Preferências de cookies" no rodapé.',
      saiba: 'Saiba mais', fechar: 'Fechar preferências de cookies', salvar: 'Salvar preferências',
      nec: 'Necessários', sempre: 'Sempre ativos', necTxt: 'Essenciais para o site funcionar e para guardar suas escolhas de idioma e privacidade. Não podem ser desligados.',
      ana: 'Análise', anaTxt: 'Ajudariam a entender como o site é usado, de forma agregada (ex.: Google Analytics). Não usados hoje.',
      mkt: 'Marketing', mktTxt: 'Permitiriam anúncios e conteúdos personalizados em redes sociais (ex.: Meta Pixel). Não usados hoje.',
      sugestao: 'Esta página está disponível em português do Brasil', ir: 'Ver em PT-BR', dispensar: 'Dispensar sugestão de idioma'
    }
  };
  var t = T[LANG];

  /* ---------------- estilos (identidade Commerce Visual, sempre em modo claro) ---------------- */
  var css = '' +
    '.cvc,.cvc-modal{--cvc-yel:#ffdf00;--cvc-cream:#fffbe0;--cvc-blue:#0040ff;--cvc-blue-d:#0030c4;--cvc-sky:#dce8ff;--cvc-ink:#0b2a8a;--cvc-orange:#ff861a;color-scheme:light;font-family:Montserrat,"Segoe UI",system-ui,sans-serif;color:var(--cvc-ink);line-height:1.45;forced-color-adjust:none}' +
    '.cvc *,.cvc-modal *{box-sizing:border-box}' +
    '.cvc{position:fixed;z-index:9998;left:50%;transform:translateX(-50%);bottom:max(20px,env(safe-area-inset-bottom,0px));width:min(1240px,calc(100vw - 40px));display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:28px;background:var(--cvc-cream);border:3px solid var(--cvc-yel);border-radius:24px;padding:22px 28px;box-shadow:0 18px 40px rgba(0,64,255,.2),0 2px 0 #fff inset;animation:cvc-sobe .55s cubic-bezier(.16,1,.3,1) both}' +
    '.cvc[hidden],.cvc-overlay[hidden]{display:none}' +
    '@keyframes cvc-sobe{from{opacity:0;transform:translate(-50%,48px)}to{opacity:1;transform:translate(-50%,0)}}' +
    '.cvc-title{margin:0 0 6px;color:var(--cvc-blue);font-family:Fredoka,Montserrat,system-ui,sans-serif;font-size:28px;font-weight:600;line-height:1.1}' +
    '.cvc-text{margin:0;font-size:14.5px;font-weight:500;max-width:62ch;color:var(--cvc-ink)}' +
    '.cvc-text a,.cvc-modal a{display:inline-block;margin-top:6px;color:var(--cvc-blue);font-weight:700;text-decoration:underline;text-underline-offset:3px}' +
    '.cvc-actions{display:grid;grid-template-columns:repeat(3,190px);gap:12px}' +
    '.cvc-btn{font-family:Fredoka,Montserrat,system-ui,sans-serif;font-size:17px;font-weight:600;min-height:52px;padding:10px 18px;border-radius:999px;cursor:pointer;background:#fff;color:var(--cvc-blue);border:2px solid var(--cvc-blue);transition:background .2s,transform .15s}' +
    '.cvc-btn:hover{background:var(--cvc-sky)}.cvc-btn:active{transform:scale(.97)}' +
    '.cvc-btn-primary{background:linear-gradient(180deg,#2a62ff,var(--cvc-blue) 60%,var(--cvc-blue-d));border-color:var(--cvc-blue-d);color:#fff;box-shadow:0 8px 18px rgba(0,64,255,.35)}' +
    '.cvc-btn-primary:hover{background:var(--cvc-blue-d);color:#fff}' +
    '.cvc-btn-yel{background:var(--cvc-yel);border-color:var(--cvc-yel);color:var(--cvc-ink);box-shadow:0 6px 14px rgba(255,190,0,.35)}' +
    '.cvc-btn-yel:hover{background:#ffcc00;border-color:#ffcc00}' +
    '.cvc :focus-visible,.cvc-modal :focus-visible,.cv-sug :focus-visible{outline:3px solid var(--cvc-orange);outline-offset:3px}' +
    '.cvc-overlay{position:fixed;inset:0;z-index:9999;background:rgba(11,42,138,.45);display:grid;place-items:center;padding:20px 16px}' +
    '.cvc-modal{position:relative;width:min(580px,100%);max-height:calc(100vh - 40px);overflow-y:auto;background:var(--cvc-cream);border:3px solid var(--cvc-yel);border-radius:24px;padding:28px;box-shadow:0 30px 70px rgba(11,42,138,.3)}' +
    '.cvc-modal h2{margin:0 0 8px;padding-right:48px;color:var(--cvc-blue);font-family:Fredoka,Montserrat,system-ui,sans-serif;font-size:26px;font-weight:600;line-height:1.1}' +
    '.cvc-modal>p{margin:0 0 18px;font-size:14px;color:var(--cvc-ink)}' +
    '.cvc-close{position:absolute;top:16px;right:16px;width:40px;height:40px;border-radius:50%;border:2px solid var(--cvc-blue);background:#fff;color:var(--cvc-blue);font-size:24px;font-weight:600;line-height:1;cursor:pointer}' +
    '.cvc-close:hover{background:var(--cvc-sky)}' +
    '.cvc-cat{background:#fff;border:2px solid #ffe680;border-radius:18px;padding:14px 18px;margin-bottom:10px}' +
    '.cvc-cat-head{display:flex;align-items:center;justify-content:space-between;gap:16px}' +
    '.cvc-cat-head label{color:var(--cvc-ink);font-weight:700;font-size:15px;cursor:pointer}' +
    '.cvc-cat p{margin:6px 0 0;font-size:13px;color:#3c4a75}' +
    '.cvc-tag{display:inline-block;margin-left:6px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--cvc-ink);background:var(--cvc-yel);padding:3px 8px;border-radius:999px;vertical-align:middle}' +
    '.cvc-switch{position:relative;flex:none;width:52px;height:30px}' +
    '.cvc-switch input{position:absolute;inset:0;opacity:0;margin:0;cursor:pointer;z-index:1}' +
    '.cvc-switch span{position:absolute;inset:0;border-radius:999px;background:#c5d0ee;transition:background .2s;pointer-events:none}' +
    '.cvc-switch span::after{content:"";position:absolute;top:4px;left:4px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 2px 4px rgba(0,0,0,.2);transition:transform .2s}' +
    '.cvc-switch input:checked+span{background:var(--cvc-blue)}.cvc-switch input:checked+span::after{transform:translateX(22px)}' +
    '.cvc-switch input:disabled+span{background:var(--cvc-blue);opacity:.5}' +
    '.cvc-switch input:focus-visible+span{outline:3px solid var(--cvc-orange);outline-offset:3px}' +
    '.cvc-modal-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}' +
    '.cvc-modal-actions .cvc-btn{font-size:15px;min-height:48px;padding:8px 10px}' +
    '@media (max-width:1080px){.cvc{grid-template-columns:1fr;gap:16px}.cvc-actions{grid-template-columns:repeat(3,1fr)}}' +
    '@media (max-width:640px){.cvc{width:calc(100vw - 24px);bottom:max(12px,env(safe-area-inset-bottom,0px));padding:16px;gap:12px;border-radius:20px}.cvc-title{font-size:20px}.cvc-text{font-size:12.5px}.cvc-actions{grid-template-columns:1fr 1fr;gap:8px}.cvc-actions .cvc-btn-primary{grid-column:1/-1}.cvc-modal-actions{grid-template-columns:1fr;gap:8px}.cvc-btn{min-height:44px;font-size:15px;padding:8px 16px}.cvc-overlay{align-items:end;padding:0}.cvc-modal{border-radius:24px 24px 0 0;max-height:92vh;padding:24px 18px calc(20px + env(safe-area-inset-bottom,0px))}}' +
    '@media (prefers-reduced-motion:reduce){.cvc{animation:none}}' +
    '@media print{.cvc,.cvc-overlay,.cv-sug{display:none!important}}' +
    /* barra de sugestão de idioma */
    '.cv-sug{position:relative;z-index:60;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:8px 52px 8px 16px;background:var(--cvc-yel,#ffdf00);color:#0b2a8a;color-scheme:light;font:600 14px/1.4 Montserrat,system-ui,sans-serif;text-align:center}' +
    '.cv-sug a{color:#0b2a8a;font-weight:700;text-decoration:underline;text-underline-offset:3px}' +
    '.cv-sug button{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:36px;height:36px;border:0;border-radius:50%;background:transparent;color:#0b2a8a;font-size:22px;line-height:1;cursor:pointer}' +
    '.cv-sug button:hover{background:#ffcc00}' +
    '@media (max-width:640px){.cv-sug{font-size:13px;gap:2px 10px;padding:6px 46px 6px 12px}}';
  var st = doc.createElement('style'); st.textContent = css; doc.head.appendChild(st);

  /* ---------------- 1. banner de cookies ---------------- */
  var CHAVE = 'cv_consentimento_cookies', VERSAO = 2, VALIDADE = 365 * 864e5;
  function lerConsent() {
    try { var c = JSON.parse(ler(CHAVE) || 'null'); if (c && c.v === VERSAO && Date.now() - c.data < VALIDADE) return c; } catch (e) { }
    return null;
  }
  function carregarAnalise() { /* nenhum script de análise instalado */ }
  function carregarMarketing() { /* nenhum script de marketing instalado */ }
  function aplicar(c) { if (c.analise) carregarAnalise(); if (c.marketing) carregarMarketing(); }

  function el(h) { var d = doc.createElement('div'); d.innerHTML = h; return d.firstChild; }
  var banner, overlay, ultimoFoco;

  function montar() {
    if (banner) return;
    banner = el('<section class="cvc" role="dialog" aria-modal="false" aria-labelledby="cvc-titulo" aria-describedby="cvc-desc" hidden>' +
      '<div><h2 class="cvc-title" id="cvc-titulo">' + t.titulo + '</h2><p class="cvc-text" id="cvc-desc">' + t.texto + '<br><a href="' + PRIV[LANG] + '">' + t.politica + '</a></p></div>' +
      '<div class="cvc-actions"><button type="button" class="cvc-btn cvc-btn-primary" data-cvc="aceitar">' + t.aceitar + '</button>' +
      '<button type="button" class="cvc-btn cvc-btn-yel" data-cvc="recusar">' + t.recusar + '</button>' +
      '<button type="button" class="cvc-btn" data-cvc="personalizar">' + t.personalizar + '</button></div></section>');
    function cat(id, nome, txt, tag, fixo) {
      return '<div class="cvc-cat"><div class="cvc-cat-head"><label for="cvc-' + id + '">' + nome + (tag ? ' <span class="cvc-tag">' + tag + '</span>' : '') + '</label>' +
        '<span class="cvc-switch"><input type="checkbox" id="cvc-' + id + '"' + (fixo ? ' checked disabled' : ' role="switch"') + ' aria-describedby="cvc-' + id + '-d"><span></span></span></div>' +
        '<p id="cvc-' + id + '-d">' + txt + '</p></div>';
    }
    overlay = el('<div class="cvc-overlay" hidden><div class="cvc-modal" role="dialog" aria-modal="true" aria-labelledby="cvc-mt">' +
      '<button type="button" class="cvc-close" data-cvc="fechar" aria-label="' + t.fechar + '">×</button>' +
      '<h2 id="cvc-mt">' + t.modal + '</h2><p>' + t.modalTxt + ' <a href="' + PRIV[LANG] + '#cookies">' + t.saiba + '</a></p>' +
      cat('nec', t.nec, t.necTxt, t.sempre, true) + cat('analise', t.ana, t.anaTxt) + cat('marketing', t.mkt, t.mktTxt) +
      '<div class="cvc-modal-actions"><button type="button" class="cvc-btn cvc-btn-primary" data-cvc="salvar">' + t.salvar + '</button>' +
      '<button type="button" class="cvc-btn cvc-btn-yel" data-cvc="aceitar">' + t.aceitar + '</button>' +
      '<button type="button" class="cvc-btn" data-cvc="recusar">' + t.recusar + '</button></div></div></div>');
    doc.body.appendChild(banner); doc.body.appendChild(overlay);
    doc.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-cvc]'); if (!b) return;
      var a = b.getAttribute('data-cvc');
      if (a === 'aceitar') salvar({ analise: true, marketing: true });
      else if (a === 'recusar') salvar({ analise: false, marketing: false });
      else if (a === 'personalizar') abrirModal();
      else if (a === 'salvar') salvar({ analise: doc.getElementById('cvc-analise').checked, marketing: doc.getElementById('cvc-marketing').checked });
      else if (a === 'fechar') fecharModal();
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) fecharModal(); });
    doc.addEventListener('keydown', function (e) {
      if (overlay.hidden) return;
      if (e.key === 'Escape') fecharModal();
      if (e.key === 'Tab') {
        var f = overlay.querySelectorAll('button:not([disabled]),input:not([disabled]),a[href]'), p = f[0], u = f[f.length - 1];
        if (e.shiftKey && doc.activeElement === p) { e.preventDefault(); u.focus(); }
        else if (!e.shiftKey && doc.activeElement === u) { e.preventDefault(); p.focus(); }
      }
    });
  }
  function mostrarBanner() { montar(); banner.hidden = false; }
  function abrirModal() {
    montar(); ultimoFoco = doc.activeElement;
    var c = lerConsent() || {};
    doc.getElementById('cvc-analise').checked = !!c.analise;
    doc.getElementById('cvc-marketing').checked = !!c.marketing;
    overlay.hidden = false; overlay.querySelector('.cvc-close').focus();
  }
  function fecharModal() { if (!overlay) return; overlay.hidden = true; if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus(); }
  function salvar(c) {
    c.v = VERSAO; c.data = Date.now(); c.necessarios = true;
    gravar(CHAVE, JSON.stringify(c)); aplicar(c);
    if (banner) banner.hidden = true; fecharModal();
  }

  /* links "Preferências de cookies" (rodapé e política) abrem as preferências */
  doc.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-cvc-open]'); if (!a) return;
    e.preventDefault(); abrirModal();
  });

  function iniciar() {
    var c = lerConsent();
    if (c) aplicar(c); else mostrarBanner();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
