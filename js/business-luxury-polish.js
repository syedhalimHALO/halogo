/**
 * HaloGo Partner — Business Page Final Luxury Polish V1
 * Progressive reveals, blur-to-sharp images, active section navigation,
 * and subtle hero depth. All enhancements degrade safely.
 */
(() => {
  "use strict";

  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  ready(() => {
    const body = document.body;
    if (!body?.classList.contains("business-page") || body.dataset.finalLuxuryReady === "true") return;

    body.dataset.finalLuxuryReady = "true";
    body.classList.add("business-final-luxury-v1", "biz-luxury-motion-ready");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Fine grain ------------------------------------------------------- */
    if (!document.querySelector(".business-luxury-grain")) {
      const grain = document.createElement("div");
      grain.className = "business-luxury-grain";
      grain.setAttribute("aria-hidden", "true");
      body.prepend(grain);
    }

    /* Progressive reveal ---------------------------------------------- */
    const revealGroups = [
      { selector: ".biz-hero-copy", stagger: 0, soft: true },
      { selector: ".biz-hero-visual", stagger: 90, soft: true },
      { selector: ".biz-section-head, .halogo-steps-header", stagger: 0, soft: true },
      { selector: ".biz-overview-luxe-card", stagger: 90 },
      { selector: ".biz-overview-luxe-cta", stagger: 0, soft: true },
      { selector: ".biz-income-item", stagger: 70 },
      { selector: ".biz-registration-stage", stagger: 0 },
      { selector: ".biz-sales-story, .biz-sales-row", stagger: 90 },
      { selector: ".biz-commission-tier-strip, .biz-commission-dashboard", stagger: 100 },
      { selector: ".biz-toolkit-rail", stagger: 0 },
      { selector: ".biz-milestone-shell", stagger: 0 },
      { selector: ".final-cta-section .cta-luxe-banner", stagger: 0 }
    ];

    const revealNodes = [];

    revealGroups.forEach(({ selector, stagger, soft }) => {
      document.querySelectorAll(selector).forEach((node, index) => {
        if (node.classList.contains("biz-luxury-reveal")) return;
        node.classList.add("biz-luxury-reveal");
        if (soft) node.classList.add("biz-luxury-reveal--soft");
        node.style.setProperty("--biz-reveal-delay", `${Math.min(index * stagger, 360)}ms`);
        revealNodes.push(node);
      });
    });

    const revealAll = () => revealNodes.forEach((node) => node.classList.add("is-revealed"));

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          currentObserver.unobserve(entry.target);
        });
      }, {
        root: null,
        rootMargin: "0px 0px -7%",
        threshold: 0.06
      });

      revealNodes.forEach((node) => observer.observe(node));
    }

    /* Image blur-to-sharp --------------------------------------------- */
    const premiumImages = Array.from(document.querySelectorAll(
      ".biz-overview-luxe-media img, .biz-income-card img, .biz-sales-slide img, .biz-milestone-thumb img"
    ));

    premiumImages.forEach((image) => {
      image.classList.add("biz-luxury-image");

      const markLoaded = () => window.requestAnimationFrame(() => image.classList.add("is-loaded"));
      if (image.complete && image.naturalWidth > 0) markLoaded();
      else {
        image.addEventListener("load", markLoaded, { once: true });
        image.addEventListener("error", markLoaded, { once: true });
      }
    });


    /* Subtle hero pointer depth -------------------------------------- */
    const hero = document.querySelector("[data-luxury-hero]");
    const heroVisual = hero?.querySelector(".biz-hero-visual");
    let pointerFrame = null;

    const setHeroDepth = (x = 0, y = 0) => {
      if (!heroVisual) return;
      heroVisual.style.setProperty("--lux-hero-x", `${x.toFixed(2)}px`);
      heroVisual.style.setProperty("--lux-hero-y", `${y.toFixed(2)}px`);
    };

    if (hero && heroVisual && !reducedMotion.matches && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      hero.addEventListener("pointermove", (event) => {
        if (pointerFrame !== null) return;
        pointerFrame = window.requestAnimationFrame(() => {
          pointerFrame = null;
          const rect = hero.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - .5) * 14;
          const y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - .5) * 10;
          setHeroDepth(x, y);
        });
      });

      hero.addEventListener("pointerleave", () => setHeroDepth(0, 0));
    }

    const syncReducedMotion = () => {
      if (reducedMotion.matches) {
        revealAll();
        setHeroDepth(0, 0);
      }
    };

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", syncReducedMotion);
    } else if (typeof reducedMotion.addListener === "function") {
      reducedMotion.addListener(syncReducedMotion);
    }
  });
})();

/** HaloGo Partner — Luxury Polish V3 */
(() => {
  "use strict";
  const initV3 = () => {
    const body = document.body;
    if (!body?.classList.contains("business-luxury-v3") || body.dataset.luxuryV3Ready === "true") return;
    body.dataset.luxuryV3Ready = "true";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(document.querySelectorAll(".luxury-v3-section"));

    sections.forEach((section, index) => {
      const red = document.createElement("span");
      red.className = "v3-ambient-orb v3-ambient-orb--red";
      red.setAttribute("aria-hidden", "true");
      const gold = document.createElement("span");
      gold.className = "v3-ambient-orb v3-ambient-orb--gold";
      gold.setAttribute("aria-hidden", "true");
      section.prepend(gold, red);

      const revealTargets = section.querySelectorAll(
        ".biz-section-head, .halogo-steps-header, .biz-overview-luxe-card, .biz-overview-luxe-cta, .biz-income-item, .biz-registration-tabs, .biz-registration-stage, .biz-sales-story, .halo-calc-controls, .halo-calc-result, .halo-calc-achievement, .biz-toolkit-item, .biz-milestone-shell"
      );
      revealTargets.forEach((node, itemIndex) => {
        node.classList.add("v3-reveal");
        node.style.setProperty("--v3-delay", `${Math.min(itemIndex * 65, 325)}ms`);
      });
    });

    const targets = Array.from(document.querySelectorAll(".v3-reveal"));
    const revealAll = () => targets.forEach((el) => el.classList.add("is-v3-visible"));
    if (reduced.matches || !("IntersectionObserver" in window)) revealAll();
    else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-v3-visible");
          obs.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -7%", threshold: .06 });
      targets.forEach((el) => observer.observe(el));
    }

    let frame = null;
    const update = () => {
      frame = null;
      if (reduced.matches || innerWidth < 760) return;
      const vh = Math.max(innerHeight, 1);
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        const progress = ((rect.top + rect.height / 2) - vh / 2) / vh;
        const shift = Math.max(-22, Math.min(22, progress * 20 * (index % 2 ? -1 : 1)));
        section.querySelectorAll(".v3-ambient-orb").forEach((orb) => orb.style.setProperty("--v3-orb-shift", `${shift.toFixed(1)}px`));
      });
    };
    const request = () => { if (frame === null) frame = requestAnimationFrame(update); };
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request, { passive: true });
    request();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initV3, { once: true });
  else initV3();
})();
