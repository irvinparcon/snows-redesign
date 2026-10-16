// Static site generator: node src/build.mjs  → writes HTML pages into the repo root
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { NAV, UTIL, EXT } from './nav.mjs';
import { PAGES, NEWS, I, ICONS, eventsHTML, newsCards } from './content.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isExt = u => /^(https?:|mailto:|tel:)/.test(u);
const href = u => (isExt(u) ? u : `~/${u ? u + '/' : ''}index.html`);
const tgt = u => (isExt(u) && !u.startsWith('mailto:') && !u.startsWith('tel:') ? ' target="_blank" rel="noopener"' : '');
const arrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const chev = '<svg viewBox="0 0 12 12"><path d="M2 4l4 4 4-4"/></svg>';
const strip = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/* ---------------- Shared chrome ---------------- */
const head = ({ title, desc, depth, home }) => `<!doctype html>
<html lang="en" data-root="${'../'.repeat(depth) || './'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc.replace(/"/g, '&quot;')}">
<meta name="theme-color" content="#081430">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc.replace(/"/g, '&quot;')}">
<meta property="og:image" content="~/assets/img/Snowsnv.jpg">
<link rel="icon" href="~/assets/img/cropped-ols-logo-1.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="~/assets/css/style.css">
${home ? `<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}</script>` : ''}
<script type="application/ld+json">{"@context":"https://schema.org","@type":"School","name":"Our Lady of the Snows School","address":{"@type":"PostalAddress","streetAddress":"1125 Lander St.","addressLocality":"Reno","addressRegion":"NV","postalCode":"89509"},"telephone":"+1-775-322-2773","email":"info@snowsnv.org","foundingDate":"1951"}</script>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
${home ? `<div class="loader" aria-hidden="true"><div class="loader__inner"><img class="loader__crest" src="~/assets/img/ols-logo-1.png" alt=""><div class="loader__text">OUR LADY OF THE SNOWS</div></div></div>` : ''}`;

const topbar = () => `
<div class="topbar"><div class="wrap">
  <div class="topbar__left"><span data-today>Welcome</span>
    <a href="tel:+17753222773"><svg viewBox="0 0 24 24"><path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>775.322.2773</a>
    <a href="mailto:info@snowsnv.org"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>info@snowsnv.org</a></div>
  <div class="topbar__right">${UTIL.map(u => `<a href="${href(u.u)}">${u.t}</a>`).join('')}<a href="${EXT.renweb}" target="_blank" rel="noopener">RenWeb</a><a href="${EXT.facts}" target="_blank" rel="noopener">FACTS</a><a href="${EXT.parish}" target="_blank" rel="noopener">Our Lady of the Snows Parish ↗</a></div>
</div></div>`;

const header = active => `
<header class="header"><div class="wrap">
  <a class="brand" href="~/index.html" aria-label="Our Lady of the Snows School home"><img src="~/assets/img/ols-logo-1.png" alt=""><span class="brand__name">Our Lady of the Snows<small>PAROCHIAL SCHOOL · RENO</small></span></a>
  <nav class="nav" aria-label="Main"><ul>
    ${NAV.map(g => `<li class="has-dd"><button class="nav__link" aria-expanded="false"${g.t === active ? ' aria-current="true"' : ''}>${g.t}${chev}</button>
      <ul class="dropdown">${g.items.map(i => `<li><a class="${i.sub ? 'sub' : ''}" href="${href(i.u)}"${tgt(i.u)}>${i.t}${isExt(i.u) ? '<span class="ext">↗</span>' : ''}</a></li>`).join('')}</ul></li>`).join('')}
  </ul></nav>
  <div class="header__actions">
    <button class="icon-btn" data-search aria-label="Search the site (Ctrl+K)"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></button>
    <a class="btn btn--sm" href="~/admissions/index.html">Apply ${arrow}</a>
    <button class="icon-btn menu-btn" aria-label="Open menu" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></svg></button>
  </div>
</div></header>
<div class="drawer" role="dialog" aria-label="Menu">
  <button class="icon-btn drawer__close" aria-label="Close menu"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  <a href="~/index.html">Home</a>
  ${NAV.map(g => `<details><summary>${g.t}</summary>${g.items.map(i => `<a href="${href(i.u)}"${tgt(i.u)}>${i.t}${isExt(i.u) ? ' ↗' : ''}</a>`).join('')}</details>`).join('')}
  ${UTIL.map(u => `<a href="${href(u.u)}">${u.t}</a>`).join('')}
  <a href="${EXT.renweb}" target="_blank" rel="noopener">RenWeb ↗</a>
  <button class="btn" data-search>Search the site ${arrow}</button>
</div>
<div class="search" role="dialog" aria-label="Search"><div class="search__box">
  <input type="search" placeholder="Search pages — try “tuition”, “uniform”, “mass”…" aria-label="Search pages">
  <ul class="search__results"></ul>
  <div class="search__hint">↑ ↓ to navigate · Enter to open · Esc to close</div>
</div></div>`;

const footer = () => `
<footer class="footer"><div class="wrap">
  <div class="footer__grid">
    <div class="footer__brand">
      <a class="brand" href="~/index.html"><img src="~/assets/img/ols-logo-1.png" alt=""><span class="brand__name">Our Lady of the Snows<small>PAROCHIAL SCHOOL · EST. 1951</small></span></a>
      <p>Inspired by our Catholic Faith, guiding and nurturing students to become young leaders who love God, love learning and love their neighbor.</p>
      <a class="parish-logo" href="${EXT.parish}" target="_blank" rel="noopener" aria-label="Our Lady of the Snows Parish"><img src="~/assets/img/OLS-Parish.png" alt="Our Lady of the Snows Parish, Reno Nevada"></a>
    </div>
    <div><h4>Visit</h4><ul>
      <li><a href="https://www.google.com/maps/search/?api=1&query=1125+Lander+St+Reno+NV+89509" target="_blank" rel="noopener">1125 Lander St.<br>Reno, NV 89509</a></li>
      <li><a href="tel:+17753222773">Phone (775) 322-2773</a></li>
      <li>Fax (775) 322-0827</li>
      <li><a href="mailto:info@snowsnv.org">info@snowsnv.org</a></li></ul></div>
    <div><h4>Explore</h4><ul>${[['Our Faith', 'our-faith'], ['Academics', 'academics'], ['Student Life', 'student-life'], ['For Parents', 'for-parents'], ['Admissions', 'admissions'], ['About', 'about'], ['Welcome Home Project', 'welcome-home-project']].map(([t, u]) => `<li><a href="${href(u)}">${t}</a></li>`).join('')}</ul></div>
    <div><h4>Quick Links</h4><ul>${[['News & Updates', 'news-and-updates'], ['Calendar', 'calendar-of-events'], ['Tuition & Fees', 'admissions/tuition-fees'], ['Faculty & Staff', 'about/contact/faculty-staff-directory'], ['Contact', 'about/contact'], ['Legal Notices', 'about/mission-2']].map(([t, u]) => `<li><a href="${href(u)}">${t}</a></li>`).join('')}
      <li><a href="${EXT.renweb}" target="_blank" rel="noopener">RenWeb ↗</a></li><li><a href="${EXT.apply}" target="_blank" rel="noopener">Online Application ↗</a></li></ul></div>
  </div>
  <div class="footer__bottom"><span>© <span data-year>2026</span> Our Lady of the Snows School. All Rights Reserved.</span><span class="footer__verse">“Let the children come to me.” — Matthew 19:14</span></div>
</div></footer>
<button class="totop" aria-label="Back to top"><svg class="prog" viewBox="0 0 54 54"><circle cx="27" cy="27" r="25" stroke-dasharray="157" stroke-dashoffset="157"/></svg><svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
<script src="~/assets/js/search-index.js"></script>
<script src="~/assets/js/main.js"></script>`;

const close = extra => `${extra || ''}\n</body>\n</html>\n`;

/* ---------------- Inner page ---------------- */
const crestSVG = '';
function innerPage(p) {
  const depth = p.slug.split('/').length;
  const group = NAV.find(g => g.t === p.nav);
  const crumbs = [`<li><a href="~/index.html">Home</a></li>`];
  if (group && group.u !== p.slug) crumbs.push(`<li><a href="${href(group.u)}">${group.t}</a></li>`);
  if (p.post) crumbs.push(`<li><a href="${href('news-and-updates')}">News</a></li>`);
  crumbs.push(`<li aria-current="page">${p.title}</li>`);

  const side = group ? `<aside class="side"><div class="side__box reveal-left"><div class="side__title">${group.t.toUpperCase()}</div><ul>${group.items.map(i => `<li><a class="${i.sub ? 'sub' : ''}" href="${href(i.u)}"${tgt(i.u)}${i.u === p.slug ? ' aria-current="page"' : ''}>${i.t}${isExt(i.u) ? '<span>↗</span>' : ''}</a></li>`).join('')}</ul></div>
    <div class="side__help reveal-left" style="--d:.1s"><b>Questions?</b>Our school office is happy to help.<a href="tel:+17753222773">(775) 322-2773</a><a href="mailto:info@snowsnv.org">info@snowsnv.org</a></div></aside>`
    : `<aside class="side"><div class="side__box reveal-left"><div class="side__title">STAY CONNECTED</div><ul>
      <li><a href="${href('news-and-updates')}"${p.slug === 'news-and-updates' ? ' aria-current="page"' : ''}>News &amp; Updates</a></li>
      <li><a href="${href('calendar-of-events')}"${p.slug === 'calendar-of-events' ? ' aria-current="page"' : ''}>Calendar of Events</a></li>
      <li><a href="${href('about/contact/communications')}">Communications</a></li>
      <li><a href="${EXT.renweb}" target="_blank" rel="noopener">RenWeb<span>↗</span></a></li></ul></div>
      <div class="side__help reveal-left" style="--d:.1s"><b>Questions?</b>Our school office is happy to help.<a href="tel:+17753222773">(775) 322-2773</a><a href="mailto:info@snowsnv.org">info@snowsnv.org</a></div></aside>`;

  // related cards: siblings in the same section (internal only)
  const sibs = (group ? group.items : [{ t: 'Admissions', u: 'admissions' }, { t: 'Academics', u: 'academics' }, { t: 'Our Faith', u: 'our-faith' }, { t: 'Student Life', u: 'student-life' }])
    .filter(i => !isExt(i.u) && i.u !== p.slug).slice(0, 4);
  const rel = sibs.map((i, n) => {
    const tp = PAGES.find(x => x.slug === i.u);
    return `<a class="xcard tilt reveal" data-tilt="8" style="--d:${n * 0.08}s" href="${href(i.u)}"><img src="${I(tp ? tp.img : 'Snowsnv.jpg')}" alt="" loading="lazy"><div class="xcard__body"><div class="eyebrow">${tp ? tp.eyebrow : ''}</div><h3>${i.t}</h3><span class="xcard__go">Explore ${arrow}</span></div></a>`;
  }).join('');

  const lead = p.post ? `<div class="post-meta"><span>${p.date}</span><span>·</span><span>Our Lady of the Snows School</span></div>` : `<p class="lead reveal" style="--d:.3s">${p.lead}</p>`;
  const desc = strip(p.lead || p.body).slice(0, 155);
  return head({ title: `${p.title} — Our Lady of the Snows Parochial School`, desc, depth }) + topbar() + header(p.nav) + `
<main id="main">
<section class="phero">
  <div class="phero__bg" style="background-image:url('${I(p.img)}')"></div>
  <canvas class="snow" data-density="70"></canvas>
  <img class="phero__crest" src="~/assets/img/ols-logo-1.png" alt="">
  <div class="wrap">
    <ol class="crumbs reveal">${crumbs.join('')}</ol>
    <div class="eyebrow eyebrow--light reveal">${p.eyebrow}</div>
    <h1 class="split">${p.title}</h1>
    ${lead}
  </div>
</section>
<div class="wrap page">
  ${side}
  <article class="content">${p.body}</article>
</div>
${rel ? `<section class="related"><div class="wrap"><div class="eyebrow">Continue exploring</div><h2 class="reveal">More in ${group ? group.t : 'Snows'}</h2><div class="explore">${rel}</div></div></section>` : ''}
<section class="wrap" style="padding-bottom:110px"><div class="cta reveal"><canvas class="snow" data-density="50"></canvas>
  <div class="eyebrow eyebrow--light">Visit Snows</div><h2>Come see where faith and learning meet.</h2>
  <p>Prospective families are invited to contact our school office for a personalized tour of our campus.</p>
  <div class="cta__row"><a class="btn" href="~/admissions/index.html">Start your application ${arrow}</a><a class="btn btn--ghost" href="tel:+17753222773">Call (775) 322-2773</a></div></div></section>
</main>` + footer() + close();
}

/* ---------------- Home page ---------------- */
function homePage() {
  const pillars = [
    ['I', 'Faith', 'cross', 'I choose to have a personal relationship with God.', ['I know the prayers, Traditions, and teachings of the Catholic church', 'I make choices that reflect the Gospel message', 'I honor Mary as our Blessed Mother']],
    ['II', 'Knowledge', 'book', 'I choose to always grow and learn.', ['I demonstrate competence in arts and sciences', 'I demonstrate critical thinking and problem solving skills', 'I demonstrate the ability to listen, speak, and write clearly']],
    ['III', 'Leadership', 'torch', 'I choose to be a positive influence in our community.', ['I model virtuous behavior', 'I take personal responsibility', 'I inspire others to be their best']],
    ['IV', 'Service', 'dove', 'I choose to put our faith into action.', ['I use time and talent for the good of others', 'I take responsibility for the needs of others, locally and globally', 'I pray']],
  ];
  const explore = [
    ['academics', '100_1531.jpg', 'Academics', 'Inspire a love of learning', 'Our Lady of the Snows School inspires students to love learning and challenges them to reach their highest potential.'],
    ['student-life', 'STUDENT-LIFE-1.jpg', 'Student Life', 'Belong & serve', 'Snows students are active members of a faith-based community that welcomes and serves all.'],
    ['for-parents', 'FOR-PARENTS.jpg', 'New Parents', 'Partners in faith', 'Parents are a vital part of our school community — partnering with parents achieves the best learning outcomes for our students.'],
    ['our-faith', 'Friday-feb-26-114.jpg', 'Whole Child', 'Faith at the center', 'Our Lady of the Snows strives to nurture the whole child; spiritually, physically and intellectually.'],
  ];
  const gallery = [['STUDENT-LIFE-1.jpg', 'Recess & friendship'], ['100_1531.jpg', 'A love of reading'], ['STUDENT-LIFE-2.jpg', 'CYO Volleyball'], ['FOR-PARENTS.jpg', 'Snows spirit'], ['Sister-Carmen-8.jpg', 'Faith in action'], ['STUDENT-LIFE-3.jpg', 'Festival fun'], ['Friday-feb-26-114.jpg', 'Love the Lord'], ['IMG_2279.jpg', 'Serving our neighbors']];
  const testimonials = [
    ['My husband and I are very happy with Our Lady of the Snows School. Our 2 children love it and are learning a lot. The principal is very involved with the children and the teachers and staff are wonderful!', 'Snows Parent'],
    ['We are very happy at Our Lady of the Snows. My wife and I were recommended by many families that are presently attending and have graduated. We are grateful to have found OLS.', 'P. Bertone'],
    ['My three children graduated from this school and would recommend it to anyone. The teachers, staff and principal are fantastic.', 'Snows Parent'],
    ['Inspired by our Catholic Faith, Our Lady of the Snows School guides and nurtures our students to become young leaders who love God, love learning and love their neighbor.', 'Our Mission'],
  ];

  return head({ title: 'Our Lady of the Snows Parochial School — Catholic K–8 in Reno, Nevada', desc: 'Our Lady of the Snows School, a Catholic K–8 parochial school in Reno, Nevada since 1951. Faith. Knowledge. Leadership. Service.', depth: 0, home: true }) + topbar() + header('') + `
<main id="main">
<section class="hero">
  <canvas id="hero3d" aria-hidden="true"></canvas>
  <div class="hero__fallback"><img src="~/assets/img/ols-logo-1.png" alt=""></div>
  <div class="wrap"><div class="hero__content">
    <div class="hero__meta reveal"><span class="chip"><i></i>Catholic · Kindergarten – 8th Grade</span><span class="chip">Reno, Nevada · Est. 1951</span></div>
    <h1 class="split"><span class="line">Faith. Knowledge.</span><span class="line"><span class="gold">Leadership. Service.</span></span></h1>
    <p class="lead reveal" style="--d:.6s">Inspired by our Catholic Faith, Our Lady of the Snows School guides and nurtures students to become young leaders who love God, love learning and love their neighbor.</p>
    <div class="hero__ctas reveal" style="--d:.75s"><a class="btn" href="~/admissions/index.html">Explore Admissions ${arrow}</a><a class="btn btn--ghost" href="~/about/index.html">Discover Snows</a></div>
  </div></div>
  <a class="hero__scroll" href="#welcome"><span></span>SCROLL</a>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee__track">${Array(2).fill(['FAITH', 'KNOWLEDGE', 'LEADERSHIP', 'SERVICE', 'EST. 1951', 'KINDERGARTEN – 8TH GRADE', 'RENO, NEVADA', 'GO FALCONS']).flat().map(t => `<span>${t}</span>`).join('')}</div></div>

<section class="section" id="welcome"><div class="wrap welcome-grid">
  <div class="persp"><div class="photo-stack scroll-tilt" data-scroll-tilt>
    <img class="main" src="~/assets/img/Snowsnv.jpg" alt="Our Lady of the Snows School and Parish campus in Reno">
    <img class="badge-crest" src="~/assets/img/ols-logo-1.png" alt="">
    <div class="float-card"><b data-count="75" data-suf="+">75+</b><small>years forming young leaders in Reno since September 4, 1951</small></div>
  </div></div>
  <div>
    <div class="eyebrow reveal">Welcome to Snows</div>
    <h2 class="section-title split">A school that <em>welcomes all</em> and serves all.</h2>
    <p class="mission-quote reveal">“We are a school that welcomes all and serves all. We strive to create a learning environment that recognizes the whole child.”</p>
    <p class="reveal">Our Lady of the Snows strives to nurture the whole child — spiritually, physically and intellectually. Our Catholic values guide all aspects of our school life, creating a learning environment that respects the dignity of every individual.</p>
    <div class="signature reveal"><img src="~/assets/img/Tim-Fuetsch.jpg" alt="Principal Tim Fuetsch"><div><b>Tim Fuetsch</b><span>Principal, Our Lady of the Snows School</span></div></div>
    <a class="btn btn--navy reveal" href="~/about/index.html">Read the Principal’s Message ${arrow}</a>
  </div>
</div></section>

<section class="section dark noise"><div class="wrap">
  <div class="center"><div class="eyebrow">Schoolwide Learning Expectations</div>
  <h2 class="section-title split">Four pillars. <em>One calling.</em></h2>
  <p class="lead reveal">Every Snows student grows in Faith, Knowledge, Leadership and Service. Hover or tap a card to reveal what each promise means.</p></div>
  <div class="pillars">${pillars.map(([n, t, ic, sub, li], i) => `
    <div class="flip reveal" style="--d:${i * 0.1}s" tabindex="0"><div class="flip__inner">
      <div class="flip__face flip__front"><span class="flip__num">${n}</span><div class="flip__icon">${ICONS[ic]}</div><div><h3>${t}</h3><p>${sub}</p></div></div>
      <div class="flip__face flip__back"><h4>${t}</h4><ul>${li.map(x => `<li>${x}</li>`).join('')}</ul></div>
    </div></div>`).join('')}</div>
  <p class="center flip-hint">↻ HOVER OR TAP TO TURN</p>
</div></section>

<section class="section"><div class="wrap">
  <div class="eyebrow reveal">Explore</div>
  <h2 class="section-title split">Life at <em>Our Lady of the Snows</em></h2>
  <div class="explore">${explore.map(([u, img, h, eb, p], i) => `<a class="xcard tilt reveal" data-tilt="9" style="--d:${i * 0.08}s" href="${href(u)}"><img src="~/assets/img/${img}" alt="" loading="lazy"><div class="xcard__body"><div class="eyebrow">${eb}</div><h3>${h}</h3><p>${p}</p><span class="xcard__go">Learn more ${arrow}</span></div></a>`).join('')}</div>
</div></section>

<section class="section dark" style="padding:90px 0"><div class="wrap">
  <div class="stats">${[['1951', 'Year opened', 'data-nocomma="1"'], ['360', 'Students enrolled', ''], ['29', 'Faculty members', ''], ['1834', 'Proud graduates', ''], ['15', 'Kindergarten ratio (15:1)', 'data-suf=":1"']].map(([n, l, x], i) => `<div class="stat tilt reveal" data-tilt="12" style="--d:${i * 0.07}s"><b data-count="${n}" ${x}>${n}</b><span>${l}</span></div>`).join('')}</div>
</div></section>

<section class="section ivory-2" style="overflow:hidden"><div class="wrap">
  <div class="center"><div class="eyebrow">Moments at Snows</div><h2 class="section-title split">Faith-filled days, <em>joy-filled</em> moments</h2><p class="lead reveal">Drag to spin the gallery.</p></div>
  <div class="ring-stage" aria-label="Photo gallery"><div class="ring">${gallery.map(([img, c]) => `<figure><img src="~/assets/img/${img}" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`).join('')}</div></div>
  <div class="ring-floor"></div>
</div></section>

<section class="section patroness dark"><canvas class="snow" data-density="140"></canvas><div class="wrap patroness__grid">
  <div class="orb-stage reveal"><div class="orb"><span></span><span></span><span></span><span></span></div><div class="orb-core"><img src="~/assets/img/ols-logo-1.png" alt=""></div></div>
  <div>
    <div class="eyebrow">Our Patroness</div>
    <h2 class="section-title split">The miracle of <em>summer snow</em></h2>
    <p class="reveal">Our school takes its name from one of the oldest titles of the Blessed Mother. According to tradition, in the fourth century a Roman couple prayed to know how to honor Mary with their gifts. On a summer night in August, snow miraculously fell on Rome’s Esquiline Hill, marking the place where the Basilica of St. Mary Major — Santa Maria Maggiore — would be built.</p>
    <p class="reveal">At Snows we celebrate her feast each year, reflect on her story during Catholic Schools Week, and honor our Blessed Mother with a May Crowning every spring.</p>
    <div class="feast reveal"><b>Aug 5</b><span>Feast of the Dedication of the Basilica of St. Mary Major —<br>Our Lady of the Snows</span></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div style="display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap"><div><div class="eyebrow reveal">News and Updates</div><h2 class="section-title split">What’s happening at <em>Snows</em></h2></div><a class="btn btn--navy reveal" href="~/news-and-updates/index.html">All news ${arrow}</a></div>
  ${newsCards()}
</div></section>

<section class="section dark noise"><div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:60px;align-items:start">
  <div style="position:sticky;top:120px"><div class="eyebrow">Calendar</div><h2 class="section-title split">Upcoming <em>events</em></h2><p class="lead reveal">Weekly Mass every Wednesday at 8:45am — families are always warmly invited.</p>
    <div class="hero__ctas reveal" style="margin-top:26px"><a class="btn" href="~/calendar-of-events/index.html">Full calendar ${arrow}</a><a class="btn btn--ghost" href="https://snowsnv.org/wp-content/uploads/2026/07/26-27-OLSS-Calendar.pdf" target="_blank" rel="noopener">Download PDF</a></div></div>
  <div class="reveal">${eventsHTML(6)}</div>
</div></section>

<section class="section ivory-2"><div class="wrap">
  <div class="center"><div class="eyebrow">Testimonials</div><h2 class="section-title split">Loved by <em>Snows families</em></h2></div>
  <div class="cube-stage"><div class="cube">${testimonials.map(([q, c]) => `<div class="cube__face"><p>${q}</p><cite>— ${c}</cite></div>`).join('')}</div></div>
  <div class="cube-nav">${testimonials.map((_, i) => `<button aria-label="Show testimonial ${i + 1}"></button>`).join('')}</div>
</div></section>

<section class="section dark" style="background:linear-gradient(160deg,#0d1f4a,#040a1c)"><div class="wrap campaign">
  <div class="progress-ring reveal"><svg viewBox="0 0 200 200"><defs><linearGradient id="goldGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff1c7"/><stop offset=".5" stop-color="#f2c14e"/><stop offset="1" stop-color="#e0a526"/></linearGradient></defs><circle class="track" cx="100" cy="100" r="88"/><circle class="bar" cx="100" cy="100" r="88" data-pct="${(14.6 / 19).toFixed(3)}"/></svg>
    <div class="progress-ring__label"><b>$<span data-count="14.6" data-dec="1">14.6</span>M</b><span>pledged of <em>$19M</em> goal</span></div></div>
  <div>
    <div class="eyebrow">Welcome Home Project</div>
    <h2 class="section-title split">Building the new <em>Snows Family Center</em></h2>
    <p class="lead reveal">A new Parish Center to welcome, serve, build, form and continue our mission as Catholics — a gathering space, dedicated classrooms, a safe pick-up loop and more.</p>
    <p class="reveal" style="color:#b9c4e4;font-style:italic;font-family:var(--display);font-size:19px">“Be steadfast, immovable, always abounding in the work of the Lord.” — 1 Corinthians 15:58</p>
    <div class="hero__ctas reveal" style="margin-top:26px"><a class="btn" href="${EXT.weshare}" target="_blank" rel="noopener">Give to Welcome Home ${arrow}</a><a class="btn btn--ghost" href="~/welcome-home-project/index.html">Learn about the project</a></div>
  </div>
</div></section>

<section class="section"><div class="wrap"><div class="cta reveal"><canvas class="snow" data-density="60"></canvas>
  <div class="eyebrow eyebrow--light">Admissions 2026 – 2027</div>
  <h2>Your family’s place is waiting at Snows.</h2>
  <p>Registration for Kindergarten through 8th grade opened October 1, 2025. Schedule a personalized tour of our campus and discover all that Our Lady of the Snows School has to offer your student.</p>
  <div class="cta__row"><a class="btn" href="${EXT.apply}" target="_blank" rel="noopener">Apply Online ${arrow}</a><a class="btn btn--ghost" href="~/admissions/tuition-fees/index.html">Tuition &amp; Fees</a><a class="btn btn--ghost" href="tel:+17753222773">Book a Tour</a></div>
</div></div></section>
</main>` + footer() + close('<script type="module" src="~/assets/js/hero3d.js"></script>');
}

/* ---------------- 404 ---------------- */
const notFound = () => head({ title: 'Page not found — Our Lady of the Snows', desc: 'Page not found', depth: 0 }) + topbar() + header('') + `
<main id="main"><section class="phero" style="min-height:70vh;align-items:center"><canvas class="snow" data-density="120"></canvas><img class="phero__crest" src="~/assets/img/ols-logo-1.png" alt="">
<div class="wrap"><div class="eyebrow eyebrow--light">404</div><h1>This page has drifted away like snow.</h1><p class="lead">Let’s get you back home.</p><div class="cta__row" style="display:flex;gap:14px;margin-top:26px;flex-wrap:wrap"><a class="btn" href="~/index.html">Go home ${arrow}</a><button class="btn btn--ghost" data-search>Search the site</button></div></div></section></main>` + footer() + close();

/* ---------------- Write files ---------------- */
const write = (slug, html) => {
  const depth = slug ? slug.split('/').length : 0;
  const prefix = '../'.repeat(depth) || './';
  const out = slug ? path.join(ROOT, slug, 'index.html') : path.join(ROOT, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html.replaceAll('~/', prefix));
};

write('', homePage());
for (const p of PAGES) write(p.slug, innerPage(p));
fs.writeFileSync(path.join(ROOT, '404.html'), notFound().replaceAll('~/', '/snows-redesign/').replace('data-root="./"', 'data-root="/snows-redesign/"'));

// search index
const featured = ['admissions', 'admissions/tuition-fees', 'calendar-of-events', 'about/contact', 'our-faith/mass-schedule', 'for-parents/lunch-program'];
const index = [{ t: 'Home', s: 'Our Lady of the Snows Parochial School', u: 'index.html', k: 'home', f: 0 },
  ...PAGES.map(p => ({ t: p.title, s: (NAV.find(g => g.t === p.nav) || { t: p.post ? 'News' : 'Snows' }).t + ' · ' + strip(p.lead || p.body).slice(0, 80) + '…', u: p.slug + '/index.html', k: strip(p.body).slice(0, 600), f: featured.includes(p.slug) ? 1 : 0 }))];
fs.writeFileSync(path.join(ROOT, 'assets/js/search-index.js'), 'window.SNOWS_INDEX=' + JSON.stringify(index) + ';\n');
console.log(`Built ${PAGES.length + 2} pages`);
