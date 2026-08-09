/** HaloGo Partner — Business page interactions (V6.2) */

/* Dark Burgundy Luxury hero — business page only. */
(() => {
  const hero = document.querySelector('body.business-page .biz-hero[data-luxury-hero]');
  if (!hero) return;

  const dashboard = hero.querySelector('.biz-dashboard-shell');
  const supportCard = hero.querySelector('.biz-floating-card--support');
  const growthCard = hero.querySelector('.biz-floating-card--growth');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!dashboard || reduceMotion || !finePointer) return;

  let frame = 0;
  let targetX = 50;
  let targetY = 42;

  const render = () => {
    const nx = (targetX - 50) / 50;
    const ny = (targetY - 50) / 50;

    hero.style.setProperty('--luxury-spot-x', `${targetX.toFixed(2)}%`);
    hero.style.setProperty('--luxury-spot-y', `${targetY.toFixed(2)}%`);
    hero.style.setProperty('--luxury-dashboard-ry', `${(-6 + nx * 2.4).toFixed(2)}deg`);
    hero.style.setProperty('--luxury-dashboard-rx', `${(1.6 - ny * 1.6).toFixed(2)}deg`);
    hero.style.setProperty('--luxury-chip-x', `${(nx * 5).toFixed(2)}px`);
    hero.style.setProperty('--luxury-chip-y', `${(ny * 4).toFixed(2)}px`);
    hero.style.setProperty('--luxury-chip-x-reverse', `${(-nx * 3.75).toFixed(2)}px`);
    hero.style.setProperty('--luxury-chip-y-reverse', `${(-ny * 3).toFixed(2)}px`);

    frame = 0;
  };

  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    targetX = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
    targetY = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));

    if (!frame) frame = requestAnimationFrame(render);
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    targetX = 50;
    targetY = 42;
    if (!frame) frame = requestAnimationFrame(render);
  });
})();

/* Business-page-only interaction controller for the income journey. */
(() => {
  const section = document.querySelector('body.business-page .biz-income-section[data-income-interactions]');
  if (!section) return;

  const journey = section.querySelector('.biz-income-journey');
  const cards = Array.from(section.querySelectorAll('.biz-income-card'));
  if (!journey || cards.length === 0) return;

  const defaultStep = '3';
  const setActiveStep = (step) => {
    journey.dataset.activeStep = String(step);
  };
  const resetActiveStep = () => setActiveStep(defaultStep);

  cards.forEach((card, index) => {
    const step = index + 1;
    card.dataset.incomeStep = String(step);
    card.addEventListener('mouseenter', () => setActiveStep(step));
    card.addEventListener('focus', () => setActiveStep(step));
  });

  journey.addEventListener('mouseleave', resetActiveStep);
  journey.addEventListener('focusout', (event) => {
    if (!journey.contains(event.relatedTarget)) resetActiveStep();
  });

  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!supportsFinePointer || reduceMotion) return;

  let animationFrame = 0;
  let spotX = 50;
  let spotY = 38;

  const paintSpotlight = () => {
    journey.style.setProperty('--income-spot-x', `${spotX.toFixed(2)}%`);
    journey.style.setProperty('--income-spot-y', `${spotY.toFixed(2)}%`);
    animationFrame = 0;
  };

  journey.addEventListener('pointermove', (event) => {
    const bounds = journey.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    spotX = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
    spotY = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));

    if (!animationFrame) animationFrame = window.requestAnimationFrame(paintSpotlight);
  }, { passive: true });

  journey.addEventListener('pointerleave', () => {
    spotX = 50;
    spotY = 38;
    if (!animationFrame) animationFrame = window.requestAnimationFrame(paintSpotlight);
  });
})();

/* Premium interactive registration journey — business page only. */
(() => {
  const journey = document.querySelector('body.business-page [data-registration-journey]');
  if (!journey) return;

  const steps = [
    {
      theme: 'burgundy',
      title: 'Muat Turun Tune Talk App',
      description: 'Download the Tune Talk app from the App Store or Google Play to begin your registration.',
      time: '± 2 minit',
      image: 'images/tune-talk-app-mockup.webp',
      list: [
        'Muat turun aplikasi rasmi Tune Talk',
        'Sediakan nombor telefon dan e-mel aktif',
        'Pastikan telefon mempunyai sambungan internet'
      ],
      statusTitle: 'Aplikasi Rasmi',
      statusCopy: 'Tune Talk App',
      badgeTitle: 'Proses Digital',
      badgeCopy: 'Mudah dan pantas'
    },
    {
      theme: 'red',
      title: 'Register as a Halo Telco User',
      description: 'Lengkapkan maklumat peribadi dan pengesahan akaun anda secara digital melalui aplikasi Tune Talk.',
      time: '± 5 minit',
      image: 'images/halo-registration-mockup.webp',
      list: [
        'Isi maklumat peribadi dengan tepat',
        'Lengkapkan proses pengesahan identiti',
        'Make sure your Halo Telco account is successfully registered'
      ],
      statusTitle: 'Account Registration',
      statusCopy: 'Maklumat disahkan',
      badgeTitle: 'Akaun Halo Telco',
      badgeCopy: 'Sedia digunakan'
    },
    {
      theme: 'charcoal',
      title: 'Muat Turun HaloGo Partner',
      description: 'Use the HaloGo Partner app to manage sales, customers, performance and commissions in one place.',
      time: '± 2 minit',
      image: 'images/halogo-dashboard-mockup.webp',
      list: [
        'Muat turun aplikasi HaloGo Partner',
        'Sign in using your registered account',
        'Explore the sales and commission dashboard'
      ],
      statusTitle: 'HaloGo Partner',
      statusCopy: 'Dashboard dealer',
      badgeTitle: 'Urus Perniagaan',
      badgeCopy: 'Dalam satu platform'
    },
    {
      theme: 'champagne',
      title: 'Aktifkan Akaun Partner',
      description: 'Complete your partner profile and payment details to start selling and building income with HaloGo.',
      time: '± 5 minit',
      image: 'images/halogo-success-mockup.webp',
      list: [
        'Lengkapkan maklumat profil partner',
        'Masukkan maklumat akaun bank dengan tepat',
        'Activate your account and start selling Halo plans'
      ],
      statusTitle: 'Akaun Partner',
      statusCopy: 'Berjaya diaktifkan',
      badgeTitle: 'Sedia Menjana',
      badgeCopy: 'Start selling'
    }
  ];

  const tabs = Array.from(journey.querySelectorAll('[data-registration-tab]'));
  const panel = journey.querySelector('[data-registration-panel]');
  const image = journey.querySelector('[data-registration-image]');
  const title = journey.querySelector('[data-registration-title]');
  const description = journey.querySelector('[data-registration-description]');
  const eyebrow = journey.querySelector('[data-registration-eyebrow]');
  const time = journey.querySelector('[data-registration-time]');
  const list = journey.querySelector('[data-registration-list]');
  const cta = journey.querySelector('[data-registration-cta]');
  const statusTitle = journey.querySelector('[data-registration-status-title]');
  const statusCopy = journey.querySelector('[data-registration-status-copy]');
  const badgeTitle = journey.querySelector('[data-registration-badge-title]');
  const badgeCopy = journey.querySelector('[data-registration-badge-copy]');
  const current = journey.querySelector('[data-registration-current]');
  const prev = journey.querySelector('[data-registration-prev]');
  const next = journey.querySelector('[data-registration-next]');
  const controlNext = journey.querySelector('[data-registration-control-next]');

  if (!tabs.length || !panel || !image) return;

  let activeIndex = 0;
  let changeTimer = 0;

  const update = (index, focusTab = false) => {
    const nextIndex = Math.max(0, Math.min(steps.length - 1, index));
    const step = steps[nextIndex];
    activeIndex = nextIndex;

    panel.classList.add('is-changing');
    window.clearTimeout(changeTimer);

    changeTimer = window.setTimeout(() => {
      panel.dataset.theme = step.theme;
      journey.style.setProperty('--registration-progress', `${(nextIndex / (steps.length - 1)) * 100}%`);

      eyebrow.textContent = `Langkah ${String(nextIndex + 1).padStart(2, '0')} daripada 04`;
      time.textContent = step.time;
      title.textContent = step.title;
      description.textContent = step.description;
      image.src = step.image;
      statusTitle.textContent = step.statusTitle;
      statusCopy.textContent = step.statusCopy;
      badgeTitle.textContent = step.badgeTitle;
      badgeCopy.textContent = step.badgeCopy;
      current.textContent = String(nextIndex + 1).padStart(2, '0');

      list.innerHTML = step.list.map((item) => `<li><span aria-hidden="true">✓</span>${item}</li>`).join('');

      tabs.forEach((tab, tabIndex) => {
        const selected = tabIndex === nextIndex;
        tab.classList.toggle('is-active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      prev.disabled = nextIndex === 0;
      controlNext.disabled = nextIndex === steps.length - 1;

      if (nextIndex === steps.length - 1) {
        cta.textContent = 'Register Now';
        next.dataset.finalStep = 'true';
      } else {
        cta.textContent = `Teruskan ke Langkah ${String(nextIndex + 2).padStart(2, '0')}`;
        delete next.dataset.finalStep;
      }

      panel.classList.remove('is-changing');
      if (focusTab) tabs[nextIndex].focus();
    }, 150);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => update(index));
    tab.addEventListener('keydown', (event) => {
      let target = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target === null) return;
      event.preventDefault();
      update(target, true);
    });
  });

  prev.addEventListener('click', () => update(activeIndex - 1));
  controlNext.addEventListener('click', () => update(activeIndex + 1));
  next.addEventListener('click', () => {
    if (activeIndex < steps.length - 1) {
      update(activeIndex + 1);
      return;
    }
    window.open('https://wa.me/60105015754?text=Assalamualaikum%20Team%20Halo.%20Saya%20berminat%20untuk%20daftar%20sebagai%20Rakan%20Niaga%20Halo%20Telco.', '_blank', 'noopener,noreferrer');
  });

  journey.style.setProperty('--registration-progress', '0%');
})();
