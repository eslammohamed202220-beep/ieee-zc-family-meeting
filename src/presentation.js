import './presentation.css';
import './presentation-rest.css';
import './presentation-responsive.css';
import './presentation-updates.css';
import './presentation-polish.css';
import './hr-agreement.css';
import { gsap } from 'gsap';
import {
  slides, board, committees, route, history as milestones, ieeeDoes,
  promises, roles, experiences, opportunities, channels, feedback,
} from './content.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const pad = value => String(value).padStart(2, '0');
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const asset = path => `${import.meta.env.BASE_URL}${path}`;
const cutout = person => asset(`assets/cutouts/${encodeURIComponent(person.image || `${person.file}.png`)}`);
const portraitPath = person => person.image ? asset(`assets/cutouts/${encodeURIComponent(person.image)}`) : null;
const groupPath = person => asset(`assets/group/${encodeURIComponent(person.image || `${person.file}.png`)}`);
const kicker = text => `<p class="kicker" data-in>${text}</p>`;
const intro = (tag, title, description = '') => `<div class="scene-intro">${kicker(tag)}<h1 data-in>${title}</h1>${description ? `<p class="scene-intro__description" data-in>${description}</p>` : ''}</div>`;
const monogram = name => name.split(' ').filter(Boolean).map(part => part[0]).slice(0, 2).join('').toUpperCase();
const leaderVisual = (person, i, total) => `<span class="leader-person__visual ${person.image ? 'has-photo' : 'has-no-photo'}"><span class="leader-person__serial">${pad(i + 1)} / ${pad(total)}</span>${person.image ? `<img class="leader-person__photo" src="${groupPath(person)}" alt="" loading="lazy" />` : `<span class="leader-person__monogram" aria-hidden="true">${esc(monogram(person.name))}</span>`}<span class="leader-person__visual-role">${esc(person.role)}</span><span class="leader-person__arrow" aria-hidden="true">↗</span></span>`;

function leaderPanel(committee) {
  return `<div class="leader-panel__mast" data-in><span class="eyeline">SELECTED COMMITTEE</span><h2>${esc(committee.name)}</h2><span class="leader-panel__rule"></span></div><div class="leader-panel__people">${committee.members.map((person, i) => `<button class="leader-person" type="button" data-person="${esc(person.file)}" data-person-name="${esc(person.name)}" data-person-role="${esc(person.role)}" data-in>${leaderVisual(person, i, committee.members.length)}<span class="leader-person__meta"><span>${pad(i + 1)} / ${pad(committee.members.length)}</span><strong>${esc(person.name)}</strong><small>${esc(person.role)}</small></span></button>`).join('')}</div>`;
}

function sceneContent(n) {
  const item = slides[n];
  switch (item.kind) {
    case 'hero': return `<div class="hero__edition" data-in>FIRST FAMILY MEETING <span>2026—27</span></div><div class="hero__copy">${kicker('IEEE ZEWAIL CITY STUDENT BRANCH')}<h1 data-in>WELCOME TO<br><em>THE FAMILY.</em></h1><div class="hero__bottom" data-in><p>A new season.<br>A shared story.</p><button class="action-link" type="button" data-go="1">BEGIN THE STORY <span>↗</span></button></div></div><div class="hero__visual"><span class="hero__disc"></span><span class="hero__vertical">IEEE ZC-SB / FAMILY MEETING</span><span class="hero__visual-year" aria-hidden="true">26<br>27</span><img class="hero__logo" src="${asset('assets/ieee-zc-white.png')}" alt="IEEE Zewail City Student Branch" /><span class="hero__visual-index">01 / ${pad(slides.length)}</span></div>`;

    case 'route': return `<div class="split split--route">${intro("TODAY'S ROUTE", "What we're<br>doing today.", 'A quick roadmap for our first family meeting.')}<div class="route-list">${route.map((part, i) => `<button class="route-row" type="button" data-go="${part.to}" data-in><span>${pad(i + 1)}</span><strong>${esc(part.label)}</strong><small>${esc(part.detail)}</small><i>↗</i></button>`).join('')}</div></div>`;

    case 'opening-question': return `<div class="question-scene">${kicker('START WITH A QUESTION')}<h1 data-in>What do <em>Wi-Fi,</em><br>AI, medical technology,<br>and space exploration<br>have in common?</h1><div class="question-scene__foot" data-in><div>${['WIRELESS COMMUNICATION', 'ARTIFICIAL INTELLIGENCE', 'MEDICAL TECHNOLOGY', 'SPACE EXPLORATION'].map((part, i) => `<span>${pad(i + 1)} ${part}</span>`).join('')}</div><button class="action-link" type="button" data-go="3">REVEAL THE ANSWER <span>↗</span></button></div></div>`;

    case 'ieee-reveal': return `<div class="reveal-scene"><div>${kicker('THE BIG REVEAL')}<h1 data-in>Meet<br><em>IEEE.</em></h1><p class="reveal-scene__lead" data-in>A global technical community built around knowledge, innovation and impact.</p></div><div class="reveal-scene__right" data-in><img src="${asset('assets/ieee-zc-white.png')}" alt="IEEE Zewail City Student Branch" /><p>Institute of<br><strong>Electrical and Electronics<br>Engineers</strong></p><span>The world’s largest technical professional organization.</span><small>Advancing technology for the benefit of humanity.</small></div></div>`;

    case 'history': return `<div class="history-scene">${intro('A LITTLE HISTORY', 'From electrical engineering<br>to a global technical community.')}<div class="history-scene__track">${milestones.map((m, i) => `<button class="history-mark ${i === 0 ? 'is-active' : ''}" type="button" data-milestone="${i}" aria-pressed="${i === 0}" data-in><span>${m.year}</span><i></i><strong>${m.title}</strong><small>${m.detail}</small></button>`).join('')}</div><p class="history-scene__note" data-in>IEEE was formed in 1963 through the merger of AIEE and IRE. Its technical community has continued to expand.</p></div>`;

    case 'ieee-does': return `<div class="does-scene">${intro('WHAT IEEE DOES', 'Knowledge. Standards.<br>People. Opportunity.')}<div class="does-scene__list">${ieeeDoes.map((part, i) => `<div class="does-row" data-in><span>${pad(i + 1)}</span><strong>${part.title}</strong><p>${part.detail}</p></div>`).join('')}</div></div>`;

    case 'local': return `<div class="local-scene">${kicker('GLOBAL NETWORK. LOCAL IMPACT.')}<h1 data-in>IEEE at<br><em>Zewail City.</em></h1><p data-in>Our student branch is where knowledge becomes experiences, connections and opportunities.</p><img src="${asset('assets/ieee-zc-white.png')}" alt="IEEE Zewail City Student Branch" data-in /></div>`;

    case 'team-work': return `<div class="team-work-scene">${kicker('WHAT WE DO AS A TEAM')}<h1 data-in>We turn ideas<br>into <em>impact.</em></h1><div class="team-work-scene__grid">${[['01','LEARN','Technical sessions and shared knowledge.'],['02','BUILD','Projects, research and creative work.'],['03','CONNECT','People, opportunities and a stronger community.']].map(([n,title,detail])=>`<div class="team-work-scene__item" data-in><span>${n}</span><h2>${title}</h2><p>${detail}</p></div>`).join('')}</div><button class="action-link" type="button" data-go="8" data-in>WATCH OUR STORY <span>↗</span></button></div>`;

    case 'team-film': return `<div class="film-scene">${kicker('THE STORY SO FAR')}<div class="film-scene__heading"><h1 data-in>See what<br><em>we do.</em></h1><p data-in>IEEE Zewail City Student Branch, in motion.</p></div><div class="film-scene__stage" data-in><video id="team-video" src="${asset('assets/ieee-story.mp4')}" controls playsinline preload="metadata" aria-label="IEEE Zewail City Student Branch story video"></video><button class="film-scene__play" type="button" data-play-film aria-label="Play IEEE team video"><span>▶</span><strong>PLAY THE FILM</strong></button></div><button class="film-scene__continue" type="button" data-go="9">MEET THE BOARD <span>↗</span></button></div>`;

    case 'board': return `<div class="board-scene"><div class="board-scene__intro">${kicker('MEET THE BOARD')}<h1 data-in>Four officers.<br><em>One board.</em></h1><p data-in>Different responsibilities, one shared commitment to the branch.</p><div class="board-scene__names" role="tablist" aria-label="Board officers">${board.map((person, i) => `<button class="board-name ${i === 0 ? 'is-active' : ''}" type="button" role="tab" aria-selected="${i === 0}" data-board="${i}"><span>${pad(i + 1)}</span><strong>${esc(person.name)}</strong><small>${esc(person.role)}</small></button>`).join('')}</div></div><div class="board-stage" data-in><span class="board-stage__number">01</span><img id="board-person" src="${cutout(board[0])}" alt="${esc(board[0].name)}" /><div class="board-stage__caption"><span id="board-role">CHAIRMAN</span><strong id="board-name">MOHAMED TAMER</strong></div></div></div>`;

    case 'committees': return `<div class="committees-scene">${intro("HOW WE'RE ORGANIZED", '<em>12</em> committees.<br>One family.', 'Different skills. Shared goals.')}<div class="committee-list">${committees.map((committee, i) => `<button type="button" class="committee-item" data-committee="${i}" data-in><span>${pad(i + 1)}</span><strong>${esc(committee.name)}</strong><i>↗</i></button>`).join('')}</div></div>`;

    case 'leaders-a':
    case 'leaders-b': {
      const start = item.kind === 'leaders-a' ? 0 : 6;
      const group = committees.slice(start, start + 6);
      return `<div class="leaders-scene"><div class="leaders-scene__top">${kicker(`COMMITTEE LEADERS · ${start === 0 ? '01' : '02'} / 02`)}<h1 data-in>${start === 0 ? 'Meet the people<br>leading the work.' : 'And the rest<br>of our leaders.'}</h1><p class="leaders-scene__note" data-in>${start === 0 ? 'Each committee has a Head and Vice Head.' : 'Web Development has a Head only.'}</p></div><div class="leaders-scene__workspace"><div class="leaders-tabs" role="tablist" aria-label="Committees">${group.map((committee, i) => `<button class="leader-tab ${i === 0 ? 'is-active' : ''}" type="button" role="tab" aria-selected="${i === 0}" data-leader="${start + i}"><span>${pad(start + i + 1)}</span>${esc(committee.name)}<i>↗</i></button>`).join('')}</div><div id="leader-panel" class="leader-panel">${leaderPanel(group[0])}</div></div></div>`;
    }

    case 'why-question': return `<div class="pause-scene">${kicker('YOUR TURN')}<h1 data-in>Why are you<br><em>here?</em></h1><p data-in>Not why you applied. Why do you want to be part of this family?</p><div class="pause-scene__bottom" data-in><strong>LET'S HEAR A FEW ANSWERS.</strong><button id="timer" type="button">START 60 SECOND TIMER <span id="timer-readout">01:00</span></button></div></div>`;

    case 'vision': return `<div class="vision-scene">${kicker('WHY WE EXIST')}<h1 data-in>Our vision.</h1><blockquote data-in>Build a community where every member can <em>learn, grow,</em> and make a lasting impact.</blockquote><p data-in>We share knowledge, open doors, support one another, and create experiences and resources that make a real difference in students’ lives.</p><div class="vision-scene__words" data-in><span>BELONG</span><span>GROW</span><span>MAKE A DIFFERENCE</span></div></div>`;

    case 'promises': return `<div class="promises-scene">${intro('OUR CULTURE', 'Three promises<br>to each other.', 'A great season is about what we build together—not only what we deliver.')}<div class="promises-scene__list">${promises.map((part, i) => `<div class="promise" data-in><span>${pad(i + 1)}</span><h2>${part.title}</h2><p>${part.detail}</p></div>`).join('')}</div></div>`;

    case 'your-role': return `<div class="role-scene">${intro('YOUR ROLE IN THIS FAMILY', "You're not here just<br>to complete tasks.", "You're here to help shape the team.")}<div class="role-scene__list">${roles.map((part, i) => `<div class="role-line" data-in><span>${pad(i + 1)}</span><strong>${part.title}</strong><small>${part.detail}</small></div>`).join('')}</div><p class="role-scene__statement" data-in>We recruited you because this team needs you. Its success will be shaped by the people who show up, speak up, and build with us.</p></div>`;

    case 'season-intro': return `<div class="season-intro">${kicker('THE SEASON AHEAD')}<h1 data-in>A season of<br><em>learning, building,</em><br>and opening doors.</h1><p data-in>A few meaningful experiences—plus opportunities beyond the events.</p><span class="season-intro__year" aria-hidden="true">26/27</span></div>`;

    case 'season': return `<div class="season-scene">${intro('OUR 2026 / 27 SEASON', 'Three experiences<br>to look forward to.', 'A focused set of activities with room to learn, connect and create.')}<div class="season-scene__list">${experiences.map((part, i) => `<button class="season-item ${i === 0 ? 'is-active' : ''}" type="button" data-season="${i}" data-in><span>${pad(i + 1)}</span><strong>${part.title}</strong><small>${part.detail}</small><i>↗</i></button>`).join('')}</div></div>`;

    case 'opportunities': return `<div class="opportunities-scene">${intro('BEYOND THE EVENTS', 'And the opportunities<br>in between.', 'Some of the most valuable experiences happen between meetings and events.')}<div class="opportunities-scene__grid">${opportunities.map((part, i) => `<div class="opportunity" data-in><span>${pad(i + 1)}</span><h2>${part.title}</h2><p>${part.detail}</p></div>`).join('')}</div></div>`;

    case 'channels': return `<div class="channels-scene">${intro('HOW WE STAY CONNECTED', 'Three groups.<br>Three different purposes.', 'Every member will be part of all three.')}<div class="channels-scene__list">${channels.map((part, i) => `<button class="channel ${i === 0 ? 'is-active' : ''}" type="button" data-channel="${i}" data-in><span>${pad(i + 1)}</span><strong>${part.title}</strong><b>${part.subtitle}</b><small>${part.detail}</small></button>`).join('')}</div></div>`;

    case 'feedback': return `<div class="feedback-scene">${intro('YOUR VOICE MATTERS', 'Feedback is part<br>of how we grow.', 'We’ll make space for ideas and honest feedback throughout the season.')}<div class="feedback-scene__timeline">${feedback.map((part, i) => `<div class="feedback-stop" data-in><span class="feedback-stop__index">${pad(i + 1)}</span><small>${part.phase}</small><h2>${part.title}</h2><p>${part.detail}</p></div>`).join('')}</div><p class="feedback-scene__note" data-in>Your feedback will help us improve—not just this meeting, but the whole season.</p></div>`;

    case 'hr-conduct': return `<div class="policy-scene policy-scene--matrix">
      <div class="policy-scene__head" data-in><p>PERFORMANCE SYSTEM & MANDATORY MEMBER AGREEMENT <span>SEASON 2026/2027</span></p><h1>Monthly 100-Point<br><em>Evaluation Matrix.</em></h1></div>
      <div class="policy-matrix">
        <div class="policy-matrix__total" data-in><span>MONTHLY TOTAL</span><strong>100</strong><small>POINTS</small><div class="policy-matrix__total-rule"></div></div>
        <div class="policy-matrix__rows">
          <div class="policy-matrix__row" data-in><div class="policy-matrix__score">25<span>PTS</span></div><div class="policy-matrix__copy"><h2>Meeting Attendance</h2><div class="policy-matrix__track"><span class="policy-matrix__bar" style="--share:25%"></span></div></div></div>
          <div class="policy-matrix__row" data-in><div class="policy-matrix__score">50<span>PTS</span></div><div class="policy-matrix__copy"><h2>Task Execution</h2><p>10 Delivery <i>+</i> 10 Formal Mail <i>+</i> 20 Quality <i>+</i> 10 Officers’ Task</p><div class="policy-matrix__track"><span class="policy-matrix__bar" style="--share:50%"></span></div></div></div>
          <div class="policy-matrix__row" data-in><div class="policy-matrix__score">25<span>PTS</span></div><div class="policy-matrix__copy"><h2>Interaction, Professional Conduct<br>& Public Advocacy</h2><div class="policy-matrix__track"><span class="policy-matrix__bar" style="--share:25%"></span></div></div></div>
        </div>
      </div>
      <div class="policy-bonus" data-in><strong>Bonus Points</strong><span><b>+10</b> Early High-Quality Delivery</span><span><b>+5</b> HR</span><span><b>+5</b> Board</span></div>
    </div>`;

    case 'hr-evaluation': return `<div class="policy-scene policy-scene--rules">
      <div class="policy-scene__head" data-in><p>PERFORMANCE SYSTEM & MANDATORY MEMBER AGREEMENT <span>SEASON 2026/2027</span></p><h1>Rules, Recognition<br><em>& Academic Guarantee.</em></h1></div>
      <div class="policy-rules__columns">
        <section class="policy-rules__section" data-in><h2>Task & Apology Rules</h2><div class="policy-rules__line"><strong>Late Submissions</strong><p><b>−15 pts/day.</b> Strict 48-hour cut-off: Direct Zero + Warning.</p></div><div class="policy-rules__line"><strong>Monthly Apologies</strong><p>Exactly <b>2 allowed per month:</b> 1 meeting, 1 task.</p></div><div class="policy-rules__line"><strong>Warning Limit</strong><p>Maximum <b>2 warnings per month.</b> 3rd warning leads to termination.</p></div></section>
        <section class="policy-rules__section" data-in><h2>Certification Tiers <span>70% MINIMUM FLOOR</span></h2><div class="policy-rules__tier"><b>95% – 100%+</b><p>With Highest Distinction <small>Executive Recommendation & Leadership Priority</small></p></div><div class="policy-rules__tier"><b>85% – 94%</b><p>With Distinction</p></div><div class="policy-rules__tier"><b>70% – 84%</b><p>Merit of Contribution</p></div><div class="policy-rules__tier"><b>Below 70%</b><p>Incomplete tenure <small>No certificate issued</small></p></div></section>
      </div>
      <div class="policy-academic" data-in><span>ACADEMIC GUARANTEE</span><strong>100% OFF</strong><p>During Pre-Midterm Week, Midterm Weeks, and Final Exam periods.</p></div>
    </div>`;

    case 'hr-support': return `<div class="policy-scene policy-scene--agreement">
      <div class="policy-scene__head" data-in><p>PERFORMANCE SYSTEM & MANDATORY MEMBER AGREEMENT <span>SEASON 2026/2027</span></p><h1>Sign the<br><em>Member Charter.</em></h1></div>
      <div class="policy-agreement__body">
        <div class="policy-agreement__copy" data-in><span class="policy-agreement__label">MANDATORY NEXT STEP</span><p>Every accepted committee member is required to review and sign the official IEEE Zewail City 2026/2027 Member Agreement Form within <strong>24 hours.</strong></p><div class="policy-agreement__duration" aria-hidden="true"><strong>24</strong><span>HOURS</span></div></div>
        <div class="policy-agreement__requirements" data-in><h2>Requirements for Submission</h2><ol><li><span>01</span><p>Use your official university email <b>(@zewailcity.edu.eg)</b></p></li><li><span>02</span><p>Acknowledge each ethics, confidentiality, and evaluation clause individually</p></li><li><span>03</span><p>Type your full name as your official digital signature</p></li></ol></div>
      </div>
      <div class="policy-agreement__deadline" data-in><span>SUBMISSION DEADLINE</span><strong>Sunday, November 1, 2026</strong><b>11:59 PM · CAIRO TIME</b></div>
    </div>`;

    case 'last-question': return `<div class="last-scene">${kicker('ONE LAST QUESTION')}<h1 data-in>What will make<br>this season worth<br><em>remembering?</em></h1><p data-in>Think about one thing you want to <strong>learn, build, or change.</strong></p><span data-in>LET'S MAKE IT HAPPEN TOGETHER.</span></div>`;

    case 'final': {
      const team = [...committees.flatMap(committee => committee.members).filter(person => person.image), ...board.slice(2)];
      const portrait = person => `<div class="final-scene__portrait" title="${esc(person.name)}"><img src="${groupPath(person)}" alt="${esc(person.name)}" loading="lazy" /></div>`;
      const group = team.slice(8).map(portrait).join('');
      const leaders = board.slice(0, 2).map(person => `<figure class="final-scene__leader"><img src="${groupPath(person)}" alt="${esc(person.name)}" /></figure>`).join('');
      const featured = `${team.slice(0, 4).map(portrait).join('')}${leaders}${team.slice(4, 8).map(portrait).join('')}`;
      return `<div class="final-scene"><div class="final-scene__roster"><div class="final-scene__featured">${featured}</div><div class="final-scene__grid">${group}</div></div><div class="final-scene__content"><h1 data-in>WE ARE<br><em>ONE FAMILY.</em></h1></div></div>`;
    }

    default: return '';
  }
}

const app = $('#app');
const scene = $('#scene');
const viewport = $('.scene-viewport');
const veil = $('#transition');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = Math.max(0, Math.min(slides.length - 1, (Number(location.hash.match(/slide-(\d+)/)?.[1]) || 1) - 1));
let transitioning = false;
let queued = null;
let timerId = null;
let remaining = 60;
let pendingLeader = null;

$('#overview-list').innerHTML = slides.map((slide, i) => `<button class="overview-item" type="button" data-go="${i}"><span>${pad(i + 1)}</span><small>${esc(slide.chapter)}</small><strong>${esc(slide.title)}</strong><i>↗</i></button>`).join('');

function animateEntrance(root = scene) {
  if (reduceMotion.matches) return;
  if ($('.policy-scene', root)) {
    const tl = gsap.timeline();
    tl.fromTo($$('[data-in]', root), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: .55, stagger: .11, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
    if ($('.policy-matrix__bar', root)) tl.fromTo($$('.policy-matrix__bar', root), { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: .7, stagger: .1, ease: 'power2.out', clearProps: 'transform' }, '-=.38');
    return;
  }
  const elements = $$('[data-in]', root);
  gsap.fromTo(elements, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: .72, stagger: .065, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
}

function render(n) {
  scene.querySelector('video')?.pause();
  current = n;
  const slide = slides[n];
  scene.innerHTML = `<section class="scene__inner scene--${slide.kind}" aria-label="Slide ${n + 1}: ${esc(slide.title)}">${sceneContent(n)}</section>`;
  scene.dataset.kind = slide.kind;
  app.dataset.tone = slide.theme;
  $('#chapter').textContent = slide.chapter.toUpperCase();
  $('#count').textContent = `${pad(n + 1)} / ${pad(slides.length)}`;
  $('#progress-fill').style.width = `${((n + 1) / slides.length) * 100}%`;
  $('#previous').disabled = n === 0;
  $('#next').disabled = n === slides.length - 1;
  $$('.overview-item').forEach((item, i) => item.classList.toggle('is-current', i === n));
  viewport.scrollTop = 0;
  history.replaceState(null, '', `#slide-${n + 1}`);
  if (timerId && slide.kind !== 'why-question') { clearInterval(timerId); timerId = null; remaining = 60; }
  if (pendingLeader !== null && (slide.kind === 'leaders-a' || slide.kind === 'leaders-b')) {
    selectLeader(pendingLeader, false);
    pendingLeader = null;
  }
  animateEntrance();
}

function goTo(n) {
  n = Math.max(0, Math.min(slides.length - 1, n));
  if (n === current && !transitioning) return;
  if (transitioning) { queued = n; return; }
  closeOverview();
  closePortrait();
  if (reduceMotion.matches) { render(n); return; }
  transitioning = true;
  const direction = n >= current ? 1 : -1;
  gsap.set(veil, { display: 'flex', xPercent: -104 * direction });
  const tl = gsap.timeline({ onComplete: () => {
    gsap.set(veil, { display: 'none' });
    transitioning = false;
    if (queued !== null && queued !== current) { const next = queued; queued = null; goTo(next); }
    else queued = null;
  } });
  tl.to(veil, { xPercent: 0, duration: .38, ease: 'power3.inOut' })
    .add(() => render(n))
    .to(veil, { xPercent: 104 * direction, duration: .42, ease: 'power3.inOut' });
}

function openOverview() {
  const panel = $('#overview');
  panel.inert = false;
  panel.setAttribute('aria-hidden', 'false');
  panel.classList.add('is-open');
  $('#overview-close').focus();
}
function closeOverview() {
  const panel = $('#overview');
  panel.classList.remove('is-open');
  panel.inert = true;
  panel.setAttribute('aria-hidden', 'true');
}
function openPortrait(file, name, role) {
  const panel = $('#portrait-modal');
  const person = committees.flatMap(committee => committee.members).find(member => member.file === file);
  $('#portrait-content').innerHTML = `<div class="portrait-modal__identity"><span>IEEE ZC-SB · 2026/27</span>${person?.image ? `<img class="portrait-modal__photo" src="${portraitPath(person)}" alt="${esc(name)}" />` : `<b class="portrait-modal__monogram" aria-hidden="true">${esc(monogram(name))}</b>`}<small>${esc(role)}</small></div><span>${esc(role)}</span><h2>${esc(name)}</h2>`;
  panel.inert = false;
  panel.setAttribute('aria-hidden', 'false');
  panel.classList.add('is-open');
  $('#portrait-close').focus();
}
function closePortrait() {
  const panel = $('#portrait-modal');
  panel.classList.remove('is-open');
  panel.inert = true;
  panel.setAttribute('aria-hidden', 'true');
}

function selectBoard(i) {
  const person = board[i];
  $$('.board-name').forEach((button, j) => {
    button.classList.toggle('is-active', j === i);
    button.setAttribute('aria-selected', String(j === i));
  });
  const image = $('#board-person');
  gsap.to(image, { autoAlpha: 0, x: 25, duration: .22, onComplete: () => {
    image.src = cutout(person);
    image.alt = person.name;
    $('#board-role').textContent = person.role.toUpperCase();
    $('#board-name').textContent = person.name.toUpperCase();
    $('.board-stage__number').textContent = pad(i + 1);
    gsap.fromTo(image, { autoAlpha: 0, x: -25 }, { autoAlpha: 1, x: 0, duration: .48, ease: 'power3.out' });
  } });
}
function selectLeader(i, animate = true) {
  const committee = committees[i];
  $$('.leader-tab').forEach(button => {
    const active = Number(button.dataset.leader) === i;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  $('#leader-panel').innerHTML = leaderPanel(committee);
  if (animate) animateEntrance($('#leader-panel'));
}
function startTimer() {
  if (timerId) clearInterval(timerId);
  remaining = 60;
  $('#timer-readout').textContent = '01:00';
  timerId = setInterval(() => {
    remaining -= 1;
    const display = $('#timer-readout');
    if (display) display.textContent = `00:${pad(Math.max(0, remaining))}`;
    if (remaining <= 0) { clearInterval(timerId); timerId = null; }
  }, 1000);
}

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.go !== undefined) { goTo(Number(button.dataset.go)); return; }
  if (button.dataset.board !== undefined) { selectBoard(Number(button.dataset.board)); return; }
  if (button.dataset.committee !== undefined) { const i = Number(button.dataset.committee); pendingLeader = i; goTo(i < 6 ? slides.findIndex(s => s.kind === 'leaders-a') : slides.findIndex(s => s.kind === 'leaders-b')); return; }
  if (button.dataset.leader !== undefined) { selectLeader(Number(button.dataset.leader)); return; }
  if (button.dataset.person) { openPortrait(button.dataset.person, button.dataset.personName, button.dataset.personRole); return; }
  if (button.dataset.playFilm !== undefined) { const video = $('#team-video'); button.hidden = true; video.play().catch(() => { button.hidden = false; }); return; }
  if (button.dataset.milestone !== undefined) { $$('.history-mark').forEach(x => { const active = x === button; x.classList.toggle('is-active', active); x.setAttribute('aria-pressed', String(active)); }); return; }
  if (button.dataset.season !== undefined) { $$('.season-item').forEach(x => x.classList.toggle('is-active', x === button)); return; }
  if (button.dataset.channel !== undefined) { $$('.channel').forEach(x => x.classList.toggle('is-active', x === button)); return; }
  if (button.id === 'timer') { startTimer(); return; }
});

$('#home').addEventListener('click', () => goTo(0));
$('#previous').addEventListener('click', () => goTo(current - 1));
$('#next').addEventListener('click', () => goTo(current + 1));
$('#overview-open').addEventListener('click', openOverview);
$('#overview-close').addEventListener('click', closeOverview);
$('#portrait-close').addEventListener('click', closePortrait);
$('#fullscreen').addEventListener('click', async () => { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); });
document.addEventListener('fullscreenchange', () => $('#fullscreen').setAttribute('aria-label', document.fullscreenElement ? 'Exit full screen' : 'Enter full screen'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeOverview(); closePortrait(); return; }
  if ($('#overview').classList.contains('is-open') || $('#portrait-modal').classList.contains('is-open')) return;
  if (event.target.closest('video') || (event.key === ' ' && event.target.closest('button'))) return;
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); goTo(current + 1); }
  else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); goTo(current - 1); }
  else if (event.key === 'Home') goTo(0);
  else if (event.key === 'End') goTo(slides.length - 1);
  else if (event.key.toLowerCase() === 'o') openOverview();
  else if (event.key.toLowerCase() === 'f') $('#fullscreen').click();
});
let touchStart = null;
viewport.addEventListener('touchstart', event => { touchStart = [event.touches[0].clientX, event.touches[0].clientY]; }, { passive: true });
viewport.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart[0];
  const dy = event.changedTouches[0].clientY - touchStart[1];
  if (Math.abs(dx) > 75 && Math.abs(dx) > Math.abs(dy) * 1.4) goTo(current + (dx < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });
let lastWheel = 0;
viewport.addEventListener('wheel', event => {
  if (window.innerWidth < 900 || Math.abs(event.deltaY) < 18 || transitioning) return;
  if (scene.scrollHeight > viewport.clientHeight + 20) return;
  if (Date.now() - lastWheel < 1000) return;
  lastWheel = Date.now();
  goTo(current + (event.deltaY > 0 ? 1 : -1));
}, { passive: true });
window.addEventListener('hashchange', () => { const target = Number(location.hash.match(/slide-(\d+)/)?.[1]); if (target && target - 1 !== current) goTo(target - 1); });

render(current);
