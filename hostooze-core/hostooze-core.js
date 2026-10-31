/**
 * Hostooze Core: a procedurally generated rounded cube with a recessed
 * circuit pattern, built entirely in code with three.js.
 *
 *   import { createHostoozeCore } from './hostooze-core.js';
 *   const core = createHostoozeCore();            // THREE.Group, spans -1..1
 *   scene.add(core);
 *   core.userData.setPalette('light');            // or 'brand'
 *
 * Geometry
 *   - Cube of edge 2 with bevel radius 0.24 (12% of the size).
 *   - Six identical faces. Each face is one "arm" of circuit traces repeated
 *     with 4-fold rotation and mirroring, so every edge is crossed at the same
 *     symmetric set of positions and traces flow over the edges onto the
 *     neighbouring faces.
 *   - Grooves, nodes and the centre panel are real recesses: the surface is a
 *     dense grid displaced inward along its normal, so the mesh is a single
 *     closed shell.
 *   - A polished seam ring wraps the equator.
 */
import * as THREE from 'three';

export const BRAND = { charcoal: '#242424', red: '#E24747' };

export const PALETTES = {
  // Brand: charcoal anodized body, glowing red circuit, polished red ring.
  brand: {
    body: BRAND.charcoal, circuit: BRAND.red, ring: BRAND.red,
    bodyRough: 0.36, bodyMetal: 0.15, glow: 0.5,
  },
  // Light: the look of the reference render (porcelain body, dark seam ring).
  light: {
    body: '#EAE7E3', circuit: BRAND.red, ring: BRAND.charcoal,
    bodyRough: 0.5, bodyMetal: 0.0, glow: 0.25,
  },
};

// ------------------------------------------------------------- dimensions --
const R = 0.24;               // bevel radius (12% of edge length 2)
const INNER = 1 - R;
const LINE_W = 0.021;         // groove width (face units, face spans -1..1)
const NODE_R = 0.032;
const PANEL_HALF = 0.115;
const PANEL_CORNER = 0.022;
const GROOVE_DEPTH = 0.012;
const PANEL_DEPTH = 0.028;
const EXIT = 1.3;             // traces run past the face edge
const STEP = 0.06;            // spacing of parallel traces

// ---------------------------------------------------------------- pattern --
// Arm in the right-hand sector, upper half. A bundle of three parallel
// traces leaves the panel area, turns up, then turns right and runs off the
// edge. Bends are concentric so the bundle stays parallel.
const BEND = 0.035;
const BUNDLE = [0, 1, 2].map((i) => {
  const o = 0.10 + STEP * i;         // start height
  const a = 0.22 + STEP * i;         // start x (staggered on the diagonal)
  const X = 0.64 - STEP * i;         // x of the vertical run
  const h = 0.30 + STEP * i;         // exit height
  return { pts: [[a, o], [X, o], [X, h], [EXIT, h]], radii: [BEND, BEND], node: [a, o] };
});
// Corner loops: L-shaped traces around each corner of the face; across three
// faces they close into a loop around every vertex of the cube.
const CORNER_LS = [0, 1].map((i) => {
  const c = 0.54 + STEP * i;
  return { pts: [[EXIT, c], [c, c], [c, EXIT]], radii: [0.1 - STEP * i] };
});
// Edge crossings: +-0.30, +-0.36, +-0.42, +-0.54, +-0.60 on every edge.

function tracePath(ctx, { pts, radii }) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) {
    ctx.arcTo(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], radii[i - 1]);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last[0], last[1]);
  ctx.stroke();
}

/**
 * Draw one face of the pattern into a square canvas context.
 * fg: colour for traces and nodes; panel: colour for the centre panel.
 */
function drawFace(ctx, size, bg, fg, panel = fg) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = fg;
  ctx.fillStyle = fg;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = LINE_W;
  for (let k = 0; k < 4; k++) {
    for (const m of [1, -1]) {
      // face coords: s to the right, t up, origin at the centre
      ctx.setTransform(size / 2, 0, 0, -size / 2, size / 2, size / 2);
      ctx.rotate((k * Math.PI) / 2);
      ctx.scale(1, m);
      for (const tr of BUNDLE) {
        tracePath(ctx, tr);
        ctx.beginPath();
        ctx.arc(tr.node[0], tr.node[1], NODE_R, 0, Math.PI * 2);
        ctx.fill();
      }
      if (m === 1) for (const tr of CORNER_LS) tracePath(ctx, tr);
    }
  }
  ctx.setTransform(size / 2, 0, 0, -size / 2, size / 2, size / 2);
  ctx.fillStyle = panel;
  ctx.beginPath();
  ctx.roundRect(-PANEL_HALF, -PANEL_HALF, PANEL_HALF * 2, PANEL_HALF * 2, PANEL_CORNER);
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function makeCanvas(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

/** Height field (0 = surface, 1 = panel floor), softened by a small blur. */
function heightField(size, blurPx) {
  const c = makeCanvas(size);
  const ctx = c.getContext('2d', { willReadFrequently: true });
  const g = Math.round((255 * GROOVE_DEPTH) / PANEL_DEPTH);
  drawFace(ctx, size, '#000', `rgb(${g},${g},${g})`, '#fff');
  const src = ctx.getImageData(0, 0, size, size).data;
  let a = new Float32Array(size * size);
  for (let i = 0; i < a.length; i++) a[i] = src[i * 4] / 255;
  // two separable box-blur passes (approximately Gaussian)
  const tmp = new Float32Array(a.length);
  const r = blurPx;
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let s = 0;
        for (let d = -r; d <= r; d++) s += a[y * size + Math.min(size - 1, Math.max(0, x + d))];
        tmp[y * size + x] = s / (2 * r + 1);
      }
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let s = 0;
        for (let d = -r; d <= r; d++) s += tmp[Math.min(size - 1, Math.max(0, y + d)) * size + x];
        a[y * size + x] = s / (2 * r + 1);
      }
    }
  }
  return (s, t) => {
    // bilinear sample at face coords (s, t)
    const fx = Math.min(size - 1.001, Math.max(0, ((s + 1) / 2) * size - 0.5));
    const fy = Math.min(size - 1.001, Math.max(0, ((1 - t) / 2) * size - 0.5));
    const x0 = Math.floor(fx), y0 = Math.floor(fy);
    const dx = fx - x0, dy = fy - y0;
    const i = y0 * size + x0;
    return (a[i] * (1 - dx) + a[i + 1] * dx) * (1 - dy)
      + (a[i + size] * (1 - dx) + a[i + size + 1] * dx) * dy;
  };
}

// ------------------------------------------------------------------ body ---
// (normal, u, v) with u x v = normal, so all faces are rotations of each other.
const FACES = [
  [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
  [[-1, 0, 0], [0, 0, 1], [0, 1, 0]],
  [[0, 0, 1], [1, 0, 0], [0, 1, 0]],
  [[0, 0, -1], [-1, 0, 0], [0, 1, 0]],
  [[0, 1, 0], [1, 0, 0], [0, 0, -1]],
  [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
];

function buildBodyGeometry(res, height) {
  const W = res + 1;
  const nV = 6 * W * W;
  const pos = new Float32Array(nV * 3);
  const uv = new Float32Array(nV * 2);
  const idx = new Uint32Array(6 * res * res * 6);
  const hCache = new Float32Array(W * W);
  for (let j = 0; j < W; j++) {
    for (let i = 0; i < W; i++) hCache[j * W + i] = height(-1 + (2 * i) / res, -1 + (2 * j) / res);
  }
  let vi = 0, ii = 0;
  FACES.forEach(([n, u, v], f) => {
    const base = f * W * W;
    for (let j = 0; j < W; j++) {
      const t = -1 + (2 * j) / res;
      for (let i = 0; i < W; i++) {
        const s = -1 + (2 * i) / res;
        const P = [0, 1, 2].map((k) => n[k] + s * u[k] + t * v[k]);
        const C = P.map((p) => Math.min(INNER, Math.max(-INNER, p)));
        const D = P.map((p, k) => p - C[k]);
        const len = Math.hypot(D[0], D[1], D[2]);
        const rr = R - PANEL_DEPTH * hCache[j * W + i];
        for (let k = 0; k < 3; k++) pos[vi * 3 + k] = C[k] + (D[k] / len) * rr;
        uv[vi * 2] = (s + 1) / 2;
        uv[vi * 2 + 1] = (t + 1) / 2;
        vi++;
      }
    }
    for (let j = 0; j < res; j++) {
      for (let i = 0; i < res; i++) {
        const a = base + j * W + i, b = a + 1, c = a + W, d = c + 1;
        idx.set([a, b, d, a, d, c], ii);
        ii += 6;
      }
    }
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  geo.computeVertexNormals();
  weldSeamNormals(geo, res);
  return geo;
}

/** Faces are separate grids; average normals of coincident seam vertices. */
function weldSeamNormals(geo, res) {
  const W = res + 1;
  const pos = geo.attributes.position.array;
  const nrm = geo.attributes.normal.array;
  const groups = new Map();
  for (let f = 0; f < 6; f++) {
    for (let j = 0; j < W; j++) {
      for (let i = 0; i < W; i++) {
        if (i !== 0 && j !== 0 && i !== res && j !== res) continue;
        const v = f * W * W + j * W + i;
        const key = `${Math.round(pos[v * 3] * 1e4)},${Math.round(pos[v * 3 + 1] * 1e4)},${Math.round(pos[v * 3 + 2] * 1e4)}`;
        let g = groups.get(key);
        if (!g) groups.set(key, (g = []));
        g.push(v);
      }
    }
  }
  for (const g of groups.values()) {
    let x = 0, y = 0, z = 0;
    for (const v of g) { x += nrm[v * 3]; y += nrm[v * 3 + 1]; z += nrm[v * 3 + 2]; }
    const l = Math.hypot(x, y, z) || 1;
    for (const v of g) { nrm[v * 3] = x / l; nrm[v * 3 + 1] = y / l; nrm[v * 3 + 2] = z / l; }
  }
}

// ------------------------------------------------------------------ ring ---
const RING_IN = -0.03;     // sinks into the body
const RING_OUT = 0.016;    // stands proud of the surface
const RING_HALF_H = 0.032;
const RING_ROUND = 0.014;

function buildRingGeometry() {
  // closed profile in (radial offset, y) with normals
  const prof = [];
  const cx = RING_OUT - RING_ROUND;
  prof.push([RING_IN, -RING_HALF_H, 0, -1]);
  for (const [cy, a0] of [[-RING_HALF_H + RING_ROUND, -90], [RING_HALF_H - RING_ROUND, 0]]) {
    for (let k = 0; k <= 10; k++) {
      const a = THREE.MathUtils.degToRad(a0 + 9 * k);
      prof.push([cx + RING_ROUND * Math.cos(a), cy + RING_ROUND * Math.sin(a), Math.cos(a), Math.sin(a)]);
    }
  }
  prof.push([RING_IN, RING_HALF_H, 0, 1]);
  prof.push([RING_IN, RING_HALF_H, -1, 0]);
  prof.push([RING_IN, -RING_HALF_H, -1, 0]);
  // path: the rounded-square equator of the body
  const path = [];
  [[INNER, INNER], [-INNER, INNER], [-INNER, -INNER], [INNER, -INNER]].forEach(([px, pz], k) => {
    for (let j = 0; j <= 40; j++) {
      const a = THREE.MathUtils.degToRad(k * 90 + (90 * j) / 40);
      path.push([px + R * Math.cos(a), pz + R * Math.sin(a), Math.cos(a), Math.sin(a)]);
    }
  });
  const P = prof.length, N = path.length;
  const pos = new Float32Array(N * P * 3), nrm = new Float32Array(N * P * 3);
  path.forEach(([x, z, ox, oz], i) => {
    prof.forEach(([r, y, nr, ny], j) => {
      const o = (i * P + j) * 3;
      pos.set([x + ox * r, y, z + oz * r], o);
      nrm.set([ox * nr, ny, oz * nr], o);
    });
  });
  const idx = [];
  for (let i = 0; i < N; i++) {
    const i2 = (i + 1) % N;
    for (let j = 0; j < P; j++) {
      const j2 = (j + 1) % P;
      const a = i * P + j, b = i2 * P + j, c = i * P + j2, d = i2 * P + j2;
      idx.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  geo.setIndex(idx);
  return geo;
}

// ------------------------------------------------------------- materials ---
function paintTextures(maps, pal, size) {
  const { color, emissive, rm } = maps;
  drawFace(color.image.getContext('2d'), size, pal.body, pal.circuit);
  drawFace(emissive.image.getContext('2d'), size, '#000', pal.circuit);
  const rough = Math.round(pal.bodyRough * 255), metal = Math.round(pal.bodyMetal * 255);
  // three.js reads roughness from G and metalness from B
  drawFace(rm.image.getContext('2d'), size, `rgb(0,${rough},${metal})`, 'rgb(0,140,0)');
  for (const t of [color, emissive, rm]) t.needsUpdate = true;
}

/**
 * Build the object.
 * options.res      grid cells per face edge (default 256)
 * options.texture  texture size in px (default 2048)
 * options.palette  'brand' | 'light' (default 'brand')
 */
export function createHostoozeCore({ res = 256, texture = 2048, palette = 'brand' } = {}) {
  const height = heightField(1024, Math.max(1, Math.round(1024 / res / 1.5)));
  const bodyGeo = buildBodyGeometry(res, height);

  const tex = (cs) => {
    const t = new THREE.CanvasTexture(makeCanvas(texture));
    t.colorSpace = cs;
    t.anisotropy = 8;
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  };
  const maps = {
    color: tex(THREE.SRGBColorSpace),
    emissive: tex(THREE.SRGBColorSpace),
    rm: tex(THREE.NoColorSpace),
  };

  const bodyMat = new THREE.MeshPhysicalMaterial({
    name: 'Hostooze body',
    map: maps.color,
    roughnessMap: maps.rm,
    metalnessMap: maps.rm,
    roughness: 1,
    metalness: 1,
    emissive: 0xffffff,
    emissiveMap: maps.emissive,
    clearcoat: 0.35,
    clearcoatRoughness: 0.3,
  });
  const ringMat = new THREE.MeshPhysicalMaterial({
    name: 'Hostooze seam ring',
    metalness: 1,
    roughness: 0.2,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
  });

  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.name = 'Body';
  const ring = new THREE.Mesh(buildRingGeometry(), ringMat);
  ring.name = 'SeamRing';
  const group = new THREE.Group();
  group.name = 'Hostooze Core';
  group.add(body, ring);

  const setPalette = (name) => {
    const pal = PALETTES[name] || PALETTES.brand;
    paintTextures(maps, pal, texture);
    bodyMat.emissiveIntensity = pal.glow;
    ringMat.color.set(pal.ring);
    ringMat.roughness = name === 'light' ? 0.3 : 0.2;
    group.userData.palette = name;
  };
  setPalette(palette);
  group.userData.setPalette = setPalette;
  return group;
}
