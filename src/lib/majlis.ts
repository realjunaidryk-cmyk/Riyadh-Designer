import * as THREE from "three";
import { sunAt } from "./sun";

// A Najdi majlis in three.js: mud walls pierced by rows of triangular openings, athl beams, low seating,
// a Sadu carpet and a dallah. The south wall faces the camera's far side; the sun is placed from the
// real solar position over Riyadh, so the triangles of light land where they would.

type FinishId = "plaster" | "travertine" | "athl" | "lime";

const W = 10; // east–west
const D = 8; // north–south
const H = 4.4;
const T = 0.35; // wall thickness

export async function createMajlis(host: HTMLElement, date: Date) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#241c17");

  const camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 60);
  const camHome = new THREE.Vector3(0.6, 1.55, 6.6);
  camera.position.copy(camHome);
  const look = new THREE.Vector3(0, 1.45, -3.2);

  // ---------- materials ----------
  const wallTextures: Record<FinishId, { map: THREE.Texture; color: string; roughness: number }> = {
    plaster: { map: canvasTexture(plasterPaint("#b48a62")), color: "#ffffff", roughness: 0.95 },
    travertine: { map: canvasTexture(travertinePaint()), color: "#ffffff", roughness: 0.62 },
    athl: { map: canvasTexture(woodPaint()), color: "#ffffff", roughness: 0.78 },
    lime: { map: canvasTexture(plasterPaint("#e4ddd0", 10)), color: "#ffffff", roughness: 0.9 },
  };
  Object.values(wallTextures).forEach(({ map }) => {
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(0.35, 0.35);
    map.anisotropy = renderer.capabilities.getMaxAnisotropy();
  });
  const wallMat = new THREE.MeshStandardMaterial({ map: wallTextures.plaster.map, roughness: 0.95 });

  const floorMap = canvasTexture(travertinePaint("#8a7a66"));
  floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set(3, 3);
  const floorMat = new THREE.MeshStandardMaterial({ map: floorMap, roughness: 0.82 });

  const sadu = canvasTexture(saduPaint());
  sadu.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const carpetMat = new THREE.MeshStandardMaterial({ map: sadu, roughness: 1 });

  const athlMap = canvasTexture(woodPaint());
  athlMap.wrapS = athlMap.wrapT = THREE.RepeatWrapping;
  const beamMat = new THREE.MeshStandardMaterial({ map: athlMap, color: "#8a6446", roughness: 0.85 });
  const frondMat = new THREE.MeshStandardMaterial({ map: canvasTexture(frondPaint()), roughness: 1 });
  const seatMat = new THREE.MeshStandardMaterial({ color: "#2b2421", roughness: 0.9 });
  const cushionMat = new THREE.MeshStandardMaterial({ color: "#7a2b22", roughness: 0.95 });
  const pillowMat = new THREE.MeshStandardMaterial({ map: sadu, roughness: 0.95 });
  const brassMat = new THREE.MeshStandardMaterial({ color: "#c9a25a", metalness: 0.9, roughness: 0.32 });
  const tableMat = new THREE.MeshStandardMaterial({ map: athlMap, color: "#5a3c28", roughness: 0.6 });

  const add = (mesh: THREE.Mesh, cast = true, receive = true) => {
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    scene.add(mesh);
    return mesh;
  };

  // ---------- shell ----------
  add(new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorMat), false).rotateX(-Math.PI / 2);

  // south wall (far), two rows of Najdi triangles
  const south = wallWithOpenings(W, H, [...triangleRow(W, 9, 0.62, 3.45, true), ...triangleRow(W, 8, 0.42, 2.85, false)]);
  const southMesh = add(new THREE.Mesh(south, wallMat));
  southMesh.position.set(-W / 2, 0, -D / 2 - T);

  // east wall (left when facing south) and west wall (right), one row each
  const side = wallWithOpenings(D, H, triangleRow(D, 6, 0.55, 3.5, true));
  const east = add(new THREE.Mesh(side, wallMat));
  east.rotation.y = Math.PI / 2;
  east.position.set(-W / 2 - T, 0, D / 2);
  const west = add(new THREE.Mesh(side, wallMat));
  west.rotation.y = -Math.PI / 2;
  west.position.set(W / 2 + T, 0, -D / 2);

  // ceiling of palm fronds on athl beams
  const ceiling = add(new THREE.Mesh(new THREE.BoxGeometry(W + 2 * T, 0.12, D + T), frondMat));
  ceiling.position.set(0, H + 0.06, -T / 2);
  for (let i = 0; i < 9; i++) {
    const beam = add(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, W + 0.4, 10), beamMat));
    beam.rotation.z = Math.PI / 2;
    beam.position.set(0, H - 0.1, -D / 2 + 0.5 + i * ((D - 0.6) / 8));
  }

  // ---------- majlis seating along three walls ----------
  const seat = (w: number, d: number, x: number, z: number, rot: number) => {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(w, 0.3, d), seatMat);
    base.position.y = 0.15;
    const top = new THREE.Mesh(new RoundedBox(w - 0.04, 0.16, d - 0.04), cushionMat);
    top.position.y = 0.38;
    g.add(base, top);
    const n = Math.max(2, Math.round(w / 0.9));
    for (let i = 0; i < n; i++) {
      const back = new THREE.Mesh(new RoundedBox(w / n - 0.06, 0.55, 0.2), pillowMat);
      back.position.set(-w / 2 + (w / n) * (i + 0.5), 0.72, -d / 2 + 0.12);
      back.rotation.x = -0.12;
      g.add(back);
    }
    g.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    g.position.set(x, 0, z);
    g.rotation.y = rot;
    scene.add(g);
  };
  seat(W - 2.4, 0.9, 0, -D / 2 + 0.45, 0);
  seat(D - 3.2, 0.9, -W / 2 + 0.45, -0.3, Math.PI / 2);
  seat(D - 3.2, 0.9, W / 2 - 0.45, -0.3, -Math.PI / 2);

  // Sadu carpet, low table, dallah and cups
  const carpet = add(new THREE.Mesh(new THREE.PlaneGeometry(5.2, 3.4), carpetMat), false);
  carpet.rotation.x = -Math.PI / 2;
  carpet.position.set(0, 0.01, -0.6);

  const table = add(new THREE.Mesh(new RoundedBox(1.7, 0.08, 0.9), tableMat));
  table.position.set(0, 0.36, -0.6);
  for (const [lx, lz] of [[-0.75, -0.35], [0.75, -0.35], [-0.75, 0.35], [0.75, 0.35]]) {
    const leg = add(new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.32, 0.07), tableMat));
    leg.position.set(lx, 0.16, -0.6 + lz);
  }
  const dallah = add(new THREE.Mesh(dallahGeometry(), brassMat));
  dallah.position.set(-0.35, 0.4, -0.6);
  const spout = add(new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.03, 0.26, 8), brassMat));
  spout.position.set(-0.22, 0.6, -0.6);
  spout.rotation.z = -0.9;
  for (let i = 0; i < 3; i++) {
    const cup = add(new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.03, 0.06, 16, 1, true), brassMat));
    cup.position.set(0.15 + i * 0.16, 0.43, -0.5 + (i % 2) * 0.12);
  }

  // ---------- outside: sky seen through the openings ----------
  const skyMat = new THREE.MeshBasicMaterial({ color: "#f3ead6", side: THREE.BackSide, toneMapped: false });
  const sky = new THREE.Mesh(new THREE.BoxGeometry(30, 20, 30), skyMat);
  sky.position.set(0, 4, -2);
  scene.add(sky);

  // ---------- light ----------
  const hemi = new THREE.HemisphereLight("#9fb2bd", "#5a4030", 0.5);
  scene.add(hemi);
  const bounce = new THREE.PointLight("#ffcf9a", 0, 12, 1.2);
  bounce.position.set(0, 1.2, 0.5);
  scene.add(bounce);

  const sun = new THREE.DirectionalLight("#fff1d6", 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.025;
  sun.shadow.radius = 3;
  const sc = sun.shadow.camera as THREE.OrthographicCamera;
  sc.left = -9;
  sc.right = 9;
  sc.top = 9;
  sc.bottom = -9;
  sc.near = 1;
  sc.far = 50;
  sun.target.position.set(0, 1, -0.5);
  scene.add(sun, sun.target);

  // dust in the light
  const dustCount = 420;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * W * 0.9;
    dustPos[i * 3 + 1] = Math.random() * H * 0.9;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * D * 0.9 - 0.5;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: "#ffe6bd",
      size: 0.018,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  scene.add(dust);

  const warm = new THREE.Color("#ff9f5a");
  const white = new THREE.Color("#fff3dc");
  const skyLow = new THREE.Color("#e98f55");
  const skyHigh = new THREE.Color("#f4eedf");

  function setSun(minutes: number) {
    const { altitude, azimuth } = sunAt(minutes, date);
    const alt = THREE.MathUtils.degToRad(Math.max(altitude, 0.5));
    const az = THREE.MathUtils.degToRad(azimuth);
    // north = +z, east = -x (the camera faces south)
    const dir = new THREE.Vector3(-Math.cos(alt) * Math.sin(az), Math.sin(alt), Math.cos(alt) * Math.cos(az));
    sun.position.copy(sun.target.position).addScaledVector(dir, 22);
    const k = THREE.MathUtils.clamp(altitude / 40, 0, 1);
    sun.color.copy(warm).lerp(white, k);
    sun.intensity = THREE.MathUtils.clamp(altitude / 4, 0, 1) * (4.2 + 1.6 * k);
    bounce.intensity = 2.2 + sun.intensity * 0.9;
    bounce.color.copy(sun.color);
    skyMat.color.copy(skyLow).lerp(skyHigh, k);
    hemi.intensity = 0.42 + 0.3 * k;
    dirty = true;
  }

  function setFinish(id: FinishId) {
    const f = wallTextures[id];
    wallMat.map = f.map;
    wallMat.roughness = f.roughness;
    wallMat.needsUpdate = true;
    dirty = true;
  }

  // ---------- size, pointer, loop ----------
  let dirty = true;
  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 1 ? 58 : 42;
    camera.updateProjectionMatrix();
    dirty = true;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = new THREE.Vector2();
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => pointer.set(0, 0);
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);

  let visible = true;
  const io = new IntersectionObserver((e) => {
    visible = e[0].isIntersecting;
    if (visible) loop();
  });
  io.observe(host);

  let raf = 0;
  let last = performance.now();
  const target = new THREE.Vector3();
  function loop() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame((now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) {
        target.set(camHome.x + pointer.x * 0.7, camHome.y - pointer.y * 0.35, camHome.z);
        const before = camera.position.clone();
        camera.position.lerp(target, 1 - Math.exp(-dt * 3));
        if (before.distanceToSquared(camera.position) > 1e-7) dirty = true;
        const p = dustGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < dustCount; i++) {
          let y = p.getY(i) + dt * 0.04;
          if (y > H * 0.9) y = 0.1;
          p.setY(i, y);
          p.setX(i, p.getX(i) + Math.sin(now * 0.0003 + i) * dt * 0.02);
        }
        p.needsUpdate = true;
        dirty = true;
      }
      if (dirty) {
        camera.lookAt(look);
        renderer.render(scene, camera);
        dirty = false;
      }
      if (visible) loop();
    });
  }
  loop();

  return {
    setSun,
    setFinish,
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

// ---------- geometry helpers ----------

type Tri = { x: number; y: number; s: number; up: boolean };

function triangleRow(width: number, count: number, size: number, y: number, up: boolean): Tri[] {
  const gap = (width - count * size) / (count + 1);
  return Array.from({ length: count }, (_, i) => ({ x: gap + i * (size + gap), y, s: size, up }));
}

function wallWithOpenings(width: number, height: number, holes: Tri[]) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(width, 0);
  shape.lineTo(width, height);
  shape.lineTo(0, height);
  shape.lineTo(0, 0);
  for (const t of holes) {
    const p = new THREE.Path();
    const h = t.s * 0.95;
    if (t.up) {
      p.moveTo(t.x, t.y);
      p.lineTo(t.x + t.s / 2, t.y + h);
      p.lineTo(t.x + t.s, t.y);
    } else {
      p.moveTo(t.x, t.y + h);
      p.lineTo(t.x + t.s, t.y + h);
      p.lineTo(t.x + t.s / 2, t.y);
    }
    p.closePath();
    shape.holes.push(p);
  }
  return new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false });
}

class RoundedBox extends THREE.BufferGeometry {
  constructor(w: number, h: number, d: number) {
    super();
    const g = new THREE.BoxGeometry(w, h, d, 6, 3, 6);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const r = Math.min(w, h, d) * 0.35;
    const v = new THREE.Vector3();
    const inner = new THREE.Vector3(w / 2 - r, h / 2 - r, d / 2 - r);
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const c = new THREE.Vector3(
        THREE.MathUtils.clamp(v.x, -inner.x, inner.x),
        THREE.MathUtils.clamp(v.y, -inner.y, inner.y),
        THREE.MathUtils.clamp(v.z, -inner.z, inner.z),
      );
      const n = v.clone().sub(c);
      if (n.lengthSq() > 0) v.copy(c).add(n.normalize().multiplyScalar(r));
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    this.copy(g);
  }
}

function dallahGeometry() {
  const pts = [
    [0, 0],
    [0.11, 0],
    [0.12, 0.03],
    [0.1, 0.12],
    [0.06, 0.2],
    [0.05, 0.26],
    [0.075, 0.3],
    [0.05, 0.33],
    [0.035, 0.37],
    [0.045, 0.4],
    [0.012, 0.44],
    [0, 0.45],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(pts, 32);
}

// ---------- painted textures ----------

function canvasTexture(canvas: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeCanvas(size = 512) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  return [c, c.getContext("2d")!] as const;
}

function plasterPaint(base: string, spread = 22) {
  const [c, g] = makeCanvas();
  g.fillStyle = base;
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 2 + Math.random() * 22;
    const l = (Math.random() - 0.5) * spread;
    g.fillStyle = l > 0 ? `rgba(255,240,220,${l / 260})` : `rgba(40,20,5,${-l / 220})`;
    g.beginPath();
    g.ellipse(x, y, r * 1.6, r, Math.random() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  // trowel strokes
  g.strokeStyle = "rgba(60,35,15,0.06)";
  for (let i = 0; i < 90; i++) {
    g.lineWidth = 6 + Math.random() * 14;
    g.beginPath();
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    g.arc(x, y, 40 + Math.random() * 80, Math.random() * 6, Math.random() * 6 + 0.8);
    g.stroke();
  }
  return c;
}

function travertinePaint(base = "#d6cab3") {
  const [c, g] = makeCanvas();
  g.fillStyle = base;
  g.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 1) {
    const a = (Math.sin(y * 0.09) + Math.sin(y * 0.031 + 1.3)) * 0.035;
    g.fillStyle = a > 0 ? `rgba(255,248,235,${a})` : `rgba(90,70,45,${-a})`;
    g.fillRect(0, y, 512, 1);
  }
  for (let i = 0; i < 500; i++) {
    g.fillStyle = `rgba(80,60,40,${0.1 + Math.random() * 0.2})`;
    g.fillRect(Math.random() * 512, Math.random() * 512, 2 + Math.random() * 10, 1 + Math.random() * 2);
  }
  // joints
  g.fillStyle = "rgba(60,45,30,0.35)";
  g.fillRect(0, 0, 512, 2);
  g.fillRect(0, 0, 2, 512);
  return c;
}

function woodPaint() {
  const [c, g] = makeCanvas();
  g.fillStyle = "#6f4b31";
  g.fillRect(0, 0, 512, 512);
  for (let x = 0; x < 512; x += 64) {
    g.fillStyle = `rgba(0,0,0,${0.08 + Math.random() * 0.08})`;
    g.fillRect(x, 0, 64, 512);
    g.fillStyle = "rgba(20,10,5,0.5)";
    g.fillRect(x, 0, 2, 512);
  }
  for (let i = 0; i < 700; i++) {
    const x = Math.random() * 512;
    g.strokeStyle = `rgba(${Math.random() > 0.5 ? "255,220,180" : "30,15,5"},${0.05 + Math.random() * 0.08})`;
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(x, 0);
    g.bezierCurveTo(x + 6, 170, x - 6, 340, x + 3, 512);
    g.stroke();
  }
  return c;
}

function saduPaint() {
  const [c, g] = makeCanvas(1024);
  const red = "#8a2a1f";
  const black = "#1c1714";
  const bone = "#e8dcc6";
  const ochre = "#c08a3e";
  g.fillStyle = red;
  g.fillRect(0, 0, 1024, 1024);
  const band = (y: number, h: number, color: string) => {
    g.fillStyle = color;
    g.fillRect(0, y, 1024, h);
  };
  const teeth = (y: number, h: number, color: string, n: number, up = true) => {
    g.fillStyle = color;
    const w = 1024 / n;
    for (let i = 0; i < n; i++) {
      g.beginPath();
      if (up) {
        g.moveTo(i * w, y + h);
        g.lineTo(i * w + w / 2, y);
        g.lineTo((i + 1) * w, y + h);
      } else {
        g.moveTo(i * w, y);
        g.lineTo(i * w + w / 2, y + h);
        g.lineTo((i + 1) * w, y);
      }
      g.fill();
    }
  };
  band(0, 90, black);
  teeth(90, 50, black, 24, false);
  band(200, 24, bone);
  teeth(260, 80, bone, 16);
  band(340, 24, bone);
  band(400, 220, black);
  for (let i = 0; i < 10; i++) {
    const x = i * 102.4 + 51.2;
    g.fillStyle = i % 2 ? bone : ochre;
    g.beginPath();
    g.moveTo(x, 420);
    g.lineTo(x + 40, 510);
    g.lineTo(x, 600);
    g.lineTo(x - 40, 510);
    g.fill();
  }
  band(680, 24, bone);
  teeth(684, 80, bone, 16, false);
  band(800, 24, bone);
  teeth(884, 50, black, 24);
  band(934, 90, black);
  return c;
}

function frondPaint() {
  const [c, g] = makeCanvas();
  g.fillStyle = "#3b2c1f";
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 160; i++) {
    const y = (i / 160) * 512;
    g.strokeStyle = `rgba(${150 + Math.random() * 60},${110 + Math.random() * 40},70,${0.25 + Math.random() * 0.25})`;
    g.lineWidth = 2 + Math.random() * 2;
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(512, y + (Math.random() - 0.5) * 8);
    g.stroke();
  }
  return c;
}
