import './style.css';
import { digitsOnly, initials, normalizeUrl, socialLabel } from './utils.js';

const icon = (name) => ({
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/>',
  mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="m22 6-10 7L2 6"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9 9 0 0 1-3.8-.9L3 21l1.8-5a8.8 8.8 0 1 1 16.2-4.5z"/><path d="M9 8.5c.5 2 2 3.5 4 4l1-1 2 1.5c-.5 1.8-2 2.2-4.5 1A8.5 8.5 0 0 1 7 9.5C6.2 7.8 7.3 7 9 8.5z"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  sparkle: '<path d="m12 3-1.2 3.8L7 8l3.8 1.2L12 13l1.2-3.8L17 8l-3.8-1.2L12 3zM5 14l-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14zM19 14l-.6 1.4L17 16l1.4.6L19 18l.6-1.4L21 16l-1.4-.6L19 14z"/>',
})[name];
const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icon(name)}</svg>`;

const defaults = { fullName: 'מאיה רוזן', business: 'MAYA STUDIO', role: 'מעצבת וממתגת עסקים', description: 'יוצרת זהויות ויזואליות מדויקות לעסקים שרוצים לבלוט, לרגש ולהישאר בזיכרון.', phone: '050-123-4567', whatsapp: '050-123-4567', email: 'hello@mayastudio.co.il', website: 'mayastudio.co.il', instagram: 'instagram.com/mayastudio', facebook: '', linkedin: '', profile: '', logo: '' };
let state = { ...defaults, ...JSON.parse(localStorage.getItem('cardly-data') || '{}') };

document.querySelector('#app').innerHTML = `
  <header><a class="brand" href="#"><span>Cardly</span><i></i></a><div class="header-note">כרטיס אחד. אינסוף הזדמנויות.</div></header>
  <main>
    <section class="intro"><span class="eyebrow">הנוכחות הדיגיטלית שלך</span><h1>בואו ניצור כרטיס<br><em>שאי אפשר לשכוח.</em></h1><p>מלאו את הפרטים, עצבו את הכרטיס שלכם — ותנו לעסק להיראות בדיוק כמו שמגיע לו.</p></section>
    <div class="workspace">
      <form id="card-form">
        <div class="section-title"><span>01</span><div><h2>הפרטים שלך</h2><p>הבסיס לכרטיס שמספר מי אתם</p></div></div>
        <div class="fields two"><label>שם מלא<input name="fullName" placeholder="ישראל ישראלי" /></label><label>שם העסק<input name="business" placeholder="שם העסק שלך" /></label><label>תפקיד<input name="role" placeholder="מעצב/ת, יועצ/ת..." /></label><label>תיאור קצר<textarea name="description" rows="3" placeholder="כמה מילים על העסק..."></textarea></label></div>
        <div class="section-title"><span>02</span><div><h2>נשארים בקשר</h2><p>כל הדרכים להגיע אליכם</p></div></div>
        <div class="fields two"><label>מספר טלפון<input name="phone" type="tel" placeholder="050-000-0000" /></label><label>WhatsApp<input name="whatsapp" type="tel" placeholder="050-000-0000" /></label><label>כתובת אימייל<input name="email" type="email" placeholder="hello@example.com" /></label><label>אתר אינטרנט<input name="website" type="text" placeholder="www.example.co.il" /></label></div>
        <div class="section-title"><span>03</span><div><h2>הנוכחות שלך</h2><p>תמונות ורשתות חברתיות</p></div></div>
        <div class="uploads"><label class="upload"><input name="profile" type="file" accept="image/*"/><span>${svg('upload')}</span><b>תמונת פרופיל</b><small>PNG או JPG, עד 3MB</small></label><label class="upload"><input name="logo" type="file" accept="image/*"/><span>${svg('upload')}</span><b>לוגו העסק</b><small>רקע שקוף מומלץ</small></label></div>
        <div class="fields socials"><label>Instagram<input name="instagram" placeholder="instagram.com/yourname" /></label><label>Facebook<input name="facebook" placeholder="facebook.com/yourname" /></label><label>LinkedIn<input name="linkedin" placeholder="linkedin.com/in/yourname" /></label></div>
        <button class="create" type="submit">צור את הכרטיס שלי ${svg('sparkle')}</button>
      </form>
      <aside><div class="preview-head"><span>תצוגה מקדימה</span><i>מתעדכנת בזמן אמת</i></div><div id="preview"></div><p class="preview-tip">זה בדיוק מה שהלקוחות שלכם יראו</p></aside>
    </div>
  </main>
  <footer><span>Cardly © 2026</span><span>נוצר באהבה לעסקים ישראליים</span></footer>
  <div class="modal" id="modal" aria-hidden="true"><div class="modal-box"><button class="close" aria-label="סגירה">×</button><span class="success">✓</span><h2>הכרטיס שלך מוכן!</h2><p>כך הכרטיס נראה ללקוחות שלך.</p><div id="final-card"></div><button class="back">חזרה לעריכה</button></div></div>`;

const form = document.querySelector('#card-form');
for (const el of form.elements) if (el.name && el.type !== 'file') el.value = state[el.name] || '';

function contactButton(type, href, label) { return href ? `<a href="${href}" target="_blank" rel="noopener"><span>${svg(type)}</span><b>${label}</b></a>` : ''; }
function renderCard(target) {
  const socials = ['instagram', 'facebook', 'linkedin'].filter((key) => state[key]).map((key) => `<a href="${normalizeUrl(state[key])}" target="_blank" rel="noopener">${socialLabel(key)}</a>`).join('');
  target.innerHTML = `<article class="business-card">
    <div class="card-top"><div class="logo">${state.logo ? `<img src="${state.logo}" alt="לוגו ${state.business}">` : `<span>${(state.business || 'C').charAt(0)}</span>`}</div><small>DIGITAL BUSINESS CARD</small></div>
    <div class="portrait">${state.profile ? `<img src="${state.profile}" alt="${state.fullName}">` : `<span>${initials(state.fullName)}</span>`}</div>
    <div class="identity"><p>${state.business || 'שם העסק'}</p><h3>${state.fullName || 'השם שלך'}</h3><h4>${state.role || 'התפקיד שלך'}</h4><div class="rule"></div><blockquote>${state.description || 'כאן יופיע תיאור קצר של העסק שלך.'}</blockquote></div>
    <div class="contact-actions">${contactButton('phone', state.phone && `tel:${digitsOnly(state.phone)}`, 'חיוג')}${contactButton('whatsapp', state.whatsapp && `https://wa.me/${digitsOnly(state.whatsapp).replace('+', '')}`, 'WhatsApp')}${contactButton('mail', state.email && `mailto:${state.email}`, 'אימייל')}${contactButton('globe', state.website && normalizeUrl(state.website), 'אתר')}</div>
    ${socials ? `<div class="social-links">${socials}</div>` : ''}<div class="card-credit">CARDLY</div>
  </article>`;
}
renderCard(document.querySelector('#preview'));

form.addEventListener('input', (event) => {
  const el = event.target;
  if (!el.name || el.type === 'file') return;
  state[el.name] = el.value;
  localStorage.setItem('cardly-data', JSON.stringify(state)); renderCard(document.querySelector('#preview'));
});
form.addEventListener('change', (event) => {
  const el = event.target; if (el.type !== 'file' || !el.files[0]) return;
  if (el.files[0].size > 3 * 1024 * 1024) { alert('יש לבחור תמונה בגודל של עד 3MB'); el.value = ''; return; }
  const reader = new FileReader(); reader.onload = () => { state[el.name] = reader.result; localStorage.setItem('cardly-data', JSON.stringify(state)); renderCard(document.querySelector('#preview')); }; reader.readAsDataURL(el.files[0]);
});
form.addEventListener('submit', (event) => { event.preventDefault(); renderCard(document.querySelector('#final-card')); document.querySelector('#modal').classList.add('open'); document.querySelector('#modal').setAttribute('aria-hidden', 'false'); });
document.querySelectorAll('.close,.back').forEach((button) => button.addEventListener('click', () => { document.querySelector('#modal').classList.remove('open'); document.querySelector('#modal').setAttribute('aria-hidden', 'true'); }));
