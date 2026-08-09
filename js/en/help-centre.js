/** HaloGo Partner — FAQ Premium V2 controller */
(() => {
  "use strict";

  const init = () => {
    const input = document.getElementById("faqSearch");
    const noResults = document.getElementById("noResults");
    const resultCount = document.getElementById("faqResultCount");
    const groups = Array.from(document.querySelectorAll(".faq-group"));
    const items = Array.from(document.querySelectorAll("[data-faq-item]"));
    const tabs = Array.from(document.querySelectorAll("[data-faq-target]"));
    const stickyLinks = Array.from(document.querySelectorAll(".faq-v2-sticky-nav > a"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!input || !noResults || !items.length) return;

    let activeCategory = "all";

    const normalise = (value) => value.toLocaleLowerCase("ms-MY").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const updateResults = () => {
      const query = normalise(input.value.trim());
      let visibleCount = 0;

      groups.forEach((group) => {
        const categoryMatches = activeCategory === "all" || group.id === activeCategory;
        let groupVisible = 0;

        group.querySelectorAll("[data-faq-item]").forEach((item) => {
          const matchesQuery = !query || normalise(item.textContent).includes(query);
          const show = categoryMatches && matchesQuery;
          item.hidden = !show;
          if (show) {
            visibleCount += 1;
            groupVisible += 1;
            if (query) item.open = true;
          }
        });

        group.hidden = groupVisible === 0;
      });

      noResults.style.display = visibleCount === 0 ? "block" : "none";
      if (resultCount) resultCount.textContent = `${visibleCount} questions`;
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activeCategory = tab.dataset.faqTarget || "all";
        tabs.forEach((button) => {
          const selected = button === tab;
          button.classList.toggle("is-active", selected);
          button.setAttribute("aria-pressed", String(selected));
        });
        updateResults();
        document.querySelector(".faq-v2-content-section")?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      });
    });

    document.querySelectorAll("[data-faq-query]").forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = "all";
        input.value = button.dataset.faqQuery || "";
        tabs.forEach((tab) => {
          const selected = tab.dataset.faqTarget === "all";
          tab.classList.toggle("is-active", selected);
          tab.setAttribute("aria-pressed", String(selected));
        });
        updateResults();
        input.focus();

        const firstVisible = items.find((item) => !item.hidden);
        if (firstVisible) {
          firstVisible.open = true;
          firstVisible.scrollIntoView({
            behavior: reducedMotion.matches ? "auto" : "smooth",
            block: "center"
          });
        }
      });
    });

    document.querySelectorAll("[data-faq-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = document.getElementById(button.dataset.faqOpen || "");
        if (!item) return;
        activeCategory = "all";
        input.value = "";
        updateResults();
        item.open = true;
        item.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
      });
    });

    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        const group = item.closest(".faq-group");
        group?.querySelectorAll("[data-faq-item]").forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });

    input.addEventListener("input", updateResults);

    // Enter = execute search visibly: filter, open the first match, and move the
    // user to the FAQ results area. This keeps live filtering while making the
    // search bar behave like a conventional search field.
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();

      activeCategory = "all";
      tabs.forEach((tab) => {
        const selected = tab.dataset.faqTarget === "all";
        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-pressed", String(selected));
      });

      updateResults();

      const firstVisible = items.find((item) => !item.hidden);
      const target = firstVisible || noResults;

      if (firstVisible) firstVisible.open = true;

      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: firstVisible ? "center" : "start"
      });
    });

    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.focus();
        input.select();
      }
      if (event.key === "Escape" && document.activeElement === input) {
        input.value = "";
        updateResults();
        input.blur();
      }
    });

    if ("IntersectionObserver" in window && stickyLinks.length) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        stickyLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
      }, { rootMargin: "-28% 0px -62%", threshold: [0.01, 0.15, 0.35] });
      groups.forEach((group) => observer.observe(group));
    }

    updateResults();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

/** FAQ Premium V3 — subtle hero depth */
(() => {
  "use strict";
  const init = () => {
    const hero = document.querySelector(".faq-v3-hero");
    const visual = hero?.querySelector(".faq-v3-visual");
    if (!hero || !visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = null;
    hero.addEventListener("pointermove", (event) => {
      if (window.innerWidth < 901) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        visual.style.setProperty("--faq-v3-x", `${(x * 8).toFixed(2)}px`);
        visual.style.setProperty("--faq-v3-y", `${(y * 8).toFixed(2)}px`);
        visual.style.transform = `translate3d(var(--faq-v3-x), var(--faq-v3-y), 0)`;
      });
    }, { passive: true });
    hero.addEventListener("pointerleave", () => {
      visual.style.removeProperty("--faq-v3-x");
      visual.style.removeProperty("--faq-v3-y");
      visual.style.transform = "";
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

