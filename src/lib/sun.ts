// Sun position over Riyadh (24.71°N, 46.68°E, UTC+3) from the standard solar declination and hour angle.

const LAT = 24.7136;
const LON = 46.6753;
const ZONE_MERIDIAN = 45; // UTC+3
const rad = Math.PI / 180;

function dayOfYear(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((date.getTime() - start) / 86400000);
}

function declination(n: number) {
  return 23.44 * Math.sin(((360 / 365) * (284 + n)) * rad);
}

/** equation of time in minutes */
function equationOfTime(n: number) {
  const b = ((360 / 365) * (n - 81)) * rad;
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
}

/** clock minutes (Riyadh local) → solar minutes */
function solarMinutes(clock: number, n: number) {
  return clock + 4 * (LON - ZONE_MERIDIAN) + equationOfTime(n);
}

export type SunPosition = {
  /** degrees above the horizon */
  altitude: number;
  /** degrees clockwise from north */
  azimuth: number;
};

export function sunAt(clockMinutes: number, date: Date): SunPosition {
  const n = dayOfYear(date);
  const d = declination(n) * rad;
  const phi = LAT * rad;
  const h = ((solarMinutes(clockMinutes, n) / 60 - 12) * 15) * rad;
  const sinAlt = Math.sin(phi) * Math.sin(d) + Math.cos(phi) * Math.cos(d) * Math.cos(h);
  const altitude = Math.asin(sinAlt);
  const az = Math.atan2(Math.sin(h), Math.cos(h) * Math.sin(phi) - Math.tan(d) * Math.cos(phi));
  return { altitude: altitude / rad, azimuth: (az / rad + 180 + 360) % 360 };
}

/** sunrise, solar noon and sunset in Riyadh clock minutes */
export function dayTimes(date: Date) {
  const n = dayOfYear(date);
  const d = declination(n) * rad;
  const phi = LAT * rad;
  const h0 = Math.acos(-Math.tan(phi) * Math.tan(d)) / rad; // degrees
  const noon = 720 - 4 * (LON - ZONE_MERIDIAN) - equationOfTime(n);
  return { sunrise: noon - h0 * 4, noon, sunset: noon + h0 * 4 };
}

/** current clock minutes in Riyadh */
export function riyadhNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Riyadh",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

export function formatClock(minutes: number, lang: "en" | "ar") {
  const m = Math.round(minutes);
  const hh = Math.floor(m / 60) % 24;
  const mm = m % 60;
  const text = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  return lang === "ar" ? text.replace(/\d/g, (c) => "٠١٢٣٤٥٦٧٨٩"[Number(c)]) : text;
}
