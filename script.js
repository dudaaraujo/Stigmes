/* ============================================================
   STIGMÉS — lógica do app (JS puro)
   ============================================================ */

/* ---- Login com Google (Google Identity Services) ---- */
// Cole aqui o seu Client ID (ver INSTALACAO.md → seção Login Google).
const GOOGLE_CLIENT_ID = "859071487984-7dnmm6tql49updmqrtnoj988refi81f1.apps.googleusercontent.com";

const AUTH = {
  get user() {
    try { return JSON.parse(localStorage.getItem('stigmes_user') || 'null'); }
    catch { return null; }
  },
  set user(u) {
    if (u) localStorage.setItem('stigmes_user', JSON.stringify(u));
    else localStorage.removeItem('stigmes_user');
  },

  // Decodifica o token JWT que o Google devolve (só a parte de dados, sem validar assinatura)
  decode(jwt) {
    try {
      const base = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(atob(base).split('').map((c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return JSON.parse(json);
    } catch { return null; }
  },

  // Chamado pelo Google quando o login dá certo
  handleCredential(response) {
    const info = AUTH.decode(response.credential);
    if (!info) return;
    const first = (info.given_name || info.name || 'Você').trim();
    AUTH.user = {
      id: 'g_' + (info.sub || Date.now()),
      name: first,
      fullName: info.name || first,
      email: info.email || '',
      picture: info.picture || '',
      initials: (info.name || first).split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase(),
      color: '#1E5AA8',
    };
    AUTH.ensureMember();
    enterApp();
  },

  // Garante que o usuário logado está: (1) na lista local, (2) na aba Usuarios,
  // e (3) ligado à viagem atual na aba Participantes.
  // Seguro para chamar várias vezes: cada envio só acontece uma vez.
  ensureMember() {
    const u = AUTH.user;
    if (!u) return;
    // (1) lista local da viagem
    if (!MEMBERS.find((m) => m.id === u.id)) {
      MEMBERS.unshift({ id: u.id, name: u.name, initials: u.initials, color: u.color, admin: true, canExpense: true });
    }
    if (!SYNC.url) return;
    // (2) cadastro do usuário (uma vez por usuário)
    const uKey = 'stigmes_user_saved_' + u.id;
    if (!localStorage.getItem(uKey)) {
      SYNC.save('Usuarios', { id: u.id, name: u.fullName || u.name, email: u.email || '', picture: u.picture || '', initials: u.initials, color: u.color })
        .then((r) => { if (r && r.ok) localStorage.setItem(uKey, '1'); });
    }
    // (3) participação na viagem (uma vez por usuário+viagem)
    const pKey = 'stigmes_part_saved_' + u.id + '_' + TRIP.id;
    if (!localStorage.getItem(pKey)) {
      SYNC.save('Participantes', { id: u.id + '_' + TRIP.id, tripId: TRIP.id, userId: u.id, papel: 'admin', canExpense: true, status: 'ativo' })
        .then((r) => { if (r && r.ok) localStorage.setItem(pKey, '1'); });
    }
  },

  signOut() {
    AUTH.user = null;
    if (window.google && google.accounts && google.accounts.id) google.accounts.id.disableAutoSelect();
    location.reload();
  },

  configured() {
    return GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.startsWith('COLE_');
  },
};

/* ---- Sincronização com Google Sheets (via Apps Script) ---- */
const SYNC = {
  get url() { return localStorage.getItem('stigmes_sheet_url') || ''; },
  set url(v) { localStorage.setItem('stigmes_sheet_url', v || ''); },
  status: 'off', // off | ok | erro | ...

  async load() {
    if (!this.url) return false;
    this.status = 'carregando';
    try {
      const data = await this.jsonp(this.url);
      // Monta a lista de membros da viagem cruzando Usuarios × Participantes
      if (data.Usuarios && data.Usuarios.length) {
        const usersById = {};
        data.Usuarios.forEach((u) => { usersById[u.id] = u; });
        const parts = (data.Participantes || []).filter((p) => String(p.tripId) === TRIP.id);
        if (parts.length) {
          MEMBERS = parts.map((p) => {
            const u = usersById[p.userId] || {};
            return {
              id: p.userId,
              name: (u.name || 'Usuário').split(/\s+/)[0],
              initials: u.initials || '??',
              color: u.color || '#1E5AA8',
              admin: String(p.papel) === 'admin',
              canExpense: p.canExpense === true || p.canExpense === 'TRUE' || p.canExpense === 'sim',
            };
          });
        }
      }
      if (data.Despesas && data.Despesas.length) {
        EXPENSES = data.Despesas.map((e) => ({ ...e, amount: Number(e.amount) || 0 }));
      }
      if (data.Roteiro && data.Roteiro.length) ITINERARY = rebuildItinerary(data.Roteiro);
      if (data.Memorias && data.Memorias.length) {
        POSTS = data.Memorias.map((p) => ({ ...p, likes: Number(p.likes)||0, comments: Number(p.comments)||0 }));
      }
      this.status = 'ok';
      return true;
    } catch (err) {
      this.status = 'erro';
      console.error('Falha ao ler planilha:', err);
      return false;
    }
  },

  // Leitura via JSONP: contorna o bloqueio de CORS que o fetch sofre
  // ao ler respostas do Apps Script (que redireciona para outro domínio).
  jsonp(url, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const cb = 'stigmes_cb_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
      const sep = url.includes('?') ? '&' : '?';
      const script = document.createElement('script');
      let done = false;
      const cleanup = () => {
        done = true;
        delete window[cb];
        if (script.parentNode) script.parentNode.removeChild(script);
        clearTimeout(timer);
      };
      const timer = setTimeout(() => { if (!done) { cleanup(); reject(new Error('Tempo esgotado')); } }, timeoutMs);
      window[cb] = (data) => { if (!done) { cleanup(); resolve(data); } };
      script.onerror = () => { if (!done) { cleanup(); reject(new Error('Falha ao carregar')); } };
      script.src = url + sep + 'callback=' + cb;
      document.body.appendChild(script);
    });
  },

  // Salva uma linha. Usa "no-cors" como fallback: o Apps Script recebe,
  // mas o navegador não lê a resposta — por isso atualizamos o app localmente também.
  async save(sheet, row) {
    if (!this.url) return { ok: false, offline: true };
    try {
      await fetch(this.url, {
        method: 'POST',
        mode: 'no-cors', // envia sem exigir leitura da resposta (evita bloqueio CORS)
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // evita preflight
        body: JSON.stringify({ sheet, row }),
      });
      return { ok: true };
    } catch (err) {
      console.error('Falha ao salvar na planilha:', err);
      return { ok: false, error: String(err) };
    }
  },
};

// Reconstrói a estrutura de ITINERARY (dias com items) a partir das linhas planas da planilha
function rebuildItinerary(rows) {
  const byDay = {};
  rows.forEach((r) => {
    const d = Number(r.day) || 1;
    if (!byDay[d]) byDay[d] = { day: d, date: r.date || '', city: r.city || '', items: [] };
    byDay[d].items.push({ time: r.time || '', name: r.name || '', place: r.place || '', cost: Number(r.cost) || 0, cat: r.cat || 'passeios' });
  });
  return Object.values(byDay).sort((a, b) => a.day - b.day)
    .map((d) => ({ ...d, items: d.items.sort((a, b) => String(a.time).localeCompare(String(b.time))) }));
}

// ---- Ícones SVG (Feather-style) ----
const ICON = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  mappin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><line x1="13" y1="5" x2="13" y2="19"/>',
  chevronright: '<polyline points="9 18 15 12 9 6"/>',
  chevrondown: '<polyline points="6 9 12 15 18 9"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/>',
  message: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  userplus: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  crown: '<path d="M2 6l4 4 6-8 6 8 4-4-2 13H4z"/>',
  checkcircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  circle: '<circle cx="12" cy="12" r="10"/>',
  car: '<path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/>',
  hotel: '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><rect x="9" y="9" width="6" height="5"/>',
  utensils: '<path d="M3 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2-2V2"/><line x1="5" y1="11" x2="5" y2="22"/><path d="M17 2v20"/><path d="M17 8c0-2 1-4 2-4v18"/>',
  shopping: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
};

function svg(name, size, color) {
  const c = color || 'currentColor';
  const s = size || 20;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ''}</svg>`;
}
function svgFill(name, size, color) {
  const c = color || 'currentColor';
  const s = size || 20;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${c}" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ''}</svg>`;
}

// ---- Cores ----
const C = { blue: '#1E5AA8', gold: '#D4AF37', teal: '#2E8B8B', clay: '#B5654A' };

// ---- Dados ----
let MEMBERS = [
  { id: 'hilda', name: 'Hilda', initials: 'HI', color: '#1E5AA8', admin: true, canExpense: true },
  { id: 'ana', name: 'Ana', initials: 'AN', color: '#D4AF37', admin: false, canExpense: true },
  { id: 'joao', name: 'João', initials: 'JO', color: '#2E8B8B', admin: false, canExpense: true },
  { id: 'pedro', name: 'Pedro', initials: 'PE', color: '#B5654A', admin: false, canExpense: false },
];

let PENDING = [
  { id: 'marina', name: 'Marina Costa', initials: 'MC', color: '#7B6CA8', kind: 'Pedido para entrar', time: '1h' },
  { id: 'luis', name: 'Luís Tavares', initials: 'LT', color: '#2E8B8B', kind: 'Pedido para entrar', time: '3h' },
];

const TRIP = {
  id: 'trip_mochilao_europa',
  name: 'Mochilão Europa',
  destination: 'Braga → Paris → Milão',
  start: '2026-07-04', end: '2026-07-18',
  budget: 6000, currency: '€',
};

const CATEGORIES = {
  transporte: { label: 'Transporte', icon: 'car', color: '#1E5AA8' },
  hospedagem: { label: 'Hospedagem', icon: 'hotel', color: '#2E8B8B' },
  alimentacao: { label: 'Alimentação', icon: 'utensils', color: '#D4AF37' },
  passeios: { label: 'Passeios', icon: 'ticket', color: '#B5654A' },
  outros: { label: 'Outros', icon: 'shopping', color: '#7B6CA8' },
};

let EXPENSES = [
  { id: 1, desc: 'Hotel em Paris (3 noites)', cat: 'hospedagem', amount: 400, paidBy: 'hilda', split: ['hilda','ana','joao','pedro'], date: '08 Jul' },
  { id: 2, desc: 'Voo Lisboa → Paris', cat: 'transporte', amount: 640, paidBy: 'ana', split: ['hilda','ana','joao','pedro'], date: '04 Jul' },
  { id: 3, desc: 'Jantar Le Marais', cat: 'alimentacao', amount: 120, paidBy: 'joao', split: ['hilda','ana','joao','pedro'], date: '08 Jul' },
  { id: 4, desc: 'Ingressos Louvre', cat: 'passeios', amount: 68, paidBy: 'pedro', split: ['hilda','ana','joao','pedro'], date: '09 Jul' },
  { id: 5, desc: 'Cruzeiro no Sena', cat: 'passeios', amount: 96, paidBy: 'hilda', split: ['hilda','ana','joao','pedro'], date: '09 Jul' },
  { id: 6, desc: 'Mercado + lanches', cat: 'alimentacao', amount: 54, paidBy: 'ana', split: ['ana','joao'], date: '10 Jul' },
];

let ITINERARY = [
  { day: 1, date: '08 Jul', city: 'Paris', items: [
    { time: '09:00', name: 'Museu do Louvre', place: 'Rue de Rivoli', cost: 17, cat: 'passeios' },
    { time: '13:00', name: 'Almoço — Le Marais', place: 'Le Marais', cost: 30, cat: 'alimentacao' },
    { time: '15:00', name: 'Torre Eiffel', place: 'Champ de Mars', cost: 29, cat: 'passeios' },
    { time: '19:00', name: 'Cruzeiro no Sena', place: 'Port de la Bourdonnais', cost: 24, cat: 'passeios' },
  ]},
  { day: 2, date: '09 Jul', city: 'Paris', items: [
    { time: '10:00', name: 'Montmartre & Sacré-Cœur', place: 'Montmartre', cost: 0, cat: 'passeios' },
    { time: '13:30', name: 'Almoço no bairro', place: 'Pigalle', cost: 28, cat: 'alimentacao' },
    { time: '16:00', name: 'Trem Paris → Milão', place: 'Gare de Lyon', cost: 89, cat: 'transporte' },
  ]},
];

const GRADS = [
  'linear-gradient(135deg,#D4AF37,#B5654A)',
  'linear-gradient(135deg,#1E5AA8,#2E8B8B)',
  'linear-gradient(135deg,#F4863C,#FBC56A)',
  'linear-gradient(135deg,#2E8B8B,#5BAEC4)',
];

let POSTS = [
  { id: 1, author: 'ana', trip: 'Mochilão Europa', time: '2h', text: 'Pôr do sol na Torre Eiffel valeu cada degrau. Dica: suba a pé até o 2º andar, fila bem menor 🗼', grad: GRADS[0], likes: 12, comments: 3, tags: ['#Paris','#Europa'] },
  { id: 2, author: 'joao', trip: 'Mochilão Europa', time: '5h', text: 'Café da manhã no mercado local antes do trem para Milão. A baguete daqui é outro nível.', grad: GRADS[1], likes: 8, comments: 1, tags: ['#RoadTrip'] },
];

// ---- Helpers ----
const $ = (sel) => document.querySelector(sel);
const member = (id) => MEMBERS.find((m) => m.id === id) || PENDING.find((m) => m.id === id);
const meId = () => (AUTH.user && MEMBERS.find((m) => m.id === AUTH.user.id)) ? AUTH.user.id : MEMBERS[0].id;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

function daysUntil(date) {
  const diff = Math.ceil((new Date(date) - new Date()) / 86400000);
  return diff > 0 ? diff : 0;
}

function avatar(id, size) {
  const m = member(id); const s = size || 32;
  return `<div class="avatar" style="width:${s}px;height:${s}px;background:${m.color};font-size:${s*0.36}px">${m.initials}</div>`;
}

// Liquidação inteligente
function computeBalances(expenses) {
  const net = {};
  MEMBERS.forEach((m) => (net[m.id] = 0));
  expenses.forEach((e) => {
    const share = e.amount / e.split.length;
    net[e.paidBy] += e.amount;
    e.split.forEach((p) => { if (net[p] !== undefined) net[p] -= share; });
  });
  return net;
}
function settle(net) {
  const debtors = [], creditors = [];
  Object.entries(net).forEach(([id, v]) => {
    if (v < -0.01) debtors.push({ id, v: -v });
    else if (v > 0.01) creditors.push({ id, v });
  });
  debtors.sort((a,b) => b.v - a.v); creditors.sort((a,b) => b.v - a.v);
  const tx = []; let i=0, j=0;
  while (i < debtors.length && j < creditors.length) {
    const amt = Math.min(debtors[i].v, creditors[j].v);
    tx.push({ from: debtors[i].id, to: creditors[j].id, amount: amt });
    debtors[i].v -= amt; creditors[j].v -= amt;
    if (debtors[i].v < 0.01) i++;
    if (creditors[j].v < 0.01) j++;
  }
  return tx;
}

// ============================================================
// RENDER: Dashboard
// ============================================================
function renderDashboard() {
  const spent = EXPENSES.reduce((s,e) => s+e.amount, 0);
  const pct = Math.round((spent / TRIP.budget) * 100);
  return `
    <div class="hero">
      <div class="kicker">Sua próxima viagem</div>
      <h1 class="serif">${esc(TRIP.name)}</h1>
      <div class="dest">${svg('mappin',14)} ${esc(TRIP.destination)}</div>
      <div class="count"><span class="num serif">${daysUntil(TRIP.start)}</span><span class="lbl">dias até a partida</span></div>
      <div class="plane">${svg('plane',120,'#fff')}</div>
    </div>
    <div class="grid2">
      <div class="card stat">${svg('users')}<div class="val serif">${MEMBERS.length}</div><div class="lbl">Participantes</div></div>
      <div class="card stat">${svg('mappin')}<div class="val serif">3</div><div class="lbl">Cidades</div></div>
    </div>
    <div class="card" style="margin-top:12px">
      <div class="row-between"><span style="font-size:13px;color:var(--sub)">Orçamento consumido</span><span style="font-weight:700;color:${pct>80?C.gold:C.blue}">${pct}%</span></div>
      <div class="track"><div class="fill" style="width:${Math.min(pct,100)}%"></div></div>
      <div class="row-between" style="margin-top:10px;font-size:13px"><span>Gasto <b>${TRIP.currency}${spent}</b></span><span style="color:var(--sub)">de ${TRIP.currency}${TRIP.budget}</span></div>
    </div>
    <div class="card" style="margin-top:12px">
      <div class="mini-label">Próxima atividade</div>
      <div class="next-row">
        <div class="next-ico">${svg('ticket',20)}</div>
        <div style="flex:1"><div style="font-weight:600">Museu do Louvre</div><div style="font-size:12px;color:var(--sub)">08 Jul · 09:00 · Rue de Rivoli</div></div>
        ${svg('chevronright',18,'var(--sub)')}
      </div>
    </div>`;
}

// ============================================================
// RENDER: Budget
// ============================================================
let budgetTab = 'gastos';
function renderBudget() {
  const total = EXPENSES.reduce((s,e) => s+e.amount, 0);
  const pct = Math.round((total / TRIP.budget) * 100);
  const remaining = TRIP.budget - total;
  const byCat = {}; EXPENSES.forEach((e) => byCat[e.cat] = (byCat[e.cat]||0)+e.amount);
  const net = computeBalances(EXPENSES);
  const tx = settle(net);

  const gastos = EXPENSES.map((e) => {
    const cat = CATEGORIES[e.cat];
    return `<div class="expense">
      <div class="ico" style="background:${cat.color}18">${svg(cat.icon,18,cat.color)}</div>
      <div class="info"><div class="desc">${esc(e.desc)}</div><div class="meta">${esc(e.date)} · pago por ${member(e.paidBy).name} · ÷${e.split.length}</div></div>
      <div class="amt serif">${TRIP.currency}${e.amount}</div>
    </div>`;
  }).join('');

  const cats = Object.entries(byCat).map(([k,v]) => {
    const cat = CATEGORIES[k]; const p = Math.round((v/total)*100);
    return `<div class="catbar">
      <div class="top"><span class="l">${svg(cat.icon,15,cat.color)} ${cat.label}</span><span><b>${TRIP.currency}${v}</b> <span style="color:var(--sub)">· ${p}%</span></span></div>
      <div class="bar"><span style="width:${p}%;background:${cat.color}"></span></div>
    </div>`;
  }).join('');

  const balances = MEMBERS.map((m) => {
    const v = net[m.id]; const pos = v >= 0;
    return `<div class="balance-row">${avatar(m.id,30)}<span class="nm">${m.name}</span><span class="v" style="color:${pos?C.teal:C.clay}">${pos?'+':''}${TRIP.currency}${Math.abs(v).toFixed(0)}</span></div>`;
  }).join('');

  const txRows = tx.map((t) => `<div class="tx-row">${avatar(t.from,28)}<span class="nm">${member(t.from).name}</span>${svg('chevronright',16,'var(--sub)')}${avatar(t.to,28)}<span class="nm">${member(t.to).name}</span><span class="v">${TRIP.currency}${t.amount.toFixed(0)}</span></div>`).join('');

  return `
    <div class="eyebrow">Módulo financeiro</div>
    <h2 class="section-title serif">Orçamento &amp; Despesas</h2>
    <div class="card budget-summary">
      <div class="row-between" style="align-items:flex-end">
        <div><div style="font-size:12px;color:var(--sub)">Consumido</div><div class="big serif">${TRIP.currency}${total.toLocaleString('pt-BR')}</div></div>
        <div style="text-align:right"><div style="font-size:12px;color:var(--sub)">Orçamento total</div><div class="total serif">${TRIP.currency}${TRIP.budget.toLocaleString('pt-BR')}</div></div>
      </div>
      <div class="track"><div class="fill" style="width:${Math.min(pct,100)}%"></div></div>
      <div class="row-between" style="margin-top:10px;font-size:12.5px"><span style="color:var(--sub)">${pct}% consumido</span><span style="color:${remaining>=0?C.teal:C.clay};font-weight:600">${remaining>=0?'Saldo restante ':'Acima do orçamento '}${TRIP.currency}${Math.abs(remaining).toLocaleString('pt-BR')}</span></div>
    </div>
    <div class="tabs">
      <button class="tab ${budgetTab==='gastos'?'active':''}" data-btab="gastos">Gastos</button>
      <button class="tab ${budgetTab==='categorias'?'active':''}" data-btab="categorias">Por categoria</button>
      <button class="tab ${budgetTab==='acerto'?'active':''}" data-btab="acerto">Acerto de contas</button>
    </div>
    <div class="tabpane ${budgetTab==='gastos'?'active':''}"><div class="list">${gastos}</div></div>
    <div class="tabpane ${budgetTab==='categorias'?'active':''}"><div class="card">${cats}</div></div>
    <div class="tabpane ${budgetTab==='acerto'?'active':''}">
      <div class="card"><div class="mini-label" style="margin-bottom:12px">Saldo por participante</div>${balances}</div>
      <div class="card"><div class="mini-label">Liquidação inteligente</div><div style="font-size:12px;color:var(--sub);margin:4px 0 14px">${tx.length} pagamentos resolvem todas as dívidas</div>${txRows}</div>
    </div>`;
}

// ============================================================
// RENDER: Itinerary
// ============================================================
let itinQuery = '';
let dayOpen = { 1: true, 2: true };
function renderItinerary() {
  const q = itinQuery.trim().toLowerCase();
  const filtered = ITINERARY.map((d) => ({
    ...d,
    items: q ? d.items.filter((it) => it.name.toLowerCase().includes(q) || it.place.toLowerCase().includes(q) || d.city.toLowerCase().includes(q)) : d.items,
  })).filter((d) => !q || d.items.length > 0);

  const daysHtml = filtered.map((d) => {
    const dayCost = d.items.reduce((s,i) => s+i.cost, 0);
    const isOpen = dayOpen[d.day] || !!q;
    const items = d.items.map((it) => {
      const cat = CATEGORIES[it.cat];
      return `<div class="tl-item">
        <div class="tl-dot" style="background:${cat.color}"></div>
        <div class="tl-card"><div class="tl-time serif">${it.time}</div><div style="flex:1"><div class="tl-name">${esc(it.name)}</div><div class="tl-place">${esc(it.place)}</div></div>${it.cost>0?`<div class="tl-cost">${TRIP.currency}${it.cost}</div>`:''}</div>
      </div>`;
    }).join('');
    return `<div class="day">
      <button class="day-head" data-day="${d.day}">
        <div class="day-badge"><span class="d1">DIA</span><span class="d2 serif">${d.day}</span></div>
        <div class="day-title"><div class="c">${esc(d.city)}</div><div class="m">${d.date} · ${d.items.length} atividades · ${TRIP.currency}${dayCost}</div></div>
        <span class="day-chevron ${isOpen?'':'closed'}">${svg('chevrondown',20,'var(--sub)')}</span>
      </button>
      ${isOpen ? `<div class="timeline"><div class="spine"></div>${items}</div>` : ''}
    </div>`;
  }).join('');

  const empty = filtered.length === 0 ? `<div class="empty">Nada encontrado para “${esc(itinQuery)}”. Tente outro termo.</div>` : '';

  return `
    <div class="eyebrow">Módulo roteiro</div>
    <h2 class="section-title serif">Cronograma diário</h2>
    <div class="search-wrap">
      ${svg('search',16)}
      <input id="itin-search" type="text" placeholder="Buscar atividade, local ou cidade" value="${esc(itinQuery)}">
      ${itinQuery ? `<button class="clear" id="itin-clear">${svg('x',16)}</button>` : ''}
    </div>
    ${empty}${daysHtml}`;
}

// ============================================================
// RENDER: Memories
// ============================================================
let liked = {};
function renderMemories() {
  const posts = POSTS.map((p) => {
    const isLiked = liked[p.id];
    return `<div class="post">
      <div class="post-head">${avatar(p.author,38)}<div class="who"><div class="n">${member(p.author).name}</div><div class="t">${esc(p.trip)} · ${esc(p.time)}</div></div>${svg('globe',16,'var(--sub)')}</div>
      <div class="post-cover" style="background:${p.grad}">${svg('camera',40)}</div>
      <div class="post-body">
        <p>${esc(p.text)}</p>
        <div class="post-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
        <div class="post-actions">
          <button data-like="${p.id}" class="${isLiked?'liked':''}">${(isLiked?svgFill:svg)('heart',17,isLiked?C.clay:'currentColor')} ${p.likes + (isLiked?1:0)}</button>
          <span>${svg('message',17)} ${p.comments}</span>
          <span>${svg('share',17)}</span>
        </div>
      </div>
    </div>`;
  }).join('');
  return `<div class="eyebrow">Feed social</div><h2 class="section-title serif">Memórias</h2>${posts}`;
}

// ============================================================
// RENDER: Admin
// ============================================================
function renderAdmin() {
  const pending = PENDING.length ? PENDING.map((p) => `<div class="pending-row">
    <div class="avatar" style="width:36px;height:36px;background:${p.color};font-size:12px">${p.initials}</div>
    <div class="info"><div class="nm">${esc(p.name)}</div><div class="kd">${esc(p.kind)} · ${esc(p.time)}</div></div>
    <button class="circle-btn ok" data-approve="${p.id}">${svg('check',17,'#fff')}</button>
    <button class="circle-btn no" data-reject="${p.id}">${svg('x',17)}</button>
  </div>`).join('') : `<div style="font-size:13px;color:var(--sub)">Nada para aprovar agora.</div>`;

  const members = MEMBERS.map((m) => `<div class="member-row">
    <div class="member-main">${avatar(m.id,36)}
      <div class="info"><div class="nm">${m.name}${m.admin?svgFill('crown',13,C.gold):''}</div><div class="role">${m.admin?'Administrador':'Participante'}</div></div>
      ${!m.admin?`<button class="trash" data-remove="${m.id}">${svg('trash',16)}</button>`:''}
    </div>
    <div class="member-perms">
      <button class="pill ${m.admin?'on':''}" data-toggle-admin="${m.id}">${svg('shield',12)} Admin</button>
      <button class="pill ${m.canExpense?'on':''}" data-toggle-expense="${m.id}">${svg('wallet',12)} Lançar gastos</button>
    </div>
  </div>`).join('');

  return `
    <div class="eyebrow">Administração da viagem</div>
    <h2 class="section-title serif">Painel do admin</h2>
    <div class="card admin-block">
      <div class="mini-label admin-title" style="margin-bottom:14px">${svg('bell',14)} Aprovações pendentes ${PENDING.length?`<span class="badge-count">${PENDING.length}</span>`:''}</div>
      ${pending}
    </div>
    <div class="card admin-block">
      <div class="row-between" style="margin-bottom:14px">
        <span class="mini-label admin-title">${svg('users',14)} Participantes</span>
        <button class="invite-btn">${svg('userplus',15)} Convidar</button>
      </div>
      ${members}
    </div>
    <div class="card admin-block">
      <div class="mini-label admin-title" style="margin-bottom:14px">${svg('settings',14)} Dados da viagem</div>
      <div class="field-label">Nome</div><input class="field" id="adm-name" value="${esc(TRIP.name)}">
      <div class="field-label mt12">Destino</div><input class="field" id="adm-dest" value="${esc(TRIP.destination)}">
      <div class="two-col"><div><div class="field-label mt12">Início</div><input class="field" type="date" id="adm-start" value="${TRIP.start}"></div><div><div class="field-label mt12">Término</div><input class="field" type="date" id="adm-end" value="${TRIP.end}"></div></div>
      <div class="field-label mt12">Orçamento total (${TRIP.currency})</div><input class="field" type="number" id="adm-budget" value="${TRIP.budget}">
      <button class="primary-btn" id="adm-save">Salvar alterações</button>
    </div>`;
}

// ============================================================
// RENDER: Sincronização (Google Sheets)
// ============================================================
function renderSync() {
  const url = SYNC.url;
  const statusMap = {
    off: { txt: 'Não conectado', color: 'var(--sub)' },
    carregando: { txt: 'Carregando...', color: C.gold },
    ok: { txt: 'Conectado ✓', color: C.teal },
    erro: { txt: 'Erro ao conectar', color: C.clay },
  };
  const st = statusMap[SYNC.status] || statusMap.off;
  const u = AUTH.user;
  const accountBlock = u ? `
    <div class="card">
      <div class="mini-label" style="margin-bottom:12px">Sua conta</div>
      <div style="display:flex;align-items:center;gap:12px">
        <div class="avatar" style="width:44px;height:44px;background:${u.color};font-size:15px;overflow:hidden">${u.picture?`<img src="${u.picture}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:u.initials}</div>
        <div style="flex:1;min-width:0"><div style="font-weight:600">${esc(u.fullName || u.name)}</div><div style="font-size:12px;color:var(--sub)">${esc(u.email || 'sessão local')}</div></div>
      </div>
      <button class="primary-btn" id="logout-btn" style="background:var(--clay)">Sair da conta</button>
    </div>` : '';
  return `
    <div class="eyebrow">Integração</div>
    <h2 class="section-title serif">Planilha &amp; conta</h2>
    ${accountBlock}
    <div class="card">
      <div class="row-between"><span style="font-size:13px;color:var(--sub)">Status da planilha</span><span style="font-weight:700;color:${st.color}">${st.txt}</span></div>
      <div class="field-label mt14">Link do app da planilha (Apps Script)</div>
      <input class="field" id="sync-url" placeholder="https://script.google.com/macros/s/.../exec" value="${esc(url)}">
      <button class="primary-btn" id="sync-save">Salvar e conectar</button>
      <button class="primary-btn" id="sync-reload" style="background:var(--teal);margin-top:10px" ${url?'':'disabled'}>Recarregar dados da planilha</button>
    </div>
    <div class="card">
      <div class="mini-label" style="margin-bottom:10px">Como conectar</div>
      <ol style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--text)">
        <li>Crie uma planilha no Google Sheets.</li>
        <li>Menu <b>Extensões → Apps Script</b>.</li>
        <li>Cole o código do arquivo <b>apps-script.gs</b>.</li>
        <li><b>Implantar → Nova implantação → App da Web</b>. Acesso: <b>Qualquer pessoa</b>.</li>
        <li>Copie a URL e cole aqui em cima.</li>
      </ol>
      <div style="font-size:12px;color:var(--sub);margin-top:12px">Os dados novos que você criar no app são enviados para a planilha. Use “Recarregar” para puxar o que está na planilha para o app.</div>
    </div>`;
}

// ============================================================
// Navegação e re-render
// ============================================================
const SCREENS = { home: renderDashboard, budget: renderBudget, itinerary: renderItinerary, memories: renderMemories, admin: renderAdmin, sync: renderSync };
let current = 'home';

function render() {
  $('#content').innerHTML = SCREENS[current]();
  // FAB
  const fab = $('#fab');
  if (current === 'budget') { fab.style.display = 'flex'; fab.setAttribute('aria-label','Adicionar despesa'); fab.dataset.action = 'expense'; }
  else if (current === 'itinerary') { fab.style.display = 'flex'; fab.setAttribute('aria-label','Adicionar atividade'); fab.dataset.action = 'activity'; }
  else if (current === 'memories') { fab.style.display = 'flex'; fab.setAttribute('aria-label','Nova publicação'); fab.dataset.action = 'post'; }
  else { fab.style.display = 'none'; }
  // nav active
  document.querySelectorAll('.nav button').forEach((b) => b.classList.toggle('active', b.dataset.nav === current));
  bindScreenEvents();
}

function bindScreenEvents() {
  // Budget tabs
  document.querySelectorAll('[data-btab]').forEach((b) => b.onclick = () => { budgetTab = b.dataset.btab; render(); });
  // Itinerary search
  const s = $('#itin-search');
  if (s) s.oninput = (e) => { itinQuery = e.target.value; const pos = e.target.selectionStart; render(); const n = $('#itin-search'); if (n) { n.focus(); n.setSelectionRange(pos,pos); } };
  const clr = $('#itin-clear');
  if (clr) clr.onclick = () => { itinQuery = ''; render(); };
  document.querySelectorAll('[data-day]').forEach((b) => b.onclick = () => { const d = +b.dataset.day; dayOpen[d] = !dayOpen[d]; render(); });
  // Likes
  document.querySelectorAll('[data-like]').forEach((b) => b.onclick = () => { const id = +b.dataset.like; liked[id] = !liked[id]; render(); });
  // Admin actions
  document.querySelectorAll('[data-approve]').forEach((b) => b.onclick = () => {
    const p = PENDING.find((x) => x.id === b.dataset.approve);
    const novo = { id: p.id, name: p.name, initials: p.initials, color: p.color, admin: false, canExpense: false };
    MEMBERS.push(novo);
    // Novo usuário + ligação com a viagem
    SYNC.save('Usuarios', { id: p.id, name: p.name, email: '', picture: '', initials: p.initials, color: p.color });
    SYNC.save('Participantes', { id: p.id + '_' + TRIP.id, tripId: TRIP.id, userId: p.id, papel: 'participante', canExpense: false, status: 'ativo' });
    PENDING = PENDING.filter((x) => x.id !== b.dataset.approve); render();
  });
  document.querySelectorAll('[data-reject]').forEach((b) => b.onclick = () => { PENDING = PENDING.filter((x) => x.id !== b.dataset.reject); render(); });
  document.querySelectorAll('[data-remove]').forEach((b) => b.onclick = () => { MEMBERS = MEMBERS.filter((m) => m.id !== b.dataset.remove); render(); });
  document.querySelectorAll('[data-toggle-admin]').forEach((b) => b.onclick = () => { const m = MEMBERS.find((x) => x.id === b.dataset.toggleAdmin); m.admin = !m.admin; render(); });
  document.querySelectorAll('[data-toggle-expense]').forEach((b) => b.onclick = () => { const m = MEMBERS.find((x) => x.id === b.dataset.toggleExpense); m.canExpense = !m.canExpense; render(); });
  const save = $('#adm-save');
  if (save) save.onclick = () => {
    TRIP.name = $('#adm-name').value; TRIP.destination = $('#adm-dest').value;
    TRIP.start = $('#adm-start').value; TRIP.end = $('#adm-end').value; TRIP.budget = +$('#adm-budget').value;
    save.textContent = 'Salvo ✓'; setTimeout(() => { save.textContent = 'Salvar alterações'; }, 1500);
  };
  // Sync screen
  const syncSave = $('#sync-save');
  if (syncSave) syncSave.onclick = async () => {
    SYNC.url = $('#sync-url').value.trim();
    syncSave.textContent = 'Conectando...';
    await SYNC.load();
    // Agora que a planilha está conectada, garante o usuário logado nela
    if (AUTH.user) AUTH.ensureMember();
    render();
  };
  const syncReload = $('#sync-reload');
  if (syncReload) syncReload.onclick = async () => {
    syncReload.textContent = 'Recarregando...';
    await SYNC.load();
    render();
  };
  const logoutBtn = $('#logout-btn');
  if (logoutBtn) logoutBtn.onclick = () => AUTH.signOut();
}

// ============================================================
// Modais
// ============================================================
const overlay = () => $('#modal-overlay');
function closeModal() { overlay().classList.add('hidden'); overlay().innerHTML = ''; }

function openExpenseModal() {
  let form = { desc: '', amount: '', cat: 'alimentacao', date: '', paidBy: meId(), split: MEMBERS.map((m) => m.id) };
  function draw() {
    const catChips = Object.entries(CATEGORIES).map(([k,c]) => `<button class="chip ${form.cat===k?'on':''}" data-cat="${k}" style="${form.cat===k?`border-color:${c.color};background:${c.color}18;color:${c.color}`:''}">${svg(c.icon,14,form.cat===k?c.color:'currentColor')} ${c.label}</button>`).join('');
    const payChips = MEMBERS.map((m) => `<button class="chip pay ${form.paidBy===m.id?'on':''}" data-pay="${m.id}" style="${form.paidBy===m.id?`border-color:${C.blue};background:${C.blue}15;color:${C.blue}`:''}">${avatar(m.id,24)} ${m.name}</button>`).join('');
    const splitChips = MEMBERS.map((m) => { const on = form.split.includes(m.id); return `<button class="chip split ${on?'on':''}" data-split="${m.id}" style="${on?`border-color:${C.teal};background:${C.teal}18;color:${C.teal}`:''}">${(on?svgFill:svg)(on?'checkcircle':'circle',16,on?C.teal:'currentColor')} ${avatar(m.id,24)} ${m.name}</button>`; }).join('');
    const perPerson = form.split.length && +form.amount ? `${TRIP.currency}${(+form.amount/form.split.length).toFixed(2)} por pessoa` : '';
    const valid = form.desc.trim() && +form.amount && form.split.length;
    overlay().innerHTML = `<div class="modal">
      <div class="modal-grab"></div>
      <div class="modal-head"><h3 class="serif">Nova despesa</h3><button id="m-close">${svg('x',20)}</button></div>
      <div class="field-label">Descrição</div><input class="field" id="f-desc" placeholder="Ex.: Hotel em Paris" value="${esc(form.desc)}">
      <div class="two-col"><div><div class="field-label mt14">Valor (${TRIP.currency})</div><input class="field" id="f-amount" type="number" placeholder="0" value="${form.amount}"></div><div><div class="field-label mt14">Data</div><input class="field" id="f-date" type="date" value="${form.date}"></div></div>
      <div class="field-label mt14">Categoria</div><div class="chips">${catChips}</div>
      <div class="field-label mt14">Quem pagou</div><div class="chips">${payChips}</div>
      <div class="row-between mt14"><span class="field-label">Dividir entre · igualitária</span><span class="per-person">${perPerson}</span></div><div class="chips">${splitChips}</div>
      <button class="primary-btn" id="m-save" ${valid?'':'disabled'}>Adicionar despesa</button>
    </div>`;
    overlay().classList.remove('hidden');
    $('#m-close').onclick = closeModal;
    $('#f-desc').oninput = (e) => { form.desc = e.target.value; syncSaveBtn(); };
    $('#f-amount').oninput = (e) => { form.amount = e.target.value; draw(); };
    $('#f-date').onchange = (e) => { form.date = e.target.value; };
    document.querySelectorAll('[data-cat]').forEach((b) => b.onclick = () => { form.cat = b.dataset.cat; draw(); });
    document.querySelectorAll('[data-pay]').forEach((b) => b.onclick = () => { form.paidBy = b.dataset.pay; draw(); });
    document.querySelectorAll('[data-split]').forEach((b) => b.onclick = () => { const id = b.dataset.split; form.split = form.split.includes(id) ? form.split.filter((x) => x!==id) : [...form.split, id]; draw(); });
    function syncSaveBtn() { const ok = form.desc.trim() && +form.amount && form.split.length; $('#m-save').disabled = !ok; }
    $('#m-save').onclick = () => {
      if (!(form.desc.trim() && +form.amount && form.split.length)) return;
      const date = form.date ? new Date(form.date).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','') : 'Hoje';
      const novo = { id: Date.now(), desc: form.desc.trim(), cat: form.cat, amount: +form.amount, paidBy: form.paidBy, split: form.split.slice(), date };
      EXPENSES.unshift(novo);
      SYNC.save('Despesas', novo);
      closeModal(); render();
    };
  }
  draw();
}

function openActivityModal() {
  let form = { day: String(ITINERARY[0].day), time: '', name: '', place: '', cost: '', cat: 'passeios' };
  function draw() {
    const dayOpts = ITINERARY.map((d) => `<option value="${d.day}" ${+form.day===d.day?'selected':''}>Dia ${d.day} · ${d.city} (${d.date})</option>`).join('');
    const catChips = Object.entries(CATEGORIES).map(([k,c]) => `<button class="chip ${form.cat===k?'on':''}" data-cat="${k}" style="${form.cat===k?`border-color:${c.color};background:${c.color}18;color:${c.color}`:''}">${svg(c.icon,14,form.cat===k?c.color:'currentColor')} ${c.label}</button>`).join('');
    const valid = form.name.trim() && form.time.trim();
    overlay().innerHTML = `<div class="modal">
      <div class="modal-grab"></div>
      <div class="modal-head"><h3 class="serif">Nova atividade</h3><button id="m-close">${svg('x',20)}</button></div>
      <div class="field-label">Dia</div><select class="field" id="f-day">${dayOpts}</select>
      <div class="two-col"><div><div class="field-label mt14">Horário</div><input class="field" id="f-time" type="time" value="${form.time}"></div><div><div class="field-label mt14">Valor estimado (${TRIP.currency})</div><input class="field" id="f-cost" type="number" placeholder="0" value="${form.cost}"></div></div>
      <div class="field-label mt14">Atividade</div><input class="field" id="f-name" placeholder="Ex.: Museu do Louvre" value="${esc(form.name)}">
      <div class="field-label mt14">Local / endereço</div><input class="field" id="f-place" placeholder="Ex.: Rue de Rivoli" value="${esc(form.place)}">
      <div class="field-label mt14">Categoria</div><div class="chips">${catChips}</div>
      <button class="primary-btn" id="m-save" ${valid?'':'disabled'}>Adicionar ao roteiro</button>
    </div>`;
    overlay().classList.remove('hidden');
    $('#m-close').onclick = closeModal;
    $('#f-day').onchange = (e) => { form.day = e.target.value; };
    $('#f-time').oninput = (e) => { form.time = e.target.value; $('#m-save').disabled = !(form.name.trim() && form.time.trim()); };
    $('#f-cost').oninput = (e) => { form.cost = e.target.value; };
    $('#f-name').oninput = (e) => { form.name = e.target.value; $('#m-save').disabled = !(form.name.trim() && form.time.trim()); };
    $('#f-place').oninput = (e) => { form.place = e.target.value; };
    document.querySelectorAll('[data-cat]').forEach((b) => b.onclick = () => { form.cat = b.dataset.cat; draw(); });
    $('#m-save').onclick = () => {
      if (!(form.name.trim() && form.time.trim())) return;
      const day = ITINERARY.find((d) => d.day === +form.day);
      const item = { time: form.time, name: form.name.trim(), place: form.place.trim(), cost: +form.cost||0, cat: form.cat };
      day.items.push(item);
      day.items.sort((a,b) => a.time.localeCompare(b.time));
      dayOpen[day.day] = true;
      SYNC.save('Roteiro', { id: Date.now(), day: day.day, date: day.date, city: day.city, time: item.time, name: item.name, place: item.place, cost: item.cost, cat: item.cat });
      closeModal(); render();
    };
  }
  draw();
}

function openPostModal() {
  let form = { text: '', tags: '', grad: GRADS[0] };
  function draw() {
    const covers = GRADS.map((g) => `<button class="cover-opt ${form.grad===g?'on':''}" data-grad="${g}" style="background:${g}"></button>`).join('');
    overlay().innerHTML = `<div class="modal">
      <div class="modal-grab"></div>
      <div class="modal-head"><h3 class="serif">Nova publicação</h3><button id="m-close">${svg('x',20)}</button></div>
      <div class="field-label">O que você quer compartilhar?</div><textarea class="field" id="f-text" rows="4" placeholder="Conte um momento da viagem...">${esc(form.text)}</textarea>
      <div class="field-label mt14">Tags (separe por espaço)</div><input class="field" id="f-tags" placeholder="Paris RoadTrip Europa" value="${esc(form.tags)}">
      <div class="field-label mt14">Capa</div><div class="cover-picker">${covers}</div>
      <button class="primary-btn" id="m-save" ${form.text.trim()?'':'disabled'}>Publicar</button>
    </div>`;
    overlay().classList.remove('hidden');
    $('#m-close').onclick = closeModal;
    $('#f-text').oninput = (e) => { form.text = e.target.value; $('#m-save').disabled = !form.text.trim(); };
    $('#f-tags').oninput = (e) => { form.tags = e.target.value; };
    document.querySelectorAll('[data-grad]').forEach((b) => b.onclick = () => { form.grad = b.dataset.grad; draw(); });
    $('#m-save').onclick = () => {
      if (!form.text.trim()) return;
      const tags = form.tags.split(/[\s,]+/).filter(Boolean).map((t) => t.startsWith('#')?t:'#'+t);
      const post = { id: Date.now(), author: meId(), trip: TRIP.name, time: 'agora', text: form.text.trim(), grad: form.grad, likes: 0, comments: 0, tags };
      POSTS.unshift(post);
      SYNC.save('Memorias', post);
      closeModal(); render();
    };
  }
  draw();
}

// ============================================================
// Init
// ============================================================
function init() {
  // nav
  document.querySelectorAll('.nav button').forEach((b) => b.onclick = () => { current = b.dataset.nav; window.scrollTo(0,0); render(); });
  // fab
  $('#fab').onclick = () => {
    const a = $('#fab').dataset.action;
    if (a === 'expense') openExpenseModal();
    else if (a === 'activity') openActivityModal();
    else if (a === 'post') openPostModal();
  };
  // overlay click closes
  overlay().onclick = (e) => { if (e.target === overlay()) closeModal(); };
  // dark mode
  $('#toggle-dark').onclick = () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    $('#toggle-dark').innerHTML = svg(dark ? 'sun' : 'moon', 17);
  };
  $('#toggle-dark').innerHTML = svg('moon',17);
  $('#bell-btn').innerHTML = svg('bell',17);
  $('#config-btn').innerHTML = svg('settings',17);
  $('#config-btn').onclick = () => { current = 'sync'; window.scrollTo(0,0); render(); };

  // splash → depois decide entre login e app
  const splash = $('#splash');
  setTimeout(() => splash.classList.add('leaving'), 2000);
  setTimeout(() => {
    splash.classList.add('gone');
    try {
      if (AUTH.user) enterApp();
      else showLogin();
    } catch (err) {
      console.error('Falha ao inicializar login:', err);
      // Nunca deixa o usuário preso: mostra a tela de login com saída de convidado
      forceGuestFallback('Ocorreu um erro ao iniciar o login.');
    }
  }, 2500);
}

// Garante que o usuário nunca fique preso: mostra login com opção de convidado
function forceGuestFallback(msg) {
  const el = $('#login');
  if (el) el.style.display = 'flex';
  const g = $('#login-google');
  if (g) g.innerHTML = '<div class="login-warn">' + (msg || 'Não foi possível carregar o login do Google.') + '</div>';
  const demo = $('#login-demo');
  if (demo) {
    demo.style.display = 'block';
    demo.textContent = 'Entrar como convidado';
    demo.onclick = () => {
      AUTH.user = { id: 'demo', name: 'Convidado', fullName: 'Convidado', email: '', picture: '', initials: 'CO', color: '#1E5AA8' };
      if (!MEMBERS.find((m) => m.id === 'demo')) MEMBERS.unshift({ id: 'demo', name: 'Convidado', initials: 'CO', color: '#1E5AA8', admin: true, canExpense: true });
      enterApp();
    };
  }
}

// Mostra a tela de login (com o botão do Google)
function showLogin() {
  $('.app').style.display = 'none';
  $('.nav').style.display = 'none';
  $('#fab').style.display = 'none';
  const el = $('#login');
  el.style.display = 'flex';

  if (!AUTH.configured()) {
    // Sem Client ID configurado: modo de demonstração
    $('#login-google').innerHTML = '<div class="login-warn">Login do Google ainda não configurado.<br>Veja INSTALACAO.md → “Login Google”.</div>';
    $('#login-demo').style.display = 'block';
    $('#login-demo').onclick = () => {
      AUTH.user = { id: 'demo', name: 'Convidado', fullName: 'Convidado', email: '', picture: '', initials: 'CO', color: '#1E5AA8' };
      if (!MEMBERS.find((m) => m.id === 'demo')) MEMBERS.unshift({ id: 'demo', name: 'Convidado', initials: 'CO', color: '#1E5AA8', admin: true, canExpense: true });
      enterApp();
    };
    return;
  }

  // Carrega a biblioteca do Google e desenha o botão
  let booted = false;
  const boot = () => {
    try {
      booted = true;
      google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: AUTH.handleCredential });
      google.accounts.id.renderButton($('#login-google'), { theme: 'filled_blue', size: 'large', shape: 'pill', text: 'signin_with', locale: 'pt-BR' });
      google.accounts.id.prompt();
    } catch (err) {
      console.error('Falha ao iniciar Google Login:', err);
      forceGuestFallback('Não foi possível iniciar o login do Google. Verifique o Client ID e as origens autorizadas.');
    }
  };
  if (window.google && google.accounts) { boot(); return; }

  const s = document.createElement('script');
  s.src = 'https://accounts.google.com/gsi/client';
  s.async = true; s.defer = true;
  s.onload = boot;
  s.onerror = () => forceGuestFallback('Não foi possível carregar a biblioteca do Google (sem internet ou bloqueada).');
  document.head.appendChild(s);

  // Rede de segurança: se em 6s o Google não carregou, libera o convidado
  setTimeout(() => { if (!booted) forceGuestFallback('O login do Google demorou a responder.'); }, 6000);
}

// Entra no app depois de logado
function enterApp() {
  const login = $('#login');
  login.classList.add('screen-hidden');
  login.style.display = 'none';
  $('.app').style.display = '';
  $('.nav').style.display = '';

  // avatar do usuário no topo
  const u = AUTH.user;
  if (u) {
    const av = u.picture
      ? `<img src="${u.picture}" alt="${esc(u.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
      : u.initials;
    $('#user-btn').innerHTML = `<div class="avatar" style="width:30px;height:30px;background:${u.color};font-size:11px;overflow:hidden">${av}</div>`;
    $('#user-btn').onclick = () => { current = 'sync'; window.scrollTo(0,0); render(); };
  }

  render();

  // Se já houver planilha conectada, puxa os dados ao abrir
  if (SYNC.url) SYNC.load().then((ok) => { if (ok) render(); });
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    init();
  } catch (err) {
    console.error('Erro fatal na inicialização:', err);
    const splash = document.getElementById('splash');
    if (splash) { splash.classList.add('leaving'); setTimeout(() => splash.classList.add('gone'), 500); }
    forceGuestFallback('Ocorreu um erro ao iniciar o app.');
  }
});
