/* Our Lady of the Snows — site interactions */
(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const ROOT = doc.dataset.root || './';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Preloader ---------- */
  const loader = $('.loader');
  const hideLoader = () => loader && loader.classList.add('done');
  window.addEventListener('load', () => setTimeout(hideLoader, 250));
  document.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 900));
  setTimeout(hideLoader, 1800);

  /* ---------- Today's date (top bar) ---------- */
  const today = $('[data-today]');
  if (today) today.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  $$('[data-year]').forEach(e => (e.textContent = new Date().getFullYear()));

  /* ---------- Header state + back to top ---------- */
  const header = $('.header');
  const totop = $('.totop');
  const prog = totop && totop.querySelector('.prog circle');
  const onScroll = () => {
    const y = scrollY;
    header && header.classList.toggle('scrolled', y > 30);
    if (totop) {
      totop.classList.toggle('show', y > 600);
      const max = doc.scrollHeight - innerHeight;
      if (prog) prog.style.strokeDashoffset = 157 - 157 * Math.min(1, y / max);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  totop && totop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------- Desktop dropdowns: keyboard / touch support ---------- */
  $$('.nav > ul > li.has-dd > button').forEach(btn => {
    btn.addEventListener('click', e => {
      const li = btn.parentElement;
      const open = !li.classList.contains('open');
      $$('.nav li.open').forEach(x => x.classList.remove('open'));
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
      e.stopPropagation();
    });
  });
  document.addEventListener('click', () => $$('.nav li.open').forEach(x => x.classList.remove('open')));

  /* ---------- Mobile drawer ---------- */
  const drawer = $('.drawer');
  const openDrawer = v => {
    drawer.classList.toggle('open', v);
    document.body.style.overflow = v ? 'hidden' : '';
    $('.menu-btn').setAttribute('aria-expanded', v);
  };
  $('.menu-btn') && $('.menu-btn').addEventListener('click', () => openDrawer(true));
  $('.drawer__close') && $('.drawer__close').addEventListener('click', () => openDrawer(false));

  /* ---------- Search ---------- */
  const search = $('.search');
  const input = search && search.querySelector('input');
  const results = search && search.querySelector('.search__results');
  let active = 0;
  const openSearch = v => {
    if (!search) return;
    search.classList.toggle('open', v);
    if (v) { input.value = ''; render(''); setTimeout(() => input.focus(), 60); }
  };
  const render = q => {
    const idx = window.SNOWS_INDEX || [];
    q = q.trim().toLowerCase();
    const score = p => (p.t.toLowerCase().includes(q) ? 0 : 1);
    const hits = (q ? idx.filter(p => (p.t + ' ' + p.s + ' ' + p.k).toLowerCase().includes(q)).sort((a, b) => score(a) - score(b)) : idx.filter(p => p.f)).slice(0, 12);
    active = 0;
    results.innerHTML = hits.length
      ? hits.map((p, i) => `<li><a href="${ROOT}${p.u}" class="${i ? '' : 'active'}"><b>${p.t}</b><small>${p.s}</small></a></li>`).join('')
      : '<li style="padding:18px;color:#586380">No pages found. Try “tuition”, “uniform” or “mass”.</li>';
  };
  $$('[data-search]').forEach(b => b.addEventListener('click', () => { openDrawer && drawer && drawer.classList.contains('open') && openDrawer(false); openSearch(true); }));
  if (search) {
    search.addEventListener('click', e => e.target === search && openSearch(false));
    input.addEventListener('input', () => render(input.value));
    input.addEventListener('keydown', e => {
      const links = $$('a', results);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        links[active] && links[active].classList.remove('active');
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
        links[active] && links[active].classList.add('active');
      }
      if (e.key === 'Enter' && links[active]) location.href = links[active].href;
    });
  }
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(true); }
    if (e.key === 'Escape') { openSearch(false); drawer && drawer.classList.contains('open') && openDrawer(false); }
  });

  /* ---------- Split headings into words ---------- */
  $$('.split').forEach(el => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(w => {
            if (!w) return;
            if (/^\s+$/.test(w)) return frag.append(' ');
            const s = document.createElement('span');
            s.className = 'word';
            s.style.setProperty('--i', i++);
            s.textContent = w;
            frag.append(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('word')) walk(n);
      });
    };
    walk(el);
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: .14, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .reveal-left, .split').forEach(el => io.observe(el));

  /* ---------- 3D tilt ---------- */
  if (fine && !reduce) {
    $$('.tilt').forEach(card => {
      const max = parseFloat(card.dataset.tilt || 10);
      if (!card.querySelector('.tilt__glare')) {
        const g = document.createElement('span');
        g.className = 'tilt__glare';
        card.append(g);
      }
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.classList.add('tilting');
        card.style.setProperty('--ry', `${(x - .5) * max * 2}deg`);
        card.style.setProperty('--rx', `${(.5 - y) * max * 2}deg`);
        card.style.setProperty('--gx', `${x * 100}%`);
        card.style.setProperty('--gy', `${y * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.classList.remove('tilting');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    /* magnetic buttons */
    $$('.btn').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .3 - 3}px)`;
      });
      b.addEventListener('pointerleave', () => (b.style.transform = ''));
    });
  }

  /* touch: tap to flip pillar cards */
  $$('.flip').forEach(f => f.addEventListener('click', () => f.classList.toggle('flipped')));

  /* ---------- Scroll-linked 3D (photo tilt + page hero parallax) ---------- */
  const tilts = $$('[data-scroll-tilt]');
  const pbg = $('.phero__bg');
  const scrollFx = () => {
    const vh = innerHeight;
    tilts.forEach(el => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - (r.top - vh * .15) / (vh * .85)));
      el.style.setProperty('--stx', `${(1 - p) * 38}deg`);
      el.style.setProperty('--sty', `${(1 - p) * -14}deg`);
      el.style.setProperty('--sts', (.86 + p * .14).toFixed(3));
    });
    if (pbg) pbg.style.setProperty('--py', `${scrollY * .35}px`);
  };
  if (!reduce) { addEventListener('scroll', () => requestAnimationFrame(scrollFx), { passive: true }); scrollFx(); }

  /* ---------- Counters ---------- */
  const cio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, end = parseFloat(el.dataset.count), dec = el.dataset.dec ? +el.dataset.dec : 0;
      const pre = el.dataset.pre || '', suf = el.dataset.suf || '', comma = !el.dataset.nocomma;
      const t0 = performance.now(), dur = reduce ? 1 : 2000;
      const tick = t => {
        const p = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - p, 4));
        let s = v.toFixed(dec);
        if (comma) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
        el.textContent = pre + s + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: .5 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ---------- Campaign progress ring ---------- */
  const ring = $('.progress-ring .bar');
  if (ring) {
    const C = 2 * Math.PI * ring.r.baseVal.value;
    ring.style.strokeDasharray = C;
    ring.style.strokeDashoffset = C;
    new IntersectionObserver((en, o) => {
      if (en[0].isIntersecting) { ring.style.strokeDashoffset = C * (1 - parseFloat(ring.dataset.pct)); o.disconnect(); }
    }, { threshold: .4 }).observe(ring.closest('.progress-ring'));
  }

  /* ---------- 3D ring gallery ---------- */
  const ringEl = $('.ring');
  if (ringEl) {
    const items = $$('figure', ringEl), n = items.length;
    let radius = 0, angle = 0, vel = reduce ? 0 : .12, dragging = false, lastX = 0;
    const layout = () => {
      const w = ringEl.offsetWidth;
      radius = Math.round(w / 2 / Math.tan(Math.PI / n)) + 40;
      items.forEach((f, i) => (f.style.transform = `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`));
    };
    layout();
    addEventListener('resize', layout);
    const stage = ringEl.parentElement;
    stage.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; stage.setPointerCapture(e.pointerId); });
    stage.addEventListener('pointermove', e => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; vel = dx * .25; angle += dx * .25; });
    const end = () => (dragging = false);
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    const loop = () => {
      if (!dragging) { vel += ((reduce ? 0 : .12) - vel) * .03; angle += vel; }
      ringEl.style.transform = `translateZ(${-radius}px) rotateX(-8deg) rotateY(${angle}deg)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Testimonial cube ---------- */
  const cube = $('.cube');
  if (cube) {
    const faces = $$('.cube__face', cube), dots = $$('.cube-nav button');
    let cur = 0, timer;
    const depth = () => cube.offsetWidth / 2;
    const place = () => faces.forEach((f, i) => (f.style.transform = `rotateY(${i * 90}deg) translateZ(${depth()}px)`));
    const go = i => {
      cur = (i + faces.length) % faces.length;
      cube.style.transform = `translateZ(${-depth()}px) rotateY(${-cur * 90}deg)`;
      dots.forEach((d, j) => d.classList.toggle('on', j === cur));
    };
    place(); go(0);
    addEventListener('resize', () => { place(); go(cur); });
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); clearInterval(timer); }));
    if (!reduce) timer = setInterval(() => go(cur + 1), 5500);
  }

  /* ---------- Upcoming events (hide past ones) ---------- */
  $$('[data-events]').forEach(list => {
    const limit = +list.dataset.limit || 99;
    const now = new Date(); now.setHours(0, 0, 0, 0);
    let shown = 0;
    $$('[data-date]', list).forEach(ev => {
      const d = new Date(ev.dataset.date + 'T00:00:00');
      if (d < now || shown >= limit) ev.remove(); else shown++;
    });
    $$('.month-label', list).forEach(m => { const nx = m.nextElementSibling; if (!nx || nx.classList.contains('month-label')) m.remove(); });
    if (!shown) list.innerHTML = '<p>The next school calendar will be posted soon. Download the full-year PDF calendar above.</p>';
  });

  /* ---------- Staff directory filter ---------- */
  const staff = $('.staff');
  if (staff) {
    const q = $('.staff-search'), btns = $$('.staff-filter button');
    let group = 'all';
    const apply = () => {
      const term = (q.value || '').toLowerCase();
      $$('.person', staff).forEach(p => {
        const ok = (group === 'all' || p.dataset.group === group) && p.textContent.toLowerCase().includes(term);
        p.style.display = ok ? '' : 'none';
      });
    };
    q.addEventListener('input', apply);
    btns.forEach(b => b.addEventListener('click', () => { btns.forEach(x => x.classList.remove('on')); b.classList.add('on'); group = b.dataset.group; apply(); }));
  }

  /* ---------- Falling snow (2D canvas) ---------- */
  $$('canvas.snow').forEach(cv => {
    if (reduce) return;
    const ctx = cv.getContext('2d');
    let W, H, flakes = [], visible = true;
    const density = +cv.dataset.density || 90;
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.offsetWidth; H = cv.offsetHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(density * (W / 1200) + 20);
      flakes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.4 + .6, s: Math.random() * .7 + .25, w: Math.random() * Math.PI * 2, o: Math.random() * .6 + .3 }));
    };
    size();
    addEventListener('resize', size);
    new IntersectionObserver(e => (visible = e[0].isIntersecting)).observe(cv);
    const draw = () => {
      if (visible) {
        ctx.clearRect(0, 0, W, H);
        for (const f of flakes) {
          f.y += f.s; f.w += .012; f.x += Math.sin(f.w) * .35;
          if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; }
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${f.o})`;
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  });
})();
