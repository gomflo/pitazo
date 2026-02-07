/**
 * Mapeo nombre del equipo (futbolenvivomexico / JSON) → ESPN team ID.
 * Fuente: https://www.espn.com.mx/futbol/equipos/_/liga/mex.1
 */
export const TEAM_LOGO_IDS: Record<string, number> = {
  América: 227,
  Atlas: 216,
  "Atlético San Luis": 15720,
  "Cruz Azul": 218,
  "FC Juárez": 17851,
  "Chivas Guadalajara": 219,
  Guadalajara: 219,
  "Club León": 228,
  León: 228,
  "Mazatlán FC": 20702,
  Monterrey: 220,
  Necaxa: 229,
  Pachuca: 234,
  Puebla: 231,
  "Pumas UNAM": 233,
  Querétaro: 222,
  "Santos Laguna": 225,
  Santos: 225,
  "Tigres UANL": 232,
  Tijuana: 10125,
  Toluca: 223,
};

const LOGO_BASE = "https://a.espncdn.com/i/teamlogos/soccer/500";

export function getTeamLogoUrl(teamName: string): string | null {
  const id = TEAM_LOGO_IDS[teamName];
  if (id == null) return null;
  return `${LOGO_BASE}/${id}.png`;
}
