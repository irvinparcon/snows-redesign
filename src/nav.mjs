// Site navigation — mirrors the original snowsnv.org menu structure.
// `u` is a slug (internal page) or a full URL (external, opens in a new tab).
export const EXT = {
  renweb: 'https://olscs-nv.client.renweb.com/pw/',
  apply: 'https://olscs-nv.client.renweb.com/oa/?memberid=559',
  facts: 'https://online.factsmgt.com/Signin.aspx',
  parish: 'https://olsparish.com/',
  weshare: 'https://www.wesharegiving.org/app/giving/WeShare-2434?tab=home',
};

export const NAV = [
  { t: 'Faith', u: 'our-faith', items: [
    { t: 'Catholic Identity', u: 'our-faith' },
    { t: 'Faith in Action', u: 'our-faith/faith-in-action' },
    { t: 'Mass Schedule', u: 'our-faith/mass-schedule' },
    { t: 'Sacraments', u: 'our-faith/sacraments' },
  ] },
  { t: 'Academics', u: 'academics', items: [
    { t: 'Academics Overview', u: 'academics' },
    { t: 'Accreditation', u: 'academics/accreditation' },
    { t: 'Schoolwide Learning Expectations', u: 'academics/schoolwide-learning-expectations' },
    { t: 'Curriculum', u: 'academics/curriculum' },
    { t: 'Technology', u: 'academics/curriculum/technology', sub: true },
    { t: 'Religion', u: 'academics/curriculum/religion', sub: true },
    { t: 'Music & Enrichment', u: 'academics/curriculum/music-enrichment', sub: true },
    { t: 'How We Measure Learning', u: 'academics/how-we-measure-learning' },
  ] },
  { t: 'Student Life', u: 'student-life', items: [
    { t: 'Student Life Overview', u: 'student-life' },
    { t: 'Before & After School Care', u: 'student-life/before-after-school-care' },
    { t: 'CYO League Sports', u: 'student-life/cyo-league-sports' },
    { t: 'Service', u: 'student-life/service' },
    { t: 'Student Committees', u: 'student-life/student-council' },
    { t: 'Supply Lists', u: 'student-life/supply-lists' },
    { t: 'RenWeb', u: EXT.renweb },
  ] },
  { t: 'Parents', u: 'for-parents', items: [
    { t: 'For Parents', u: 'for-parents' },
    { t: 'Vintage Affair', u: 'vintage-affair' },
    { t: 'Protecting God’s Children', u: 'for-parents/protecting-gods-children' },
    { t: 'School Uniform Policy', u: 'for-parents/school-uniform-policy' },
    { t: 'Lunch Program', u: 'for-parents/lunch-program' },
    { t: 'Parent Service Hours', u: 'for-parents/parent-service-hours' },
    { t: 'Mental Health', u: 'for-parents/mental-health' },
    { t: 'Student/Parent Handbook', u: 'for-parents/student-parent-handbook' },
    { t: 'FACTS', u: EXT.facts },
  ] },
  { t: 'Admissions', u: 'admissions', items: [
    { t: 'Admissions Overview', u: 'admissions' },
    { t: 'Online Application', u: EXT.apply },
    { t: 'For Prospective Families', u: 'admissions/for-prospective-families' },
    { t: 'Why Choose Us?', u: 'admissions/why-choose-us' },
    { t: 'Frequently Asked Questions', u: 'admissions/frequently-asked-questions' },
    { t: 'Testimonials', u: 'admissions/testimonials' },
    { t: 'Admissions Guidelines', u: 'admissions/admissions-guidelines' },
    { t: 'Tuition & Fees', u: 'admissions/tuition-fees' },
    { t: 'Tuition Assistance', u: 'admissions/tuition-assistance' },
    { t: 'Nevada Choice Scholarships', u: 'admissions/nevada-choice-scholarships' },
  ] },
  { t: 'About', u: 'about', items: [
    { t: 'About Snows', u: 'about' },
    { t: 'Enrollment & Facilities', u: 'about/enrollment-facilities' },
    { t: 'School History', u: 'about/school-history' },
    { t: 'Mission', u: 'about/mission' },
    { t: 'Contact', u: 'about/contact' },
    { t: 'Communications', u: 'about/contact/communications', sub: true },
    { t: 'Important Links & How To’s', u: 'about/contact/important-links-how-tos', sub: true },
    { t: 'Faculty & Staff Directory', u: 'about/contact/faculty-staff-directory', sub: true },
    { t: 'Employment Opportunities', u: 'about/contact/employment-opportunities', sub: true },
    { t: 'Legal Notices', u: 'about/mission-2' },
  ] },
  { t: 'Welcome Home', u: 'welcome-home-project', items: [
    { t: 'Welcome Home Project', u: 'welcome-home-project' },
    { t: 'Goal: Pledges To Date', u: 'goal-pledges-to-date' },
    { t: 'Vision: Building', u: 'vision-building' },
    { t: 'Welcome Home Fund Donation', u: EXT.weshare },
    { t: 'How To Donate', u: 'how-to-donate' },
  ] },
];

export const UTIL = [
  { t: 'News', u: 'news-and-updates' },
  { t: 'Calendar', u: 'calendar-of-events' },
];
