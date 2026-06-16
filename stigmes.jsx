import React, { useState, useMemo } from "react";
import {
  Plane, Home, MapPin, Wallet, Calendar, Camera, Users, Bell,
  ChevronRight, Plus, ArrowLeft, TrendingUp, Clock, Heart,
  MessageCircle, Share2, CheckCircle2, Circle, Coins, Hotel,
  Utensils, Ticket, ShoppingBag, Car, Globe, Receipt, Moon, Sun,
} from "lucide-react";

// ────────────────────────────────────────────────────────────
// STIGMÈS (στιγμές) — "Momentos"
// Plataforma colaborativa de planejamento, finanças e memórias de viagem
// ────────────────────────────────────────────────────────────

const C = {
  blue: "#1E5AA8",
  blueDeep: "#143C6E",
  gold: "#D4AF37",
  white: "#FFFFFF",
};

// ── Dados de exemplo ─────────────────────────────────────────
const MEMBERS = [
  { id: "hilda", name: "Hilda", initials: "HI", color: "#1E5AA8", admin: true },
  { id: "ana", name: "Ana", initials: "AN", color: "#D4AF37" },
  { id: "joao", name: "João", initials: "JO", color: "#2E8B8B" },
  { id: "pedro", name: "Pedro", initials: "PE", color: "#B5654A" },
];

const TRIP = {
  name: "Mochilão Europa",
  destination: "Braga → Paris → Milão",
  cover: "linear-gradient(135deg,#143C6E 0%,#1E5AA8 55%,#2E8B8B 100%)",
  start: "2026-07-04",
  end: "2026-07-18",
  budget: 6000,
  currency: "€",
};

const CATEGORIES = {
  transporte: { label: "Transporte", icon: Car, color: "#1E5AA8" },
  hospedagem: { label: "Hospedagem", icon: Hotel, color: "#2E8B8B" },
  alimentacao: { label: "Alimentação", icon: Utensils, color: "#D4AF37" },
  passeios: { label: "Passeios", icon: Ticket, color: "#B5654A" },
  outros: { label: "Outros", icon: ShoppingBag, color: "#7B6CA8" },
};

const EXPENSES = [
  { id: 1, desc: "Hotel em Paris (3 noites)", cat: "hospedagem", amount: 400, paidBy: "hilda", split: ["hilda", "ana", "joao", "pedro"], date: "08 Jul" },
  { id: 2, desc: "Voo Lisboa → Paris", cat: "transporte", amount: 640, paidBy: "ana", split: ["hilda", "ana", "joao", "pedro"], date: "04 Jul" },
  { id: 3, desc: "Jantar Le Marais", cat: "alimentacao", amount: 120, paidBy: "joao", split: ["hilda", "ana", "joao", "pedro"], date: "08 Jul" },
  { id: 4, desc: "Ingressos Louvre", cat: "passeios", amount: 68, paidBy: "pedro", split: ["hilda", "ana", "joao", "pedro"], date: "09 Jul" },
  { id: 5, desc: "Cruzeiro no Sena", cat: "passeios", amount: 96, paidBy: "hilda", split: ["hilda", "ana", "joao", "pedro"], date: "09 Jul" },
  { id: 6, desc: "Mercado + lanches", cat: "alimentacao", amount: 54, paidBy: "ana", split: ["ana", "joao"], date: "10 Jul" },
];

const ITINERARY = [
  {
    day: 1, date: "08 Jul", city: "Paris",
    items: [
      { time: "09:00", name: "Museu do Louvre", place: "Rue de Rivoli", cost: 17, cat: "passeios" },
      { time: "13:00", name: "Almoço — Le Marais", place: "Le Marais", cost: 30, cat: "alimentacao" },
      { time: "15:00", name: "Torre Eiffel", place: "Champ de Mars", cost: 29, cat: "passeios" },
      { time: "19:00", name: "Cruzeiro no Sena", place: "Port de la Bourdonnais", cost: 24, cat: "passeios" },
    ],
  },
  {
    day: 2, date: "09 Jul", city: "Paris",
    items: [
      { time: "10:00", name: "Montmartre & Sacré-Cœur", place: "Montmartre", cost: 0, cat: "passeios" },
      { time: "13:30", name: "Almoço no bairro", place: "Pigalle", cost: 28, cat: "alimentacao" },
      { time: "16:00", name: "Trem Paris → Milão", place: "Gare de Lyon", cost: 89, cat: "transporte" },
    ],
  },
];

const POSTS = [
  {
    id: 1, author: "ana", trip: "Mochilão Europa", time: "2h",
    text: "Pôr do sol na Torre Eiffel valeu cada degrau. Dica: suba a pé até o 2º andar, fila bem menor 🗼",
    grad: "linear-gradient(135deg,#D4AF37,#B5654A)", likes: 12, comments: 3, tags: ["#Paris", "#Europa"],
  },
  {
    id: 2, author: "joao", trip: "Mochilão Europa", time: "5h",
    text: "Café da manhã no mercado local antes do trem para Milão. A baguete daqui é outro nível.",
    grad: "linear-gradient(135deg,#1E5AA8,#2E8B8B)", likes: 8, comments: 1, tags: ["#RoadTrip"],
  },
];

// ── Helpers ──────────────────────────────────────────────────
const member = (id) => MEMBERS.find((m) => m.id === id);

function daysUntil(date) {
  const diff = Math.ceil((new Date(date) - new Date("2026-06-16")) / 86400000);
  return diff > 0 ? diff : 0;
}

// Liquidação inteligente (simplificação de dívidas)
function computeBalances(expenses) {
  const net = {};
  MEMBERS.forEach((m) => (net[m.id] = 0));
  expenses.forEach((e) => {
    const share = e.amount / e.split.length;
    net[e.paidBy] += e.amount;
    e.split.forEach((p) => (net[p] -= share));
  });
  return net;
}

function settle(net) {
  const debtors = [], creditors = [];
  Object.entries(net).forEach(([id, v]) => {
    if (v < -0.01) debtors.push({ id, v: -v });
    else if (v > 0.01) creditors.push({ id, v });
  });
  debtors.sort((a, b) => b.v - a.v);
  creditors.sort((a, b) => b.v - a.v);
  const tx = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amt = Math.min(debtors[i].v, creditors[j].v);
    tx.push({ from: debtors[i].id, to: creditors[j].id, amount: amt });
    debtors[i].v -= amt; creditors[j].v -= amt;
    if (debtors[i].v < 0.01) i++;
    if (creditors[j].v < 0.01) j++;
  }
  return tx;
}

// ── UI atoms ─────────────────────────────────────────────────
const Avatar = ({ id, size = 32 }) => {
  const m = member(id);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: m.color,
      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 600, flexShrink: 0, letterSpacing: 0.3,
    }}>{m.initials}</div>
  );
};

const SectionTitle = ({ eyebrow, children }) => (
  <div style={{ marginBottom: 14 }}>
    {eyebrow && <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.gold, fontWeight: 600 }}>{eyebrow}</div>}
    <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, margin: "2px 0 0", letterSpacing: -0.3 }}>{children}</h2>
  </div>
);

// ── Screens ──────────────────────────────────────────────────
function Dashboard({ dark }) {
  const spent = EXPENSES.reduce((s, e) => s + e.amount, 0);
  const pct = Math.round((spent / TRIP.budget) * 100);
  const sub = dark ? "#9fb3cc" : "#6b7d92";
  const card = dark ? "#16243a" : "#fff";
  const border = dark ? "#22344f" : "#e8edf3";

  return (
    <div>
      {/* Hero / passaporte */}
      <div style={{
        background: TRIP.cover, borderRadius: 22, padding: "22px 20px 20px",
        color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", opacity: 0.85 }}>στιγμές · momentos</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 30, margin: "8px 0 4px", lineHeight: 1.05 }}>{TRIP.name}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.92, fontSize: 13 }}>
          <MapPin size={14} /> {TRIP.destination}
        </div>
        <div style={{
          marginTop: 18, display: "flex", alignItems: "baseline", gap: 8,
          borderTop: "1px solid rgba(255,255,255,.22)", paddingTop: 14,
        }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 700, color: C.gold }}>{daysUntil(TRIP.start)}</span>
          <span style={{ fontSize: 13, opacity: 0.9 }}>dias até a partida</span>
        </div>
        <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.12 }}><Plane size={120} /></div>
      </div>

      {/* Stats rápidos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
        {[
          { label: "Participantes", value: MEMBERS.length, icon: Users },
          { label: "Cidades", value: 3, icon: MapPin },
        ].map((s) => (
          <div key={s.label} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 14 }}>
            <s.icon size={18} color={C.blue} />
            <div style={{ fontFamily: "Georgia, serif", fontSize: 24, marginTop: 6 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: sub }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Orçamento */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 16, marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: sub }}>Orçamento consumido</span>
          <span style={{ fontWeight: 700, color: pct > 80 ? C.gold : C.blue }}>{pct}%</span>
        </div>
        <div style={{ height: 10, background: dark ? "#22344f" : "#eef2f7", borderRadius: 8, marginTop: 10, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg,${C.blue},${C.gold})`, borderRadius: 8 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13 }}>
          <span>Gasto <b>{TRIP.currency}{spent}</b></span>
          <span style={{ color: sub }}>de {TRIP.currency}{TRIP.budget}</span>
        </div>
      </div>

      {/* Próxima atividade */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 16, marginTop: 12 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: C.gold, fontWeight: 600 }}>Próxima atividade</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${C.blue}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ticket size={20} color={C.blue} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>Museu do Louvre</div>
            <div style={{ fontSize: 12, color: sub }}>08 Jul · 09:00 · Rue de Rivoli</div>
          </div>
          <ChevronRight size={18} color={sub} />
        </div>
      </div>
    </div>
  );
}

function Budget({ dark }) {
  const sub = dark ? "#9fb3cc" : "#6b7d92";
  const card = dark ? "#16243a" : "#fff";
  const border = dark ? "#22344f" : "#e8edf3";
  const [tab, setTab] = useState("gastos");

  const byCat = useMemo(() => {
    const m = {};
    EXPENSES.forEach((e) => (m[e.cat] = (m[e.cat] || 0) + e.amount));
    return m;
  }, []);
  const total = EXPENSES.reduce((s, e) => s + e.amount, 0);

  const net = useMemo(() => computeBalances(EXPENSES), []);
  const tx = useMemo(() => settle(net), [net]);

  return (
    <div>
      <SectionTitle eyebrow="Módulo financeiro">Orçamento & Despesas</SectionTitle>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[["gastos", "Gastos"], ["categorias", "Por categoria"], ["acerto", "Acerto de contas"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: "9px 6px", borderRadius: 10, border: "none", cursor: "pointer",
            fontSize: 12.5, fontWeight: 600,
            background: tab === k ? C.blue : (dark ? "#16243a" : "#eef2f7"),
            color: tab === k ? "#fff" : sub,
          }}>{l}</button>
        ))}
      </div>

      {tab === "gastos" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {EXPENSES.map((e) => {
            const cat = CATEGORIES[e.cat];
            const Icon = cat.icon;
            return (
              <div key={e.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 13, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: `${cat.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} color={cat.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.desc}</div>
                  <div style={{ fontSize: 11.5, color: sub, marginTop: 2 }}>{e.date} · pago por {member(e.paidBy).name} · ÷{e.split.length}</div>
                </div>
                <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 15 }}>{TRIP.currency}{e.amount}</div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "categorias" && (
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 16 }}>
          {Object.entries(byCat).map(([k, v]) => {
            const cat = CATEGORIES[k];
            const pct = Math.round((v / total) * 100);
            return (
              <div key={k} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <cat.icon size={15} color={cat.color} /> {cat.label}
                  </span>
                  <span><b>{TRIP.currency}{v}</b> <span style={{ color: sub }}>· {pct}%</span></span>
                </div>
                <div style={{ height: 8, background: dark ? "#22344f" : "#eef2f7", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: cat.color, borderRadius: 6 }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "acerto" && (
        <div>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: C.gold, fontWeight: 600, marginBottom: 12 }}>Saldo por participante</div>
            {MEMBERS.map((m) => {
              const v = net[m.id];
              const positive = v >= 0;
              return (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                  <Avatar id={m.id} size={30} />
                  <span style={{ flex: 1, fontSize: 14 }}>{m.name}</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: positive ? "#2E8B8B" : "#B5654A" }}>
                    {positive ? "+" : ""}{TRIP.currency}{Math.abs(v).toFixed(0)}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: C.gold, fontWeight: 600, marginBottom: 4 }}>Liquidação inteligente</div>
            <div style={{ fontSize: 12, color: sub, marginBottom: 14 }}>{tx.length} pagamentos resolvem todas as dívidas</div>
            {tx.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: i ? `1px solid ${border}` : "none" }}>
                <Avatar id={t.from} size={28} />
                <span style={{ fontSize: 13 }}>{member(t.from).name}</span>
                <ChevronRight size={16} color={sub} />
                <Avatar id={t.to} size={28} />
                <span style={{ fontSize: 13, flex: 1 }}>{member(t.to).name}</span>
                <span style={{ fontWeight: 700, color: C.blue }}>{TRIP.currency}{t.amount.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Itinerary({ dark }) {
  const sub = dark ? "#9fb3cc" : "#6b7d92";
  const card = dark ? "#16243a" : "#fff";
  const border = dark ? "#22344f" : "#e8edf3";

  return (
    <div>
      <SectionTitle eyebrow="Módulo roteiro">Cronograma diário</SectionTitle>
      {ITINERARY.map((d) => {
        const dayCost = d.items.reduce((s, i) => s + i.cost, 0);
        return (
          <div key={d.day} style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: TRIP.cover, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 9, opacity: 0.85, letterSpacing: 1 }}>DIA</span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 19, lineHeight: 1 }}>{d.day}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{d.city}</div>
                <div style={{ fontSize: 12, color: sub }}>{d.date} · {d.items.length} atividades · {TRIP.currency}{dayCost}</div>
              </div>
            </div>

            <div style={{ position: "relative", paddingLeft: 22 }}>
              <div style={{ position: "absolute", left: 6, top: 6, bottom: 6, width: 2, background: dark ? "#22344f" : "#e8edf3" }} />
              {d.items.map((it, idx) => {
                const cat = CATEGORIES[it.cat];
                return (
                  <div key={idx} style={{ position: "relative", marginBottom: 12 }}>
                    <div style={{ position: "absolute", left: -22, top: 16, width: 12, height: 12, borderRadius: "50%", background: cat.color, border: `3px solid ${dark ? "#0e1929" : "#f4f7fb"}` }} />
                    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 13, padding: 12, display: "flex", gap: 12 }}>
                      <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: C.blue, fontSize: 14, minWidth: 44 }}>{it.time}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{it.name}</div>
                        <div style={{ fontSize: 12, color: sub, marginTop: 2 }}>{it.place}</div>
                      </div>
                      {it.cost > 0 && <div style={{ fontSize: 13, fontWeight: 600, color: sub }}>{TRIP.currency}{it.cost}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Memories({ dark }) {
  const sub = dark ? "#9fb3cc" : "#6b7d92";
  const card = dark ? "#16243a" : "#fff";
  const border = dark ? "#22344f" : "#e8edf3";
  const [liked, setLiked] = useState({});

  return (
    <div>
      <SectionTitle eyebrow="Feed social">Memórias</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {POSTS.map((p) => {
          const isLiked = liked[p.id];
          return (
            <div key={p.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: 18, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 13 }}>
                <Avatar id={p.author} size={38} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{member(p.author).name}</div>
                  <div style={{ fontSize: 11.5, color: sub }}>{p.trip} · {p.time}</div>
                </div>
                <Globe size={16} color={sub} />
              </div>
              <div style={{ height: 200, background: p.grad, position: "relative" }}>
                <Camera size={40} color="rgba(255,255,255,.35)" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              </div>
              <div style={{ padding: 13 }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{p.text}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontSize: 12, color: C.blue, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 20, marginTop: 12, color: sub, fontSize: 13 }}>
                  <button onClick={() => setLiked((s) => ({ ...s, [p.id]: !s[p.id] }))} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: isLiked ? "#B5654A" : sub, padding: 0 }}>
                    <Heart size={17} fill={isLiked ? "#B5654A" : "none"} /> {p.likes + (isLiked ? 1 : 0)}
                  </button>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MessageCircle size={17} /> {p.comments}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Share2 size={17} /></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── App shell ────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [dark, setDark] = useState(false);

  const bg = dark ? "#0e1929" : "#f4f7fb";
  const text = dark ? "#e9eef5" : "#16243a";

  const NAV = [
    { id: "home", label: "Início", icon: Home },
    { id: "budget", label: "Orçamento", icon: Wallet },
    { id: "itinerary", label: "Roteiro", icon: Calendar },
    { id: "memories", label: "Memórias", icon: Camera },
  ];

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "system-ui, -apple-system, sans-serif", transition: "background .3s" }}>
      <div style={{ maxWidth: 440, margin: "0 auto", minHeight: "100vh", position: "relative", paddingBottom: 80 }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 8px" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 19, letterSpacing: 1, fontWeight: 700 }}>
            STIGMÈS <span style={{ color: C.gold, fontSize: 14 }}>στιγμές</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setDark((d) => !d)} style={iconBtn(dark)}>
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button style={iconBtn(dark)}><Bell size={17} /></button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "8px 18px 0" }}>
          {tab === "home" && <Dashboard dark={dark} />}
          {tab === "budget" && <Budget dark={dark} />}
          {tab === "itinerary" && <Itinerary dark={dark} />}
          {tab === "memories" && <Memories dark={dark} />}
        </div>

        {/* Bottom nav */}
        <div style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 440, background: dark ? "#0e1929ee" : "#ffffffee",
          backdropFilter: "blur(12px)", borderTop: `1px solid ${dark ? "#22344f" : "#e8edf3"}`,
          display: "flex", justifyContent: "space-around", padding: "10px 8px 14px",
        }}>
          {NAV.map((n) => {
            const active = tab === n.id;
            return (
              <button key={n.id} onClick={() => setTab(n.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                color: active ? C.blue : (dark ? "#5f7390" : "#9aa9bb"), flex: 1,
              }}>
                <n.icon size={21} fill={active ? `${C.blue}22` : "none"} />
                <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 500 }}>{n.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function iconBtn(dark) {
  return {
    width: 36, height: 36, borderRadius: 11, border: "none", cursor: "pointer",
    background: dark ? "#16243a" : "#fff", color: dark ? "#e9eef5" : "#16243a",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
  };
}
