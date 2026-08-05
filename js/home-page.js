/** HaloGo Partner — Home page interactions (V6.2) */

document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll("[data-plan-carousel]");

  carousels.forEach(function (carousel) {
    const viewport = carousel.querySelector(".plan-carousel-viewport");
    const cards = Array.from(carousel.querySelectorAll(".plan-card"));
    const previousButton = carousel.querySelector(".plan-carousel-prev");
    const nextButton = carousel.querySelector(".plan-carousel-next");
    const dotsContainer = carousel.querySelector(".plan-carousel-dots");

    if (!viewport || !cards.length || !previousButton || !nextButton || !dotsContainer) {
      return;
    }

    let currentIndex = 0;
    let scrollFrame = null;
    let resizeTimer = null;

    function getCardsPerView() {
      if (window.innerWidth > 980) {
        return 3;
      }

      if (window.innerWidth > 720) {
        return 2;
      }

      return 1;
    }

    function getMaximumIndex() {
      return Math.max(0, cards.length - getCardsPerView());
    }

    function getCardPosition(index) {
      if (!cards[index] || !cards[0]) {
        return 0;
      }

      return cards[index].offsetLeft - cards[0].offsetLeft;
    }

    function createDots() {
      dotsContainer.innerHTML = "";

      const numberOfDots = getMaximumIndex() + 1;

      for (let index = 0; index < numberOfDots; index += 1) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "plan-carousel-dot";
        dot.setAttribute(
          "aria-label",
          "Lihat kumpulan pelan " + (index + 1)
        );

        dot.addEventListener("click", function () {
          goToSlide(index);
        });

        dotsContainer.appendChild(dot);
      }
    }

    function updateInterface() {
      const maximumIndex = getMaximumIndex();

      currentIndex = Math.max(0, Math.min(currentIndex, maximumIndex));
      previousButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === maximumIndex;

      const dots = dotsContainer.querySelectorAll(".plan-carousel-dot");

      dots.forEach(function (dot, index) {
        const isActive = index === currentIndex;

        dot.classList.toggle("is-active", isActive);

        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    }

    function goToSlide(index, behavior) {
      const maximumIndex = getMaximumIndex();

      currentIndex = Math.max(0, Math.min(index, maximumIndex));

      viewport.scrollTo({
        left: getCardPosition(currentIndex),
        behavior: behavior || "smooth"
      });

      updateInterface();
    }

    function findClosestCard() {
      const maximumIndex = getMaximumIndex();
      let closestIndex = 0;
      let closestDistance = Infinity;

      for (let index = 0; index <= maximumIndex; index += 1) {
        const distance = Math.abs(
          viewport.scrollLeft - getCardPosition(index)
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      }

      currentIndex = closestIndex;
      updateInterface();
    }

    previousButton.addEventListener("click", function () {
      goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
      goToSlide(currentIndex + 1);
    });

    viewport.addEventListener(
      "scroll",
      function () {
        if (scrollFrame) {
          window.cancelAnimationFrame(scrollFrame);
        }

        scrollFrame = window.requestAnimationFrame(findClosestCard);
      },
      { passive: true }
    );

    viewport.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToSlide(currentIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToSlide(currentIndex + 1);
      }
    });

    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(function () {
        createDots();
        currentIndex = Math.min(currentIndex, getMaximumIndex());
        goToSlide(currentIndex, "auto");
      }, 150);
    });

    createDots();
    goToSlide(0, "auto");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector("[data-why-showcase]");

  if (!section) {
    return;
  }

  const featureTitles = [
    "Jenama Dipercayai",
    "Komisen Berulang",
    "Sistem Mudah Digunakan",
    "Pelan Mudah Dijual",
    "Sokongan Penuh",
    "Bahan Promosi Lengkap"
  ];

  const features = Array.from(section.querySelectorAll("[data-why-index]"));
  const dots = Array.from(section.querySelectorAll("[data-why-dot]"));
  const activeTitle = section.querySelector("[data-why-active-title]");
  const mobileTrack = section.querySelector("[data-why-mobile-track]");
  const mobileFeatures = mobileTrack
    ? Array.from(mobileTrack.querySelectorAll("[data-why-index]"))
    : [];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 1;
  let autoTimer = null;
  let scrollFrame = null;
  let isProgrammaticScroll = false;

  function setActive(index, options) {
    const settings = options || {};
    const normalizedIndex = ((index % featureTitles.length) + featureTitles.length) % featureTitles.length;

    activeIndex = normalizedIndex;

    features.forEach(function (feature) {
      const featureIndex = Number(feature.dataset.whyIndex);
      const isActive = featureIndex === activeIndex;

      feature.classList.toggle("is-active", isActive);
      feature.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    dots.forEach(function (dot) {
      const dotIndex = Number(dot.dataset.whyDot);
      const isActive = dotIndex === activeIndex;

      dot.classList.toggle("is-active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    if (activeTitle) {
      activeTitle.textContent = featureTitles[activeIndex];
    }

    if (settings.scrollMobile && mobileFeatures[activeIndex] && window.innerWidth <= 980) {
      isProgrammaticScroll = true;

      mobileFeatures[activeIndex].scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "nearest",
        inline: "center"
      });

      window.setTimeout(function () {
        isProgrammaticScroll = false;
      }, reducedMotion.matches ? 0 : 500);
    }
  }

  function stopAutoRotate() {
    if (autoTimer) {
      window.clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function startAutoRotate() {
    stopAutoRotate();

    if (reducedMotion.matches) {
      return;
    }

    autoTimer = window.setInterval(function () {
      setActive(activeIndex + 1, { scrollMobile: true });
    }, 3400);
  }

  features.forEach(function (feature) {
    feature.addEventListener("click", function () {
      setActive(Number(feature.dataset.whyIndex), { scrollMobile: true });
      startAutoRotate();
    });
  });

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      setActive(Number(dot.dataset.whyDot), { scrollMobile: true });
      startAutoRotate();
    });
  });

  if (mobileTrack) {
    mobileTrack.addEventListener(
      "scroll",
      function () {
        if (isProgrammaticScroll) {
          return;
        }

        if (scrollFrame) {
          window.cancelAnimationFrame(scrollFrame);
        }

        scrollFrame = window.requestAnimationFrame(function () {
          const trackCenter = mobileTrack.scrollLeft + mobileTrack.clientWidth / 2;
          let closestIndex = activeIndex;
          let closestDistance = Infinity;

          mobileFeatures.forEach(function (feature) {
            const featureCenter = feature.offsetLeft + feature.offsetWidth / 2;
            const distance = Math.abs(trackCenter - featureCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = Number(feature.dataset.whyIndex);
            }
          });

          if (closestIndex !== activeIndex) {
            setActive(closestIndex, { scrollMobile: false });
          }
        });
      },
      { passive: true }
    );

    mobileTrack.addEventListener("mouseenter", stopAutoRotate);
    mobileTrack.addEventListener("mouseleave", startAutoRotate);
    mobileTrack.addEventListener("touchstart", stopAutoRotate, { passive: true });
    mobileTrack.addEventListener("touchend", startAutoRotate, { passive: true });
  }

  section.addEventListener("mouseenter", stopAutoRotate);
  section.addEventListener("mouseleave", startAutoRotate);
  section.addEventListener("focusin", stopAutoRotate);
  section.addEventListener("focusout", function (event) {
    if (!section.contains(event.relatedTarget)) {
      startAutoRotate();
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAutoRotate();
    } else {
      startAutoRotate();
    }
  });

  reducedMotion.addEventListener("change", function () {
    startAutoRotate();
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            section.classList.add("is-visible");
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(section);
  } else {
    section.classList.add("is-visible");
  }

  setActive(activeIndex, { scrollMobile: false });
  startAutoRotate();
});

document.addEventListener("DOMContentLoaded", function () {
  const planCarousels = document.querySelectorAll("[data-plan-carousel]");

  planCarousels.forEach(function (carousel) {
    const toggles = Array.from(carousel.querySelectorAll("[data-plan-toggle]"));

    function closeToggle(toggle) {
      const panelId = toggle.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      const card = toggle.closest(".plan-card");

      toggle.setAttribute("aria-expanded", "false");
      card?.classList.remove("is-open");

      if (panel) {
        panel.setAttribute("aria-hidden", "true");
        panel.style.maxHeight = "0px";
      }
    }

    function openToggle(toggle) {
      const panelId = toggle.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      const card = toggle.closest(".plan-card");

      toggles.forEach(function (otherToggle) {
        if (otherToggle !== toggle) {
          closeToggle(otherToggle);
        }
      });

      toggle.setAttribute("aria-expanded", "true");
      card?.classList.add("is-open");

      if (panel) {
        panel.setAttribute("aria-hidden", "false");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
          closeToggle(toggle);
        } else {
          openToggle(toggle);
        }
      });

      toggle.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeToggle(toggle);
          toggle.focus();
        }
      });
    });

    window.addEventListener("resize", function () {
      const openToggleButton = carousel.querySelector('[data-plan-toggle][aria-expanded="true"]');

      if (!openToggleButton) {
        return;
      }

      const panel = document.getElementById(openToggleButton.getAttribute("aria-controls"));

      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-testimonial-showcase]").forEach(function (showcase) {
    const quote = showcase.querySelector("[data-testi-quote]");
    const name = showcase.querySelector("[data-testi-name]");
    const role = showcase.querySelector("[data-testi-role]");
    const thumbs = Array.from(showcase.querySelectorAll(".hg-testi-thumb"));
    let activeIndex = 0;
    let swapTimer = null;

    function setActive(index) {
      const thumb = thumbs[index];
      if (!thumb || index === activeIndex && thumb.classList.contains("is-active")) return;

      window.clearTimeout(swapTimer);
      showcase.classList.add("is-switching");

      swapTimer = window.setTimeout(function () {
        quote.textContent = thumb.dataset.quote;
        name.textContent = thumb.dataset.name;
        role.textContent = thumb.dataset.role;

        thumbs.forEach(function (item, itemIndex) {
          const isActive = itemIndex === index;
          item.classList.toggle("is-active", isActive);
          if (isActive) item.setAttribute("aria-current", "true");
          else item.removeAttribute("aria-current");
        });

        activeIndex = index;
        showcase.classList.remove("is-switching");
      }, 150);
    }

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener("mouseenter", function () { setActive(index); });
      thumb.addEventListener("focus", function () { setActive(index); });
      thumb.addEventListener("click", function () { setActive(index); });

      thumb.addEventListener("keydown", function (event) {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + thumbs.length) % thumbs.length;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % thumbs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = thumbs.length - 1;
        thumbs[nextIndex].focus();
        setActive(nextIndex);
      });
    });
  });
});
