(() => {
  "use strict";

  const plans = {
    epik20: { name: "EpikCall+20", price: 20, activation: 2, bonusEligible: false },
    epik28: { name: "Epik+28", price: 28, activation: 4, bonusEligible: true },
    epik35: { name: "Epik+35", price: 35, activation: 8, bonusEligible: true },
    epik50: { name: "Epik+50", price: 50, activation: 11, bonusEligible: true },
    familySafe: { name: "Epik+ Family Safe", price: 80, activation: 13, bonusEligible: true },
    family: { name: "Epik+ Family", price: 128, activation: 18, bonusEligible: true },
    annual99: { name: "Tahunan 99", price: 99, activation: 10, bonusEligible: true },
    annual200: { name: "Tahunan 200", price: 200, activation: 20, bonusEligible: true }
  };

  const init = () => document.querySelectorAll("[data-halo-commission]").forEach((section) => {
    if (section.dataset.haloCommissionReady === "true") return;
    section.dataset.haloCommissionReady = "true";

    const q = (selector) => section.querySelector(selector);
    const qa = (selector) => Array.from(section.querySelectorAll(selector));
    const qtyInputs = qa("[data-plan-qty]");
    const totalMnpInput = q("[data-total-mnp-input]");
    const mnpLimit = q("[data-halo-mnp-limit]");
    if (!qtyInputs.length || !totalMnpInput) return;

    const money = new Intl.NumberFormat("ms-MY", {
      style: "currency", currency: "MYR", minimumFractionDigits: 2, maximumFractionDigits: 2
    });

    const clamp = (value, min = 0, max = 999) => Math.max(min, Math.min(max, Number.parseInt(value, 10) || 0));
    const setText = (selector, value) => { const el = q(selector); if (el) el.textContent = value; };
    const state = { quantities: {}, totalMnp: 0 };

    const rankFor = (total) => {
      if (total >= 75) return { key: "diamond", name: "Momentum Diamond", previous: 75, target: 75, next: "Highest sales momentum in this illustration", motivation: "Very strong sales performance. Keep up the momentum." };
      if (total >= 30) return { key: "gold", name: "Momentum Gold", previous: 30, target: 75, next: "Menuju ke Momentum Diamond", motivation: "Great! Your sales momentum is now at a strong level." };
      if (total >= 10) return { key: "silver", name: "Momentum Silver", previous: 10, target: 30, next: "Menuju ke Momentum Gold", motivation: "Good momentum. Keep going to build stronger sales momentum." };
      return { key: "bronze", name: "Momentum Bronze", previous: 0, target: 10, next: "Menuju ke Momentum Silver", motivation: total ? "A good start. Every sale takes you closer to the next momentum level." : "Start by entering the quantity of plans sold." };
    };

    const syncInputsToState = () => {
      qtyInputs.forEach((input) => {
        const key = input.dataset.planQty;
        const value = clamp(input.value);
        input.value = String(value);
        state.quantities[key] = value;
        q(`[data-plan-row="${key}"]`)?.classList.toggle("is-active", value > 0);
      });
    };

    const render = () => {
      syncInputsToState();

      let totalQty = 0, activePlans = 0, totalSalesValue = 0, bonusEligibleQty = 0;
      let passive = 0, activation = 0, bonus = 0;

      Object.entries(plans).forEach(([key, plan]) => {
        const qty = state.quantities[key] || 0;
        if (qty > 0) activePlans += 1;
        totalQty += qty;
        totalSalesValue += plan.price * qty;
        passive += plan.price * 0.10 * qty;
        activation += plan.activation * qty;
        if (plan.bonusEligible) {
          bonusEligibleQty += qty;
          bonus += 2 * qty;
        }
      });

      state.totalMnp = clamp(totalMnpInput.value, 0, totalQty);
      totalMnpInput.max = String(totalQty);
      totalMnpInput.value = String(state.totalMnp);
      totalMnpInput.disabled = totalQty === 0;
      qa("[data-total-mnp-step]").forEach((button) => { button.disabled = totalQty === 0; });

      if (mnpLimit) {
        mnpLimit.textContent = totalQty
          ? `Current limit: ${state.totalMnp} of ${totalQty} SIMs sold.`
          : "Enter the plan quantity first before recording MNP.";
      }

      const mnpIncome = state.totalMnp * 10;
      const redemption = 0;
      const total = passive + activation + bonus + mnpIncome + redemption;
      const rank = rankFor(totalQty);
      const progress = rank.key === "diamond"
        ? 100
        : Math.max(0, Math.min(100, (totalQty / rank.target) * 100));

      const activationAverage = totalQty > 0 ? activation / totalQty : 0;
      const cleanRate = (value) => Number.isInteger(value) ? String(value) : value.toFixed(2);

      setText("[data-halo-total-qty]", totalQty);
      setText("[data-halo-active-plans]", activePlans);
      setText("[data-halo-total-mnp]", state.totalMnp);
      setText("[data-halo-summary-qty]", `${totalQty} SIM`);
      setText("[data-halo-summary-plans]", `${activePlans} plans`);
      setText("[data-halo-passive]", money.format(passive));
      setText("[data-halo-activation]", money.format(activation));
      setText("[data-halo-bonus]", money.format(bonus));
      setText("[data-halo-mnp-result]", money.format(mnpIncome));
      setText("[data-halo-redemption]", money.format(redemption));
      setText("[data-halo-passive-formula]", `10% × ${money.format(totalSalesValue)} sales`);
      setText("[data-halo-passive-rate]", "10%");
      setText("[data-halo-activation-formula]", totalQty ? `${money.format(activationAverage)} purata × ${totalQty} SIM` : "Plan rate × 0 SIM");
      setText("[data-halo-activation-rate]", totalQty ? `RM${cleanRate(activationAverage)}/SIM` : "RM0/SIM");
      setText("[data-halo-bonus-formula]", `RM2 × ${bonusEligibleQty} SIM layak`);
      setText("[data-halo-bonus-rate]", "RM2/SIM");
      setText("[data-halo-mnp-formula]", `RM10 × ${state.totalMnp} SIM MNP`);
      setText("[data-halo-mnp-rate]", "RM10/MNP");
      setText("[data-halo-redemption-formula]", "No value in this simulation");
      setText("[data-halo-total]", money.format(total));
      setText("[data-halo-total-bar]", money.format(total));
      setText("[data-halo-rank]", rank.name);
      setText("[data-halo-motivation]", rank.motivation);
      setText("[data-halo-progress-current]", totalQty);
      setText("[data-halo-progress-target]", rank.target);
      setText("[data-halo-progress-copy]", rank.next);
      setText("[data-halo-progress-percent]", `${Math.round(progress)}%`);

      const medal = q("[data-halo-medal]");
      if (medal) {
        const medalSources = {
          bronze: "images/Bronze.webp",
          silver: "images/Silver.webp",
          gold: "images/Gold.webp",
          diamond: "images/Diamond.webp"
        };
        medal.src = medalSources[rank.key];
        medal.alt = `${rank.name} — medal ilustrasi simulasi`;
      }

      const bar = q("[data-halo-progress-bar]");
      if (bar) bar.style.width = `${progress}%`;
      qa("[data-halo-level]").forEach((el) => el.classList.toggle("is-current", el.dataset.haloLevel === rank.key));
    };

    qtyInputs.forEach((input) => input.addEventListener("input", render));

    qa("[data-plan-row] [data-qty-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = button.closest("[data-plan-row]")?.querySelector("[data-plan-qty]");
        if (!input) return;
        input.value = String(clamp(Number(input.value) + Number(button.dataset.qtyStep)));
        render();
      });
    });

    totalMnpInput.addEventListener("input", render);

    qa("[data-total-mnp-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const max = Object.values(state.quantities).reduce((sum, value) => sum + (value || 0), 0);
        totalMnpInput.value = String(clamp(Number(totalMnpInput.value) + Number(button.dataset.totalMnpStep), 0, max));
        render();
      });
    });

    render();
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
