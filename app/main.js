// China by Numbers — routing, pages and the GDP chart. Plain JavaScript,
// no libraries and no network requests.
import { SITE_META, KEY_NUMBERS, GDP_SERIES, AGE_GROUPS, INDUSTRY_SPLIT, TRADE_FACTS, TOP_PROVINCES, HEALTH_SCHOOL, ENVIRONMENT } from './data.js';

const view = document.getElementById('view');

// Escape text before it goes into markup.
const escapeHtml = (text) => String(text).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const onePlace = (n) => Number(n).toFixed(1);

// Draw the GDP bars with the growth line on top, on a canvas.
function drawGdp(canvas, fromYear) {
  const rows = GDP_SERIES.filter((r) => r.year >= fromYear);
  const ratio = window.devicePixelRatio || 1;
  const W = 640, H = 300, L = 44, R = 14, T = 18, B = 30;
  canvas.width = W * ratio;
  canvas.height = H * ratio;
  canvas.style.height = 'auto';
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  const top = 150;
  const left = L, right = W - R, upper = T, lower = H - B;
  const step = (right - left) / rows.length;
  ctx.strokeStyle = '#e8edf2';
  ctx.fillStyle = '#55677d';
  ctx.font = '11px Arial';
  ctx.textAlign = 'right';
  [0, 50, 100, 150].forEach((mark) => {
    const y = lower - (mark / top) * (lower - upper);
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
    ctx.fillText(String(mark), left - 6, y + 4);
  });
  ctx.textAlign = 'center';
  rows.forEach((row, i) => {
    const x = left + i * step + step * 0.18;
    const w = step * 0.64;
    const h = (row.gdp / top) * (lower - upper);
    ctx.fillStyle = row.year === 2024 ? '#c8102e' : '#1e40af';
    ctx.fillRect(x, lower - h, w, h);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Arial';
    ctx.fillText(onePlace(row.gdp), x + w / 2, lower - h + 14);
    ctx.fillStyle = '#55677d';
    ctx.font = '11px Arial';
    ctx.fillText(String(row.year), x + w / 2, lower + 16);
  });
  const point = (row, i) => [left + i * step + step * 0.5, lower - (row.growth / 10) * (lower - upper)];
  ctx.strokeStyle = '#0e7490';
  ctx.lineWidth = 2;
  ctx.beginPath();
  rows.forEach((row, i) => {
    const [x, y] = point(row, i);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.fillStyle = '#0e7490';
  rows.forEach((row, i) => {
    const [x, y] = point(row, i);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = '#0e7490';
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('— growth % (scale 0–10%)', left + 4, upper + 2);
}

function statCards() {
  const cards = KEY_NUMBERS.map((k) => `
    <div class="card">
      <div class="card-label">${escapeHtml(k.label)}</div>
      <div class="card-value">${escapeHtml(k.value)}</div>
      <div class="card-change${k.change.startsWith('down') ? ' down' : ''}">${escapeHtml(k.change)}</div>
      <div class="card-note">${escapeHtml(k.note)}</div>
    </div>`).join('');
  return `<div class="cards">${cards}</div>`;
}

function ageBars() {
  return AGE_GROUPS.map((a) => `
    <div class="bar-row">
      <span>${escapeHtml(a.band)}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${a.share}%;background:#1e40af"></span></span>
      <span class="bar-num">${a.people}m · ${a.share}%</span>
    </div>`).join('');
}

function sectorBars() {
  return INDUSTRY_SPLIT.map((s) => `
    <div class="bar-row">
      <span>${escapeHtml(s.name)}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${s.share}%;background:${s.colour}"></span></span>
      <span class="bar-num">¥${s.value}tr · ${s.share}%</span>
    </div>`).join('');
}

function yearSelect() {
  return `<div class="control-row">
    <label for="fromYear">Show from</label>
    <select id="fromYear">
      <option value="2015" selected>2015</option>
      <option value="2018">2018</option>
      <option value="2020">2020</option>
      <option value="2022">2022</option>
    </select>
    <span class="muted small">Change the year and the chart redraws.</span>
  </div>`;
}

function chartCard() {
  return `<div class="panel">
    <h3>GDP, 2015–2024 (¥ trillion), with growth (%)</h3>
    <canvas class="chart" id="gdpChart" role="img" aria-label="Bar chart of China's GDP from 2015 to 2024, rising from 68.9 to 134.9 trillion yuan"></canvas>
    <p class="chart-note">Bars: GDP in trillion yuan. Line: real annual growth. 2024 is in red. Source: NBS.</p>
    ${yearSelect()}
  </div>`;
}

function factList(rows) {
  return `<div class="facts">${rows.map((r) => `<div><span>${escapeHtml(r.label)}</span><b>${escapeHtml(r.value)}${r.change ? ' · ' + escapeHtml(r.change) : ''}</b></div>`).join('')}</div>`;
}

// The five pages.
function viewHome() {
  return `
    <p class="kicker">National statistics · ${escapeHtml(SITE_META.country)}</p>
    <h1>China in ${SITE_META.year}: the year in numbers</h1>
    <p class="lede">One country, 1.4 billion people, the world's second-largest economy. Here are the figures that describe China today — its people, its growth, its trade, its health and its provinces — all from the National Bureau of Statistics.</p>
    ${statCards()}
    <div class="columns">
      ${chartCard()}
      <div class="panel">
        <h3>Who lives here</h3>
        ${ageBars()}
        <p class="small muted">Age bands at the end of 2024. People aged 60 and over passed 300 million for the first time; the working-age band (15–59) is 60.9% of everyone.</p>
        <h3 style="margin-top:18px">Where GDP comes from</h3>
        ${sectorBars()}
        <p class="small muted">Services now make more than half of GDP; industry is 38.3% and agriculture 7.1%.</p>
      </div>
    </div>
    <div class="callout">
      <p><b>Why 2024 stands out.</b> GDP grew 5.0% to ¥134.9 trillion, the share of people in towns and cities reached 67.0%, and life expectancy hit 79.0 years — while the population fell for a third year running, by 1.39 million.</p>
    </div>`;
}

function viewEconomy() {
  return `
    <p class="kicker">Economy</p>
    <h1>The economy in ${SITE_META.year}</h1>
    <p class="lede">Growth of 5.0% on a ¥134.9 trillion economy, a record goods surplus, and services past half of GDP. Change the starting year to redraw the chart, or read the trade table below.</p>
    <div class="columns">
      ${chartCard()}
      <div class="panel">
        <h3>GDP by sector</h3>
        ${sectorBars()}
        <p class="small muted">Value added in 2024: services ¥73.7tr, industry ¥51.7tr, agriculture ¥9.6tr.</p>
      </div>
    </div>
    <h2>Trade, prices and incomes</h2>
    <div class="panel">${factList(TRADE_FACTS)}</div>
    <p class="small muted">Goods trade reached ¥43.85 trillion in 2024; the surplus of ¥7.06 trillion was the largest ever recorded. Research spending of ¥3.61 trillion is 2.7% of GDP.</p>`;
}

function viewPeople() {
  const largest = [...TOP_PROVINCES].sort((a, b) => b.population - a.population).slice(0, 6);
  return `
    <p class="kicker">People</p>
    <h1>1,408 million people</h1>
    <p class="lede">China's population fell for a third year in 2024, by 1.39 million, because births (9.54 million) stayed below deaths (10.93 million). The country is ageing quickly — and its cities are still growing.</p>
    <div class="columns">
      <div class="panel">
        <h3>Age bands, end of 2024</h3>
        ${ageBars()}
        <p class="small muted">Children (0–14) are 16.5% of everyone; people 60 and over are 22.0%, and 65 and over are 15.6%.</p>
      </div>
      <div class="panel">
        <h3>Where people live</h3>
        <div class="facts">
          <div><span>People in towns and cities</span><b>943.5m · 67.0%</b></div>
          <div><span>People in the countryside</span><b>464.8m · 33.0%</b></div>
          <div><span>Births in 2024</span><b>9.54m</b></div>
          <div><span>Deaths in 2024</span><b>10.93m</b></div>
          <div><span>Life expectancy</span><b>79.0 years</b></div>
          <div><span>New city residents in 2024</span><b>+13.2m</b></div>
        </div>
        <p class="small muted">The urban share rose 0.84 points in a year. Guangdong is the most populous province, with 127.4 million people.</p>
      </div>
    </div>
    <h2>Most populous provinces</h2>
    <div class="panel"><table>
      <thead><tr><th>Province</th><th>Capital</th><th class="num">People (m)</th><th class="num">GDP (¥tr)</th></tr></thead>
      <tbody>${largest.map((p) => `
        <tr><td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.capital)}</td><td class="num">${onePlace(p.population)}</td><td class="num">${p.gdp.toFixed(2)}</td></tr>`).join('')}</tbody>
    </table></div>`;
}

function viewRegions() {
  return `
    <p class="kicker">Regions</p>
    <h1>The provinces, ranked</h1>
    <p class="lede">Ten provinces by GDP in 2024. Guangdong and Jiangsu each pass ¥13 trillion — more than most countries earn in a year. Search the table, or tap a column heading to sort it.</p>
    <div class="panel">
      <div class="control-row">
        <label for="provinceSearch">Search</label>
        <input type="search" id="provinceSearch" placeholder="Try a province or a capital…" aria-label="Search provinces">
        <span class="muted small" id="shownCount"></span>
      </div>
      <table>
        <thead><tr>
          <th><button data-key="name">Province ↕</button></th>
          <th><button data-key="capital">Capital ↕</button></th>
          <th class="num"><button data-key="gdp">GDP (¥tr) ↕</button></th>
          <th class="num"><button data-key="population">People (m) ↕</button></th>
        </tr></thead>
        <tbody id="provinceBody"></tbody>
      </table>
      <p class="small muted">GDP and population, 2024, National Bureau of Statistics. Guangdong's economy is larger than Australia's.</p>
    </div>`;
}

function viewLiving() {
  return `
    <p class="kicker">Living</p>
    <h1>Health, learning and the land</h1>
    <p class="lede">How long people live, how much they study, and the country they live in — from hospital beds to solar panels to fast trains.</p>
    <h2>Health and schooling</h2>
    <div class="panel">${factList(HEALTH_SCHOOL)}</div>
    <h2>Environment and the built country</h2>
    <div class="panel">${factList(ENVIRONMENT)}</div>
    <div class="callout">
      <p><b>The green shift.</b> China built 12.89 million new-energy vehicles in 2024 and runs 887 GW of solar and 521 GW of wind power — the most in the world on both counts. High-speed rail now covers 48,000 km.</p>
    </div>`;
}

// Province table: live search plus a sort column and direction.
let sortKey = 'gdp';
let sortDir = -1;
let query = '';
function renderProvinces() {
  const body = document.getElementById('provinceBody');
  if (!body) return;
  const needle = query.trim().toLowerCase();
  let rows = TOP_PROVINCES.filter((p) => !needle || p.name.toLowerCase().includes(needle) || p.capital.toLowerCase().includes(needle));
  rows = [...rows].sort((a, b) => {
    const x = a[sortKey], y = b[sortKey];
    const diff = typeof x === 'string' ? x.localeCompare(y) : x - y;
    return diff * sortDir;
  });
  body.innerHTML = rows.map((p) => `
    <tr><td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.capital)}</td><td class="num">${p.gdp.toFixed(2)}</td><td class="num">${onePlace(p.population)}</td></tr>`).join('')
    || '<tr><td colspan="4" class="muted">No province matches that search.</td></tr>';
  const count = document.getElementById('shownCount');
  if (count) count.textContent = rows.length + ' of ' + TOP_PROVINCES.length + ' shown';
}

// Render the page named by the hash, then wire up its controls.
const VIEWS = { overview: viewHome, economy: viewEconomy, people: viewPeople, regions: viewRegions, living: viewLiving };
function render() {
  const key = (location.hash || '#/overview').replace(/^#\//, '');
  const name = VIEWS[key] ? key : 'overview';
  document.querySelectorAll('[data-page]').forEach((link) => link.classList.toggle('active', link.dataset.page === name));
  view.innerHTML = VIEWS[name]();
  const canvas = document.getElementById('gdpChart');
  const picker = document.getElementById('fromYear');
  if (canvas) {
    drawGdp(canvas, picker ? Number(picker.value) : 2015);
    if (picker) picker.addEventListener('change', () => drawGdp(canvas, Number(picker.value)));
  }
  if (name === 'regions') {
    renderProvinces();
    const box = document.getElementById('provinceSearch');
    if (box) box.addEventListener('input', () => { query = box.value; renderProvinces(); });
    document.querySelectorAll('[data-key]').forEach((btn) => btn.addEventListener('click', () => {
      const field = btn.dataset.key;
      if (sortKey === field) sortDir = -sortDir;
      else { sortKey = field; sortDir = (field === 'name' || field === 'capital') ? 1 : -1; }
      renderProvinces();
    }));
  }
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', render);
render();
