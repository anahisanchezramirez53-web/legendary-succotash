import { useState } from "react";

const GOLD = "#C9A84C";
const DARK = "#1A1209";
const MANE = "#3D2B0A";
const CREAM = "#F5EDDA";
const ACCENT = "#E8C568";
const RED = "#C0392B";
const GREEN = "#27AE60";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Lato:wght@300;400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${DARK}; font-family: 'Lato', sans-serif; color: ${CREAM}; }

  .app { display: flex; flex-direction: column; min-height: 100vh; max-width: 430px; margin: 0 auto; background: ${DARK}; position: relative; }

  /* HEADER */
  .header { background: linear-gradient(135deg, ${MANE}, #2a1a05); padding: 18px 20px 14px; border-bottom: 2px solid ${GOLD}; display: flex; align-items: center; gap: 12px; position: sticky; top: 0; z-index: 100; }
  .logo { font-size: 32px; }
  .header-text h1 { font-family: 'Cinzel', serif; font-size: 18px; color: ${GOLD}; letter-spacing: 2px; font-weight: 900; }
  .header-text p { font-size: 10px; color: ${ACCENT}; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8; }

  /* NAV */
  .nav { display: flex; overflow-x: auto; gap: 0; background: ${MANE}; border-bottom: 1px solid ${GOLD}33; scrollbar-width: none; }
  .nav::-webkit-scrollbar { display: none; }
  .nav-btn { flex: 0 0 auto; padding: 10px 14px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-family: 'Lato', sans-serif; font-weight: 700; color: ${ACCENT}88; background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; }
  .nav-btn.active { color: ${GOLD}; border-bottom-color: ${GOLD}; }
  .nav-btn:hover { color: ${ACCENT}; }

  /* CONTENT */
  .content { flex: 1; padding: 16px; overflow-y: auto; }

  /* CARDS */
  .card { background: linear-gradient(135deg, ${MANE}88, #2a1a0588); border: 1px solid ${GOLD}33; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
  .card-title { font-family: 'Cinzel', serif; font-size: 13px; color: ${GOLD}; letter-spacing: 1px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }

  /* SECTION TITLES */
  .section-title { font-family: 'Cinzel', serif; font-size: 16px; color: ${GOLD}; margin-bottom: 16px; letter-spacing: 2px; border-left: 3px solid ${GOLD}; padding-left: 10px; }

  /* INPUTS */
  input, select, textarea { background: #2a1a0588; border: 1px solid ${GOLD}44; border-radius: 8px; padding: 10px 12px; color: ${CREAM}; font-family: 'Lato', sans-serif; font-size: 13px; width: 100%; outline: none; transition: border 0.2s; }
  input:focus, select:focus, textarea:focus { border-color: ${GOLD}; }
  select option { background: ${MANE}; }
  label { font-size: 11px; color: ${ACCENT}99; letter-spacing: 1px; text-transform: uppercase; display: block; margin-bottom: 4px; margin-top: 10px; }

  /* BUTTONS */
  .btn { padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer; font-family: 'Lato', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; transition: all 0.2s; }
  .btn-gold { background: linear-gradient(135deg, ${GOLD}, ${ACCENT}); color: ${DARK}; }
  .btn-gold:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-outline { background: transparent; border: 1px solid ${GOLD}66; color: ${GOLD}; }
  .btn-outline:hover { border-color: ${GOLD}; background: ${GOLD}11; }
  .btn-danger { background: ${RED}33; border: 1px solid ${RED}66; color: #ff6b6b; }
  .btn-sm { padding: 6px 12px; font-size: 11px; }
  .btn-row { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }

  /* TAGS / BADGES */
  .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; letter-spacing: 1px; }
  .badge-gold { background: ${GOLD}22; color: ${GOLD}; border: 1px solid ${GOLD}44; }
  .badge-green { background: ${GREEN}22; color: ${GREEN}; border: 1px solid ${GREEN}44; }
  .badge-red { background: ${RED}22; color: #ff6b6b; border: 1px solid ${RED}44; }

  /* DIVIDER */
  .divider { border: none; border-top: 1px solid ${GOLD}22; margin: 12px 0; }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }

  /* STAT BOXES */
  .stat-box { background: ${MANE}66; border: 1px solid ${GOLD}33; border-radius: 10px; padding: 12px; text-align: center; }
  .stat-num { font-family: 'Cinzel', serif; font-size: 22px; color: ${GOLD}; font-weight: 700; }
  .stat-label { font-size: 10px; color: ${ACCENT}88; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }

  /* REMINDER CARDS */
  .reminder { border-left: 3px solid ${GOLD}; padding: 10px 14px; background: ${MANE}55; border-radius: 0 8px 8px 0; margin-bottom: 8px; }
  .reminder-title { font-weight: 700; font-size: 13px; color: ${CREAM}; }
  .reminder-sub { font-size: 11px; color: ${ACCENT}88; margin-top: 2px; }

  /* INGREDIENT ROW */
  .ing-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .ing-row input { flex: 1; }
  .ing-name { flex: 2; }
  .ing-qty { flex: 1; }
  .ing-unit { flex: 1; }

  /* TABLE */
  .table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .table th { color: ${GOLD}; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 1px; padding: 8px 6px; border-bottom: 1px solid ${GOLD}33; text-align: left; }
  .table td { padding: 8px 6px; border-bottom: 1px solid ${GOLD}11; color: ${CREAM}cc; vertical-align: top; }
  .table tr:hover td { background: ${GOLD}08; }

  /* SCALE CONTROL */
  .scale-control { display: flex; align-items: center; gap: 12px; background: ${MANE}66; border: 1px solid ${GOLD}44; border-radius: 10px; padding: 10px 14px; margin-bottom: 12px; }
  .scale-label { font-size: 12px; color: ${ACCENT}; flex: 1; }
  .scale-btn { width: 28px; height: 28px; border-radius: 50%; border: 1px solid ${GOLD}66; background: ${GOLD}22; color: ${GOLD}; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 700; }
  .scale-val { font-family: 'Cinzel', serif; font-size: 18px; color: ${GOLD}; min-width: 30px; text-align: center; }

  /* CHART BAR */
  .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .bar-label { font-size: 11px; color: ${CREAM}cc; min-width: 80px; }
  .bar-track { flex: 1; background: ${GOLD}11; border-radius: 4px; height: 14px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, ${GOLD}, ${ACCENT}); transition: width 0.6s; }
  .bar-val { font-size: 11px; color: ${GOLD}; min-width: 30px; text-align: right; }

  .empty { text-align: center; color: ${ACCENT}44; font-size: 13px; padding: 30px; font-style: italic; }

  .tab-pills { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
  .pill { padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; cursor: pointer; text-transform: uppercase; border: 1px solid ${GOLD}44; color: ${GOLD}88; background: transparent; transition: all 0.2s; }
  .pill.active { background: ${GOLD}; color: ${DARK}; border-color: ${GOLD}; }

  .lion-watermark { position: fixed; bottom: 80px; right: 10px; font-size: 60px; opacity: 0.04; pointer-events: none; z-index: 0; }

  .form-section { border: 1px solid ${GOLD}22; border-radius: 10px; padding: 14px; margin-bottom: 14px; }
  .form-section-title { font-size: 11px; color: ${GOLD}88; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }

  .list-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid ${GOLD}11; }
  .list-item:last-child { border-bottom: none; }
  .list-item-title { font-size: 13px; font-weight: 700; color: ${CREAM}; }
  .list-item-sub { font-size: 11px; color: ${ACCENT}77; margin-top: 2px; }

  .progress-ring { display: flex; gap: 8px; flex-wrap: wrap; }
  .prog-item { background: ${MANE}55; border: 1px solid ${GOLD}22; border-radius: 8px; padding: 8px 12px; flex: 1; min-width: 100px; }
  .prog-pct { font-family: 'Cinzel', serif; font-size: 18px; color: ${GOLD}; }
  .prog-label { font-size: 10px; color: ${ACCENT}77; letter-spacing: 1px; }

  .floating-add { position: fixed; bottom: 20px; right: 20px; width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, ${GOLD}, ${ACCENT}); border: none; color: ${DARK}; font-size: 24px; cursor: pointer; box-shadow: 0 4px 20px ${GOLD}44; z-index: 200; display: flex; align-items: center; justify-content: center; font-weight: 700; transition: transform 0.2s; }
  .floating-add:hover { transform: scale(1.1); }
`;

// ── DATA STORES ──────────────────────────────────────────────
const initRecipes = [
  { id: 1, name: "Risotto de Hongos", yield: "10 porciones", time: "45 min", cost: 180, ingredients: [{ name: "Arroz Arborio", qty: 500, unit: "g" }, { name: "Hongos Portobello", qty: 300, unit: "g" }, { name: "Caldo de Pollo", qty: 1.5, unit: "L" }, { name: "Vino Blanco", qty: 200, unit: "ml" }, { name: "Parmesano", qty: 100, unit: "g" }] },
  { id: 2, name: "Pechuga Rellena", yield: "8 porciones", time: "60 min", cost: 220, ingredients: [{ name: "Pechuga de Pollo", qty: 1200, unit: "g" }, { name: "Espinacas", qty: 200, unit: "g" }, { name: "Queso Manchego", qty: 150, unit: "g" }, { name: "Ajo", qty: 20, unit: "g" }] },
];

const initOrders = [
  { id: 1, date: "2026-04-28", product: "Risotto de Hongos", qty: 15, area: "Banquetes", staff: "Carlos M." },
  { id: 2, date: "2026-04-28", product: "Pechuga Rellena", qty: 22, area: "Restaurante", staff: "Ana R." },
  { id: 3, date: "2026-04-29", product: "Risotto de Hongos", qty: 18, area: "Restaurante", staff: "Carlos M." },
  { id: 4, date: "2026-04-29", product: "Ensalada César", qty: 30, area: "Eventos", staff: "Luis P." },
  { id: 5, date: "2026-04-30", product: "Pechuga Rellena", qty: 25, area: "Restaurante", staff: "Ana R." },
  { id: 6, date: "2026-04-30", product: "Ensalada César", qty: 12, area: "Banquetes", staff: "Luis P." },
];

const initMermas = [
  { id: 1, date: "2026-04-29", product: "Espinacas", qty: 200, unit: "g", reason: "Caducidad", area: "Cocina Fría" },
  { id: 2, date: "2026-04-30", product: "Crema", qty: 500, unit: "ml", reason: "Error de Producción", area: "Pastelería" },
];

const initProductions = [
  { id: 1, date: "2026-04-29", product: "Risotto de Hongos", pesoInicial: 5.2, merma: 0.4, pesoFinal: 4.8, ordenes: 18, obs: "Sin incidentes", elaboro: "Carlos M." },
];

const initStaff = [
  { id: 1, name: "Carlos Mendoza", role: "Chef de Partie", area: "Cocina Caliente" },
  { id: 2, name: "Ana Rodríguez", role: "Sous Chef", area: "Restaurante" },
  { id: 3, name: "Luis Pérez", role: "Cocinero", area: "Banquetes" },
];

const initReminders = [
  { id: 1, title: "Reunión de menú semanal", date: "2026-05-02", time: "09:00", type: "reunion" },
  { id: 2, title: "Inventario general de almacén", date: "2026-05-03", time: "07:30", type: "inventario" },
  { id: 3, title: "Entrega de proveedor — Lácteos", date: "2026-05-05", time: "08:00", type: "proveedor" },
];

const initInventory = {
  "Almacén Seco": [
    { id: 1, name: "Arroz Arborio", qty: 10, unit: "kg", min: 5 },
    { id: 2, name: "Harina", qty: 20, unit: "kg", min: 8 },
    { id: 3, name: "Azúcar", qty: 15, unit: "kg", min: 5 },
  ],
  "Cámara Fría": [
    { id: 4, name: "Pechuga de Pollo", qty: 8, unit: "kg", min: 3 },
    { id: 5, name: "Espinacas", qty: 2, unit: "kg", min: 1 },
    { id: 6, name: "Crema", qty: 4, unit: "L", min: 2 },
  ],
  "Bodega Bebidas": [
    { id: 7, name: "Vino Blanco", qty: 6, unit: "botellas", min: 2 },
    { id: 8, name: "Caldo de Pollo", qty: 10, unit: "L", min: 4 },
  ],
};

// ── COMPONENTS ───────────────────────────────────────────────

function Dashboard({ reminders, orders }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = reminders.filter(r => r.date >= today).slice(0, 3);

  // top products
  const counts = {};
  orders.forEach(o => { counts[o.product] = (counts[o.product] || 0) + o.qty; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maxVal = top[0]?.[1] || 1;

  return (
    <div>
      <p className="section-title">🦁 Panel Principal</p>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <div className="stat-box"><div className="stat-num">{orders.length}</div><div className="stat-label">Pedidos</div></div>
        <div className="stat-box"><div className="stat-num">{upcoming.length}</div><div className="stat-label">Eventos</div></div>
        <div className="stat-box"><div className="stat-num" style={{ color: GREEN }}>OK</div><div className="stat-label">Estado</div></div>
      </div>

      <div className="card">
        <div className="card-title">📅 Próximos Recordatorios</div>
        {upcoming.length === 0 && <div className="empty">Sin recordatorios próximos</div>}
        {upcoming.map(r => (
          <div className="reminder" key={r.id}>
            <div className="reminder-title">{r.title}</div>
            <div className="reminder-sub">{r.date} · {r.time} · <span style={{ color: GOLD }}>{r.type}</span></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">📊 Top Productos (semana)</div>
        {top.map(([name, val]) => (
          <div className="bar-row" key={name}>
            <div className="bar-label">{name.substring(0, 14)}</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${(val / maxVal) * 100}%` }} /></div>
            <div className="bar-val">{val}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ borderColor: GOLD + "66" }}>
        <div className="card-title">⚡ Accesos Rápidos</div>
        <div className="grid-2" style={{ gap: 8 }}>
          {[["📋 Nuevo Pedido", "orders"], ["🧪 Nueva Merma", "waste"], ["🍳 Nueva Producción", "production"], ["📦 Ver Inventario", "inventory"]].map(([label]) => (
            <button key={label} className="btn btn-outline btn-sm" style={{ textAlign: "left" }}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Recetario() {
  const [recipes, setRecipes] = useState(initRecipes);
  const [selected, setSelected] = useState(null);
  const [scale, setScale] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newR, setNewR] = useState({ name: "", yield: "", time: "", cost: "", ingredients: [{ name: "", qty: "", unit: "g" }] });

  function addIng() { setNewR(r => ({ ...r, ingredients: [...r.ingredients, { name: "", qty: "", unit: "g" }] })); }
  function saveRecipe() {
    if (!newR.name) return;
    setRecipes(r => [...r, { ...newR, id: Date.now(), cost: Number(newR.cost), ingredients: newR.ingredients.filter(i => i.name) }]);
    setShowForm(false);
    setNewR({ name: "", yield: "", time: "", cost: "", ingredients: [{ name: "", qty: "", unit: "g" }] });
  }

  if (selected) {
    const r = recipes.find(x => x.id === selected);
    return (
      <div>
        <button className="btn btn-outline btn-sm" onClick={() => { setSelected(null); setScale(1); }} style={{ marginBottom: 14 }}>← Volver</button>
        <p className="section-title">🍽 {r.name}</p>
        <div className="grid-2" style={{ marginBottom: 12 }}>
          <div className="stat-box"><div className="stat-num" style={{ fontSize: 14 }}>{r.yield}</div><div className="stat-label">Rendimiento</div></div>
          <div className="stat-box"><div className="stat-num" style={{ fontSize: 14 }}>{r.time}</div><div className="stat-label">Tiempo</div></div>
        </div>
        <div className="scale-control">
          <div className="scale-label">Escalar receta</div>
          <button className="scale-btn" onClick={() => setScale(s => Math.max(0.25, s - 0.25))}>−</button>
          <div className="scale-val">{scale}x</div>
          <button className="scale-btn" onClick={() => setScale(s => s + 0.25)}>+</button>
        </div>
        <div className="card">
          <div className="card-title">🧂 Ingredientes</div>
          <table className="table">
            <thead><tr><th>Ingrediente</th><th>Cantidad</th><th>Unidad</th></tr></thead>
            <tbody>{r.ingredients.map((ing, i) => (
              <tr key={i}>
                <td>{ing.name}</td>
                <td style={{ color: GOLD, fontWeight: 700 }}>{(ing.qty * scale).toFixed(ing.qty * scale < 10 ? 2 : 0)}</td>
                <td>{ing.unit}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-title">💰 Costo estimado</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: ACCENT + "88", fontSize: 12 }}>Costo total escalado:</span>
            <span style={{ fontFamily: "Cinzel", fontSize: 20, color: GOLD }}>${(r.cost * scale).toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="section-title">📖 Recetario</p>
      {recipes.map(r => (
        <div className="card" key={r.id} style={{ cursor: "pointer" }} onClick={() => { setSelected(r.id); setScale(1); }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontFamily: "Cinzel", fontSize: 14, color: CREAM, marginBottom: 6 }}>{r.name}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span className="badge badge-gold">⏱ {r.time}</span>
                <span className="badge badge-gold">🍽 {r.yield}</span>
                <span className="badge badge-green">💰 ${r.cost}</span>
              </div>
            </div>
            <span style={{ color: GOLD, fontSize: 20 }}>›</span>
          </div>
          <div style={{ fontSize: 11, color: ACCENT + "66", marginTop: 8 }}>{r.ingredients.length} ingredientes</div>
        </div>
      ))}

      {showForm && (
        <div className="card" style={{ borderColor: GOLD + "88" }}>
          <div className="card-title">✨ Nueva Receta</div>
          <label>Nombre</label>
          <input value={newR.name} onChange={e => setNewR(r => ({ ...r, name: e.target.value }))} placeholder="Ej: Salmón al Miso" />
          <div className="grid-2">
            <div><label>Rendimiento</label><input value={newR.yield} onChange={e => setNewR(r => ({ ...r, yield: e.target.value }))} placeholder="Ej: 10 porciones" /></div>
            <div><label>Tiempo</label><input value={newR.time} onChange={e => setNewR(r => ({ ...r, time: e.target.value }))} placeholder="Ej: 30 min" /></div>
          </div>
          <label>Costo estimado ($)</label>
          <input type="number" value={newR.cost} onChange={e => setNewR(r => ({ ...r, cost: e.target.value }))} placeholder="0.00" />
          <label>Ingredientes</label>
          {newR.ingredients.map((ing, i) => (
            <div className="ing-row" key={i}>
              <input className="ing-name" placeholder="Ingrediente" value={ing.name} onChange={e => { const arr = [...newR.ingredients]; arr[i].name = e.target.value; setNewR(r => ({ ...r, ingredients: arr })); }} />
              <input className="ing-qty" type="number" placeholder="Cant." value={ing.qty} onChange={e => { const arr = [...newR.ingredients]; arr[i].qty = e.target.value; setNewR(r => ({ ...r, ingredients: arr })); }} />
              <select className="ing-unit" value={ing.unit} onChange={e => { const arr = [...newR.ingredients]; arr[i].unit = e.target.value; setNewR(r => ({ ...r, ingredients: arr })); }}>
                {["g", "kg", "ml", "L", "pzas", "cdas", "tazas"].map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          ))}
          <button classN
