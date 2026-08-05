/** HaloGo Partner — Help Centre search */
(() => {
  "use strict";

  const init = () => {
    const input = document.getElementById("faqSearch");
    const noResults = document.getElementById("noResults");
    if (!input || !noResults) return;

    const groups = Array.from(document.querySelectorAll(".faq-group"));

    const filterFaq = () => {
      const query = input.value.trim().toLowerCase();
      let totalVisible = 0;

      groups.forEach((group) => {
        const items = Array.from(group.querySelectorAll(".faq-item"));
        let groupVisible = 0;

        items.forEach((item) => {
          const show = !query || item.textContent.toLowerCase().includes(query);
          item.hidden = !show;
          if (show) {
            groupVisible += 1;
            totalVisible += 1;
            if (query) item.open = true;
          }
        });

        group.hidden = groupVisible === 0;
      });

      noResults.style.display = totalVisible === 0 ? "block" : "none";
    };

    input.addEventListener("input", filterFaq);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
