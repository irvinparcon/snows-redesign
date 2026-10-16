/* Home hero: golden cross, halo rings, light rays and falling snow (three.js) */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const canvas = document.getElementById('hero3d');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOK() {
  try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); }
  catch { return false; }
}

if (!canvas || !webglOK()) {
  document.documentElement.classList.add('no-webgl');
} else {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x081430, 0.035);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
  camera.position.set(0, 0, 19);

  /* ---- Group that holds the cross; offset right on wide screens ---- */
  const rig = new THREE.Group();
  scene.add(rig);

  /* Cross: extruded shape with bevel, polished gold */
  const s = new THREE.Shape();
  const a = 0.55, v = 3.6, h = 2.2, cy = 1.0; // half-width, half-height, arm half-length, arm centre
  s.moveTo(-a, -v); s.lineTo(a, -v); s.lineTo(a, cy - a); s.lineTo(h, cy - a); s.lineTo(h, cy + a);
  s.lineTo(a, cy + a); s.lineTo(a, v); s.lineTo(-a, v); s.lineTo(-a, cy + a); s.lineTo(-h, cy + a);
  s.lineTo(-h, cy - a); s.lineTo(-a, cy - a); s.lineTo(-a, -v);
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.7, bevelEnabled: true, bevelThickness: 0.18, bevelSize: 0.16, bevelSegments: 6, curveSegments: 8 });
  geo.center();
  const gold = new THREE.MeshPhysicalMaterial({ color: 0xffc94d, metalness: 1, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.08, emissive: 0x5a3a00, emissiveIntensity: 0.35, envMapIntensity: 2.6 });
  const cross = new THREE.Mesh(geo, gold);
  rig.add(cross);

  /* Inner glowing inlay */
  const inlay = new THREE.Mesh(
    new THREE.ExtrudeGeometry(s, { depth: 0.02, bevelEnabled: false }).center(),
    new THREE.MeshBasicMaterial({ color: 0xfff1c7, transparent: true, opacity: 0.0 })
  );
  inlay.scale.set(0.55, 0.88, 1);
  inlay.position.z = 0.55;
  cross.add(inlay);

  /* Halo rings (gyroscope) */
  const ringMat = new THREE.MeshPhysicalMaterial({ color: 0xffd877, metalness: 1, roughness: 0.25, emissive: 0x6b4a00, emissiveIntensity: 0.6 });
  const blueMat = new THREE.MeshPhysicalMaterial({ color: 0x9fb8ff, metalness: 0.9, roughness: 0.3, emissive: 0x1f4fc4, emissiveIntensity: 0.6 });
  const halo1 = new THREE.Mesh(new THREE.TorusGeometry(4.9, 0.045, 16, 220), ringMat);
  const halo2 = new THREE.Mesh(new THREE.TorusGeometry(5.5, 0.03, 16, 220), blueMat);
  const halo3 = new THREE.Mesh(new THREE.TorusGeometry(6.1, 0.02, 16, 220), ringMat);
  halo1.rotation.x = Math.PI / 2.4;
  halo2.rotation.y = Math.PI / 2.6;
  halo3.rotation.set(Math.PI / 3, Math.PI / 5, 0);
  rig.add(halo1, halo2, halo3);

  /* Small orbiting "stars" on halo */
  const orbiters = [];
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffe9a8 : 0xc7d6ff }));
    orbiters.push({ m, r: 4.9 + i * 0.4, sp: 0.25 + i * 0.08, ph: i * 1.6, tilt: i * 0.5 });
    rig.add(m);
  }

  /* Radiant glow sprite behind cross */
  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, 'rgba(255,236,170,1)'); grd.addColorStop(0.25, 'rgba(242,193,78,.55)');
    grd.addColorStop(0.6, 'rgba(59,108,240,.18)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.85 }));
  glow.scale.set(15, 15, 1);
  glow.position.z = -2;
  rig.add(glow);

  /* Light rays */
  const rayTex = (() => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 512;
    const g = c.getContext('2d');
    const grd = g.createLinearGradient(0, 0, 0, 512);
    grd.addColorStop(0, 'rgba(255,230,160,.0)'); grd.addColorStop(0.5, 'rgba(255,230,160,.5)'); grd.addColorStop(1, 'rgba(255,230,160,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 64, 512);
    const h = g.createLinearGradient(0, 0, 64, 0);
    h.addColorStop(0, 'rgba(0,0,0,1)'); h.addColorStop(.5, 'rgba(0,0,0,0)'); h.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-out'; g.fillStyle = h; g.fillRect(0, 0, 64, 512);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const rays = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 22), new THREE.MeshBasicMaterial({ map: rayTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.22 + Math.random() * 0.12, side: THREE.DoubleSide }));
    m.rotation.z = (i / 12) * Math.PI;
    rays.add(m);
  }
  rays.position.z = -3;
  rig.add(rays);

  /* Lights */
  scene.add(new THREE.AmbientLight(0x6f8cd9, 0.6));
  const key = new THREE.DirectionalLight(0xfff4dc, 3.2); key.position.set(5, 6, 8); scene.add(key);
  const rim = new THREE.PointLight(0x3b6cf0, 60, 30); rim.position.set(-6, -2, 4); scene.add(rim);
  const warm = new THREE.PointLight(0xffc75a, 50, 30); warm.position.set(6, 3, 5); scene.add(warm);

  /* Snow */
  const flakeTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.4, 'rgba(255,255,255,.7)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.beginPath(); g.arc(32, 32, 32, 0, Math.PI * 2); g.fill();
    return new THREE.CanvasTexture(c);
  })();
  const COUNT = innerWidth < 700 ? 900 : 2200;
  const pos = new Float32Array(COUNT * 3), vel = new Float32Array(COUNT), sway = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 50;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 2;
    vel[i] = 0.012 + Math.random() * 0.03;
    sway[i] = Math.random() * Math.PI * 2;
  }
  const snowGeo = new THREE.BufferGeometry();
  snowGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const snow = new THREE.Points(snowGeo, new THREE.PointsMaterial({ size: 0.16, map: flakeTex, transparent: true, depthWrite: false, opacity: 0.9, blending: THREE.AdditiveBlending }));
  scene.add(snow);

  /* Layout */
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const wide = w > 900;
    rig.position.set(wide ? 6 : 0, wide ? 0.4 : 1.5, wide ? 0 : -6);
    rig.scale.setScalar(wide ? 0.82 : 0.75);
  };
  resize();
  addEventListener('resize', resize);

  /* Interaction */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { mouse.tx = (e.clientX / innerWidth - 0.5) * 2; mouse.ty = (e.clientY / innerHeight - 0.5) * 2; });
  let visible = true;
  new IntersectionObserver(en => (visible = en[0].isIntersecting)).observe(canvas);

  /* Intro: cross rises and spins in */
  const t0 = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 4);

  const clock = new THREE.Clock();
  const loop = () => {
    requestAnimationFrame(loop);
    if (!visible) return;
    const t = clock.getElapsedTime();
    const intro = ease(Math.min(1, (performance.now() - t0) / 2600));
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    const sc = Math.min(1, scrollY / innerHeight);

    const spin = reduce ? 0 : t * 0.35;
    cross.rotation.y = (1 - intro) * Math.PI * 3 + Math.sin(spin) * 0.55 + mouse.x * 0.35 + sc * 2;
    cross.rotation.x = mouse.y * 0.18 + Math.sin(t * 0.6) * 0.04;
    cross.position.y = (1 - intro) * -6 + Math.sin(t * 0.9) * 0.18;
    inlay.material.opacity = 0.18 + Math.sin(t * 1.5) * 0.08;

    halo1.rotation.z = t * 0.3; halo2.rotation.z = -t * 0.22; halo3.rotation.z = t * 0.15;
    halo1.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.4) * 0.1;
    [halo1, halo2, halo3].forEach(hh => hh.scale.setScalar(0.4 + intro * 0.6));
    orbiters.forEach(o => {
      const ang = t * o.sp + o.ph;
      o.m.position.set(Math.cos(ang) * o.r, Math.sin(ang) * o.r * Math.cos(o.tilt + 1), Math.sin(ang) * o.r * Math.sin(o.tilt + 1));
      o.m.rotation.y = t * 2;
    });
    rays.rotation.z = t * 0.05;
    rays.children.forEach((r, i) => (r.material.opacity = (0.14 + Math.sin(t * 0.8 + i) * 0.08) * intro));
    glow.material.opacity = (0.7 + Math.sin(t * 1.2) * 0.12) * intro;

    rig.rotation.y = mouse.x * 0.12;
    rig.rotation.x = mouse.y * 0.06;
    camera.position.x = mouse.x * 0.6;
    camera.position.y = -mouse.y * 0.4 - sc * 2;
    camera.lookAt(0, -sc * 2, 0);

    if (!reduce) {
      const p = snowGeo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        sway[i] += 0.01;
        p[i * 3 + 1] -= vel[i];
        p[i * 3] += Math.sin(sway[i]) * 0.006 + mouse.x * 0.004;
        if (p[i * 3 + 1] < -15) { p[i * 3 + 1] = 15; p[i * 3] = (Math.random() - 0.5) * 50; }
      }
      snowGeo.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera);
  };
  loop();
}
