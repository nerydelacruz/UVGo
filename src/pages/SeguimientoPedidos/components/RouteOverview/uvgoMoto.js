/*
 * UVGo · Moto de reparto con repartidor (objeto 3D para Three.js)
 *
 * Uso:
 *   const moto = UVGoMoto.create(THREE);          // o create(THREE, { bodyColor: '#00913C', ... })
 *   scene.add(moto.object);
 *   moto.setPosition(x, z);                       // posición sobre el suelo (metros)
 *   moto.setHeading(rad);                         // rumbo: 0 = mirando hacia +X, gira contra reloj sobre Y
 *   moto.setLean(rad);                            // inclinación lateral (curvas), + = hacia la derecha
 *   moto.setColors({ body, shirt, box });         // colores de moto, playera+gorra y caja
 *   moto.setScale(s);                             // escala (1 = tamaño real, ~2.1 m de largo)
 *   moto.setVisible(bool);
 *   moto.dispose();
 *
 * Unidades: metros. El origen del objeto está en el suelo, entre las dos ruedas.
 * Compatible con Three.js r128 o más reciente.
 * Módulo ES: se importa con `import { create, createEnvironment } from "./uvgoMoto"`.
 */
export function create(T, opts) {
  opts = opts || {};
  const colors = {
    body: opts.bodyColor || '#00913C',
    shirt: opts.shirtColor || '#00A443',
    box: opts.boxColor || '#00A443'
  };
  const castShadow = opts.castShadow !== false;
  const disposables = [];

  const setTexColor = (tex) => {
    if ('colorSpace' in tex && T.SRGBColorSpace) tex.colorSpace = T.SRGBColorSpace;
    else tex.encoding = T.sRGBEncoding;
  };
  const std = (color, rough, metal, extra) => {
    const mt = new T.MeshStandardMaterial(Object.assign({ color: color, roughness: rough, metalness: metal }, extra || {}));
    disposables.push(mt); return mt;
  };
  const m = {
    body: new T.MeshPhysicalMaterial({ color: colors.body, roughness: 0.3, metalness: 0.25, clearcoat: 1, clearcoatRoughness: 0.06 }),
    black: std('#1A1D1B', 0.55, 0.1),
    frame: std('#202322', 0.4, 0.55),
    chrome: std('#E6EAE8', 0.1, 1),
    alu: std('#A3AAA6', 0.32, 0.85),
    tire: std('#141615', 0.93, 0),
    seat: std('#1C1F1E', 0.72, 0),
    lamp: std('#FFFFFF', 0.05, 0.1, { emissive: '#FFF4D6', emissiveIntensity: 1.1 }),
    tail: std('#9F1239', 0.2, 0.1, { emissive: '#E11D48', emissiveIntensity: 0.7 }),
    plate: std('#F3F5F4', 0.5, 0.1),
    gauge: std('#0F1A14', 0.2, 0.2, { emissive: '#22C55E', emissiveIntensity: 0.35 }),
    screen: std('#28343A', 0.05, 0.3, { transparent: true, opacity: 0.55 }),
    cap: std(colors.shirt, 0.7, 0),
    shirt: std(colors.shirt, 0.82, 0),
    shirtDark: std('#005C25', 0.82, 0),
    skin: std('#F0BE96', 0.62, 0),
    hair: std('#3A2A22', 0.85, 0),
    jeans: std('#2B3A60', 0.85, 0),
    shoe: std('#E8634A', 0.6, 0),
    sole: std('#F7F7F5', 0.6, 0)
  };
  disposables.push(m.body);

  const object = new T.Group(); object.name = 'UVGoMoto';
  const lean = new T.Group(); object.add(lean);

  let P = lean;
  const V = (x, y, z) => new T.Vector3(x, y, z);
  const add = (mesh, parent) => {
    mesh.castShadow = castShadow; mesh.receiveShadow = true;
    disposables.push(mesh.geometry); (parent || P).add(mesh); return mesh;
  };
  const rod = (a, b, r, mt, r2) => {
    const d = new T.Vector3().subVectors(b, a); const len = d.length();
    const mesh = new T.Mesh(new T.CylinderGeometry(r2 == null ? r : r2, r, len, 20), mt);
    mesh.position.copy(a).addScaledVector(d, 0.5);
    mesh.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
    return add(mesh);
  };
  const ball = (r, x, y, z, mt, sx, sy, sz) => {
    const mesh = new T.Mesh(new T.SphereGeometry(r, 36, 24), mt);
    mesh.position.set(x, y, z); mesh.scale.set(sx || 1, sy || 1, sz || 1); return add(mesh);
  };
  const limb = (a, b, r1, r2, mt) => { rod(a, b, r1, mt, r2); ball(r1, a.x, a.y, a.z, mt); ball(r2, b.x, b.y, b.z, mt); };
  const rrShape = (w, h, r) => {
    const s = new T.Shape(), x = -w / 2, y = -h / 2;
    r = Math.max(0.0001, Math.min(r, w / 2, h / 2));
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  };
  const rbox = (w, h, d, b, mt, x, y, z, rz) => {
    b = Math.min(b, w / 2.2, h / 2.2, d / 2.2);
    const iw = w - 2 * b, ih = h - 2 * b;
    const geo = new T.ExtrudeGeometry(rrShape(iw, ih, Math.min(iw, ih) * 0.25), { depth: Math.max(0.001, d - 2 * b), bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 3, curveSegments: 6 });
    geo.center();
    const mesh = new T.Mesh(geo, mt); mesh.position.set(x, y, z); if (rz) mesh.rotation.z = rz; return add(mesh);
  };
  const slab = (pts, depth, bev, mt, z) => {
    const s = new T.Shape(); s.moveTo(pts[0][0], pts[0][1]);
    s.splineThru(pts.slice(1).concat([pts[0]]).map((q) => new T.Vector2(q[0], q[1])));
    const geo = new T.ExtrudeGeometry(s, { depth: depth, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 5, curveSegments: 48 });
    geo.translate(0, 0, (z || 0) - depth / 2);
    return add(new T.Mesh(geo, mt));
  };
  const tube = (pts, r, mt, closed, seg) => {
    const curve = new T.CatmullRomCurve3(pts.map((q) => V(q[0], q[1], q[2])), !!closed);
    return add(new T.Mesh(new T.TubeGeometry(curve, seg || 64, r, 10, !!closed), mt));
  };
  const spring = (a, b, r, turns, mt) => {
    const d = new T.Vector3().subVectors(b, a), len = d.length(), n = turns * 16, pts = [];
    for (let i = 0; i <= n; i++) { const t = i / n, ang = t * turns * Math.PI * 2; pts.push(V(Math.cos(ang) * r, t * len, Math.sin(ang) * r)); }
    const mesh = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), n * 3, 0.008, 6, false), mt);
    mesh.position.copy(a); mesh.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
    return add(mesh);
  };
  const band = (r, width, from, len, mt, x, y) => {
    const mesh = new T.Mesh(new T.CylinderGeometry(r, r, width, 40, 1, true, from, len), mt);
    mesh.rotation.x = Math.PI / 2; mesh.position.set(x, y, 0);
    return add(mesh);
  };
  const bodyDouble = m.body.clone(); bodyDouble.side = T.DoubleSide; disposables.push(bodyDouble);
  const blackDouble = m.black.clone(); blackDouble.side = T.DoubleSide; disposables.push(blackDouble);

  // ---------- Wheels (static) ----------
  const R = 0.34;
  const makeWheel = (x, front) => {
    const w = new T.Group(); w.position.set(x, R, 0);
    const prev = P; P = w;
    add(new T.Mesh(new T.TorusGeometry(0.265, 0.075, 24, 72), m.tire));
    add(new T.Mesh(new T.TorusGeometry(0.205, 0.016, 12, 64), m.alu));
    const lip = add(new T.Mesh(new T.CylinderGeometry(0.195, 0.195, 0.1, 64, 1, true), blackDouble)); lip.rotation.x = Math.PI / 2;
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2;
      rod(V(Math.cos(a) * 0.05, Math.sin(a) * 0.05, 0), V(Math.cos(a + 0.16) * 0.192, Math.sin(a + 0.16) * 0.192, 0), 0.011, m.black);
      rod(V(Math.cos(a) * 0.05, Math.sin(a) * 0.05, 0), V(Math.cos(a - 0.16) * 0.192, Math.sin(a - 0.16) * 0.192, 0), 0.011, m.black);
    }
    const hub = add(new T.Mesh(new T.CylinderGeometry(0.055, 0.055, 0.16, 24), m.alu)); hub.rotation.x = Math.PI / 2;
    const dr = front ? 0.14 : 0.1;
    const disc = add(new T.Mesh(new T.CylinderGeometry(dr, dr, 0.005, 48), m.chrome)); disc.rotation.x = Math.PI / 2; disc.position.z = 0.07;
    if (!front) { const spr = add(new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.012, 36), m.frame)); spr.rotation.x = Math.PI / 2; spr.position.z = -0.13; }
    P = prev; lean.add(w); return w;
  };
  makeWheel(0.72, true); makeWheel(-0.64, false);

  // ---------- Front end ----------
  const axleF = V(0.72, R, 0), headT = V(0.5, 1.04, 0);
  const forkAt = (t, z) => V(axleF.x + (headT.x - axleF.x) * t, axleF.y + (headT.y - axleF.y) * t, z);
  [-0.09, 0.09].forEach((z) => {
    rod(forkAt(0, z), forkAt(0.42, z), 0.032, m.black, 0.03);
    rod(forkAt(0.42, z), forkAt(0.86, z), 0.022, m.chrome);
    tube([[forkAt(0.86, z).x - 0.01, forkAt(0.86, z).y, z], [forkAt(1.02, z).x, forkAt(1.02, z).y, z]], 0.028, m.black);
  });
  rbox(0.1, 0.035, 0.26, 0.012, m.alu, forkAt(0.86, 0).x, forkAt(0.86, 0).y, 0, 0.31);
  rbox(0.1, 0.03, 0.26, 0.012, m.alu, forkAt(1.0, 0).x, forkAt(1.0, 0).y + 0.01, 0, 0.31);
  band(0.375, 0.15, Math.PI * 0.42, Math.PI * 0.8, bodyDouble, 0.72, R);
  ball(0.17, 0.6, 1.02, 0, m.body, 1.05, 0.95, 1.08);
  ball(0.1, 0.705, 1.0, 0, m.lamp, 0.42, 0.95, 1.05);
  const bezel = add(new T.Mesh(new T.TorusGeometry(0.098, 0.012, 12, 48), m.chrome)); bezel.position.set(0.735, 1.0, 0); bezel.rotation.y = Math.PI / 2;
  const ws = new T.Shape();
  ws.moveTo(-0.15, 0); ws.lineTo(0.15, 0); ws.quadraticCurveTo(0.15, 0.2, 0.09, 0.27); ws.quadraticCurveTo(0, 0.31, -0.09, 0.27); ws.quadraticCurveTo(-0.15, 0.2, -0.15, 0);
  const screenG = new T.Group(); screenG.position.set(0.6, 1.11, 0); screenG.rotation.z = 0.5; lean.add(screenG);
  add(new T.Mesh(new T.ExtrudeGeometry(ws, { depth: 0.006, bevelEnabled: false, curveSegments: 16 }), m.screen), screenG).rotation.y = Math.PI / 2;

  const barY = 1.2;
  tube([[0.42, barY, -0.36], [0.45, barY + 0.02, -0.15], [0.47, barY + 0.03, 0], [0.45, barY + 0.02, 0.15], [0.42, barY, 0.36]], 0.014, m.chrome);
  [-1, 1].forEach((s) => {
    rod(V(0.42, barY, s * 0.3), V(0.415, barY, s * 0.42), 0.022, m.black);
    ball(0.022, 0.415, barY, s * 0.42, m.black);
    tube([[0.44, barY + 0.03, s * 0.25], [0.43, barY + 0.15, s * 0.29], [0.41, barY + 0.24, s * 0.33]], 0.007, m.black);
    ball(0.055, 0.41, barY + 0.27, s * 0.34, m.black, 0.35, 0.75, 1.15);
  });
  const gauge = add(new T.Mesh(new T.CylinderGeometry(0.06, 0.065, 0.045, 32), m.black)); gauge.position.set(0.52, barY + 0.06, 0); gauge.rotation.z = 0.75;
  const face = add(new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.004, 32), m.gauge)); face.position.set(0.507, barY + 0.074, 0); face.rotation.z = 0.75;

  // ---------- Frame & bodywork ----------
  tube([[0.48, 1.0, 0], [0.32, 0.72, 0], [0.24, 0.42, 0], [0.12, 0.3, 0]], 0.03, m.frame);
  tube([[0.47, 1.0, 0], [0.2, 0.86, 0], [-0.08, 0.76, 0], [-0.5, 0.88, 0], [-0.95, 0.95, 0]], 0.028, m.frame);
  [-1, 1].forEach((s) => tube([[-0.08, 0.48, s * 0.1], [-0.3, 0.68, s * 0.12], [-0.55, 0.88, s * 0.1]], 0.016, m.frame));
  ball(1, 0.17, 0.98, 0, m.body, 0.37, 0.18, 0.23).rotation.z = 0.12;
  rod(V(0.21, 1.15, 0), V(0.21, 1.17, 0), 0.04, m.chrome);
  [-1, 1].forEach((s) => slab([[0.47, 1.0], [0.36, 0.78], [0.22, 0.66], [0.06, 0.7], [0.03, 0.84], [0.2, 0.95], [0.38, 1.03]], 0.01, 0.012, m.body, s * 0.205));
  slab([[-0.06, 0.74], [-0.3, 0.8], [-0.5, 0.86], [-0.52, 0.94], [-0.3, 0.95], [-0.05, 0.93]], 0.26, 0.025, m.body);
  slab([[-0.46, 0.88], [-0.75, 0.93], [-1.0, 0.97], [-1.04, 1.02], [-0.85, 1.04], [-0.6, 1.02], [-0.45, 0.98]], 0.2, 0.03, m.body);
  slab([[0.12, 0.95], [0.04, 1.01], [-0.2, 1.02], [-0.42, 1.03], [-0.62, 1.06], [-0.7, 1.04], [-0.64, 0.97], [-0.3, 0.94], [0.0, 0.92]], 0.22, 0.035, m.seat);
  rbox(0.04, 0.05, 0.14, 0.015, m.tail, -1.05, 0.99, 0);
  rod(V(-0.9, 0.96, 0), V(-1.04, 0.74, 0), 0.012, m.black);
  rbox(0.012, 0.13, 0.21, 0.005, m.plate, -1.05, 0.76, 0, 0.12);
  band(0.385, 0.1, Math.PI * 0.95, Math.PI * 0.42, blackDouble, -0.64, R);

  // ---------- Engine & exhaust ----------
  const crank = add(new T.Mesh(new T.CylinderGeometry(0.16, 0.16, 0.26, 40), m.black)); crank.rotation.x = Math.PI / 2; crank.position.set(0.02, 0.44, 0);
  [-1, 1].forEach((s) => { const cov = add(new T.Mesh(new T.CylinderGeometry(0.125, 0.13, 0.03, 40), m.alu)); cov.rotation.x = Math.PI / 2; cov.position.set(0.02, 0.44, s * 0.14); });
  rbox(0.24, 0.2, 0.24, 0.04, m.black, -0.16, 0.44, 0);
  const cyl = new T.Group(); cyl.position.set(0.17, 0.64, 0); cyl.rotation.z = -0.45; lean.add(cyl);
  P = cyl;
  rbox(0.18, 0.26, 0.2, 0.04, m.alu, 0, 0, 0);
  rbox(0.2, 0.08, 0.2, 0.03, m.black, 0, 0.15, 0);
  P = lean;
  tube([[0.28, 0.73, 0.06], [0.35, 0.58, 0.1], [0.32, 0.36, 0.13], [0.16, 0.26, 0.17], [-0.12, 0.3, 0.2], [-0.26, 0.36, 0.2]], 0.022, m.chrome, false, 96);
  rod(V(-0.24, 0.35, 0.2), V(-0.8, 0.56, 0.2), 0.062, m.black, 0.05);
  ball(0.05, -0.8, 0.56, 0.2, m.black);
  rod(V(-0.8, 0.56, 0.2), V(-0.86, 0.585, 0.2), 0.03, m.chrome);

  // ---------- Swingarm, shocks, chain, pegs ----------
  [-0.12, 0.12].forEach((z) => rbox(0.6, 0.06, 0.035, 0.012, m.frame, -0.35, 0.4, z, 0.19 - Math.atan2(0.46 - R, 0.58)));
  rod(V(-0.06, 0.46, -0.15), V(-0.06, 0.46, 0.15), 0.025, m.alu);
  [-0.15, 0.15].forEach((z) => {
    rod(V(-0.58, 0.4, z), V(-0.46, 0.86, z), 0.012, m.chrome);
    spring(V(-0.565, 0.46, z), V(-0.48, 0.8, z), 0.026, 9, m.body);
  });
  const sprF = add(new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.02, 20), m.frame)); sprF.rotation.x = Math.PI / 2; sprF.position.set(-0.04, 0.42, -0.13);
  tube([[-0.04, 0.472, -0.13], [-0.34, 0.47, -0.13], [-0.64, 0.465, -0.13], [-0.76, 0.34, -0.13], [-0.64, 0.215, -0.13], [-0.34, 0.3, -0.13], [-0.04, 0.37, -0.13], [0.012, 0.42, -0.13]], 0.009, m.frame, true, 120);
  [-1, 1].forEach((s) => rod(V(0.03, 0.47, s * 0.12), V(0.03, 0.47, s * 0.26), 0.016, m.black));

  // ---------- Rack + delivery box ----------
  tube([[-0.52, 1.065, 0.2], [-1.08, 1.065, 0.2], [-1.1, 1.065, 0], [-1.08, 1.065, -0.2], [-0.52, 1.065, -0.2]], 0.012, m.black, false, 80);
  [-1, 1].forEach((s) => { rod(V(-0.5, 0.94, s * 0.17), V(-0.6, 1.065, s * 0.2), 0.011, m.black); rod(V(-0.95, 0.97, s * 0.1), V(-1.0, 1.065, s * 0.2), 0.011, m.black); });
  const mkTex = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const t = new T.CanvasTexture(c); setTexColor(t); t.anisotropy = 8; disposables.push(t); return { c: c, t: t }; };
  const side = mkTex(512, 512), back = mkTex(512, 512), plain = mkTex(64, 64);
  const boxMat = (tx) => std('#ffffff', 0.5, 0.05, { map: tx.t });
  const BX = -0.8, BY = 1.35, bw = 0.6, bh = 0.54, bd = 0.58;
  // faces: +x, -x, +y, -y, +z, -z
  add(new T.Mesh(new T.BoxGeometry(bw, bh, bd), [boxMat(plain), boxMat(back), boxMat(plain), boxMat(plain), boxMat(side), boxMat(side)])).position.set(BX, BY, 0);
  const hx = bw / 2, hy = bh / 2, hz = bd / 2, er = 0.018;
  [-1, 1].forEach((a) => [-1, 1].forEach((b) => {
    rod(V(BX - hx, BY + a * hy, b * hz), V(BX + hx, BY + a * hy, b * hz), er, m.black);
    rod(V(BX + a * hx, BY - hy, b * hz), V(BX + a * hx, BY + hy, b * hz), er, m.black);
    rod(V(BX + a * hx, BY + b * hy, -hz), V(BX + a * hx, BY + b * hy, hz), er, m.black);
    [-1, 1].forEach((c) => ball(er, BX + a * hx, BY + b * hy, c * hz, m.black));
  }));
  rbox(bw + 0.03, 0.018, bd + 0.03, 0.008, m.black, BX, BY + hy - 0.08, 0);
  const paintBox = () => {
    const draw = (tx, logo, size) => {
      const c = tx.c.getContext('2d'), W = tx.c.width, H = tx.c.height;
      c.fillStyle = colors.box; c.fillRect(0, 0, W, H);
      if (!logo) { tx.t.needsUpdate = true; return; }
      const grd = c.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, 'rgba(255,255,255,0.06)'); grd.addColorStop(1, 'rgba(0,0,0,0.12)');
      c.fillStyle = grd; c.fillRect(0, 0, W, H);
      c.fillStyle = 'rgba(232,238,234,0.92)'; c.fillRect(0, 96, W, 24);
      c.fillStyle = '#FFFFFF'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = '800 ' + size + 'px "Plus Jakarta Sans", "Segoe UI", Arial, sans-serif';
      c.fillText('UVGo', W / 2, 300);
      tx.t.needsUpdate = true;
    };
    draw(side, true, 168); draw(back, true, 150); draw(plain, false);
  };
  paintBox();
  if (document.fonts && document.fonts.load) document.fonts.load('800 160px "Plus Jakarta Sans"').then(paintBox).catch(() => {});

  // ---------- Rider ----------
  const rider = new T.Group(); rider.position.y = 0.04; lean.add(rider);
  P = rider;
  ball(1, -0.22, 1.05, 0, m.jeans, 0.16, 0.115, 0.17);
  [-1, 1].forEach((s) => {
    const hip = V(-0.2, 1.04, s * 0.1), knee = V(0.15, 0.98, s * 0.19), ankle = V(0.03, 0.58, s * 0.22);
    limb(hip, knee, 0.08, 0.066, m.jeans);
    limb(knee, ankle, 0.064, 0.054, m.jeans);
    rod(V(ankle.x, 0.5, ankle.z), V(ankle.x, ankle.y, ankle.z), 0.045, m.skin);
    ball(1, ankle.x + 0.06, 0.48, ankle.z, m.shoe, 0.12, 0.058, 0.062);
    ball(1, ankle.x, 0.51, ankle.z, m.shoe, 0.06, 0.05, 0.055);
    rbox(0.24, 0.03, 0.12, 0.012, m.sole, ankle.x + 0.05, 0.445, ankle.z);
  });
  const torso = new T.Group(); torso.position.set(-0.2, 1.04, 0); torso.rotation.z = -0.38; rider.add(torso);
  const body = new T.Group(); body.scale.set(0.8, 1, 1.2); torso.add(body);
  const prof = [[0.0, -0.02], [0.14, 0.0], [0.15, 0.08], [0.153, 0.2], [0.168, 0.32], [0.175, 0.4], [0.152, 0.46], [0.095, 0.505], [0.05, 0.52], [0.0, 0.52]].map((q) => new T.Vector2(q[0], q[1]));
  P = body;
  add(new T.Mesh(new T.LatheGeometry(prof, 64), m.shirt));
  const hem = add(new T.Mesh(new T.TorusGeometry(0.142, 0.014, 10, 64), m.shirt)); hem.rotation.x = Math.PI / 2; hem.position.y = 0.01;
  const neckband = add(new T.Mesh(new T.TorusGeometry(0.07, 0.014, 10, 48), m.shirtDark)); neckband.rotation.x = Math.PI / 2; neckband.position.y = 0.51;
  P = rider;
  rod(V(-0.01, 1.5, 0), V(0.035, 1.6, 0), 0.047, m.skin);
  const H = V(0.065, 1.71, 0);
  ball(0.13, H.x, H.y, H.z, m.skin, 1.0, 1.1, 0.94);
  ball(0.06, H.x + 0.05, H.y - 0.07, 0, m.skin, 1.2, 0.9, 1.3);
  ball(0.022, H.x + 0.13, H.y - 0.01, 0, m.skin, 0.9, 1, 0.9);
  [-1, 1].forEach((s) => ball(0.03, H.x - 0.01, H.y - 0.01, s * 0.122, m.skin, 0.8, 1.1, 0.6));
  const hair = add(new T.Mesh(new T.SphereGeometry(0.135, 40, 24, -1.35, 2.7, 0.35, 1.45), m.hair));
  hair.position.set(H.x - 0.004, H.y + 0.005, 0); hair.scale.set(1, 1.1, 0.96);
  const dome = add(new T.Mesh(new T.SphereGeometry(0.142, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.52), m.cap));
  dome.position.set(H.x, H.y + 0.035, 0); dome.scale.set(1.0, 0.95, 0.97); dome.rotation.z = -0.12;
  const brimS = new T.Shape(); brimS.absellipse(0, 0, 0.13, 0.135, -Math.PI / 2, Math.PI / 2, false, 0); brimS.lineTo(0, -0.135);
  const brimG = new T.Group(); brimG.position.set(H.x + 0.08, H.y + 0.04, 0); brimG.rotation.z = -0.22; rider.add(brimG);
  add(new T.Mesh(new T.ExtrudeGeometry(brimS, { depth: 0.012, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 4, curveSegments: 40 }), m.cap), brimG).rotation.x = -Math.PI / 2;
  ball(0.017, H.x - 0.015, H.y + 0.17, 0, m.cap, 1, 0.6, 1);
  [-1, 1].forEach((s) => {
    const sh = V(-0.04, 1.43, s * 0.19), elb = V(0.15, 1.29, s * 0.27), hand = V(0.39, 1.16, s * 0.36);
    const mid = sh.clone().lerp(elb, 0.5);
    ball(0.072, sh.x, sh.y, sh.z, m.shirt);
    rod(sh, mid, 0.07, m.shirt, 0.066);
    limb(mid, elb, 0.05, 0.045, m.skin);
    limb(elb, hand, 0.045, 0.04, m.skin);
    ball(1, hand.x + 0.02, hand.y + 0.012, hand.z, m.skin, 0.058, 0.05, 0.055);
  });
  P = lean;

  // ---------- Public API ----------
  const api = {
    object: object,
    setPosition(x, z, y) { object.position.set(x, y || 0, z); return api; },
    setHeading(rad) { object.rotation.y = rad; return api; },
    setLean(rad) { lean.rotation.x = rad; return api; },
    setScale(s) { object.scale.setScalar(s); return api; },
    setVisible(v) { object.visible = !!v; return api; },
    setColors(c) {
      c = c || {};
      if (c.body) { colors.body = c.body; m.body.color.set(c.body); bodyDouble.color.set(c.body); }
      if (c.shirt) { colors.shirt = c.shirt; m.shirt.color.set(c.shirt); m.cap.color.set(c.shirt); m.shirtDark.color.set(c.shirt).multiplyScalar(0.55); }
      if (c.box) { colors.box = c.box; paintBox(); }
      return api;
    },
    dispose() {
      if (object.parent) object.parent.remove(object);
      disposables.forEach((d) => d.dispose && d.dispose());
    }
  };
  api.setColors({ shirt: colors.shirt });
  return api;
}

// Optional: soft studio reflections for paint and chrome. Call once per renderer: scene.environment = UVGoMoto.createEnvironment(THREE, renderer);
export function createEnvironment(T, renderer) {
  const env = new T.Scene();
  const geo = new T.SphereGeometry(50, 48, 24);
  const pos = geo.attributes.position, cols = [];
  const top = new T.Color('#FFFFFF'), mid = new T.Color('#C9D6CE'), low = new T.Color('#4A544E');
  for (let i = 0; i < pos.count; i++) {
    const t = pos.getY(i) / 50;
    const c = t > 0 ? mid.clone().lerp(top, Math.min(1, t * 1.6)) : mid.clone().lerp(low, Math.min(1, -t * 2.5));
    cols.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new T.Float32BufferAttribute(cols, 3));
  env.add(new T.Mesh(geo, new T.MeshBasicMaterial({ side: T.BackSide, vertexColors: true })));
  [[0, 40, 0, 40, 20, 3.5], [30, 18, 25, 18, 10, 2.2], [-30, 14, -20, 14, 8, 1.6]].forEach((q) => {
    const mt = new T.MeshBasicMaterial({ side: T.DoubleSide }); mt.color.setRGB(q[5], q[5], q[5]);
    const p = new T.Mesh(new T.PlaneGeometry(q[3], q[4]), mt); p.position.set(q[0], q[1], q[2]); p.lookAt(0, 0, 0); env.add(p);
  });
  const pm = new T.PMREMGenerator(renderer);
  const tex = pm.fromScene(env, 0.03).texture;
  pm.dispose();
  return tex;
}

