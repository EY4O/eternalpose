// ASCII renderer for eternalpose.io: each canvas draws a scene as a grid of Departure Mono glyphs that spell a word.
// The hero is an eye that turns into a compass when a project is chosen, its needle pointing at that project.
(() => {
  'use strict';

  const INK = '#141519';
  const ACCENT = '#FF4F00';
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.:+';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const TAU = Math.PI * 2;
  const stored = () => { try { return localStorage.getItem('ep-motion'); } catch { return null; } };
  let paused = stored() ? stored() === 'off' : reduced.matches;
  const still = () => paused;

  // ---------- glyph atlas: one row of ink glyphs, one row of accent glyphs ----------
  const atlases = new Map();
  function atlasFor(fs) {
    if (atlases.has(fs)) return atlases.get(fs);
    const c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    const font = `${fs}px "Departure Mono", ui-monospace, monospace`;
    ctx.font = font;
    const cw = Math.ceil(ctx.measureText('M').width);
    const ch = Math.ceil(fs * 1.2);
    c.width = cw * CHARS.length;
    c.height = ch * 2;
    ctx = c.getContext('2d');
    ctx.font = font;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    [INK, ACCENT].forEach((colour, row) => {
      ctx.fillStyle = colour;
      for (let k = 0; k < CHARS.length; k++) ctx.fillText(CHARS[k], k * cw + cw / 2, row * ch + ch / 2);
    });
    const index = {};
    for (let k = 0; k < CHARS.length; k++) index[CHARS[k]] = k;
    const atlas = { c, cw, ch, index };
    atlases.set(fs, atlas);
    return atlas;
  }

  // ---------- one canvas ----------
  const views = [];
  function view(canvas, opts) {
    const ctx = canvas.getContext('2d');
    const out = { v: 0, acc: 0 };
    const v = { canvas, opts, visible: false, dirty: true, last: 0, w: 0, h: 0, cols: 0, rows: 0, dpr: 1, atlas: null, codes: null };

    v.resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      v.dpr = Math.min(window.devicePixelRatio || 1, 2);
      v.w = r.width;
      v.h = r.height;
      canvas.width = Math.round(v.w * v.dpr);
      canvas.height = Math.round(v.h * v.dpr);
      v.atlas = atlasFor(Math.round(opts.cell(v.w) * v.dpr));
      v.cols = Math.ceil(canvas.width / v.atlas.cw);
      v.rows = Math.ceil(canvas.height / v.atlas.ch);
      v.codes = new Int32Array(v.cols * v.rows);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      opts.scene.setup && opts.scene.setup(v);
      v.dirty = true;
    };

    v.draw = (t) => {
      const { c, cw, ch, index } = v.atlas;
      const sx = cw / v.dpr;
      const sy = ch / v.dpr;
      const word = opts.word();
      const wl = word.length;
      const scene = opts.scene.at;
      const alpha = opts.alpha;
      const codes = v.codes;
      let lastA = -1;
      for (let j = 0, n = 0; j < v.rows; j++) {
        const py = (j + 0.5) * sy;
        for (let i = 0; i < v.cols; i++, n++) {
          out.v = 0;
          out.acc = 0;
          scene((i + 0.5) * sx, py, t, out, i, j, v, n);
          const val = out.v;
          let code = 0, k = 0, level = 0;
          if (val >= 0.05) {
            k = val < 0.14 ? index['.'] : val < 0.24 ? index[':'] : val < 0.34 ? index['+'] : index[word[(i + j * 3) % wl]];
            level = out.acc ? 12 : Math.round(Math.min(1, alpha * (0.3 + 0.7 * val)) * 12);
            code = ((k + 1) << 5) | (level << 1) | out.acc;
          }
          if (code === codes[n]) continue;
          codes[n] = code;
          ctx.clearRect(i * cw, j * ch, cw, ch);
          if (!code) continue;
          if (level !== lastA) { ctx.globalAlpha = level / 12; lastA = level; }
          ctx.drawImage(c, k * cw, out.acc ? ch : 0, cw, ch, i * cw, j * ch, cw, ch);
        }
      }
      ctx.globalAlpha = 1;
      v.dirty = false;
    };

    new ResizeObserver(() => v.resize()).observe(canvas);
    new IntersectionObserver(([e]) => { v.visible = e.isIntersecting; if (v.visible) v.dirty = true; }).observe(canvas);
    views.push(v);
    return v;
  }

  // one loop for every canvas; still frames only while motion is paused
  const start = performance.now();
  function frame(now) {
    const t = (now - start) / 1000;
    for (const v of views) {
      if (!v.visible || !v.atlas) continue;
      v.opts.tick && v.opts.tick(t, now);
      const due = now - v.last >= 1000 / v.opts.fps;
      if (still() ? v.dirty : due || v.dirty) {
        v.draw(still() ? v.opts.still : t);
        v.last = now;
      }
    }
    requestAnimationFrame(frame);
  }

  const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
  const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

  // ---------- hero: eye to compass ----------
  function hero(canvas) {
    const s = { m: 0, mt: 0, gx: 0, gy: 0, px: null, py: null, th: -Math.PI / 2, tht: -Math.PI / 2, blink: 0, nextBlink: 3, target: null, word: 'ETERNALPOSE', lastMove: 0, tour: -1, tourAt: 0 };
    let cx = 0, cy = 0, R = 1;
    let X, Y, RR, AX, FALL, LENS, CIRC, RAYS;
    const links = [...document.querySelectorAll('[data-compass]')];

    const scene = {
      setup(v) {
        const portrait = v.h > v.w;
        cx = v.w / 2;
        cy = v.h * 0.46;
        R = Math.min(v.w * 0.33, v.h * 0.36);
        if (portrait) {
          // on a phone the eye sits in the gap between the two words of the name
          const top = canvas.getBoundingClientRect().top;
          const a = document.querySelector('.name .w1').getBoundingClientRect();
          const b = document.querySelector('.name .w2').getBoundingClientRect();
          cy = (a.bottom + b.top) / 2 - top;
          R = v.w * 0.43;
        }
        const n = v.cols * v.rows, sx = v.atlas.cw / v.dpr, sy = v.atlas.ch / v.dpr;
        [X, Y, RR, AX, FALL, LENS, CIRC, RAYS] = Array.from({ length: 8 }, () => new Float32Array(n));
        for (let j = 0, k = 0; j < v.rows; j++) {
          for (let i = 0; i < v.cols; i++, k++) {
            const x = ((i + 0.5) * sx - cx) / R, y = ((j + 0.5) * sy - cy) / R;
            const r = Math.hypot(x, y), ax = Math.abs(x);
            X[k] = x; Y[k] = y; RR[k] = r; AX[k] = ax;
            FALL[k] = clamp(1 - Math.abs(r - 1.15) / 1.5, 0, 1);
            LENS[k] = ax < 1 ? 0.56 * Math.pow(1 - ax * ax, 0.85) : 0;
            CIRC[k] = ax < 1 ? Math.sqrt(1 - ax * ax) : 0;
            RAYS[k] = Math.atan2(y, x) * 34 + r * 5;
          }
        }
      },
      at(px, py, t, out, i, j, v, k) {
        const x = X[k], y = Y[k], r = RR[k], ax = AX[k];
        const m = s.m;

        // a dim field of rays around the eye, slowly turning
        const fall = FALL[k];
        out.v = fall && fall * (0.1 + 0.07 * Math.sin(RAYS[k] - t * 0.5));

        // lids: an almond that opens into the compass's circle; blinking only as an eye
        const lens = LENS[k];
        const circle = CIRC[k];
        const L = (lens + (circle - lens) * m) * (1 - s.blink * (1 - m));
        const ay = Math.abs(y);
        if (ax < 1.01 && Math.abs(ay - L) < 0.03 + 0.015 * m) { out.v = 0.95; return; }
        if (ay >= L) return;

        // iris to dial
        const gx = s.gx * 0.3 * (1 - m);
        const gy = s.gy * 0.16 * (1 - m);
        const ix = x - gx, iy = y - gy;
        const ir = Math.hypot(ix, iy);
        const ia = Math.atan2(iy, ix);
        const irisR = 0.4 + 0.44 * m;
        out.v = 0.1 + 0.3 * Math.pow(ay / Math.max(L, 1e-3), 2.5) * (1 - m);
        if (ir < irisR) {
          const iris = clamp((0.72 + 0.28 * Math.sin(ia * 22 + Math.sin(ir * 9) * 1.4)) * (0.8 + 0.35 * ir / irisR), 0, 1);
          const f = ((ia / TAU) * 32 % 1 + 1) % 1;
          const major = ((ia / TAU) * 4 % 1 + 1) % 1 < 0.035;
          const dial = ir > irisR - 0.13 ? (major ? 1 : f < 0.2 ? 0.92 : 0.36) : ir > irisR - 0.17 ? 0.08 : 0.16 + 0.05 * Math.sin(ia * 8);
          out.v = iris + (dial - iris) * m;
          if (ir < 0.17 - 0.1 * m) out.v = 1;
          if (Math.hypot(ix + 0.13, iy + 0.13) < 0.075 * (1 - m)) out.v = 0;
        }

        // the needle: orange north, ink south
        if (m > 0.02) {
          const ca = Math.cos(s.th), sa = Math.sin(s.th);
          const along = x * ca + y * sa;
          const perp = Math.abs(-x * sa + y * ca);
          const len = 0.74 * m, tail = len * 0.7, hw = 0.115;
          if (along > -tail && along < len) {
            const lim = along >= 0 ? hw * (1 - along / len) : hw * (1 + along / tail);
            if (perp < lim) { out.v = 1; out.acc = along > 0 ? 1 : 0; }
          }
          if (r < 0.045 && m > 0.5) { out.v = 1; out.acc = 0; }
        }
      },
    };

    const v = view(canvas, {
      cell: (w) => (w < 700 ? 10 : 13),
      alpha: 0.78,
      fps: 30,
      still: 2,
      scene,
      word: () => s.word,
      tick(t, now) {
        // the eye eases into the compass and back even while motion is paused; paused, the needle
        // holds north and the gaze holds still, so the only movement is the shape changing
        const k = 1 - Math.exp(-1 / 60 * 7);
        const before = s.m;
        s.m += (s.mt - s.m) * k;
        if (still()) {
          s.th = s.tht = -Math.PI / 2;
        } else {
          if (s.target) {
            const tr = s.target.getBoundingClientRect();
            const cr = canvas.getBoundingClientRect();
            s.tht = Math.atan2(tr.top + tr.height / 2 - (cr.top + cy), tr.left + tr.width / 2 - (cr.left + cx));
          }
          s.th += wrap(s.tht - s.th) * k * 1.3;
          if (s.px !== null && now - s.lastMove < 6000) {
            s.gx += (clamp((s.px - cx) / (v.w / 2), -1, 1) - s.gx) * k;
            s.gy += (clamp((s.py - cy) / (v.h / 2), -1, 1) - s.gy) * k;
          } else {
            s.gx += (0.55 * Math.sin(t * 0.37) - s.gx) * k * 0.3;
            s.gy += (0.35 * Math.sin(t * 0.29 + 1) - s.gy) * k * 0.3;
          }
        }
        // blink now and then, only as an eye
        if (!still() && s.m < 0.05) {
          if (t > s.nextBlink) { s.nextBlink = t + 3.5 + Math.random() * 4; s.blinkAt = t; }
          const bt = s.blinkAt ? (t - s.blinkAt) / 0.18 : 2;
          s.blink = bt < 1 ? Math.sin(bt * Math.PI) : 0;
        } else s.blink = 0;
        // left alone, the compass tours the projects
        if (!still() && links.length && !s.hovered && now - s.lastMove > 9000) {
          if (now > s.tourAt) {
            s.tour = (s.tour + 1) % (links.length * 2);
            const pick = s.tour % 2 === 0 ? links[s.tour / 2] : null;
            pick ? aim(pick) : release();
            s.tourAt = now + (pick ? 2600 : 2200);
          }
        }
        if (Math.abs(s.m - before) > 0.001) v.dirty = true;
      },
    });

    function aim(el) {
      s.target = el;
      s.word = el.dataset.compass;
      s.mt = 1;
      v.dirty = true;
    }
    function release() {
      s.target = null;
      s.word = 'ETERNALPOSE';
      s.mt = 0;
      v.dirty = true;
    }
    for (const el of links) {
      el.addEventListener('pointerenter', () => { s.hovered = true; aim(el); });
      el.addEventListener('pointerleave', () => { s.hovered = false; release(); });
      el.addEventListener('focus', () => { s.hovered = true; aim(el); });
      el.addEventListener('blur', () => { s.hovered = false; release(); });
    }
    window.addEventListener('pointermove', (e) => {
      const cr = canvas.getBoundingClientRect();
      s.px = e.clientX - cr.left;
      s.py = e.clientY - cr.top;
      s.lastMove = performance.now();
      if (!s.hovered && s.target) release();
    }, { passive: true });
  }

  // ---------- Linemark: lines, stations, and a train ----------
  function linemark() {
    let lines = [], stations = [], th = 6, path = null;
    const seg = (px, py, a, b) => {
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const u = clamp(((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy), 0, 1);
      return Math.hypot(px - a[0] - u * dx, py - a[1] - u * dy);
    };
    const along = (pts, f) => {
      let total = 0;
      for (let i = 1; i < pts.length; i++) total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      let d = f * total;
      for (let i = 1; i < pts.length; i++) {
        const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
        if (d <= l) return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * d / l, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * d / l];
        d -= l;
      }
      return pts[pts.length - 1];
    };
    return {
      setup(v) {
        const { w, h } = v;
        const d = h * 0.24;
        const x0 = w * 0.06, x1 = w * 0.94;
        const ix = w * 0.36;
        path = [[x0, h * 0.44], [ix, h * 0.44], [ix + d, h * 0.68], [x1, h * 0.68]];
        lines = [
          [[x0, h * 0.2], [x1, h * 0.2]],
          path,
          [[x0, h * 0.88], [w * 0.52, h * 0.88], [w * 0.52 + h * 0.2, h * 0.68]],
        ];
        th = Math.max(4, v.atlas.ch / v.dpr * 0.55);
        stations = [
          [w * 0.16, h * 0.2, 1], [w * 0.42, h * 0.2, 1], [w * 0.68, h * 0.2, 1], [w * 0.86, h * 0.2, 1],
          [w * 0.16, h * 0.44, 1], [ix, h * 0.44, 1], [w * 0.52 + h * 0.2, h * 0.68, 1.5], [w * 0.86, h * 0.68, 1],
          [w * 0.2, h * 0.88, 1], [w * 0.4, h * 0.88, 1],
        ];
      },
      at(px, py, t, out) {
        if (((px / 14) | 0) % 2 === 0 && ((py / 14) | 0) % 2 === 0) out.v = 0.07;
        let dl = 1e9;
        for (const pts of lines) for (let i = 1; i < pts.length; i++) dl = Math.min(dl, seg(px, py, pts[i - 1], pts[i]));
        if (dl < th) out.v = 0.9;
        for (const [sx, sy, size] of stations) {
          const rs = th * 2.6 * size;
          const ds = Math.hypot(px - sx, py - sy);
          if (Math.abs(ds - rs) < th * 0.9) { out.v = 1; out.acc = 0; return; }
          if (ds < rs) { out.v = 0; return; }
        }
        const [tx, ty] = along(path, (t * 0.09) % 1);
        if (dl < th && Math.hypot(px - tx, py - ty) < th * 6) { out.v = 1; out.acc = 1; }
      },
    };
  }

  // ---------- Voyage Tracker: the Straw Hat Jolly Roger, rippling ----------
  // Drawn in outline like the emblem: straw hat (band in the accent), skull, teeth and crossed bones.
  // Units: 1 = the skull's scale; the emblem spans about x -1.1..1.1, y -1..1.15.
  function voyage() {
    let cx = 0, cy = 0, s = 1, t0 = 0.03;
    const capsule = (x, y, ax, ay, bx, by) => {
      const dx = bx - ax, dy = by - ay;
      const u = clamp(((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy), 0, 1);
      return Math.hypot(x - ax - u * dx, y - ay - u * dy);
    };
    const bone = (x, y, ax, ay, bx, by) => {
      const l = Math.hypot(bx - ax, by - ay), dx = (bx - ax) / l, dy = (by - ay) / l;
      let d = capsule(x, y, ax, ay, bx, by) - 0.045;
      for (const [ex, ey, sg] of [[ax, ay, -1], [bx, by, 1]]) {
        for (const side of [-1, 1]) {
          const kx = ex + dx * sg * 0.04 - dy * side * 0.12, ky = ey + dy * sg * 0.04 + dx * side * 0.12;
          d = Math.min(d, Math.hypot(x - kx, y - ky) - 0.145);
        }
      }
      return d;
    };
    const box = (x, y, x0, y0, x1, y1) => {
      const qx = Math.abs(x - (x0 + x1) / 2) - (x1 - x0) / 2, qy = Math.abs(y - (y0 + y1) / 2) - (y1 - y0) / 2;
      return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0);
    };
    return {
      setup({ w, h, atlas, dpr }) {
        s = Math.min(w / 2.5, h / 2.35);
        cx = w > 520 ? w - s * 1.2 - w * 0.05 : w / 2; // clear of the screenshot window that overlaps the left
        cy = h / 2 - s * 0.07;
        t0 = Math.max(0.028, (atlas.ch / dpr) * 0.55 / s);
      },
      at(px, py, t, out) {
        if (((px / 14) | 0) % 2 === 0 && ((py / 14) | 0) % 2 === 0) out.v = 0.06;
        // the ripple: the whole emblem sways as if it were painted on cloth
        let x = (px - cx) / s, y = (py - cy) / s;
        y += 0.045 * Math.sin(2.6 * x - 2 * t);
        x += 0.02 * Math.sin(2 * y - 1.6 * t);
        const th = t0;
        const line = 0.95, straw = 0.2;

        // brim
        const db = capsule(x, y, -0.9, -0.252, 0.92, -0.252) - 0.065;
        if (db < th) { out.v = db > -th ? line : straw; return; }
        // head: crown and band above the brim, skull below
        const dh = Math.hypot(x - 0.006, y + 0.27) - 0.65;
        if (dh < th) {
          if (dh > -th) { out.v = line; return; }
          if (y < -0.188) {
            if (Math.abs(y + 0.5) < th) { out.v = line; return; }
            if (y > -0.5) { out.v = 1; out.acc = 1; return; }
            out.v = straw;
            return;
          }
          if (Math.hypot(x + 0.24, y - 0.02) < 0.17 || Math.hypot(x - 0.25, y - 0.02) < 0.17) { out.v = 1; return; }
          if (((x - 0.006) / 0.065) ** 2 + ((y - 0.231) / 0.048) ** 2 < 1) { out.v = 1; return; }
          out.v = 0;
          return;
        }
        // jaw with its teeth
        const dj = Math.min(box(x, y, -0.41, 0.2, 0.41, 0.58), Math.hypot(x, y - 0.58) - 0.41);
        if (dj < th) {
          if (dj > -th) { out.v = line; return; }
          const k = 1 - (x / 0.41) ** 2;
          const upper = 0.43 + 0.07 * k, lower = 0.56 + 0.12 * k;
          if (Math.abs(y - upper) < th * 0.8 || Math.abs(y - lower) < th * 0.8) { out.v = line; return; }
          if (y < lower && (Math.abs(x + 0.19) < th * 0.8 || Math.abs(x) < th * 0.8 || Math.abs(x - 0.19) < th * 0.8)) { out.v = line; return; }
          out.v = 0;
          return;
        }
        // crossed bones behind
        for (const d of [bone(x, y, -0.935, -0.77, 0.81, 0.75), bone(x, y, 0.925, -0.77, -0.81, 0.75)]) {
          if (d < th) { out.v = d > -th ? line : 0; return; }
        }
      },
    };
  }

  // ---------- Model Librarian: shelves, and a model landing in its slot ----------
  function librarian() {
    let shelves = [], books = [], slot = null, th = 4;
    return {
      setup({ w, h }) {
        shelves = [h * 0.31, h * 0.64, h * 0.96];
        th = Math.max(3, h * 0.018);
        books = [];
        slot = null;
        const unit = w / 640;
        let seed = 3;
        const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
        shelves.forEach((base, s) => {
          let x = w * 0.05;
          while (x < w * 0.93) {
            const bw = (24 + rnd() * 22) * unit;
            if (s === 1 && !slot && x > w * 0.5) {
              slot = { x, w: 30 * unit, base, h: h * 0.25 };
              x += slot.w + 4 * unit;
              continue;
            }
            books.push({ x, w: bw, base, h: h * (0.19 + rnd() * 0.08), band: 0.2 + rnd() * 0.25 });
            x += bw + 3 * unit;
          }
        });
      },
      at(px, py, t, out) {
        for (const base of shelves) if (Math.abs(py - base - th) < th) { out.v = 0.9; return; }
        const book = (b, acc, top) => {
          if (px < b.x || px > b.x + b.w || py > b.base || py < top) return false;
          const edge = px - b.x < 4 || b.x + b.w - px < 4 || py - top < 5;
          const y = (py - top) / (b.base - top);
          const band = Math.abs(y - (b.band || 0.25)) < 0.05 || Math.abs(y - 0.82) < 0.04;
          out.v = edge || band ? 0.95 : 0.09;
          out.acc = acc;
          return true;
        };
        for (const b of books) if (book(b, 0, b.base - b.h)) return;
        if (slot) {
          const p = (t % 7) / 7;
          if (p < 0.9) {
            const drop = p < 0.35 ? 1 - Math.pow(1 - p / 0.35, 3) : 1;
            const top = slot.base - slot.h - (1 - drop) * slot.base;
            book({ ...slot, base: top + slot.h, band: 0.3 }, 1, top);
          }
        }
      },
    };
  }

  const scenes = { linemark, voyage, librarian };
  const words = { linemark: 'LINEMARK', voyage: 'VOYAGE', librarian: 'LIBRARIAN' };

  function init() {
    const eye = document.querySelector('canvas[data-ascii="hero"]');
    if (eye) hero(eye);
    for (const c of document.querySelectorAll('canvas[data-ascii]:not([data-ascii="hero"])')) {
      const name = c.dataset.ascii;
      view(c, { cell: (w) => (name === 'voyage' ? (w < 500 ? 7 : 9) : w < 500 ? 9 : 11), alpha: 0.8, fps: 24, still: 14, scene: scenes[name](), word: () => words[name] });
    }
    requestAnimationFrame(frame);
  }

  // the [Pause motion] toggle: stops the ticker and holds every drawing on a still frame
  const toggle = document.querySelector('[data-motion]');
  const apply = () => {
    document.documentElement.classList.toggle('still', paused);
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = paused ? '[Play motion]' : '[Pause motion]';
    }
    views.forEach((v) => (v.dirty = true));
  };
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      paused = !paused;
      try { localStorage.setItem('ep-motion', paused ? 'off' : 'on'); } catch {}
      apply();
    });
  }
  reduced.addEventListener('change', () => { if (!stored()) paused = reduced.matches; apply(); });
  apply();
  (document.fonts ? document.fonts.load('16px "Departure Mono"').catch(() => {}) : Promise.resolve()).then(init);
})();
