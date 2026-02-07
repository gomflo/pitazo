/**
 * Actualiza src/data/liga-mx-hoy.json con los partidos de Liga MX por fecha.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_PATH = join(ROOT, 'src', 'data', 'liga-mx-hoy.json');

const SOURCE_URL = 'https://www.futbolenvivomexico.com/competicion/liga-mexico';

async function fetchHtml() {
  const res = await fetch(SOURCE_URL, {
    headers: { 'User-Agent': 'LigaMX/1.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseDateToIso(dateStr) {
  const match = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
}

function parseLigaMxMatchesByDate(html) {
  const matchesByDate = {};

  const dateHeaderRegex = /<td colspan="5">[^<]*?(\d{1,2}\/\d{1,2}\/\d{4})<\/td>/gi;
  const datePositions = [];
  let dateMatch;
  while ((dateMatch = dateHeaderRegex.exec(html)) !== null) {
    const iso = parseDateToIso(dateMatch[1]);
    if (iso) datePositions.push({ index: dateMatch.index, iso });
  }

  for (let i = 0; i < datePositions.length; i++) {
    const { iso } = datePositions[i];
    const start = datePositions[i].index;
    const end = datePositions[i + 1] ? datePositions[i + 1].index : html.length;
    const block = html.slice(start, end);

    if (!matchesByDate[iso]) matchesByDate[iso] = [];

    const horaMatches = [...block.matchAll(/<td class="hora[^"]*">\s*(\d{1,2}:\d{2})\s*<\/td>/gi)];
    const seen = new Set();

    for (let j = 0; j < horaMatches.length; j++) {
      const m = horaMatches[j];
      const time = m[1].trim();
      const rowStart = m.index;
      const rowEnd = horaMatches[j + 1] ? horaMatches[j + 1].index : block.length;
      const rowBlock = block.slice(rowStart, rowEnd);

      let home = 'Por confirmar';
      let away = 'Por confirmar';
      const localMatch = rowBlock.match(/<td class="local"[^>]*>[\s\S]*?<span title="([^"]+)"/i);
      if (localMatch) home = localMatch[1].trim();
      const visitanteMatch = rowBlock.match(/<td class="visitante"[^>]*>[\s\S]*?<span title="([^"]+)"/i);
      if (visitanteMatch) away = visitanteMatch[1].trim();

      if (home.length > 40 || away.length > 40) continue;
      const key = `${iso}-${time}-${home}-${away}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const canalesBlock = rowBlock.slice(rowBlock.indexOf('class="canales"'));
      const channelMatches = [...canalesBlock.matchAll(/<li[^>]*title="([^"]+)"[^>]*>/gi)];
      const channels = channelMatches.length
        ? channelMatches.map((c) => c[1].trim()).filter((n) => n.length > 0 && n.length < 60)
        : ['Por confirmar'];

      matchesByDate[iso].push({ time, home, away, channels });
    }
  }

  return matchesByDate;
}

async function main() {
  console.log('Fetching', SOURCE_URL);
  let html;
  try {
    html = await fetchHtml();
  } catch (err) {
    console.error('Error al descargar la página:', err.message);
    process.exit(1);
  }

  const matchesByDate = parseLigaMxMatchesByDate(html);
  const totalMatches = Object.values(matchesByDate).reduce((acc, arr) => acc + arr.length, 0);

  if (totalMatches === 0) {
    console.warn('No se encontraron partidos de Liga MX.');
  } else {
    console.log('Partidos encontrados:', totalMatches, 'en', Object.keys(matchesByDate).length, 'días');
  }

  const data = {
    updatedAt: new Date().toISOString(),
    matchesByDate,
  };

  mkdirSync(dirname(DATA_PATH), { recursive: true });
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log('Escrito:', DATA_PATH);
}

main();
