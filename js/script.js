/**
 * HaloGo Partner — shared luxury header controller
 * Keeps the compact-on-scroll state and mobile navigation identical
 * across index.html, business.html and future pages using the same header.
 */
(() => {
  "use strict";

  const initialiseLuxuryHeader = () => {
    const header = document.querySelector(".luxury-header");
    const toggle = header?.querySelector(".nav-toggle");
    const navigation = header?.querySelector(".luxury-nav-links");

    if (!header || !toggle || !navigation || header.dataset.headerReady === "true") return;
    header.dataset.headerReady = "true";

    const updateScrolledState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    const closeMenu = (returnFocus = false) => {
      header.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Buka menu navigasi");
      if (returnFocus) toggle.focus();
    };

    const openMenu = () => {
      header.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Tutup menu navigasi");
    };

    toggle.addEventListener("click", () => {
      if (header.classList.contains("menu-open")) closeMenu();
      else openMenu();
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("menu-open")) {
        closeMenu(true);
      }
    });

    window.addEventListener("scroll", updateScrolledState, { passive: true });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
      updateScrolledState();
    }, { passive: true });

    updateScrolledState();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseLuxuryHeader, { once: true });
  } else {
    initialiseLuxuryHeader();
  }
})();

/**
 * HaloGo Partner — subtle orbital particles
 * Runs the decorative orbit only while its section is near the viewport.
 */
(() => {
  "use strict";

  const initialiseOrbitParticles = () => {
    const section = document.querySelector("[data-why-showcase]");
    const orbitSystem = section?.querySelector("[data-orbit-system]");

    if (!section || !orbitSystem) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sectionIsNearViewport = false;

    const syncOrbitState = () => {
      const shouldAnimate =
        sectionIsNearViewport &&
        !document.hidden &&
        !reducedMotion.matches;

      section.classList.toggle("orbit-active", shouldAnimate);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          sectionIsNearViewport = entries.some((entry) => entry.isIntersecting);
          syncOrbitState();
        },
        {
          root: null,
          rootMargin: "180px 0px",
          threshold: 0.01
        }
      );

      observer.observe(section);
    } else {
      sectionIsNearViewport = true;
    }

    document.addEventListener("visibilitychange", syncOrbitState);

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", syncOrbitState);
    } else if (typeof reducedMotion.addListener === "function") {
      reducedMotion.addListener(syncOrbitState);
    }

    syncOrbitState();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseOrbitParticles, { once: true });
  } else {
    initialiseOrbitParticles();
  }
})();

/**
 * HaloGo Partner — final premium polish
 * Adds progressive scroll reveals, subtle ambient depth and section dividers.
 * All enhancements degrade safely when IntersectionObserver is unavailable.
 */
(() => {
  "use strict";

  const initialisePremiumPolish = () => {
    const body = document.body;
    if (!body || body.dataset.premiumPolishReady === "true") return;

    body.dataset.premiumPolishReady = "true";
    body.classList.add("premium-motion-ready");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Fine grain is decorative only and does not intercept input.
    const grain = document.createElement("div");
    grain.className = "premium-grain";
    grain.setAttribute("aria-hidden", "true");
    body.prepend(grain);

    const ambientSections = [
      [".ht-why-section", "premium-ambient--why"],
      [".epik-plan-section", "premium-ambient--plans"],
      [".epik-benefits-section", "premium-ambient--benefits"],
      [".persona-cd-section", "premium-ambient--personas"],
      [".hg-testi-showcase", "premium-ambient--testimonials"],
      [".final-cta-section", "premium-ambient--cta"]
    ];

    const ambientNodes = [];

    ambientSections.forEach(([selector, variant], index) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const light = document.createElement("span");
      light.className = `premium-ambient-light ${variant}`;
      light.setAttribute("aria-hidden", "true");
      section.prepend(light);
      ambientNodes.push({ section, light, index });

      if (!section.querySelector(":scope > .premium-section-divider")) {
        const divider = document.createElement("span");
        divider.className = "premium-section-divider";
        divider.setAttribute("aria-hidden", "true");
        section.append(divider);
      }
    });

    const revealGroups = [
      { selector: ".trust-item", stagger: 65, soft: true },
      { selector: ".epik-plan-section .section-head", stagger: 0, soft: true },
      { selector: ".plan-card--uniform", stagger: 80 },
      { selector: ".epik-benefits-head", stagger: 0, soft: true },
      { selector: ".epik-benefit-card", stagger: 72 },
      { selector: ".persona-cd-head", stagger: 0, soft: true },
      { selector: ".persona-cd-card", stagger: 68 },
      { selector: ".hg-testi-head", stagger: 0, soft: true },
      { selector: ".hg-testi-panel", stagger: 0 },
      { selector: ".final-cta-section .cta-banner", stagger: 0 },
      { selector: ".footer-brand, .site-footer .footer-col", stagger: 78, soft: true },
      { selector: ".footer-bottom", stagger: 0, soft: true }
    ];

    const revealNodes = [];

    revealGroups.forEach(({ selector, stagger, soft }) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        if (element.classList.contains("premium-reveal")) return;
        element.classList.add("premium-reveal");
        if (soft) element.classList.add("premium-reveal--soft");
        element.style.setProperty("--reveal-delay", `${Math.min(index * stagger, 360)}ms`);
        revealNodes.push(element);
      });
    });

    const revealAll = () => {
      revealNodes.forEach((element) => element.classList.add("is-revealed"));
    };

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -8%",
          threshold: 0.08
        }
      );

      revealNodes.forEach((element) => revealObserver.observe(element));
    }

    // One passive scroll listener drives only tiny ambient shifts.
    let ambientFrame = null;

    const updateAmbientDepth = () => {
      ambientFrame = null;

      if (reducedMotion.matches || window.innerWidth <= 720) {
        ambientNodes.forEach(({ light }) => light.style.setProperty("--ambient-shift", "0px"));
        return;
      }

      const viewportHeight = Math.max(window.innerHeight, 1);

      ambientNodes.forEach(({ section, light, index }) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;

        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const progress = (sectionCenter - viewportCenter) / viewportHeight;
        const direction = index % 2 === 0 ? 1 : -1;
        const shift = Math.max(-18, Math.min(18, progress * 18 * direction));

        light.style.setProperty("--ambient-shift", `${shift.toFixed(2)}px`);
      });
    };

    const requestAmbientUpdate = () => {
      if (ambientFrame !== null) return;
      ambientFrame = window.requestAnimationFrame(updateAmbientDepth);
    };

    window.addEventListener("scroll", requestAmbientUpdate, { passive: true });
    window.addEventListener("resize", requestAmbientUpdate, { passive: true });

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", () => {
        if (reducedMotion.matches) revealAll();
        requestAmbientUpdate();
      });
    }

    requestAmbientUpdate();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialisePremiumPolish, { once: true });
  } else {
    initialisePremiumPolish();
  }
})();

/**
 * HaloGo Partner — Polish V2
 * Smart plan finder, WhatsApp assistant, scroll progress,
 * active navigation, quick navigation and motion performance controls.
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* ---------- Smart Plan Finder ---------- */
    document.querySelectorAll("[data-plan-finder]").forEach((finder) => {
      const section = finder.closest(".epik-plan-section");
      const carousel = section?.querySelector("[data-plan-carousel]");
      const viewport = carousel?.querySelector(".plan-carousel-viewport");
      const buttons = Array.from(finder.querySelectorAll("[data-plan-filter]"));
      const cards = Array.from(carousel?.querySelectorAll("[data-plan-tags]") || []);
      const result = finder.querySelector("[data-plan-result]");

      if (!carousel || !viewport || !buttons.length || !cards.length) return;

      const labels = {
        all: "Semua 6 pelan sedang dipaparkan.",
        budget: "2 pelan bajet rendah ditemui: EpikCall+20 dan Epik+28.",
        data: "4 pelan data besar ditemui, bermula daripada Epik+35.",
        roaming: "3 pelan dengan e-Roaming ditemui.",
        family: "2 pelan keluarga ditemui: Epik+ Family Safe dan Epik+ Family."
      };

      const applyFilter = (filter, shouldScroll = true) => {
        let firstMatch = null;

        buttons.forEach((button) => {
          const active = button.dataset.planFilter === filter;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", String(active));
        });

        cards.forEach((card) => {
          const tags = (card.dataset.planTags || "").split(/\s+/);
          const match = filter === "all" || tags.includes(filter);
          card.classList.toggle("is-plan-match", filter !== "all" && match);
          card.classList.toggle("is-plan-muted", filter !== "all" && !match);
          card.setAttribute("data-plan-match", String(match));
          if (match && !firstMatch) firstMatch = card;
        });

        if (result) result.textContent = labels[filter] || labels.all;

        if (shouldScroll && firstMatch && filter !== "all") {
          const left = firstMatch.offsetLeft - Math.max(0, (viewport.clientWidth - firstMatch.clientWidth) / 2);
          viewport.scrollTo({ left, behavior: reducedMotion.matches ? "auto" : "smooth" });
        } else if (shouldScroll && filter === "all") {
          viewport.scrollTo({ left: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
        }
      };

      buttons.forEach((button) => {
        button.addEventListener("click", () => applyFilter(button.dataset.planFilter || "all"));
      });

      applyFilter("all", false);
    });

    /* ---------- WhatsApp Assistant ---------- */
    const assistant = document.querySelector(".wa-assistant");
    const toggle = assistant?.querySelector("[data-wa-toggle]");
    const panel = assistant?.querySelector("[data-wa-panel]");
    const close = assistant?.querySelector("[data-wa-close]");
    const options = Array.from(assistant?.querySelectorAll("[data-wa-option]") || []);

    if (assistant && toggle && panel) {
      const sourceLink = document.querySelector('.cta-luxe-secondary[href*="wa.me"], .motion-hero-secondary[href*="wa.me"]');
      const phone = sourceLink?.href.match(/wa\.me\/(\d+)/)?.[1] || "60105015754";

      options.forEach((option) => {
        const text = option.dataset.message || "Assalamualaikum Team Halo. Saya perlukan bantuan.";
        option.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      });

      const openPanel = () => {
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Tutup bantuan WhatsApp Team Halo");
        window.requestAnimationFrame(() => options[0]?.focus());
      };

      const closePanel = (returnFocus = false) => {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Buka bantuan WhatsApp Team Halo");
        if (returnFocus) toggle.focus();
      };

      toggle.addEventListener("click", () => {
        if (panel.hidden) openPanel();
        else closePanel(false);
      });

      close?.addEventListener("click", () => closePanel(true));

      document.addEventListener("click", (event) => {
        if (!panel.hidden && !assistant.contains(event.target)) closePanel(false);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !panel.hidden) closePanel(true);
      });
    }

    /* ---------- Scroll progress, active nav and back-to-top ---------- */
    const progress = document.querySelector(".site-scroll-progress span");
    const backToTop = document.querySelector("[data-back-to-top]");
    const navLinks = Array.from(document.querySelectorAll(".luxury-nav-links a:not(.nav-mobile-cta)"));
    const isBusinessPage = document.body.classList.contains("business-page");
    const isStaticInnerPage = isBusinessPage || document.body.classList.contains("help-page") || document.body.classList.contains("location-page");
    const homeLink = navLinks.find((link) => /^index\.html$/.test(link.getAttribute("href") || ""));
    const planLink = navLinks.find((link) => link.getAttribute("href") === "#pelan");
    const contactLink = navLinks.find((link) => link.getAttribute("href") === "#hubungi");
    const businessLink = navLinks.find((link) => /(?:^|\/)business\.html$/.test(link.getAttribute("href") || ""));
    const planSection = document.querySelector("#pelan");
    const ctaSection = document.querySelector("#daftar");
    let scrollFrame = null;

    // On the homepage, JavaScript manages the visible active section.
    // On inner pages, the static page marker (for example Rakan Niaga) stays authoritative.
    if (!isStaticInnerPage && homeLink) {
      homeLink.classList.remove("active");
      homeLink.removeAttribute("aria-current");
    }

    const setActiveNav = (activeLink) => {
      navLinks.forEach((link) => {
        const isActive = !isStaticInnerPage && link === activeLink;
        link.classList.toggle("is-section-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else if (link !== businessLink) link.removeAttribute("aria-current");
      });

      if (isBusinessPage && businessLink) {
        businessLink.classList.add("active");
        businessLink.setAttribute("aria-current", "page");
      }
    };

    const updateScrollUi = () => {
      scrollFrame = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const ratio = Math.max(0, Math.min(1, scrollTop / scrollable));
      if (progress) progress.style.transform = `scaleX(${ratio})`;

      backToTop?.classList.toggle("is-visible", scrollTop > 720);

      if (isStaticInnerPage) {
        if (isBusinessPage) setActiveNav(null);
        return;
      }

      const marker = scrollTop + Math.min(window.innerHeight * 0.34, 280);
      const planTop = planSection?.offsetTop ?? Infinity;
      const planBottom = planTop + (planSection?.offsetHeight || 0);
      const ctaTop = ctaSection?.offsetTop ?? Infinity;

      if (marker >= ctaTop) setActiveNav(contactLink || homeLink);
      else if (marker >= planTop && marker < planBottom) setActiveNav(planLink || homeLink);
      else setActiveNav(homeLink);
    };

    const requestScrollUi = () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(updateScrollUi);
    };

    window.addEventListener("scroll", requestScrollUi, { passive: true });
    window.addEventListener("resize", requestScrollUi, { passive: true });

    backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
    });

    updateScrollUi();

    /* ---------- Pause expensive hero motion off-screen ---------- */
    const hero = document.querySelector(".motion-hero");
    if (hero) {
      let heroVisible = true;

      const syncHeroMotion = () => {
        const pause = !heroVisible || document.hidden || reducedMotion.matches;
        hero.classList.toggle("is-motion-paused", pause);
      };

      if ("IntersectionObserver" in window) {
        const heroObserver = new IntersectionObserver((entries) => {
          heroVisible = entries.some((entry) => entry.isIntersecting);
          syncHeroMotion();
        }, { rootMargin: "120px 0px", threshold: 0.01 });
        heroObserver.observe(hero);
      }

      document.addEventListener("visibilitychange", syncHeroMotion);
      if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener("change", syncHeroMotion);
      }
      syncHeroMotion();
    }
  });
})();

/**
 * HaloGo Partner — starter commission simulator
 * Focuses only on Tier 1, Tier 2 and Tier 3 for new HaloGo Partners.
 */
(() => {
  "use strict";

  const initialiseCommissionCalculator = () => {
    document.querySelectorAll("[data-commission-calculator]").forEach((section) => {
      if (section.dataset.commissionReady === "true") return;
      section.dataset.commissionReady = "true";

      const form = section.querySelector("[data-commission-form]");
      const activePlan = section.querySelector("[data-commission-active]");
      const ownInput = section.querySelector("[data-commission-own]");
      const tier2Input = section.querySelector("[data-commission-tier2]");
      const tier3Input = section.querySelector("[data-commission-tier3]");
      const tierNodes = Array.from(section.querySelectorAll("[data-commission-tier]"));
      const tierLine = section.querySelector("[data-commission-tier-line]");
      const level = section.querySelector("[data-commission-level]");
      const access = section.querySelector("[data-commission-access]");
      const total = section.querySelector("[data-commission-total]");
      const rate = section.querySelector("[data-commission-rate]");
      const ownResult = section.querySelector("[data-commission-own-result]");
      const tier2Result = section.querySelector("[data-commission-tier2-result]");
      const tier3Result = section.querySelector("[data-commission-tier3-result]");

      if (!form || !activePlan || !ownInput || !tier2Input || !tier3Input) return;

      const currency = new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      const numberValue = (input) => {
        const parsed = Number.parseFloat(input.value);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
      };

      const paint = () => {
        const eligible = activePlan.checked;
        const ownCommission = eligible ? numberValue(ownInput) * 0.10 : 0;
        const tier2Commission = eligible ? numberValue(tier2Input) * 0.03 : 0;
        const tier3Commission = eligible ? numberValue(tier3Input) * 0.02 : 0;
        const totalCommission = ownCommission + tier2Commission + tier3Commission;

        tierNodes.forEach((node, index) => {
          node.classList.toggle("is-unlocked", eligible);
          node.classList.toggle("is-current", eligible && index === 0);
        });

        if (tierLine) tierLine.style.width = eligible ? "100%" : "0%";
        if (level) level.textContent = eligible ? "3 TIER ASAS" : "LANGGANAN DIPERLUKAN";
        if (access) access.textContent = eligible ? "Tier 1, Tier 2 dan Tier 3" : "Aktifkan langganan untuk simulasi";
        if (total) total.textContent = currency.format(totalCommission);
        if (rate) rate.textContent = eligible ? "10% + 3% + 2%" : "0%";
        if (ownResult) ownResult.textContent = currency.format(ownCommission);
        if (tier2Result) tier2Result.textContent = currency.format(tier2Commission);
        if (tier3Result) tier3Result.textContent = currency.format(tier3Commission);
      };

      form.addEventListener("input", paint);
      form.addEventListener("change", paint);
      form.addEventListener("reset", () => window.setTimeout(paint, 0));
      paint();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseCommissionCalculator, { once: true });
  } else {
    initialiseCommissionCalculator();
  }
})();


/**
 * HaloGo Partner — interactive reward milestone controller
 * Restores click, arrow and keyboard navigation for Aktiviti, Reward & Kempen.
 */
(() => {
  "use strict";

  const initialiseRewardMilestones = () => {
    document.querySelectorAll("[data-reward-milestone]").forEach((section) => {
      if (section.dataset.rewardReady === "true") return;
      section.dataset.rewardReady = "true";

      const tabs = Array.from(section.querySelectorAll("[data-reward-index]"));
      const viewport = section.querySelector("[data-reward-viewport]");
      const panel = section.querySelector("[data-reward-panel]");
      const brief = section.querySelector(".biz-milestone-brief");
      const briefEyebrow = section.querySelector("[data-reward-brief-eyebrow]");
      const briefTitle = section.querySelector("[data-reward-brief-title]");
      const briefDescription = section.querySelector("[data-reward-brief-description]");
      const progressLine = section.querySelector("[data-reward-line]");
      const previous = section.querySelector("[data-reward-prev]");
      const next = section.querySelector("[data-reward-next]");
      const thumbs = Array.from(section.querySelectorAll("[data-reward-thumb]"));
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (!tabs.length || !panel || !thumbs.length) return;

      let activeIndex = Math.max(0, tabs.findIndex((tab) => tab.classList.contains("is-active")));
      let transitionTimer = null;
      let touchStartX = 0;

      const centreActiveTab = (tab) => {
        if (!viewport || window.innerWidth > 980) return;

        tab.scrollIntoView({
          behavior: reducedMotion.matches ? "auto" : "smooth",
          block: "nearest",
          inline: "center"
        });
      };

      const render = (requestedIndex, options = {}) => {
        const { focus = false, centre = true, animate = true } = options;
        const nextIndex = Math.max(0, Math.min(tabs.length - 1, requestedIndex));
        const activeTab = tabs[nextIndex];
        if (!activeTab) return;

        activeIndex = nextIndex;

        tabs.forEach((tab, index) => {
          const selected = index === activeIndex;
          tab.classList.toggle("is-active", selected);
          tab.setAttribute("aria-selected", String(selected));
          tab.tabIndex = selected ? 0 : -1;
        });

        if (previous) previous.disabled = activeIndex === 0;
        if (next) next.disabled = activeIndex === tabs.length - 1;

        if (progressLine) {
          const progress = tabs.length > 1 ? activeIndex / (tabs.length - 1) : 0;
          progressLine.style.transform = `scaleX(${progress})`;
        }

        const title = activeTab.querySelector("strong")?.textContent?.trim() || "Milestone";
        const eyebrow = activeTab.dataset.rewardEyebrow || "Perjalanan Dealer";
        const description = activeTab.dataset.rewardDescription || "";
        const gallery = (activeTab.dataset.rewardGallery || "")
          .split("|")
          .map((item) => item.trim())
          .filter(Boolean);

        const applyContent = () => {
          if (briefEyebrow) {
            briefEyebrow.textContent = `Milestone ${String(activeIndex + 1).padStart(2, "0")} · ${eyebrow}`;
          }
          if (briefTitle) briefTitle.textContent = title;
          if (briefDescription) briefDescription.textContent = description;

          thumbs.forEach((image, index) => {
            if (gallery[index]) image.src = gallery[index];
            image.alt = `${title} — visual ${index + 1}`;
          });

          panel.setAttribute("aria-labelledby", activeTab.id);
          panel.classList.remove("is-changing");
          brief?.classList.remove("is-changing");
        };

        if (transitionTimer) window.clearTimeout(transitionTimer);

        if (animate && !reducedMotion.matches) {
          panel.classList.add("is-changing");
          brief?.classList.add("is-changing");
          transitionTimer = window.setTimeout(applyContent, 150);
        } else {
          applyContent();
        }

        if (centre) centreActiveTab(activeTab);
        if (focus) activeTab.focus();
      };

      tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => render(index));

        tab.addEventListener("keydown", (event) => {
          let targetIndex = null;

          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            targetIndex = Math.min(tabs.length - 1, index + 1);
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            targetIndex = Math.max(0, index - 1);
          }
          if (event.key === "Home") targetIndex = 0;
          if (event.key === "End") targetIndex = tabs.length - 1;

          if (targetIndex === null) return;
          event.preventDefault();
          render(targetIndex, { focus: true });
        });
      });

      previous?.addEventListener("click", () => render(activeIndex - 1));
      next?.addEventListener("click", () => render(activeIndex + 1));

      viewport?.addEventListener("keydown", (event) => {
        if (event.target.closest("[data-reward-index]")) return;

        if (event.key === "ArrowRight") {
          event.preventDefault();
          render(activeIndex + 1);
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          render(activeIndex - 1);
        }
      });

      section.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0]?.clientX || 0;
      }, { passive: true });

      section.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0]?.clientX || 0;
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < 55) return;
        if (distance < 0) render(activeIndex + 1);
        else render(activeIndex - 1);
      }, { passive: true });

      render(activeIndex, { centre: false, animate: false });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseRewardMilestones, { once: true });
  } else {
    initialiseRewardMilestones();
  }
})();




/**
 * HaloGo Partner — WebP rank badge compatibility patch
 * Keeps the commission calculator on the premium WebP medal assets even if
 * another calculator script still assigns the previous badge-*.png paths.
 */
(() => {
  "use strict";

  const initialiseWebPRankBadges = () => {
    const medal = document.querySelector("[data-halo-medal]");
    if (!medal || medal.dataset.webpBadgeReady === "true") return;

    medal.dataset.webpBadgeReady = "true";

    const badgeSources = {
      bronze: "images/Bronze.webp",
      silver: "images/Silver.webp",
      gold: "images/Gold.webp",
      diamond: "images/Diamond.webp"
    };

    const normaliseRank = (value = "") => {
      const source = String(value).toLowerCase();

      if (source.includes("diamond")) return "diamond";
      if (source.includes("gold")) return "gold";
      if (source.includes("silver")) return "silver";
      return "bronze";
    };

    const applyWebPSource = () => {
      const rankLabel = document.querySelector("[data-halo-rank]")?.textContent || "";
      const currentSource = medal.getAttribute("src") || "";
      const rank = normaliseRank(`${rankLabel} ${currentSource}`);
      const expectedSource = badgeSources[rank];

      if (expectedSource && currentSource !== expectedSource) {
        medal.setAttribute("src", expectedSource);
      }

      medal.setAttribute("alt", `Badge ${rank.charAt(0).toUpperCase() + rank.slice(1)} Dealer`);
    };

    const observer = new MutationObserver(applyWebPSource);
    observer.observe(medal, {
      attributes: true,
      attributeFilter: ["src"]
    });

    const rankLabel = document.querySelector("[data-halo-rank]");
    if (rankLabel) {
      observer.observe(rankLabel, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }

    applyWebPSource();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseWebPRankBadges);
  } else {
    initialiseWebPRankBadges();
  }
})();
