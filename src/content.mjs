// Page content for every page, taken from snowsnv.org (text, images, links)
// `~/` is replaced with the relative path to the site root at build time.

const esc = s => s.replace(/&(?!\w+;|#\d+;)/g, '&amp;');
export const L = (slug, text) => `<a href="~/${slug ? slug + '/' : ''}index.html">${text}</a>`;
export const X = (url, text) => `<a href="${esc(url)}" target="_blank" rel="noopener">${text}</a>`;
export const I = name => `~/assets/img/${name}`;

const icon = {
  ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  page: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg>',
};
export const ICONS = {
  cross: '<svg viewBox="0 0 24 24"><path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6z"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
  torch: '<svg viewBox="0 0 24 24"><path d="M9 10h6l-2 12h-2zM12 2c2 2 3 3.5 3 5a3 3 0 0 1-6 0c0-1.5 1-3 3-5z"/></svg>',
  dove: '<svg viewBox="0 0 24 24"><path d="M12 12.5S7.5 9.8 7.5 6.8A2.3 2.3 0 0 1 12 5.6a2.3 2.3 0 0 1 4.5 1.2c0 3-4.5 5.7-4.5 5.7z"/><path d="M2.5 15.5l4 4h9l6-5.5-2-1.2-4.5 3.2H11m-8.5-.5l3.5-3h5.5a1.5 1.5 0 0 1 0 3H11"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  mail: icon.mail,
  pin: '<svg viewBox="0 0 24 24"><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M16 4a3.5 3.5 0 0 1 0 7M22 20c0-3-2-5-5-5.7"/></svg>',
  ball: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
  music: '<svg viewBox="0 0 24 24"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
  chip: '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  cal: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  gift: '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 12h18M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.5-3.5S15 8 12 8z"/></svg>',
};

export const docs = items => `<ul class="doclinks">${items.map(([text, url, note]) => {
  const isPdf = /\.pdf($|\?)/i.test(url), isMail = url.startsWith('mailto:'), isInt = url.startsWith('~/'), isVid = /youtube/.test(url);
  const ic = isPdf ? '<span class="ic pdf">PDF</span>' : `<span class="ic">${isMail ? icon.mail : isVid ? icon.play : isInt ? icon.page : icon.ext}</span>`;
  const attrs = isInt || isMail ? '' : ' target="_blank" rel="noopener"';
  return `<li><a href="${esc(url)}"${attrs}>${ic}<span>${text}${note ? `<small>${note}</small>` : ''}</span></a></li>`;
}).join('')}</ul>`;
export const ticks = (items, cls = '') => `<ul class="ticks ${cls}">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
export const faq = items => `<div class="faq">${items.map(([q, a], i) => `<details${i ? '' : ' open'} class="reveal" style="--d:${i * 0.05}s"><summary>${q}</summary><div class="faq__a"><p>${a}</p></div></details>`).join('')}</div>`;
export const cards = (items, cls = '') => `<div class="cards">${items.map(([ic, h, p], i) => `<div class="icard tilt reveal ${cls}" data-tilt="8" style="--d:${i * 0.07}s">${ic ? `<div class="k">${ICONS[ic]}</div>` : ''}<h3>${h}</h3><p>${p}</p></div>`).join('')}</div>`;
const fig = (img, alt, cls = '') => `<figure class="figure reveal ${cls}"><img src="${I(img)}" alt="${alt}" loading="lazy"></figure>`;
const PHONE = '<a href="tel:+17753222773">(775) 322-2773</a>';
const EMAIL = '<a href="mailto:info@snowsnv.org">info@snowsnv.org</a>';

const SERVICE_LIST = ['Food drives', 'Project Easter Basket (Catholic Charities)', 'Toiletries drive (St. Vincents)', 'Letters and blanket for children at the Kids Kottage', 'Blankets and letters for Children’s Cancer Foundation', 'Letters and gifts to the Veterans Hospital', 'Lunches for St. Vincents', 'Coat drives'];

/* ---------------- Calendar 2026–2027 ---------------- */
export const EVENTS = [
  ['2026-10-16', 'Parent Conferences'], ['2026-10-23', 'Parent Conferences'], ['2026-10-23', 'End of Q1'], ['2026-10-27', 'Make-up Pictures'],
  ['2026-10-30', 'Parent Conferences'], ['2026-10-30', 'Nevada Day - No School'], ['2026-11-11', 'Veterans Day - No School'], ['2026-11-23', 'Thanksgiving Break'],
  ['2026-12-01', 'Deck the Halls'], ['2026-12-03', '8th Grade Interviews'], ['2026-12-21', 'Christmas Break'], ['2027-01-01', 'New Year’s Day - No School'],
  ['2027-01-15', 'End of Q2'], ['2027-01-18', 'MLK Jr. Day - No School'], ['2027-01-19', 'MAP Testing'], ['2027-01-24', 'Catholic Schools Week'],
  ['2027-02-15', 'Presidents’ Day - No School'], ['2027-03-19', 'End of Q3'], ['2027-03-25', 'Triduum Retreat'], ['2027-03-26', 'Good Friday - No School'],
  ['2027-03-28', 'Easter Sunday'], ['2027-03-29', 'Spring Break'], ['2027-04-20', 'Kinder/8th Grade Pictures'], ['2027-05-05', 'Mother’s Day Mass'],
  ['2027-05-10', 'MAP Testing'], ['2027-05-27', '8th Grade Celebration'], ['2027-05-31', 'Memorial Day - No School'], ['2027-06-01', '8th Grade Graduation'],
  ['2027-06-02', 'Kinder Graduation'], ['2027-06-03', 'Last Day of School'],
];
const tagFor = t => /No School|Break/.test(t) ? ['No School', 'off'] : /Mass|Easter|Retreat|Catholic/.test(t) ? ['Faith', ''] : /Graduation|Celebration/.test(t) ? ['Celebration', ''] : /Q\d|MAP/.test(t) ? ['Academics', 'off'] : ['School Event', ''];
export const eventsHTML = (limit, light) => {
  let lastMonth = '';
  const rows = EVENTS.map(([d, t]) => {
    const dt = new Date(d + 'T00:00:00');
    const mon = dt.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const full = dt.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const wk = dt.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const [tag, cls] = tagFor(t);
    const head = !limit && full !== lastMonth ? `<div class="month-label">${full}</div>` : '';
    lastMonth = full;
    return `${head}<div class="event" data-date="${d}"><div class="event__date"><b>${dt.getDate()}</b><span>${mon}</span></div><div><h3>${t}</h3><small>${wk}</small></div><span class="event__tag ${cls}">${tag}</span></div>`;
  }).join('');
  return `<div class="events ${light ? 'events--light' : ''}" data-events data-limit="${limit || 99}">${rows}</div>`;
};

/* ---------------- News posts ---------------- */
export const NEWS = [
  { slug: '2026/03/27/9th-12th-grade-upcoming-events', title: '9th – 12th Grade Upcoming Events', date: 'March 27, 2026', img: 'Sensology.jpg', excerpt: 'Important upcoming events and information for families of students heading into 9th – 12th grade.' },
  { slug: '2026/02/25/the-traveling-mary-is-a-great-tradition-we-have-at-school', title: 'The Traveling Mary is a great tradition we have at School.', date: 'February 25, 2026', img: 'The-Traveling-Mary-is-a-great-tradition-we-have-at-School.jpg', excerpt: 'It brings the Faith based aspect of our school into your home…' },
  { slug: '2026/02/25/service-hour-opportunity-next-thursday-march-5', title: 'Service Hour Opportunity – Next Thursday, March 5', date: 'February 25, 2026', img: 'Service-Hour-Opportunity-Next-Thursday-March-5.jpg', excerpt: 'Still looking for a way to earn service hours? On Thursday, March 5…' },
  { slug: '2026/02/24/hats-off-to-reading', title: 'Hats Off to Reading', date: 'February 24, 2026', img: 'unnamed-1.png', excerpt: 'Read Across America week starts March 9th here at OLS!…' },
];
export const newsCards = () => `<div class="news-grid">${NEWS.map((n, i) => `<a class="ncard tilt reveal" data-tilt="7" style="--d:${i * 0.08}s" href="~/${n.slug}/index.html"><div class="ncard__img"><img src="${I(n.img)}" alt="" loading="lazy"></div><div class="ncard__body"><time>${n.date}</time><h3>${n.title}</h3><p>${n.excerpt}</p><span class="more">Read More →</span></div></a>`).join('')}</div>`;

/* ---------------- Staff ---------------- */
const STAFF = [
  ['Fr-Bob-Chorey.jpg', 'Fr. Bob Chorey', 'Pastor', '775-323-6894 x 510', 'admin'],
  ['Tim-Fuetsch.jpg', 'Tim Fuetsch', 'Principal', '775-322-2773 x551', 'admin'],
  ['Jessie-Cartinella.jpg', 'Jessie Cartinella', 'Assistant Principal', '', 'admin'],
  ['Heather-Parks.jpg', 'Heather Parks', 'Secretary', '', 'admin'],
  ['David-Shore.jpg', 'David Shore', 'Information Technology', '775-322-2773 x555', 'admin'],
  ['Lorinda-Maez.jpg', 'Lorinda Maez', 'Bookkeeper', '775-322-2773 x552', 'admin'],
  ['Kelsey-Melarkey.jpg', 'Kelsey Melarkey', 'Kindergarten Teacher', '', 'teach'],
  ['Storm-Buxton.jpg', 'Storm Buxton', 'Kindergarten Teacher', '', 'teach'],
  ['Leslie-Crouser.jpg', 'Leslie Crouser', '1-2 Image Class Teacher', '', 'teach'],
  ['Kathy-Hogan.jpg', 'Kathy Hogan', '1-2 Image Class Teacher', '', 'teach'],
  ['Jessica-Simpson.jpg', 'Jessica Simpson', '1-2 Image Class Teacher', '', 'teach'],
  ['Jayme-Drescher.jpg', 'Jayme Drescher', '3rd Grade Teacher', '', 'teach'],
  ['Olivia-Dolan.jpg', 'Olivia Dolan', '3rd Grade Teacher', '', 'teach'],
  ['Christina-Ferguson.jpg', 'Christina Ferguson', '4th Grade Teacher', '', 'teach'],
  ['Kellie-Meissner.jpg', 'Kellie Meissner', '4th Grade Teacher', '', 'teach'],
  ['Theresa-Crowley.jpg', 'Theresa Crowley', '5-6 Image Class Teacher', '', 'teach'],
  ['Jim-Rippingham.jpg', 'Jim Rippingham', '5th Grade Teacher', '', 'teach'],
  ['Deirdre-Romero.jpg', 'Dierdre Romero', '6th Grade Teacher', '', 'teach'],
  ['Tamera-Buzick.jpg', 'Tamera Buzick', '7th/8th Jr. High Math', '', 'teach'],
  ['FBardet.jpg', 'Faith Bardet', '7th/8th HR/Religion/History/Chess', '', 'teach'],
  ['Tierney-Bunnell.jpg', 'Tierney Bunnell', '7th/8th HR/English/Religion/PE', '', 'teach'],
  ['Quinn-Wilcher.jpg', 'Quinn Wilcher', '7th/8th HR/Science/Religion/Counselor', '', 'teach'],
  ['Katherine-Cafazza.jpg', 'Katherine Cafazza', '7th/8th Jr. High Math', '', 'teach'],
  ['Scolari_Amy-scaled-e1770153735454.jpg', 'Amy Scolari', 'K-6 PE', '', 'spec'],
  ['Michelle-Hurley.jpg', 'Michelle Hurley', 'Reading/Speech Intervention Specialist', '', 'spec'],
  ['Zach-Miletich.jpg', 'Zachariah Miletich', 'Technology Teacher', '', 'spec'],
  ['', 'Paula Carter', 'K - 6 Art', '', 'spec'],
  ['', 'Karah English', 'K - 4 Spanish', '', 'spec'],
  ['', 'Alison Hatjakes', '5-8 Spanish', '', 'spec'],
  ['Megan-Azzi.jpg', 'Megan Azzi', 'Librarian', '', 'spec'],
  ['Priscilla-Nguyen.jpg', 'Priscilla Nguyen', 'K -6 Music', '', 'spec'],
  ['', 'Paula Pezanoski', 'Religion (Drescher)', '', 'spec'],
  ['Courtney-Guillen.jpg', 'Courtney Guillen', 'K Aide (Buxton)', '', 'aide'],
  ['Julia-Johnson.jpg', 'Julia Johnson', 'K Aide (Melarkey)', '', 'aide'],
  ['Carolyn-Ferraro.jpg', 'Carolyn Ferraro', '1/2 Aide (Hogan)', '', 'aide'],
  ['', 'Bridget McMullen', '1/2 Aide (Crouser)', '', 'aide'],
  ['Ashley-Koski.jpg', 'Ashley Koski', '1/2 Aide (Simpson)', '', 'aide'],
  ['', 'Katie Hummel', 'MS Aide', '', 'aide'],
  ['SShevelson.jpg', 'Sharon Shevelson', 'Aide (Rippingham)', '', 'aide'],
  ['Daniel-LaFountain.jpg', 'Dan LaFountain', 'Aide (Rippingham)', '', 'aide'],
  ['Jamie-Thompson.jpg', 'Jamie Thompson', 'Maintenance', '', 'ops'],
  ['Norm-Thompson.jpg', 'Norman Thompson', 'Maintenance', '', 'ops'],
  ['Andy-Kachurak.jpg', 'Andy Kachurak', 'Safety Coordinator', '', 'ops'],
  ['', 'Gloria Rios', 'Night Custodian', '', 'ops'],
  ['', 'Daniel Gamboa', 'Night Custodian', '', 'ops'],
];
const staffHTML = () => STAFF.map(([img, n, r, ph, g], i) => {
  const ini = n.replace(/^Fr\.\s*/, '').split(' ').map(w => w[0]).join('').slice(0, 2);
  const pic = img ? `<img src="${I(img)}" alt="${n}" loading="lazy">` : `<div class="initials">${ini}</div>`;
  const tel = ph ? `<a class="ext" href="tel:+1${ph.replace(/\s*x.*$/, '').replace(/\D/g, '')}">${ph}</a>` : '';
  return `<article class="person tilt reveal" data-tilt="9" data-group="${g}" style="--d:${(i % 5) * 0.05}s"><div class="person__img">${pic}</div><div class="person__body"><h3>${n}</h3><p>${r}</p>${tel}</div></article>`;
}).join('');

/* ---------------- Pages ---------------- */
export const PAGES = [
  /* ===== FAITH ===== */
  { slug: 'our-faith', title: 'Catholic Identity', nav: 'Faith', img: 'Friday-feb-26-114.jpg', eyebrow: 'Our Faith',
    lead: 'The most essential difference between Catholic schools and public schools is the religious education and spiritual experiences provided.',
    body: `
<p>Our school Charism, Mission Statement and School wide Learning Expectations strongly reflect our identity as a Catholic school. Each morning we begin our day with prayer at our morning assembly. While many of our students come from different faiths, we celebrate Mass together each Wednesday. The presence of sacred images are found in the classrooms and throughout our school.</p>
${cards([['cross', 'Weekly Wednesday Mass', 'Our entire student body attends Mass celebrations each week. Individual classes are selected to prepare and proclaim scripture readings and prayer intentions for our weekly school Mass. Several students regularly serve as altar servers and musicians. Students actively provide for those in need through their offering collections, service and through prayer.'],
  ['dove', 'Morning Prayer', 'Each school day begins gathered as community; students, teachers, and parents. The prayers chosen for morning assembly reflect the liturgical season, model various forms of prayer and include petitions from students, teachers, and parents. Morning assembly also includes mini-lessons from the lives of various saints and opportunities to recognize the ways in which we serve each other, through our snowflake awards.'],
  ['star', 'Seasons of Our Catholic Faith', 'Throughout the school year, our students prepare for and celebrate the seasons of Advent, Christmas, Lent and Easter, as well as other important feast and saint days. During the Lenten season, students prepare Stations of the Cross for the entire school community, and participate in a Triduum retreat on Holy Thursday.']])}
<div class="callout reveal"><p><strong>Honoring our patroness.</strong> We celebrate the feast of Our Lady of the Snows and reflect on her story during our Catholic Schools Week celebration each year. We also honor our Blessed Mother with a special May Crowning Mass every spring.</p></div>
${fig('Friday-feb-26-114.jpg', 'Student artwork reading Love the Lord with all your heart')}` },

  { slug: 'our-faith/faith-in-action', title: 'Faith in Action', nav: 'Faith', img: 'Sister-Carmen-8.jpg', eyebrow: 'Our Faith',
    lead: 'Our students put their faith into action through a variety of service projects designed to give them experiential opportunities to learn about Catholic social justice teachings.',
    body: `
<p>Service projects expose students to opportunities to serve both locally and globally. These projects are developmentally appropriate for the different ages of students participating and give our students a deeper and broader understanding of what service truly means as they progress through their years here at Snows.</p>
<p>Students at Our Lady of the Snows work to improve the lives of others by participating in a variety of service projects. Part of our SLEs and mission as a Catholic school is to take responsibility for the needs of others, locally and globally. Events that our children participate in include:</p>
${ticks(SERVICE_LIST, 'cols-2')}
<div class="callout callout--blue reveal"><p><strong>Catholic Social Teachings: 6th Grade.</strong> Our sixth graders study the themes of Catholic Social Teaching and connect them to the service the whole school carries out each year.</p></div>
<div class="img-row reveal"><img src="${I('Sister-Carmen-8.jpg')}" alt="Students with a food drive collection" loading="lazy"><img src="${I('IMG_2279.jpg')}" alt="Students delivering donations" loading="lazy"></div>` },

  { slug: 'our-faith/mass-schedule', title: 'Mass Schedule', nav: 'Faith', img: 'Snowsnv.jpg', eyebrow: 'Our Faith',
    lead: 'Parents are always warmly invited to participate in our school masses, held weekly on Wednesdays at 8:45am both in person and remotely.',
    body: `
<div class="cards">
  <div class="icard icard--dark tilt reveal" data-tilt="8"><div class="k">${ICONS.clock}</div><h3>School Mass</h3><p>Every <strong style="color:#f2c14e">Wednesday at 8:45am</strong> — in person at Our Lady of the Snows Parish and streamed live for families who can’t attend.</p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.08s"><div class="k">${ICONS.cross}</div><h3>Parish Mass Times</h3><p>The link below will direct you to the current Our Lady of the Snows Parish mass schedule.</p></div>
</div>
${docs([['Mass Times for OLS Parish', 'https://olsparish.com/mass-confession-times', 'olsparish.com'], ['OLS School Mass YouTube Link', 'https://www.youtube.com/channel/UC7MjBBwPR9Ko5aP21BaYgBg', 'Watch the live stream']])}` },

  { slug: 'our-faith/sacraments', title: 'Sacraments', nav: 'Faith', img: 'IMG_36931.jpg', eyebrow: 'Our Faith',
    lead: 'Students preparing for the sacraments are accompanied by their families, their teachers and our parish.',
    body: `
<p>The parents of students desiring sacraments attend a parent meeting beforehand and work with their child using the assigned text. After completing the text, students preparing for sacraments attend retreats for Reconciliation and First Communion. These retreats include Bible stories, crafts, review, and practice for each sacrament.</p>
<ol class="steps reveal">
  <li>Parents attend a sacramental preparation meeting.</li>
  <li>Families work through the assigned text together at home.</li>
  <li>Students attend retreats for Reconciliation and First Communion.</li>
  <li>Celebrate the sacrament with the Our Lady of the Snows community.</li>
</ol>
<p>Older children needing baptism participate in the Rite of Christian Initiation of Children, as required by the diocese. Children are invited to the Sacramental Preparation list based on the information parents gave when they registered for the school. In addition, each class studies and prepares for the Sacrament of Reconciliation during the Advent and Lenten season.</p>` },

  /* ===== ACADEMICS ===== */
  { slug: 'academics', title: 'Academics', nav: 'Academics', img: '100_1531.jpg', eyebrow: 'Academics',
    lead: 'The academic focus of Our Lady of the Snows school is to inspire students to love learning.',
    body: `
<p>This goal is achieved by engaging our students in challenging coursework that ignites their curiosity and develops competency in both arts and sciences. Snows students demonstrate strong critical thinking and communication skills and are consistently encouraged to meet their highest potential.</p>
${fig('100_1531.jpg', 'Students reading together in the library')}
<h2 class="reveal">Explore our program</h2>
${cards([['shield', 'Accreditation', `Fully accredited by the Western Catholic Educational Association. ${L('academics/accreditation', 'Learn more →')}`],
  ['star', 'Learning Expectations', `Faith, Knowledge, Leadership and Service shape every classroom. ${L('academics/schoolwide-learning-expectations', 'See our SLEs →')}`],
  ['book', 'Curriculum', `Standards from the Archdiocese of Cincinnati and the State of Nevada. ${L('academics/curriculum', 'View curriculum →')}`],
  ['chip', 'Technology', `A multi-disciplinary, hands-on, minds-on learning lab. ${L('academics/curriculum/technology', 'Explore →')}`],
  ['music', 'Music & Enrichment', `Weekly music for K–8 and daily enrichment in Junior High. ${L('academics/curriculum/music-enrichment', 'Discover →')}`],
  ['cal', 'Measuring Learning', `MAP Growth assessments and resources for parents. ${L('academics/how-we-measure-learning', 'Read more →')}`]])}` },

  { slug: 'academics/accreditation', title: 'Accreditation', nav: 'Academics', img: 'Friday-feb-26-114.jpg', eyebrow: 'Academics',
    lead: 'Our Lady of the Snows Catholic School is accredited by the Western Catholic Educational Association.',
    body: `
<p>This accrediting body ensures that Catholic schools meet rigorous requirements in terms of both academic programs and Catholic identity. The requirements of the WCEA guide Our Lady of the Snows Catholic School to assess and strive for continual student improvement. The accrediting guidelines also ensure that academic curriculum incorporates the values taught in the Roman Catholic Church.</p>
<figure class="figure figure--contain reveal" style="max-width:320px"><img src="${I('WCEA2013Logo-01.jpg')}" alt="Western Catholic Educational Association logo" loading="lazy"></figure>
<p>Our Lady of the Snows underwent our 6-year accreditation visit in September of 2021 and actively worked with all members of our school community to create a self-study that guides our school action plan for the following 6 years. The input of all shareholders in our learning community is vital to this process. We are very appreciative of the time and thoughtful input of students, staff, parish members and parent partners in our community discussions, surveys and self-study meetings.</p>
<p>Survey results and our Self Study draft are linked below. We welcome any feedback you have. If you have any questions about this process or would like to be included in on-going discussions or meet with our visiting team, please contact our Principal.</p>
${docs([['Accreditation Self Study 2021 draft', 'https://snowsnv.org/academics/accreditation/ols-self-study/'], ['Accreditation Team Findings 2021', 'https://snowsnv.org/wp-content/uploads/2023/10/Report-of-Findings-Our-Lady-of-the-Snows-FINAL.pdf']])}` },

  { slug: 'academics/schoolwide-learning-expectations', title: 'Schoolwide Learning Expectations', nav: 'Academics', img: 'FOR-PARENTS.jpg', eyebrow: 'Academics',
    lead: 'Four promises every Snows student grows into: Faith, Knowledge, Leadership and Service.',
    body: `
<div class="cards">
  <div class="icard icard--dark tilt reveal" data-tilt="8"><div class="k">${ICONS.cross}</div><h3>Faith</h3><p style="color:#f2c14e;font-weight:600;margin-bottom:10px">I choose to have a personal relationship with God.</p><p>• I know the prayers, Traditions, and teachings of the Catholic church<br>• I make choices that reflect the Gospel message<br>• I honor Mary as our Blessed Mother</p></div>
  <div class="icard icard--dark tilt reveal" data-tilt="8" style="--d:.08s"><div class="k">${ICONS.book}</div><h3>Knowledge</h3><p style="color:#f2c14e;font-weight:600;margin-bottom:10px">I choose to always grow and learn.</p><p>• I demonstrate competence in arts and sciences<br>• I demonstrate critical thinking and problem solving skills<br>• I demonstrate the ability to listen, speak, and write clearly</p></div>
  <div class="icard icard--dark tilt reveal" data-tilt="8" style="--d:.16s"><div class="k">${ICONS.torch}</div><h3>Leadership</h3><p style="color:#f2c14e;font-weight:600;margin-bottom:10px">I choose to be a positive influence in our community.</p><p>• I model virtuous behavior<br>• I take personal responsibility<br>• I inspire others to be their best</p></div>
  <div class="icard icard--dark tilt reveal" data-tilt="8" style="--d:.24s"><div class="k">${ICONS.dove}</div><h3>Service</h3><p style="color:#f2c14e;font-weight:600;margin-bottom:10px">I choose to put our faith into action.</p><p>• I use time and talent for the good of others<br>• I take responsibility for the needs of others, locally and globally<br>• I pray</p></div>
</div>` },

  { slug: 'academics/curriculum', title: 'Curriculum', nav: 'Academics', img: '100_1531.jpg', eyebrow: 'Academics',
    lead: 'Standards for excellence — guided by our diocese, our Catholic faith and the State of Nevada.',
    body: `
<h2 class="reveal">Standards for Excellence</h2>
<p>Our Lady of the Snows School received the highest level of achievement with a full 3– and 6-year accreditation from the Western Catholic Educational Association and the Western Association of Schools &amp; Colleges — joining only a handful of public and private schools to achieve such standards. In addition, the curriculum at Snows meets or exceeds all State regulations and guidelines. At Snows, we undergo regular accreditation certification to ensure continual improvement in an already excellent Catholic Educational environment. Our curriculum is guided by the standards encompassed in these sources:</p>
<div class="cards">
  <div class="icard tilt reveal" data-tilt="8"><div class="k">${ICONS.cross}</div><h3>Archdiocese of Cincinnati: Teaching for the 21st Century</h3><p>Our Lady of the Snows School follows the guidelines developed by the Archdiocese of Cincinnati and objectives detailed in “Teaching for the 21st Century”. Our students also attend weekly School Masses provided in person and remotely through ${L('our-faith/mass-schedule', 'a live feed')} produced by Our Lady of the Snows Parish.</p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.08s"><div class="k">${ICONS.book}</div><h3>State of Nevada educational standards</h3><p>We incorporate the ${X('https://doe.nv.gov/Nevada_Academic_Content_Standards/', 'State of Nevada’s educational standards')} including Religion, Reading, English, Science, Social Studies, and Math. Students also receive instruction in Art, Music, Physical Education, Computer Literacy, Advanced Mathematics, and Foreign Language - Spanish.</p></div>
</div>
<h2 class="reveal">Curriculum areas</h2>
${docs([['Technology', '~/academics/curriculum/technology/index.html'], ['Religion', '~/academics/curriculum/religion/index.html'], ['Music &amp; Enrichment', '~/academics/curriculum/music-enrichment/index.html']])}` },

  { slug: 'academics/curriculum/technology', title: 'Technology', nav: 'Academics', img: 'STUDENT-LIFE-3.jpg', eyebrow: 'Curriculum',
    lead: 'Technology Center — a multi-disciplinary environment where connections are made between technology, science, math, language arts, and social studies.',
    body: `
<div class="cards">${['Critical Thinking & Problem Solving', 'Project Management', 'Collaboration & Teamwork', 'Communication Skills', 'Creativity and Innovation', 'Research Skills and Information Literacy', 'Self-Direction & Assessment'].map((t, i) => `<div class="icard tilt reveal" data-tilt="10" style="--d:${i * 0.05}s"><div class="k">${ICONS.chip}</div><h4>${esc(t)}</h4></div>`).join('')}</div>
<p>It’s a simple and exciting strategy. Students of all abilities will engage in projects which capture their fascination with technology. These are challenging projects which are flexible, open-ended, and demand each child’s creativity.</p>
<div class="callout reveal"><p><strong>Result:</strong> Enriched learning with hands-on, minds-on curriculum supported by academically relevant exploration which will empower our students to explore topics of personal interest.</p></div>` },

  { slug: 'academics/curriculum/religion', title: 'Religion', nav: 'Academics', img: 'Friday-feb-26-114.jpg', eyebrow: 'Curriculum',
    lead: 'Grades kindergarten through eight follow the Finding God catechism series published by Loyola Press.',
    body: `
<p>This formal religious instruction curriculum meets all of the religious education standards of our Diocese.</p>
<p>Beyond the textbook, students are immersed in a rich, faith filled school environment through our weekly participation in Mass and daily prayer. Each day begins with prayer and students learn a variety of styles of prayer from our Catholic tradition. Additionally, as a community we study the lives of the saints, each day, seeking inspiration and life lessons to help us all make Snows a place of learning, compassion and strong Catholic identity.</p>
<p>As a school community we participate in a number of events throughout the year to foster our understanding of our faith. We celebrate the liturgical seasons and participate in the sacraments on a regular basis. We sponsor retreats for our staff, students and parents throughout the year. We also pay special attention to our patron saint, Our Lady of the Snows, with an annual celebration of her feast day and a May Crowning each spring.</p>
<div class="callout callout--blue reveal"><p>On-going faith formation is a focus of our religion program, not just for our students but also for staff and families. Please be sure to look at our weekly school newsletter for upcoming faith formation opportunities.</p></div>` },

  { slug: 'academics/curriculum/music-enrichment', title: 'Music & Enrichment', nav: 'Academics', img: 'STUDENT-LIFE-2.jpg', eyebrow: 'Curriculum',
    lead: 'Well-rounded students in today’s world must demonstrate competency in both the arts and the sciences.',
    body: `
<p>Through our music and enrichment programs we strive to build this competency and educate the whole child. Music is offered to grades K-8 on a weekly basis. In the Junior High, one period per day is dedicated to enrichment. Students rotate through courses in technology, careers, art and leadership.</p>
${cards([['music', 'Weekly Music', 'Offered to every grade from Kindergarten through 8th grade.'], ['chip', 'Technology', 'Junior High enrichment rotation.'], ['star', 'Careers & Art', 'Exploring talents and future callings.'], ['torch', 'Leadership', 'Growing young leaders who serve.']])}` },

  { slug: 'academics/how-we-measure-learning', title: 'How We Measure Learning', nav: 'Academics', img: '100_1531.jpg', eyebrow: 'Academics',
    lead: 'Student learning is assessed on an on-going basis through formal and informal classroom assessment as well as annual standardized testing.',
    body: `
<p>Results from these measures of learning are shared with parents regularly and are also used to continually improve instruction. Assessment is used at Our Lady of the Snows School to help us ensure that each child is making progress to the very best of his or her ability and reaching their highest potential.</p>
<h2 class="reveal">MAP Guide for Parents</h2>
<p>Measures of Academic Progress® creates a personalized assessment experience by adapting to each student’s learning level — precisely measuring student progress and growth for each student. Depending on how a student answers each question, the test adjusts in difficulty. This allows students with widely varying skill levels — from struggling to advanced — to take a test that is well-suited to their needs. Each test provides detailed teacher reports that show the skills students are proficient in and what they are ready to work on next.</p>
<div class="callout reveal"><p><strong>What is a RIT score?</strong> RIT is a unit of measurement that uses individual item difficulty values to estimate student achievement. Similar to measuring height on a yard-stick, the RIT scale is used to measure how “tall” a student is on the curriculum scale and scores can be compared to tell how much growth a student has made. This score is independent of the age or grade of the student, and reflects the instructional level at which the student is currently performing.</p></div>
<h3>Results</h3>
${docs([['2020 NWEA MAP Norm Tables', 'https://snowsnv.org/wp-content/uploads/2023/10/MAPGrowthNormativeDataOverview.pdf'], ['Parent guide for understanding MAP scores and reports', 'https://snowsnv.org/wp-content/uploads/2023/10/Parent-Guide-to-MAP.pdf']])}
<h3>Sample Test</h3>
${docs([['MAP Warm-Up', 'https://www.youtube.com/watch?v=DTNCtJR_glw'], ['MAP for Primary Grades Warm-Up', "https://warmup.nwea.org/app/k_two/what's_this_test_about.html"]])}
<h3>MAP Parent Strategies &amp; Toolkit</h3>
${docs([['NWEA Family Toolkit — tips, FAQs and sample questions', 'https://www.nwea.org/family-toolkit/'], ['About MAP Growth', 'https://www.nwea.org/map-growth/']])}
<h3>MAP to Khan Academy &amp; IXL</h3>
${docs([['KHAN Academy Practice Exercises Correlated to RIT', 'https://www.khanacademy.org/math/mappers'], ['IXL Skill Plan for MAP Growth, Math K-2', 'https://snowsnv.org/wp-content/uploads/2023/10/IXL-NWEA-MAP-Growth-K-2.pdf'], ['IXL Skill Plan for MAP Growth, Math 2-5', 'https://snowsnv.org/wp-content/uploads/2023/10/IXL-NWEA-MAP-Growth-2-5.pdf'], ['IXL Skill Plan for MAP Growth, Math 6+', 'https://snowsnv.org/wp-content/uploads/2023/10/IXL-NWEA-MAP-Growth-6-plus.pdf']])}` },

  /* ===== STUDENT LIFE ===== */
  { slug: 'student-life', title: 'Student Life', nav: 'Student Life', img: 'STUDENT-LIFE-1.jpg', eyebrow: 'Student Life',
    lead: 'Students at Our Lady of the Snows school are members of a faith-based community that welcomes all.',
    body: `
<div class="img-row reveal"><img src="${I('STUDENT-LIFE-1.jpg')}" alt="Students on the playground" loading="lazy"><img src="${I('STUDENT-LIFE-2.jpg')}" alt="Student playing volleyball" loading="lazy"><img src="${I('STUDENT-LIFE-3.jpg')}" alt="Students at a school festival" loading="lazy"></div>
<p>In addition to high academic expectations, students at Snows are also expected to share their unique personal gifts to enrich our school community. Whether it is service on the playground, in our parish or in our greater community and world, all students learn to give back and make our world a better place.</p>
<p>Student life also includes the opportunity to participate in athletics through the CYO and in arts through music, drama and visual arts classes. Finally, students have many opportunities to develop their leadership skills, most notably in our Student Council and leadership workshops.</p>
${cards([['ball', 'CYO League Sports', `Volleyball and basketball for grades 5–8. ${L('student-life/cyo-league-sports', 'Learn more →')}`], ['heart', 'Service', `Hands-on projects rooted in Catholic social teaching. ${L('student-life/service', 'See projects →')}`], ['users', 'Student Committees', `8th grade leaders building school spirit. ${L('student-life/student-council', 'Meet them →')}`], ['clock', 'Before & After Care', `Boys &amp; Girls Club @ Snows. ${L('student-life/before-after-school-care', 'Program info →')}`]])}` },

  { slug: 'student-life/before-after-school-care', title: 'Before & After School Care', nav: 'Student Life', img: 'STUDENT-LIFE-3.jpg', eyebrow: 'Student Life',
    lead: 'Boys & Girls Club @ Snows — safe, caring supervision before and after the school day.',
    body: `
<div class="cards">
  <div class="icard icard--dark tilt reveal" data-tilt="8"><div class="k">${ICONS.clock}</div><h3>Before School Care</h3><p>Monday – Friday<br><strong style="color:#f2c14e;font-size:20px">7:00am – 8:30am</strong><br>Please do not drop off before this time.</p></div>
  <div class="icard icard--dark tilt reveal" data-tilt="8" style="--d:.08s"><div class="k">${ICONS.clock}</div><h3>After School Care</h3><p>Monday – Friday<br><strong style="color:#f2c14e;font-size:20px">2:50pm – 5:45pm</strong><br>12:15pm on early release days.</p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.16s"><div class="k">${ICONS.phone}</div><h3>Site Coordinator</h3><p>Email: <a href="mailto:snows@bgctm.org">snows@bgctm.org</a><br>Phone: <a href="tel:+17753248179">775-324-8179</a><br><small>(only available during program hours)</small></p></div>
</div>
<div class="callout reveal"><p><strong>Please note:</strong> We are not open for snow days, holidays, or any breaks! However, we do feed into a Boys &amp; Girls Club Clubhouse for most days off/breaks. Please contact the Site Coordinator for more info.</p></div>
<h2 class="reveal">Registration Info</h2>
<ol class="steps reveal">
  <li>Please go online to our website ${X('https://www.bgctm.org/', 'bgctm.org')} &amp; click “Join Now” to get your child registered. Watch the orientation video (30min) and then complete and submit the application. <strong>Registration must be renewed each school year.</strong></li>
  <li>After this, go and check in with the Site Coordinator. A $20 annual membership fee is required each year. Liability waivers will need to be signed at the site in order to get your account set up/approved. (This must be done during Boys &amp; Girls Club programming hours, listed above.) All weekly fees can be paid on-line.</li>
</ol>
<h2 class="reveal">Payment Info</h2>
<div class="table-wrap reveal"><table><thead><tr><th>Item</th><th>Cost</th></tr></thead><tbody><tr><td>Annual Membership Fee</td><td><b>$20</b></td></tr><tr><td>Both Before and After School Program</td><td><b>$40</b> for the week</td></tr></tbody></table></div>
<h2 class="reveal">Financial Aid Info</h2>
<p>Please check in with the coordinator for the financial aid info. We have available funding through Children’s Cabinet and Boys &amp; Girls Club scholarships. If interested, families will need to fill out a financial aid packet, provide a copy of their ID, and provide up to 5 paystubs (depending on frequency of pay) or proof of employment. Once all is submitted, it could take up to a month to be calculated and approved. Please plan accordingly.</p>` },

  { slug: 'student-life/cyo-league-sports', title: 'CYO League Sports', nav: 'Student Life', img: 'STUDENT-LIFE-2.jpg', eyebrow: 'Student Life',
    lead: 'Our Lady of the Snows encourages our students in 5th, 6th, 7th, and 8th grade to play in the Catholic Youth Organization League sports.',
    body: `
<p>These sports include volleyball and basketball for both boys and girls. Sign ups for different sports are announced in our Tuesday packet.</p>
<div class="cards">
  <div class="icard icard--gold tilt reveal" data-tilt="10"><div class="k">${ICONS.ball}</div><h3>CYO Volleyball</h3><p>CYO Volleyball is usually played in the <strong>Fall</strong>.</p></div>
  <div class="icard icard--dark tilt reveal" data-tilt="10" style="--d:.08s"><div class="k">${ICONS.ball}</div><h3>CYO Basketball</h3><p>CYO Basketball is usually played in the <strong style="color:#f2c14e">Winter</strong>.</p></div>
</div>
${fig('STUDENT-LIFE-2.jpg', 'Snows student serving a volleyball')}` },

  { slug: 'student-life/service', title: 'Service', nav: 'Student Life', img: 'Sister-Carmen-8.jpg', eyebrow: 'Student Life',
    lead: 'Service is a foundational piece of our school identity and our religion program at Snows.',
    body: `
<p>Our students participate in a variety of service projects designed to give them hands-on, age appropriate opportunities to learn about Catholic social justice teachings. Our school service projects expose students to opportunities to serve both locally and globally. These projects aim to give students a deeper and broader understanding of what service truly means as they progress through their years here at Snows.</p>
<p>Students at Our Lady of the Snows work to improve the lives of others by participating in a variety of service projects. Part of our SLEs and mission as a Catholic school is to take responsibility for the needs of others, locally and globally. Events that our children participate in include:</p>
${ticks(SERVICE_LIST, 'cols-2')}
${fig('IMG_2279.jpg', 'Students and Sister Carmen with donated goods')}` },

  { slug: 'student-life/student-council', title: 'Student Committees', nav: 'Student Life', img: 'FOR-PARENTS.jpg', eyebrow: 'Student Life',
    lead: 'Groups formed by leaders in the 8th grade class who want to be involved in extra activities at school and bring ideas for school spirit.',
    body: `
<p>The purpose of these groups is to foster strong leadership skills by encouraging student expression and promoting problem-solving and relationship-building. The 8th grade committees meet at various intervals throughout the year at which time school-wide issues will be addressed, decisions will be made, and information will be disseminated to the K-8 classes.</p>
<p>Participants are responsible for spirit and community building activities throughout the year, including:</p>
${ticks(['Family events', 'Catholic Schools Week', 'Assemblies', 'Service projects', 'Middle school dances'], 'cols-2')}` },

  { slug: 'student-life/supply-lists', title: 'Supply Lists', nav: 'Student Life', img: '100_1531.jpg', eyebrow: 'Student Life',
    lead: `Please find student grades, homework, and any information on financial accounts on RenWeb.`,
    body: `
${docs([['RenWeb', 'https://olscs-nv.client.renweb.com/pw/', 'Grades, homework &amp; accounts'], ['School Calendar', 'https://snowsnv.org/wp-content/uploads/2025/06/OLS-School-25-26-updated-5.19.25.pdf']])}
<h2 class="reveal">Supply List</h2>
${docs([['Ms. Crowley’s Supply List', 'https://snowsnv.org/wp-content/uploads/2025/06/Ms.-Crowleys-Supply-List-Google-Docs.pdf'], ['Melarkey Class List', 'https://snowsnv.org/wp-content/uploads/2025/06/Melarkey-class-list.pdf'], ['Buxton Supply List', 'https://snowsnv.org/wp-content/uploads/2025/06/Buxton-Supply-List.pdf'], ['Romero Supply List 2026', 'https://snowsnv.org/wp-content/uploads/2026/06/Mrs.-Romeros-SIXTH-GRADE-SUPPLY-LIST.pdf'], ['MS Supply List', 'https://snowsnv.org/wp-content/uploads/2026/07/MS-Supply-List-26-27.pdf'], ['School supplies 1,2,3,4 (2026)', 'https://snowsnv.org/wp-content/uploads/2026/06/School-supplies1234-2026.pdf'], ['5th Grade School Supplies', 'https://snowsnv.org/wp-content/uploads/2025/06/Rippingham-School-Supplies.pdf']])}` },

  /* ===== PARENTS ===== */
  { slug: 'for-parents', title: 'For Parents', nav: 'Parents', img: 'FOR-PARENTS.jpg', eyebrow: 'For Parents',
    lead: 'Our Lady of the Snows School places great value in partnering with our parents. We consider parents to be your children’s first educators.',
    body: `
<p>We recognize that we are most successful as a school when we integrate the wisdom, enthusiasm and experience of our parents as part of our educational approach. You are a vital part of our school community.</p>
<div class="img-row reveal"><img src="${I('FOR-PARENTS.jpg')}" alt="Snows students cheering" loading="lazy"><img src="${I('STUDENT-LIFE-3.jpg')}" alt="Students at a school event" loading="lazy"></div>
<h2 class="reveal">New Parent Quick Links</h2>
${docs([['School Calendar 2026 – 2027', 'https://snowsnv.org/wp-content/uploads/2026/07/26-27-OLSS-Calendar.pdf'], ['Tuition and Fees', '~/admissions/tuition-fees/index.html'], ['Admission Application', '~/admissions/index.html'], ['School Uniform', '~/for-parents/school-uniform-policy/index.html'], ['Lunch Program', '~/for-parents/lunch-program/index.html'], ['Before and After School Care', '~/student-life/before-after-school-care/index.html'], ['Protecting God’s Children', '~/for-parents/protecting-gods-children/index.html'], ['Parent Student Handbook', '~/for-parents/student-parent-handbook/index.html'], ['Supply Lists', '~/student-life/supply-lists/index.html']])}
<h2 class="reveal">A day at Snows</h2>
<div class="table-wrap reveal"><table><thead><tr><th>Schedule</th><th>Time</th></tr></thead><tbody>
<tr><td>Morning Assembly</td><td><b>8:30 am</b></td></tr>
<tr><td>Regular School Day (Monday – Thursday)</td><td><b>8:30 am – 2:50 pm</b></td></tr>
<tr><td>Friday</td><td><b>8:30 am – 12:15 pm</b></td></tr>
<tr><td>Early Release Days</td><td><b>School ends at 12:15 pm</b></td></tr>
</tbody></table></div>
<p><small>Dates and Events Subject to Change.</small> Please contact us if you have any questions ${PHONE} or ${EMAIL}.</p>` },

  { slug: 'vintage-affair', title: 'Vintage Affair', nav: 'Parents', img: 'VA_logo6_with_OLOTS.jpg', eyebrow: 'Annual Gala',
    lead: 'Vintage Affair is our school’s premier fundraiser with the funds raised going towards continued improvement and innovation.',
    body: `
<p>Our annual gala brings together members of our school and parish community for a night of lively entertainment in support of our continued mission to guide and nurture our students to become young leaders who love God, love learning and love thy neighbor.</p>
<figure class="figure figure--contain reveal"><img src="${I('VA_logo6_with_OLOTS.jpg')}" alt="Vintage Affair logo" loading="lazy"></figure>
<div class="cards">
  <div class="icard icard--dark tilt reveal" data-tilt="8"><div class="k">${ICONS.cal}</div><h3>Saturday, February 7, 2026</h3><p>Reno Ballroom<br>400 N. Center Street</p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.08s"><div class="k">${ICONS.gift}</div><h3>Donate or Volunteer</h3><p>To donate to the silent auction or to volunteer, please email <a href="mailto:VA@SNOWSNV.ORG">VA@SNOWSNV.ORG</a></p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.16s"><div class="k">${ICONS.star}</div><h3>Event Information</h3><p>Follow us on Instagram ${X('https://www.instagram.com/vintageaffair26/', '@VintageAffair2026')}</p></div>
</div>
<div class="callout reveal"><p><strong>Tickets, corporate sponsorship &amp; silent auction donations:</strong> please email <a href="mailto:VA@SNOWSNV.ORG">VA@SNOWSNV.ORG</a> and our gala team will help you.</p></div>
${docs([['Vintage Affair on Instagram', 'https://www.instagram.com/vintageaffair26/', '@vintageaffair26'], ['Email the Vintage Affair team', 'mailto:VA@SNOWSNV.ORG']])}` },

  { slug: 'for-parents/protecting-gods-children', title: 'Protecting God’s Children', nav: 'Parents', img: 'IMG_36931.jpg', eyebrow: 'For Parents',
    lead: 'All adult volunteers at Our Lady of the Snows School must participate in the Protecting God’s Children program and complete a Background Check before they may work with children.',
    body: `
<div class="callout callout--blue reveal"><p><strong>Keeping every child safe.</strong> Completing these requirements is the first step before helping in classrooms, on field trips or at school events.</p></div>
<p>Additional information regarding Volunteer work and Protecting God’s Children:</p>
${docs([['3 Requirements to Volunteer', 'https://snowsnv.org/wp-content/uploads/2023/10/3-requirements-to-volunteer-.pdf'], ['Protecting God’s Children and Background Check Link', 'https://catholicreno.org/safe-environment']])}` },

  { slug: 'for-parents/school-uniform-policy', title: 'School Uniform Ordering', nav: 'Parents', img: 'FOR-PARENTS.jpg', eyebrow: 'For Parents',
    lead: 'Snows uniforms are available from two official suppliers.',
    body: `
<div class="cards">
  <div class="icard icard--dark tilt reveal" data-tilt="8"><div class="k">${ICONS.star}</div><h3>Lands’ End</h3><p>School Number <strong style="color:#f2c14e">900148032</strong><br><a style="color:#f2c14e" href="tel:+18004692222">800-469-2222</a></p><p style="margin-top:12px">${X('https://www.landsend.com/', '<span style="color:#fff">Shop Lands’ End →</span>')}<br><small style="color:#aab6da">Search “School Uniforms” and enter our school number.</small></p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.08s"><div class="k">${ICONS.pin}</div><h3>Kate’s Logos</h3><p><a href="tel:+17754321222">775-432-1222</a><br>1221 West 2nd Street, Reno, NV</p><p style="margin-top:12px">${X('https://kateslogos.com/collections/our-lady-of-the-snows', 'Shop Kate’s Logos →')}</p></div>
</div>
<p>Uniform details are listed in the ${L('for-parents/student-parent-handbook', 'Student/Parent Handbook')}.</p>` },

  { slug: 'for-parents/lunch-program', title: 'Lunch Program', nav: 'Parents', img: 'STUDENT-LIFE-1.jpg', eyebrow: 'For Parents',
    lead: 'Students at Snows may order hot lunch for $6.50 per lunch through Poi Boy Catering.',
    body: `
<p>They will serve hot lunch “cafeteria” style daily and will offer pizza every Wednesday. Lunches are $6.50 daily. Log in to your account to view the menu.</p>
<div class="callout reveal"><p><strong>Please note:</strong> in consideration of our students with severe allergies, Our Lady of the Snows is a <strong>NUT FREE</strong> school. Please do not send lunches, snacks or treats with nuts to school.</p></div>
<h2 class="reveal">How to order</h2>
<ol class="steps reveal">
  <li>Ordering is done completely online. They offer a “hot” option or a “cold” option daily. Please go to ${X('https://www.poiboycatering.com/order/', 'www.poiboycatering.com')}.</li>
  <li>You will see a tab for “school lunches”. Select that tab and it will lead you to the process of creating an account for your student(s). Just follow the directions to create an account and you can order from there.</li>
  <li>The menu for each month will be on the web site. Once you have an account, you can browse through the choices for the month and click on which day/choice you would like to purchase for your student(s). You can order daily/weekly/monthly whichever works best for you.</li>
  <li>Once you have ordered, you will be directed to a secure check out page. You will pay on that page, receive a receipt and a list of the day(s) you ordered will be available to see.</li>
</ol>
<p>They do not store your credit card information on the site; you will need to enter your information each time you order. They do not offer credit for missed meals; however they will work with families if they have special circumstances when possible.</p>
<p>The web site is open until midnight daily for ordering. If you find you are in need of an emergency meal for the day, please call them before 9AM and they will do their best to make sure your student(s) have a meal. Emergency lunches are $10.00. If you have questions or problems with the web site or getting an account created, please call anytime and they will help you through the process.</p>
<div class="cards"><div class="icard tilt reveal" data-tilt="8"><div class="k">${ICONS.phone}</div><h3>Poi Boy Catering</h3><p>Denise <a href="tel:+17757416351">775-741-6351</a><br>Bobby <a href="tel:+17757412252">775-741-2252</a></p></div><div class="icard icard--gold tilt reveal" data-tilt="8" style="--d:.08s"><div class="k">${ICONS.star}</div><h3>$6.50 / day</h3><p>Pizza every Wednesday. Emergency lunches $10.00.</p></div></div>` },

  { slug: 'for-parents/parent-service-hours', title: 'Parent Service Hours', nav: 'Parents', img: 'Sister-Carmen-8.jpg', eyebrow: 'For Parents',
    lead: 'Families are partners in our community — service hours help make Snows thrive.',
    body: `${docs([['Family Service Hours Information', 'https://snowsnv.org/wp-content/uploads/2026/08/Parent-Service-Hours-2026-2027.pdf'], ['Snows Field Trip Driver Application', 'https://snowsnv.org/wp-content/uploads/2023/10/Snows-2016-Driver-Application-.pdf'], ['Protecting God’s Children and Background Check Link', 'https://catholicreno.org/safe-environment']])}
<p>Looking for a way to serve? Watch the ${L('news-and-updates', 'News &amp; Updates')} page and the Tuesday Packet for current opportunities.</p>` },

  { slug: 'for-parents/mental-health', title: 'Mental Health', nav: 'Parents', img: 'IMG_36931.jpg', eyebrow: 'For Parents',
    lead: 'All Schools in the Diocese of Reno will comply with SB 204, pertaining to Pupil Mental Health, as well as applicable federal, state, and local laws.',
    body: `<p>Mental Health Resources include:</p>
${docs([['Nevada Office of Suicide Prevention', 'http://suicideprevention.nv.gov/Suicide-Prevention/'], ['988 Suicide &amp; Crisis Lifeline', 'https://988lifeline.org/', 'Call or text 988, any time']])}
<div class="callout callout--blue reveal"><p>If your child needs support, please reach out to your child’s teacher or our school office at ${PHONE}. In an emergency, call or text <a href="tel:988">988</a>, the Suicide &amp; Crisis Lifeline.</p></div>` },

  { slug: 'for-parents/student-parent-handbook', title: 'Student/Parent Handbook', nav: 'Parents', img: '100_1531.jpg', eyebrow: 'For Parents',
    lead: 'The Student Parent Handbook is updated every summer with policies and procedures for the following school year.',
    body: `${docs([['Parent Student Handbook 2026 – 2027', 'https://snowsnv.org/wp-content/uploads/2026/07/OLS-Parent.Student-Handbook-2026-2027.pdf']])}
<p>Information on topics such as our school discipline policy, bell schedule, uniform policy, homework policy, absences and tardies can all be found in this handbook. The handbook may also be accessed through ${X('https://olscs-nv.client.renweb.com/pw/', 'RenWeb')}.</p>` },

  /* ===== ADMISSIONS ===== */
  { slug: 'admissions', title: 'Admissions', nav: 'Admissions', img: 'IMG_36931.jpg', eyebrow: 'Admissions',
    lead: 'Registration for the 2026-2027 school year opened October 1, 2025. We would love to welcome your family.',
    body: `
<div class="cards">
  <div class="icard icard--dark tilt reveal" data-tilt="8"><div class="k">${ICONS.star}</div><h3>Kindergarten Registration</h3><p>Registration for Kindergarten for the 2026-2027 school year will open October 1, 2025. You will need to submit the original birth certificate, original baptismal certificate and the most recent immunization records.</p><p style="margin-top:14px">${X('https://olscs-nv.client.renweb.com/oa/inquiry.cfm?memberid=559', '<span style="color:#f2c14e;font-weight:700">Online Application — Click Here →</span>')}</p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.08s"><div class="k">${ICONS.book}</div><h3>Grades 1st – 8th Registration</h3><p>Applications for the 2026-2027 school year will open October 1, 2025. If there are any spots available, parents will be notified sometime in April 2026.</p><p style="margin-top:10px"><em>Unfortunately, we do not have any openings for the current school year.</em></p></div>
</div>
${docs([['Online Application', 'https://olscs-nv.client.renweb.com/oa/?memberid=559', 'Apply through RenWeb'], ['Enrollment Inquiry', 'mailto:bcherry@snowsnv.org', 'Email our admissions team'], ['Tuition &amp; Fees', '~/admissions/tuition-fees/index.html', 'Tuition will increase for the 2026-2027 school year']])}
<h2 class="reveal">Notice of Non-Discrimination / Admissions Policy</h2>
<p>Our Lady of the Snows School does not discriminate against any student, applicant, or employee because of sex, race, color, racial, or ethnic origin. Priority in admission of new students is granted to registered, active, supporting Catholic members of the Our Lady of the Snows Parish. Secondary preference is granted to Catholics who are active, supporting members of Catholic parishes both within and outside the Diocese of Reno. A complete copy of the Admissions Policy is available in the school office to any interested party.</p>
<p>Beginning with the 1999-2000 school year, admission allowances will be made for those families who qualify under the federal guidelines for the Title 1 and/or Free Lunch programs following the above priorities. (The specifics of these guidelines can be obtained from the principal of the school or by writing to the Nevada Department of Education.)</p>` },

  { slug: 'admissions/for-prospective-families', title: 'For Prospective Families', nav: 'Admissions', img: 'Snowsnv.jpg', eyebrow: 'Admissions',
    lead: 'Our Lady of the Snows is proud to be an academically rigorous private service school with a deep-rooted Catholic Identity.',
    body: `
<p>Through our strong sense of community and inspired by our Catholic Faith, Our Lady of the Snows School guides and nurtures our students to become young leaders who love God, love learning and love their neighbor.</p>
<div class="callout reveal"><p>For any inquiries, please contact our office at <a href="tel:+17753222773">775.322.2773</a>.</p></div>
<h2 class="reveal">Your next steps</h2>
${docs([['Why Choose Us?', '~/admissions/why-choose-us/index.html'], ['Frequently Asked Questions', '~/admissions/frequently-asked-questions/index.html'], ['Admissions Guidelines', '~/admissions/admissions-guidelines/index.html'], ['Tuition &amp; Fees', '~/admissions/tuition-fees/index.html'], ['Tuition Assistance', '~/admissions/tuition-assistance/index.html'], ['Online Application', 'https://olscs-nv.client.renweb.com/oa/?memberid=559']])}` },

  { slug: 'admissions/why-choose-us', title: 'Why Choose Us?', nav: 'Admissions', img: 'FOR-PARENTS.jpg', eyebrow: 'Admissions',
    lead: 'A place of learning, a place of faith, and a place where all are welcome.',
    body: `
<p>Our Lady of the Snows School is proud of our reputation for providing a well rounded, academically challenging education for our students. But, of equal importance, Our Lady of the Snows strives to nurture the whole child; spiritually, physically and intellectually. Our Catholic values guide all aspects of our school life, creating a learning environment that respects the dignity of every individual. We work diligently to live our mission statement, nurturing our students to become young leaders who love God, love learning and love their neighbor. Our Lady of the Snows School is a place of learning, a place of faith, and a place where all are welcome.</p>
${cards([['shield', 'Fully Accredited', 'Accredited by the Western Catholic Educational Association.'], ['users', '75+ Years of Community', 'Serving Reno families since 1951, with 1,834+ graduates.'], ['chip', 'Creative Learning Lab', 'The only Creative Learning Lab in the Diocese.'], ['heart', 'Whole-Child Formation', 'Spiritually, physically and intellectually.']])}
<div class="callout reveal"><p>Prospective families are invited to contact our school office for a personalized tour of our campus and the opportunity to discuss all that Our Lady of the Snows School has to offer to your student. Call ${PHONE} or email ${EMAIL}.</p></div>` },

  { slug: 'admissions/frequently-asked-questions', title: 'Frequently Asked Questions', nav: 'Admissions', img: '100_1531.jpg', eyebrow: 'Admissions',
    lead: 'Answers to the questions families ask us most.',
    body: faq([
      ['Are all teachers licensed and credentialed?', 'Yes. Following the guidelines of the Diocese of Reno, all of our academic teachers are licensed and credentialed.'],
      ['Are extra-curricular activities offered?', 'Snows students can participate in a variety of extra-curricular activities ranging from sports through CYO to scouting groups, chess club, youth ministry and service groups and leadership workshops. Opportunities vary and information on what is currently available may be found by contacting our school office or in our weekly school newsletter.'],
      ['Do I need to be Catholic?', 'The Catholic faith is integrated into all aspects of our school life, however we do have a number of students who are not Catholic. We welcome families of all faith traditions.'],
      ['How can parents be involved?', 'Our Lady of the Snows School values parents as the primary educators of their children and partners in our learning community. We hold parent teacher conferences and family nights to create a bridge between home and school and teachers are always available for individual conferences. There are many opportunities to volunteer within the school and classroom, as well as special projects, school events and field trips.'],
      ['How is technology used in the classroom?', 'Our Lady of the Snows School is committed to the integration of technology in the classroom to enhance student learning. Laptop computers, iPads, iPods, interactive whiteboards and other equipment are available in all classrooms and teachers receive on-going training to make the most of these tools. Our school also has the only Creative Learning Lab in the Diocese. This state of the art facility and program provides STEM based learning projects that engage our students in exciting hands-on opportunities to further develop their understanding and application of current and evolving technology.'],
      ['Is financial assistance available?', 'Yes. Financial assistance is available through two different needs-based scholarship options. More information on this may be found on our <a href="~/admissions/tuition-assistance/index.html">Tuition Assistance</a> page.'],
      ['Is Our Lady of the Snows accredited?', 'Yes. Our Lady of the Snows School is fully accredited by the Western Catholic Educational Association.'],
      ['What if my child has special needs?', 'Our Lady of the Snows School is committed to meeting the needs of all learners, including high achieving students and those who may require some accommodations. It is important for parents to get to know our school and determine if they believe it is the best fit for their child. Our staff works diligently to provide instruction and support that will help each student reach their highest potential.'],
      ['What is the typical class size at Our Lady of the Snows School?', 'We strive to keep class sizes low, especially in our primary grade classrooms. The ratio of students to adults in kindergarten is 15:1. Through grade 4 our class sizes are in the low twenties; grades 5 through 8 have class sizes in the mid to low thirty student range.'],
    ]) },

  { slug: 'admissions/testimonials', title: 'Testimonials', nav: 'Admissions', img: 'FOR-PARENTS.jpg', eyebrow: 'Admissions',
    lead: 'In the words of our Snows families.',
    body: `<div class="cards">${[
      ['My husband and I are very happy with Our Lady of the Snows School. Our 2 children love it and are learning a lot. The principal is very involved with the children and the teachers and staff are wonderful! We plan to send our youngest there as well when she is old enough.', 'Parent'],
      ['We are very happy at Our Lady of the Snows. My wife and I were recommended by many families that are presently attending and have graduated. We are grateful to have found OLS.', 'P. Bertone'],
      ['My three children graduated from this school and would recommend it to anyone. The teachers, staff and principal are fantastic.', 'Parent'],
    ].map(([q, c], i) => `<div class="icard tilt reveal" data-tilt="8" style="--d:${i * 0.08}s"><img src="${I('Qoute.png')}" alt="" style="width:46px;margin-bottom:14px"><p style="font-family:var(--display);font-size:20px;font-style:italic;line-height:1.5;color:#0b1530">“${q}”</p><p style="margin-top:14px;font-weight:700;color:#1f4fc4;letter-spacing:.08em;text-transform:uppercase;font-size:13px">— ${c}</p></div>`).join('')}</div>` },

  { slug: 'admissions/admissions-guidelines', title: 'Admissions Guidelines', nav: 'Admissions', img: 'IMG_36931.jpg', eyebrow: 'Admissions',
    lead: 'Our Lady of the Snows School seeks to admit students whose families desire not only a strong academic setting for their child, but also a strong Christian environment.',
    body: `<p>Successful students at Snows will share the Catholic values reflected in our ${L('academics/schoolwide-learning-expectations', 'schoolwide learning expectations')}. They should be willing to live out our ${L('about/mission', 'mission statement')} and both students and parents should be willing to participate in and enrich our learning community.</p>
${cards([['cross', 'Faith', 'Share in the Catholic values that shape our school.'], ['book', 'Learning', 'Embrace a strong, challenging academic setting.'], ['users', 'Community', 'Participate in and enrich our learning community.']])}` },

  { slug: 'admissions/tuition-fees', title: 'Tuition & Fees', nav: 'Admissions', img: 'Snowsnv.jpg', eyebrow: 'Admissions',
    lead: '2026 – 2027 Tuition Rates',
    body: `
<div class="cards">
  <div class="icard tilt reveal" data-tilt="8"><h3>New Family Registration</h3><p class="big-number">$750</p><p>per family, per year, non-refundable</p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.08s"><h3>Returning Family Registration</h3><p class="big-number">$650</p><p>per family, per year, non-refundable</p></div>
</div>
<h2 class="reveal">Active Parishioner</h2>
<div class="table-wrap reveal"><table><thead><tr><th>Grade</th><th>Annual Rate</th><th>11 monthly payments</th></tr></thead><tbody>
<tr><td>Kindergarten</td><td><b>$8,275</b> per child</td><td>$752</td></tr>
<tr><td>1st thru 5th Grade</td><td><b>$7,485</b> per child</td><td>$680</td></tr>
<tr><td>6th – 8th Grade</td><td><b>$7,685</b> per child</td><td>$699</td></tr></tbody></table></div>
<h2 class="reveal">Non-Active / Non-Parishioner</h2>
<div class="table-wrap reveal"><table><thead><tr><th>Grade</th><th>Annual Rate</th><th>11 monthly payments</th></tr></thead><tbody>
<tr><td>Kindergarten</td><td><b>$9,345</b> per child</td><td>$850</td></tr>
<tr><td>1st thru 5th Grade</td><td><b>$8,960</b> per child</td><td>$815</td></tr>
<tr><td>6th – 8th Grade</td><td><b>$9,160</b> per child</td><td>$833</td></tr></tbody></table></div>
<div class="callout reveal"><p><strong>Sibling Discount:</strong> $400 per second and third students (as applicable) excluding Kindergarteners.</p></div>
<p>An “Active Parishioner” must meet criteria set forth by the Admission Board in order to receive parish rates. They are practicing Catholics who regularly attend Sunday Mass at Our Lady of the Snows, have been registered parishioners of Our Lady of the Snows for 12 months, financially support the Parish, and are involved in ministry.</p>
<h2 class="reveal">Tuition can be paid in the following manner</h2>
<ol class="steps reveal">
  <li>In full by July 1, 2026, or</li>
  <li>In two equal payments on July 1 and December 1 via ${X('https://online.factsmgt.com/Signin.aspx', 'FACTS')} tuition processing company, or</li>
  <li>In 11 monthly payments via automatic deduction from your checking or savings account (July 2026 through May 2027). The tuition processing company (${X('https://online.factsmgt.com/Signin.aspx', 'FACTS')}) assesses a $55 fee for this service.</li>
</ol>
<p>Need help? Explore ${L('admissions/tuition-assistance', 'Tuition Assistance')} and ${L('admissions/nevada-choice-scholarships', 'Nevada Choice Scholarships')}.</p>` },

  { slug: 'admissions/tuition-assistance', title: 'Tuition Assistance', nav: 'Admissions', img: 'FOR-PARENTS.jpg', eyebrow: 'Admissions',
    lead: 'A limited amount of Tuition Assistance is available to selected applicants after a formal application process.',
    body: `
<p>Due to the review process, late packets are not accepted. In order to be considered for Tuition Assistance or the D.O.R.S. Scholarship parents MUST apply for at least one Nevada Choice Scholarship. For information on how to apply for a Nevada Choice Scholarship please visit the ${X('https://doe.nv.gov/offices/office-of-student-and-school-supports/private-schools/nevada-educational-choice-scholarship-program-opportunity-scholarship', 'State of Nevada Department of Education')} website.</p>
<div class="callout reveal"><p><strong>Due date: May 31, 2027</strong>, for the 2027 – 2028 school year.</p></div>
<p>FACTS Grant &amp; Aid Assessment conducts the financial needs analysis of each application for Our Lady of the Snows. Families applying for financial aid will need to complete an application and submit the necessary supporting documentation to FACTS Grant &amp; Aid Assessment. Applicants can apply online at ${X('https://online.factsmgt.com/aid', 'FACTS Grant &amp; Aid')}. The following information will need to be forwarded to FACTS Grant &amp; Aid Assessment:</p>
<ol class="steps reveal">
  <li>Signed and completed application.</li>
  <li>Payment of the $40 application fee.</li>
  <li>Copies of your most recent tax forms including all supporting tax schedules.</li>
  <li>Copies of your prior year W-2 forms for both you and your spouse.</li>
  <li>Copies of supporting documentation for Social Security Income, Welfare, Child Support, Food Stamps, Workers’ Compensation, and TANF.</li>
</ol>
<p>If you have questions or concerns about the application process, you may speak with a FACTS Customer Care Representative at <a href="tel:+18663159262">1-866-315-9262</a>.</p>
<p>The Tuition Assistance committee meets after FACTS has completed their needs analysis to review all completed applications. Information is treated confidentially and Tuition Assistance is distributed according to available resources and need. The school reserves the right when granting assistance to give priority to families who currently have children enrolled at Our Lady of the Snows.</p>
<h2 class="reveal">Diocese of Reno Schools (D.O.R.S.) Scholarship</h2>
<p>FACTS Grant &amp; Aid Assessment will be conducting the financial need analysis for the Diocese of Reno Schools (D.O.R.S.) Scholarship for the upcoming 2027 – 2028 school year. Families applying for financial aid will need to complete an application and submit the necessary supporting documentation to FACTS Grant &amp; Aid Assessment by May 31, 2027.</p>
<p>If you have questions or concerns about the application process, you may speak with a FACTS Customer Care Representative at <a href="tel:+18663159262">1-866-315-9262</a>.</p>` },

  { slug: 'admissions/nevada-choice-scholarships', title: 'Nevada Choice Scholarships', nav: 'Admissions', img: 'IMG_36931.jpg', eyebrow: 'Admissions',
    lead: 'The Nevada Educational Choice Scholarship Program (AB 165) allows corporations to donate money to foundations that award educational scholarships to families in need.',
    body: `
<div class="cards"><div class="icard icard--gold tilt reveal" data-tilt="10"><h3>Up to</h3><p class="big-number" style="color:#081430">$<span data-count="10367">10,367</span></p><p>for the 2026 – 2027 school year, based upon household income.</p></div><div class="icard icard--dark tilt reveal" data-tilt="10" style="--d:.08s"><div class="k">${ICONS.shield}</div><h3>Approved School</h3><p>Our Lady of the Snows School is an approved school to receive these funds.</p></div></div>
<p>These scholarships can be used for Kindergarten through 12th grade and have no basis on public school attendance! We strongly encourage all eligible families to apply for this scholarship. Below is the link to the State of Nevada website that contains links to the organizations that are accepting applications:</p>
${docs([['State of Nevada – Nevada Choice Scholarships', 'https://doe.nv.gov/offices/office-of-student-and-school-supports/private-schools/nevada-educational-choice-scholarship-program-opportunity-scholarship']])}` },

  /* ===== ABOUT ===== */
  { slug: 'about', title: 'About Snows', nav: 'About', img: 'Snowsnv.jpg', eyebrow: 'About',
    lead: 'Inspired by our Catholic Faith, Our Lady of the Snows School guides and nurtures our students to become young leaders who love God, love learning and love their neighbor.',
    body: `
<div class="cards">${[['1951', 'Year Opened'], ['K – 8', 'Grades'], ['360', 'Enrollment'], ['29', 'Number of Faculty'], ['Roman Catholic', 'Religious Affiliation'], ['The Falcon', 'School Mascot']].map(([b, s], i) => `<div class="icard ${i % 2 ? '' : 'icard--dark'} tilt reveal" data-tilt="10" style="--d:${i * 0.05}s;text-align:center"><p class="big-number" style="${i % 2 ? '' : 'color:#f2c14e'};font-size:${b.length > 6 ? 30 : 46}px">${b}</p><p>${s}</p></div>`).join('')}</div>
<h2 class="reveal">Principal’s Message</h2>
<div class="signature reveal"><img src="${I('Tim-Fuetsch.jpg')}" alt="Principal Tim Fuetsch"><div><b>Tim Fuetsch</b><span>Principal · Reno, Nevada</span></div></div>
<p>It has been my great privilege to serve as Principal of Our Lady of the Snows School for the past fifteen years. I have great pride in our school community and in the academic excellence and faith formation that we offer to our students. During my time as Principal, our staff, students and parents have worked hard to build a community that is a true reflection of our Catholic faith. We are a school that welcomes all and serves all. We strive to create a learning environment that recognizes the whole child and works to meet the unique needs of each student so that all who come here are encouraged to meet their highest potential.</p>
<p>We are also a school of service. Inspired by our charism story, the students of Our Lady of the Snows school learn to honor God by serving others. Our focus on compassion, inclusion, integrity and personal achievement create a learning environment that I believe is unparalleled in our community. I am grateful to the hard work of our teachers, students and parents who all make Snows such a tremendous place to grow and learn.</p>
${cards([['book', 'Our Lady of the Snows History', `For over seventy years, Our Lady of the Snows School has consistently built a legacy of educational excellence in Reno. ${L('about/school-history', 'Read our story →')}`], ['users', 'Faculty, Staff &amp; Administration', `The excellence of Our Lady of the Snows School is a direct reflection of the high professional caliber of our faculty, staff and administration. ${L('about/contact/faculty-staff-directory', 'Meet our team →')}`], ['shield', 'School Board &amp; Governance', 'Our school is well served by an elected school board made up of parish members and parents.']])}` },

  { slug: 'about/enrollment-facilities', title: 'Enrollment & Facilities', nav: 'About', img: 'IMG_2279.jpg', eyebrow: 'About',
    lead: 'A campus designed for faith, learning and community.',
    body: `
<div class="img-row reveal"><img src="${I('IMG_2279.jpg')}" alt="Students and Sister Carmen" loading="lazy"><img src="${I('Sister-Carmen-8.jpg')}" alt="Students with service project" loading="lazy"></div>
<p>Our facilities include Our Lady of the Snows Parish, Our Lady of the Snows School with multi age classrooms in Elementary grades, a Middle School wing, an updated Library, Resource Classroom, Music Room, and outdoor space for students and families.</p>
${cards([['cross', 'Parish Church', 'Our Lady of the Snows Parish, home of our weekly school Mass.'], ['book', 'Updated Library', 'Renovated with a modern check-out system.'], ['chip', 'Chromebook for Every Student', 'Daily digital learning, security and citizenship.'], ['music', 'Music Room', 'Weekly music for every grade.'], ['home', 'Middle School Wing', 'Dedicated space for grades 7 and 8.'], ['star', 'Mesh Wi-Fi &amp; New HVAC', 'Modern infrastructure for health and learning.']])}
<p>Chromebook laptop computers are supplied to every student in our school for use of daily digital activities to enhance our students’ learning, resource awareness, digital security and citizenry, team building, and social development. To facilitate the need for Remote Learning, our faculty has completed Personal Development Digital Education of many online applications and adopted several of them into their daily curriculum. With the full integration of Google Classroom in our daily lessons, we can now adapt to the changing environment and transition into Remote Learning with efficiency and haste when needed.</p>
<p>We constantly strive to provide the best education and environments for our students in any circumstance. More modern improvements were made to our building including School Wide Mesh Wi-Fi Coverage, and a newly installed upgraded HVAC Air Conditioning/Heating System to create the best environment possible for our students’ health and protection.</p>` },

  { slug: 'about/school-history', title: 'School History', nav: 'About', img: 'IMG_2279.jpg', eyebrow: 'Since 1951',
    lead: 'For over seventy years, Our Lady of the Snows School has consistently built a legacy of educational excellence in Reno.',
    body: `
${fig('IMG_2279.jpg', 'Sister Carmen with Snows students')}
<div class="timeline">${[
      ['1950s — Our Beginning', 'On September 4, 1951, Our Lady of the Snows Catholic School first opened its doors under the direction of Msgr. Patrick J. Connors to meet the needs of our growing parish. With 107 students and four classrooms, our School was led by two Dominican Sisters and one lay teacher. By 1953, four additional classrooms and a social hall were added. Our School was blessed by the Bishop in 1956 and the first graduation exercises were held with 21 students receiving diplomas.'],
      ['1960s', 'The library was added to the existing structure and facilities were redesigned with entrances from the outside.'],
      ['1970s', 'The Congregation of the Brothers of Our Lady of the Holy Rosary took over administration of our School beginning in 1971 and remained involved until 1988.'],
      ['1980s', 'Many building improvements were made during this period, including a new air conditioning/heating system.'],
      ['1990s', 'A full-day Kindergarten program was added in the fall of 1999 in order to better prepare our students for their academic careers. Our library was refurbished, including utilizing our computer system into a laboratory setting, and our lavatories were updated and remodeled.'],
      ['2000s — A New Millennium', 'Our school has undergone many changes and improvements since those early years. In 2007, our School was blessed with new leadership. Principal Tim Fuetsch, with over 31 years of experience in his field and Father Tony Vercellone, our beloved Pastor, work together in a collaborative effort to maintain our strong traditions while effectively implementing the most successful educational and spiritual tools available. Our teaching staff is among the most talented, effective and highly qualified in the area. Our curriculum meets or exceeds all State regulations and our rigorous evaluation, certification and accreditation standards ensure continued excellence.'],
      ['2010s', 'Technological advancements with SMART Boards, ELMO’s and computers are now part of our classrooms. Our library has been renovated and reorganized with a new computer system and labeling with barcodes for easy check-out and returns. In 2011, we added a Technology SmartLab to our school, providing students of all abilities to creatively engage in science, technology, engineering, and math projects. Our electrical system received a major upgrade and many other improvements have been made to our building. One of our greatest assets has always been our talented staff and we are committed to their continued professional development through use of the latest methods training available. Our Lady of the Snows School has served hundreds of students and now has 1,834 graduates, many of whom still live and work in this area, and many who have chosen to pass on the gift of a Snows education to their own children.'],
      ['2020s — Laptops, Remote Learning and Digital Classrooms', 'Chromebook Laptop computers are supplied to every student in our school for use of daily digital activities to enhance our students’ learning, resource awareness, digital security and citizenry, team building, and social development. With the full integration of Google Classroom in our daily lessons, we can now adapt to the changing environment and transition into Remote Learning with efficiency and haste when needed. More modern improvements were made to our building including School Wide Mesh Wi-Fi Coverage, and a newly installed upgraded HVAC Air Conditioning/Heating System.'],
    ].map(([h, p]) => `<div class="tl reveal-left"><h3>${h}</h3><div class="card tilt" data-tilt="4"><p>${p}</p></div></div>`).join('')}</div>` },

  { slug: 'about/mission', title: 'Mission', nav: 'About', img: 'Friday-feb-26-114.jpg', eyebrow: 'About',
    lead: 'Love God. Love learning. Love each other.',
    body: `<p class="mission-quote reveal">Inspired by our Catholic Faith, Our Lady of the Snows School guides and nurtures students to become young leaders who love God, love learning and love each other.</p>
${cards([['cross', 'Love God', 'A personal relationship with God, nurtured by daily prayer, weekly Mass and the sacraments.'], ['book', 'Love Learning', 'Challenging coursework that ignites curiosity in the arts and sciences.'], ['heart', 'Love Each Other', 'Service, compassion and leadership — locally and globally.']])}
<p>Our mission comes to life through our ${L('academics/schoolwide-learning-expectations', 'Schoolwide Learning Expectations')}: Faith, Knowledge, Leadership and Service.</p>` },

  { slug: 'about/contact', title: 'Contact', nav: 'About', img: 'Snowsnv.jpg', eyebrow: 'About',
    lead: 'We would love to hear from you — and to show you our campus in person.',
    body: `
<div class="contact-grid">
  <div class="icard icard--dark tilt reveal" data-tilt="8"><div class="k">${ICONS.pin}</div><h3>Address</h3><p>1125 Lander St.<br>Reno, NV 89509</p><p style="margin-top:10px">${X('https://www.google.com/maps/search/?api=1&query=1125+Lander+St+Reno+NV+89509', '<span style="color:#f2c14e;font-weight:700">Get directions →</span>')}</p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.08s"><div class="k">${ICONS.phone}</div><h3>Phones</h3><p>Phone: ${PHONE}<br>Fax: (775) 322-0827</p></div>
  <div class="icard tilt reveal" data-tilt="8" style="--d:.16s"><div class="k">${ICONS.mail}</div><h3>Email</h3><p>${EMAIL}</p></div>
</div>
<iframe class="map reveal" title="Map to Our Lady of the Snows School" loading="lazy" src="https://maps.google.com/maps?q=Our%20Lady%20of%20the%20Snows%20School%201125%20Lander%20St.%20Reno%2C%20NV%2089509&t=m&z=15&output=embed&iwloc=near"></iframe>
<h2 class="reveal">More ways to connect</h2>
${docs([['Communications', '~/about/contact/communications/index.html'], ['Important Links &amp; How To’s', '~/about/contact/important-links-how-tos/index.html'], ['Faculty &amp; Staff Directory', '~/about/contact/faculty-staff-directory/index.html'], ['Employment Opportunities', '~/about/contact/employment-opportunities/index.html']])}` },

  { slug: 'about/contact/communications', title: 'Communications', nav: 'About', img: 'IMG_36931.jpg', eyebrow: 'Contact',
    lead: 'Our Lady of the Snows communicates with our parents through our Tuesday Packet.',
    body: `
${cards([['mail', 'Tuesday Packet', 'This electronic newsletter is sent out weekly and is our primary source for letting our school families know what is going on from week to week at our school and in our parish and community.'], ['book', 'Snows News', 'On a bi-monthly basis we also have a school newsletter, Snows News, which offers information to help families with timely educational topics.'], ['users', 'Personal Communication', 'We place a high value on personal communication and encourage meetings with teachers and administrators to address problems and concerns.']])}
<p>${X('http://olscs-nv.client.renweb.com/pw/', 'RenWeb')} is our school management site where parents can find information on current grades, homework, notices from teachers, links to teacher webpages, the school calendar, school directory, Parent Student Handbook and account management for tuition and fees.</p>` },

  { slug: 'about/contact/important-links-how-tos', title: 'Important Links', nav: 'About', img: 'Snowsnv.jpg', eyebrow: 'Contact',
    lead: 'Quick access to the sites our families use most.',
    body: docs([['Our Lady of the Snows Church', 'http://olsparish.com/'], ['Diocese of Reno', 'https://catholicreno.org/'], ['RenWeb Login', 'http://olscs-nv.client.renweb.com/pw/'], ['Bishop Manogue Catholic High School', 'http://www.bishopmanogue.org/'], ['FACTS Tuition Management', 'https://online.factsmgt.com/Signin.aspx']]) },

  { slug: 'about/contact/faculty-staff-directory', title: 'Faculty & Staff Directory', nav: 'About', img: 'FOR-PARENTS.jpg', eyebrow: 'Contact',
    lead: 'School starts every day at 8:30am. School hours 8:30am – 2:50pm (Mon – Thurs) & 8:30am – 12:15pm (Friday).',
    body: `<p>Reach the school office at ${PHONE} or ${EMAIL}.</p>
<input class="staff-search" type="search" placeholder="Search by name or role…" aria-label="Search staff">
<div class="staff-filter" role="group" aria-label="Filter staff"><button class="on" data-group="all">All</button><button data-group="admin">Administration</button><button data-group="teach">Classroom Teachers</button><button data-group="spec">Specialists</button><button data-group="aide">Aides</button><button data-group="ops">Operations</button></div>
<div class="staff">${staffHTML()}</div>` },

  { slug: 'about/contact/employment-opportunities', title: 'Employment Opportunities', nav: 'About', img: '100_1531.jpg', eyebrow: 'Contact',
    lead: 'Join a faith-filled team dedicated to forming young leaders who love God, love learning and love their neighbor.',
    body: `${docs([['For application, please click here', 'https://catholicreno.org/job-opportunities', 'Diocese of Reno employment'], ['Questions? Email info@snowsnv.org', 'mailto:info@snowsnv.org']])}` },

  { slug: 'about/mission-2', title: 'Legal Notices', nav: 'About', img: 'Snowsnv.jpg', eyebrow: 'About',
    lead: 'Required notices and compliance documents.',
    body: `<p>Nevada Department of Education Emergency Operations Plan:</p>${docs([['Notice of Completion', 'https://snowsnv.org/wp-content/uploads/2026/06/OLSS-EOP-Notice-of-Completion.pdf']])}` },

  /* ===== WELCOME HOME ===== */
  { slug: 'welcome-home-project', title: 'Welcome Home Project', nav: 'Welcome Home', img: 'Snowsnv.jpg', eyebrow: 'Capital Campaign',
    lead: 'To date we have received $14,600,000.00 in pledges toward our goal of $19 million for the new Our Lady of the Snows Family Center.',
    body: `
<figure class="figure figure--contain reveal" style="max-width:520px"><img src="${I('CampaignLogo-FINAL.png')}" alt="Welcome Home campaign logo" loading="lazy"></figure>
<h2 class="reveal">Welcome to Commitment Weekend!</h2>
<p>The formal push for our Welcome Home project is winding down and we continue to be amazed by the generosity of the Our Lady of the Snows community. We kicked off our effort four weeks ago and since then we have seen the fundraising totals gradually climb. While this is great progress there is still much work ahead of us to reach our ultimate goal of $19 million to ensure we can begin construction on the new Our Lady of the Snows Family Center. We are now asking you to celebrate Commitment Weekend. It is important to honor the families who have given so generously to this campaign. If you have made a pledge or gift, thank you! If you have yet to make a decision, I invite you to make your commitment today. Supporting our campaign is not an expectation – it is an invitation to invest in the future of our parish. We need your help!</p>
<figure class="figure figure--contain reveal" style="max-width:460px"><img src="${I('Welcome-Home-Thermometer112224.jpg')}" alt="Welcome Home fundraising thermometer" loading="lazy"></figure>
<p>If you received your pledge card at home, we invite you to return it during Mass this weekend or back to the parish office within the next week. Additionally, commitment cards will be distributed during Mass this weekend; please take a moment to complete the card. Before doing so, I ask that you review it carefully and discern what you might be able to do to help secure a brighter future for Our Lady of the Snows. Please know that your donation, no matter the size, will have a positive impact on the entire parish community. THANK YOU for your investment into Our Lady of the Snows, its mission and its ministries. With your support, our Welcome Home project will continue to be a huge blessing.</p>
<div class="callout reveal"><p><strong>Welcome Home Fund Donation</strong> — ${X('https://wesharegiving.com/', 'Online Giving')} powered by WeShare. ${X('https://www.wesharegiving.org/app/giving/WeShare-2434?tab=home', '<strong>Click to donate →</strong>')} Thank you for your generous support. God Bless!</p></div>
<h2 class="reveal">Campaign questions</h2>
<p>We have officially kicked off the Welcome Home project. All registered parishioners were mailed a packet of materials about our campaign. A case statement booklet is enclosed, along with a letter from Fr. Bob requesting a pledge to the effort. Over the coming weeks, our team of volunteers will be reaching out to families to discuss the campaign, answer questions and seek your support. Due to our limited numbers of volunteers, we may not be able to personally contact every family – but we do hope that all families will choose to participate in this important campaign.</p>
${faq([
      ['How did you come up with my request amount?', 'The amounts are based on several factors, including giving history and answers shared in the planning study. Please know the amount is an invitation not an expectation. It is simply a starting point for your prayerful consideration. Our goal is to challenge everyone to consider supporting Our Lady of the Snows in a meaningful and sacrificial way that works for each family.'],
      ['Who is being asked to support the campaign?', 'Every registered parish family and all school families will be asked to participate in the campaign.'],
      ['Why should I/we consider supporting the campaign?', 'Throughout the bible we are reminded that we have been called by the Lord to build His kingdom. “Therefore, my beloved brothers, be steadfast, immovable, always abounding in the work of the Lord, knowing that in the Lord your labor is not in vain.” 1 Corinthians 15:58. This project does not fall on the shoulders of one family or a few. It is the responsibility of everyone at Our Lady of the Snows to hear God’s call and to continue to grow His ministry. The obligation rests with everyone to do their part to raise the necessary funding. We all need to identify and make sacrificial and meaningful donations to ensure the campaign is a success.'],
      ['What ways are there to fulfill a commitment to the campaign?', 'On the pledge card you will see there are multiple ways to fulfill your gift. You can choose to make a pledge across the three-year period with an installment plan of your choice such as monthly or annually and what month you would like to begin payments. You can return a check with your pledge card directly to the office or drop in the collection basket at Mass using the Welcome Home campaign return envelopes. You can set up a one-time payment or automatic deductions on the WeShare platform offered on our website. You might also consider donating gifts of appreciated stock or making a charitable deduction from your donor advised fund or IRA. Please contact Shauna Meyers in the parish office for information regarding gift payment options.'],
      ['Are there any special naming opportunities or donor recognition?', 'All gifts to the campaign will be recognized in the new Snows Family Center on a donor wall. In addition, there are specific areas available for naming that will also be highlighted on the donor wall. Naming opportunities are a great way to honor a loved one, make a family gift or show your support for a specific area of the project. If you would like more information about naming opportunities, please contact Fr. Bob. If you do not wish to have your name included in any public recognition, please check the box on your pledge card indicating you wish your gift to remain anonymous.'],
    ])}
<h2 class="reveal">What the new Parish Center will create</h2>
<p>The Welcome Home Project serves to create the infrastructure we need to welcome, serve, build, form and continue our mission as Catholics. A new Parish Center will be built that can begin to change all of that.</p>
${cards([['users', 'Large gathering space', 'With a warming kitchen to host parish hospitality events, school special events, Kindergarten/8th Grade Graduation, Christmas Program, Mother’s Day Tea, Family Game Nights, Fall Festival, CYO Sports Practice, Youth Ministry Gatherings, Funeral and Wedding Receptions, School Assemblies, Adult faith formation gatherings, Indoor Recess/PE, Overflow at Easter and Christmas, additional space for Drama class and performances, Before and After School functions and Diocesan events/programs.'],
  ['book', 'Dedicated classrooms', 'Additional space enabling the reduction in classroom sizes — for small group meetings, adult faith formation, children’s religious education, youth ministry and staging for outreach programs.'],
  ['home', 'Outside patio', 'A safe pick-up/drop-off loop for school children and parents, and hospitality events: ARC Ministry, Catholic Schools Week, SWA/Knights of Columbus event registration, Teacher Appreciation Week and Mother’s Day Mass Reception.'],
  ['shield', 'Office space', 'ADA compliant access, resources for staff to develop, and storage.']])}
<h2 class="reveal">Floor Plans</h2>
<figure class="figure figure--contain reveal"><img src="${I('floor-plan-welcomehome.jpg')}" alt="Welcome Home Family Center floor plan" loading="lazy"></figure>` },

  { slug: 'goal-pledges-to-date', title: 'Goal: Pledges To Date', nav: 'Welcome Home', img: 'Snowsnv.jpg', eyebrow: 'Capital Campaign',
    lead: 'As we continue through the public phase of our Welcome Home Capital Campaign, we are extremely grateful for the generosity of our faith community.',
    body: `
<div class="cards"><div class="icard icard--dark tilt reveal" data-tilt="8" style="text-align:center"><h3>Pledges to date</h3><p class="big-number" style="color:#f2c14e;font-size:52px">$<span data-count="14.6" data-dec="1">14.6</span>M</p><p>of our $19,000,000 goal</p></div><div class="icard tilt reveal" data-tilt="8" style="--d:.08s;text-align:center"><figure style="margin:0"><img src="${I('CampaignLogo-FINAL-2.webp')}" alt="Welcome Home campaign logo" style="max-height:160px;margin:auto"></figure></div></div>
<figure class="figure figure--contain reveal" style="max-width:460px"><img src="${I('Welcome-Home-Thermometer-JUN-2023-2-768x853-1.webp')}" alt="Fundraising thermometer" loading="lazy"></figure>
<p>All registered families should have received an information packet and a pledge card. Please prayerfully consider the level of support you can make to this campaign to build the new Snows Family Center. Two convenient ways to pledge support:</p>
<ol class="steps reveal"><li>Complete your paper pledge form and return it to the parish office or collection basket during Mass.</li><li>Access the online giving page by scanning this QR code with the camera of your smartphone or tablet, or ${X('https://www.wesharegiving.org/app/giving/WeShare-2434?tab=home', 'click here to give online')}.</li></ol>
<figure class="figure figure--contain reveal" style="max-width:300px"><img src="${I('whp-button-scan-me-2.jpg')}" alt="Scan me QR code for online giving" loading="lazy"></figure>
<p>Thank you for your prayerful consideration of a gift to this important effort. Please be assured that no gift is too small, and everyone’s effort is needed!</p>` },

  { slug: 'vision-building', title: 'Vision: Building', nav: 'Welcome Home', img: 'Snowsnv.jpg', eyebrow: 'Capital Campaign',
    lead: 'A new Snows Family Center — space to welcome, serve, build, form and continue our mission as Catholics.',
    body: `
<p>The Welcome Home Project serves to create the infrastructure we need to welcome, serve, build, form and continue our mission as Catholics. Here is what the new Parish Center will make possible for our school and parish families.</p>
${cards([['users', 'Gathering Space', 'Graduations, the Christmas Program, Mother’s Day Tea, Family Game Nights, Fall Festival, assemblies, indoor recess/PE and more.'], ['book', 'Dedicated Classrooms', 'Smaller class sizes, religious education, youth ministry and adult faith formation.'], ['home', 'Safe Pick-Up Loop', 'A safer drop-off and pick-up for school children and parents.'], ['shield', 'Accessible Offices', 'ADA compliant access, staff resources and storage.']])}
<h2 class="reveal">Floor Plans</h2>
<figure class="figure figure--contain reveal"><img src="${I('floor-plan-welcomehome.jpg')}" alt="Welcome Home Family Center floor plan" loading="lazy"></figure>
${docs([['Read about the Welcome Home Project', '~/welcome-home-project/index.html'], ['Give to the Welcome Home Fund', 'https://www.wesharegiving.org/app/giving/WeShare-2434?tab=home']])}` },

  { slug: 'how-to-donate', title: 'How To Donate', nav: 'Welcome Home', img: 'Snowsnv.jpg', eyebrow: 'Capital Campaign',
    lead: 'Online Giving powered by WeShare. Thank you for your generous support. God Bless!',
    body: `
<p style="margin-bottom:26px">${X('https://www.wesharegiving.org/app/giving/WeShare-2434?tab=home', `<img src="${I('whp-button-give-solo.jpg')}" alt="Click to donate" style="max-width:280px;border-radius:16px;box-shadow:0 20px 40px -20px rgba(8,20,48,.5)">`)}</p>
<div class="timeline">${[1, 2, 3].map(n => `<div class="tl reveal-left"><h3>Step ${n}</h3><div class="card"><img src="${I(`donate-${n}.jpg`)}" alt="Donation step ${n}" loading="lazy" style="border-radius:12px"></div></div>`).join('')}</div>
<p>Prefer another way to give? Visit ${X('https://wesharegiving.com/', 'WeShare Online Giving')} or contact the parish office.</p>` },

  /* ===== NEWS / CALENDAR ===== */
  { slug: 'news-and-updates', title: 'News and Updates', nav: null, img: 'STUDENT-LIFE-3.jpg', eyebrow: 'News',
    lead: 'The latest happenings, traditions and opportunities at Our Lady of the Snows.',
    body: `${newsCards()}` , wide: true },

  { slug: 'calendar-of-events', title: 'Calendar of Events 2026 - 2027', nav: null, img: 'IMG_36931.jpg', eyebrow: 'Calendar',
    lead: 'Upcoming events, holidays and milestones for the 2026 – 2027 school year.',
    body: `${docs([['Download 2026 – 2027 Calendar', 'https://snowsnv.org/wp-content/uploads/2026/07/26-27-OLSS-Calendar.pdf']])}<h2 class="reveal">Upcoming Events</h2>${eventsHTML(0, true)}` },

  { slug: NEWS[0].slug, title: NEWS[0].title, nav: null, img: 'Sensology.jpg', eyebrow: 'News', date: NEWS[0].date, post: true,
    body: `<h2>9th - 12th Grade Upcoming Events</h2><figure class="figure figure--contain reveal"><img src="${I('Important-FFE-Info-2.png')}" alt="9th – 12th grade upcoming events information" loading="lazy"></figure>` },
  { slug: NEWS[1].slug, title: NEWS[1].title, nav: null, img: 'The-Traveling-Mary-is-a-great-tradition-we-have-at-School.jpg', eyebrow: 'News', date: NEWS[1].date, post: true,
    body: `<figure class="figure reveal" style="max-width:420px"><img src="${I('The-Traveling-Mary-is-a-great-tradition-we-have-at-School.jpg')}" alt="Traveling Mary statue" loading="lazy"></figure>
<p>It brings the Faith based aspect of our school into your home. Please sign up below to take the statue of Mary home for 1 week on Wednesday at the end of mass. This is a great way to pray together as a family, and also a great way to get ready for the Season of Lent. There are plenty of spots open for 2 families to take the Mary statue home every week. All families are welcome!</p>
<p>Click on the link below to sign up</p>${docs([['Traveling Mary Sign Up', 'https://email-mg.flocknote.com/c/eJwczcFygyAURuGngV2dyw94ZcHCScN7RCGGqQVHMb5-J92fOV_0rDTYyOQVs3JsekC-_KymFAk2RSJleRgSUU9OTdrZaYokswehJ8BAKwI6mAQwD06h56eNwtBzrfNPqS11c_2Vq3-1th1CjwJBIFzX1R15Kee2pJLP4xMJhKUKBEU3uhsz3kcHN9rwfQvDV9sf77TmsghogSA_5xy9ttw7Mxi5-22v8ZxbrkUYOtoZc51SKY9__-3xFwAA__873kVl', 'via Flocknote']])}` },
  { slug: NEWS[2].slug, title: NEWS[2].title, nav: null, img: 'Service-Hour-Opportunity-Next-Thursday-March-5.jpg', eyebrow: 'News', date: NEWS[2].date, post: true,
    body: `<figure class="figure reveal" style="max-width:520px"><img src="${I('Service-Hour-Opportunity-Next-Thursday-March-5.jpg')}" alt="Service hour opportunity" loading="lazy"></figure>
<p>Still looking for a way to earn service hours? On Thursday, March 5 we’ll need mid-day coverage for our teachers and student teachers who will be celebrating Teacher For A Day. We’re looking for volunteers to help with lunch and recess coverage between 11:30am and 1pm. You can earn 2 hours for a 1.5 hour shift!</p>
<p>Sign up here to help!</p>${docs([['Teacher For A Day — SignUpGenius', 'https://www.signupgenius.com/go/60B0445AAA729A7F58-62544191-teacher']])}` },
  { slug: NEWS[3].slug, title: NEWS[3].title, nav: null, img: 'unnamed-1.png', eyebrow: 'News', date: NEWS[3].date, post: true,
    body: `<figure class="figure reveal"><img src="${I('unnamed-1.png')}" alt="Hats off to reading" loading="lazy"></figure>
<p><strong>Read Across America week starts March 9th here at OLS!</strong></p>
<p>More info to follow in library classes this week and next, however, I wanted to let everyone know about the OLS Book Swap on Friday March 13. This is a great way to get kids involved in donating books they have outgrown. I am asking for each child to donate 2 gently used/read books that they already own.</p>
<p>At the end of Read Across America week, OLS students will be able to walk through and each pick out a “new to them” book! All the extras will be donated to a local elementary school here in Reno for their students to pick and take home a free book as well! I will have collection bins in the library — books can be donated up until March 12. Please only donate children’s books for grades K-8.</p>
<p>If you are interested in helping with the book swap — organizing/helping students select books/etc — please reach out to Megan Azzi at <a href="mailto:mazzi@snowsnv.org">mazzi@snowsnv.org</a>.</p><p>Thank you for the support!</p>` },
];
