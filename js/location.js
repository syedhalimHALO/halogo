/** HaloGo Partner — Store locator */
(() => {
  "use strict";

  const stores = [
      { id: 1, name: 'Grandview Asia Sdn Bhd', type: 'Concept Store', city: 'Klang', state: 'Selangor', address: 'No. 29-G, Jalan Resak 2/KS7, Bandar Botanic, 41200 Klang', phone: '01120239999', lat: 3.0146, lng: 101.4452 },
      { id: 2, name: 'Halo Telco Empire', type: 'Concept Store', city: 'Alor Setar', state: 'Kedah', address: 'No. 66G, Kompleks Persiaran Sultan Abdul Hamid, 05050 Alor Setar', phone: '0107870091', lat: 6.1184, lng: 100.3685 },
      { id: 3, name: 'FNS Marketing Sdn. Bhd.', type: 'Concept Store', city: 'Seremban', state: 'Negeri Sembilan', address: '32-G, Jalan Bunga Raya 7, Pusat Perniagaan Senawang, 70450 Seremban', phone: '01150505026', lat: 2.7258, lng: 101.9378 },
      { id: 4, name: 'E&H Enterprise', type: 'Partner / Agent', city: 'Tawau', state: 'Sabah', address: 'Ground Floor TB314, Kompleks Fajar, 91000 Tawau', phone: '01135432454', lat: 4.2498, lng: 117.8871 },
      { id: 5, name: 'Concept Store Pasir Gudang', type: 'Concept Store', city: 'Pasir Gudang', state: 'Johor', address: 'Jalan Muafakat, Kampung Pasir Puteh, 81700 Pasir Gudang', phone: '0177841828', lat: 1.4620, lng: 103.9007 },
      { id: 6, name: 'CS Halo Telco Tanah Merah', type: 'Concept Store', city: 'Tanah Merah', state: 'Kelantan', address: 'Lot 3238, Jalan Ismail Petra, 17500 Tanah Merah', phone: '0105055026', lat: 5.8107, lng: 102.1505 },
      { id: 7, name: 'Halo Telco Kuantan', type: 'Mini Store', city: 'Kuantan', state: 'Pahang', address: 'Kompleks Dagangan Mahkota, Bandar Indera Mahkota, 25200 Kuantan', phone: '0129617458', lat: 3.8333, lng: 103.2816 },
      { id: 8, name: 'Telco Gemilang Borneo', type: 'Partner / Agent', city: 'Sibu', state: 'Sarawak', address: 'Lorong 2, Jalan Ling Kai Cheng, 96000 Sibu', phone: '01150507770', lat: 2.3175437, lng: 111.8499797 },
      { id: 9, name: 'Gadget Point Trading', type: 'Mini Store', city: 'Batu Pahat', state: 'Johor', address: 'No. 38, Jalan Bintang 12, Taman Koperasi Bahagia, 83000 Batu Pahat', phone: '0105223341', lat: 1.860249, lng: 102.947619 },
      { id: 10, name: 'Miras Ventures', type: 'Partner / Agent', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur', address: 'Residensi Razakmas, Bandar Tun Razak, 56000 Kuala Lumpur', phone: '01150505098', lat: 3.0924405, lng: 101.7198605 },
      { id: 11, name: 'Mobile Pro IT Solution', type: 'Partner / Agent', city: 'Shah Alam', state: 'Selangor', address: 'Kompleks PKNS Shah Alam, Seksyen 14, 40000 Shah Alam', phone: '0169980008', lat: 3.0706628, lng: 101.5150656 },
      { id: 12, name: 'F&J Mini Store Sandakan', type: 'Mini Store', city: 'Sandakan', state: 'Sabah', address: 'Taman Grandview Fasa 2, Jalan Buli Sim-Sim, 90000 Sandakan', phone: '01135612307', lat: 5.863546, lng: 118.1203 }
  ];

  const body = document.body;
  const revealElements = [...document.querySelectorAll(".location-reveal")];

  // Reveal content first. The page must remain usable even if the map CDN is slow.
  requestAnimationFrame(() => {
    body.classList.add("is-location-ready");
    revealElements.forEach(element => element.classList.add("is-visible"));
  });

  const storeList = document.getElementById("storeList");
  const resultCount = document.getElementById("resultCount");
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const stateFilter = document.getElementById("stateFilter");
  const sortFilter = document.getElementById("sortFilter");
  const mapElement = document.getElementById("map");
  const mappedLocationCount = document.getElementById("mappedLocationCount");
  const locateButtons = [
    document.getElementById("locateBtn"),
    document.getElementById("toolbarLocateBtn")
  ].filter(Boolean);

  if (mappedLocationCount) mappedLocationCount.textContent = String(stores.length);

  const malaysiaView = { center: [4.2105, 108.9758], zoom: 6 };
  let map = null;
  let clusterGroup = null;
  let userLocationLayer = null;
  let tileErrorCount = 0;

  const markerLookup = new Map();

  function showMapFallback(message) {
    body.classList.add("location-fallback");
    if (!mapElement) return;

    mapElement.innerHTML = `
      <div class="location-map-fallback" role="status">
        <div>
          <strong>Peta tidak dapat dimuatkan</strong>
          <p>${message}</p>
        </div>
      </div>`;
  }

  function initializeMap() {
    if (!mapElement || typeof window.L === "undefined") {
      showMapFallback("Sambungan kepada perkhidmatan peta belum tersedia. Senarai lokasi dan butang arah masih boleh digunakan.");
      return false;
    }

    try {
      map = L.map("map", {
        zoomControl: true,
        scrollWheelZoom: false,
        keyboard: true,
        preferCanvas: true
      }).setView(malaysiaView.center, malaysiaView.zoom);

      const primaryTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        crossOrigin: true,
        attribution: "&copy; OpenStreetMap contributors"
      });

      primaryTiles.on("tileerror", () => {
        tileErrorCount += 1;
        if (tileErrorCount === 4 && map) {
          map.removeLayer(primaryTiles);
          L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            maxZoom: 20,
            subdomains: "abcd",
            crossOrigin: true,
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
          }).addTo(map);
        }
      });

      primaryTiles.addTo(map);

      if (typeof L.markerClusterGroup === "function") {
        clusterGroup = L.markerClusterGroup({
          showCoverageOnHover: false,
          maxClusterRadius: 48,
          iconCreateFunction(cluster) {
            return L.divIcon({
              html: `<div>${cluster.getChildCount()}</div>`,
              className: "location-custom-cluster",
              iconSize: [48, 48]
            });
          }
        });
      } else {
        clusterGroup = L.layerGroup();
      }

      map.addLayer(clusterGroup);

      window.addEventListener("load", () => {
        window.setTimeout(() => map?.invalidateSize(true), 180);
      }, { once: true });

      new ResizeObserver(() => map?.invalidateSize(false)).observe(mapElement);
      return true;
    } catch (error) {
      console.error("Store locator map initialization failed:", error);
      showMapFallback("Peta gagal dimulakan. Sila muat semula halaman atau gunakan butang Arah pada senarai lokasi.");
      return false;
    }
  }

  const mapReady = initializeMap();

  [...new Set(stores.map(store => store.state))].sort().forEach(state => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateFilter?.appendChild(option);
  });

  function markerIcon(type) {
    const className = type === "Concept Store"
      ? "location-concept"
      : type === "Mini Store"
        ? "location-mini"
        : "location-partner";

    return L.divIcon({
      className: "location-halo-marker-wrap",
      html: `<div class="location-halo-marker ${className}"><span>H</span></div>`,
      iconSize: [38, 46],
      iconAnchor: [19, 44],
      popupAnchor: [0, -40]
    });
  }

  function popupMarkup(store) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
    const whatsappPhone = store.phone.startsWith("0") ? `60${store.phone.slice(1)}` : store.phone;

    return `
      <div class="location-map-popup">
        <span>${store.type}</span>
        <strong>${store.name}</strong>
        <p>${store.address}</p>
        <div>
          <a href="tel:${store.phone}">Hubungi</a>
          <a target="_blank" rel="noopener" href="https://wa.me/${whatsappPhone}">WhatsApp</a>
          <a target="_blank" rel="noopener" href="${mapsUrl}">Arah</a>
        </div>
      </div>`;
  }

  function focusStore(store, marker, card) {
    document.querySelectorAll(".location-store-card.is-active").forEach(item => item.classList.remove("is-active"));
    card?.classList.add("is-active");

    if (map && marker) {
      map.flyTo([store.lat, store.lng], 14, { duration: 0.72 });
      marker.openPopup();
    }
  }

  function createEmptyState() {
    if (!storeList) return;
    storeList.innerHTML = `
      <div class="location-empty-state">
        <span>
          <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>
          </svg>
        </span>
        <strong>Tiada lokasi ditemui</strong>
        <p>Cuba gunakan kata kunci atau pilihan penapis yang berbeza.</p>
      </div>`;
  }

  function renderStores() {
    const keyword = searchInput?.value.trim().toLowerCase() || "";
    const type = typeFilter?.value || "all";
    const state = stateFilter?.value || "all";
    const sort = sortFilter?.value || "name";

    const filtered = stores
      .filter(store => {
        const haystack = `${store.name} ${store.city} ${store.state} ${store.address}`.toLowerCase();
        return (!keyword || haystack.includes(keyword))
          && (type === "all" || store.type === type)
          && (state === "all" || store.state === state);
      })
      .sort((a, b) => sort === "state"
        ? a.state.localeCompare(b.state) || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name));

    if (resultCount) resultCount.textContent = String(filtered.length);
    if (storeList) storeList.innerHTML = "";

    if (clusterGroup) clusterGroup.clearLayers();
    markerLookup.clear();

    filtered.forEach((store, index) => {
      let marker = null;

      if (mapReady && clusterGroup) {
        marker = L.marker([store.lat, store.lng], { icon: markerIcon(store.type) });
        marker.bindPopup(popupMarkup(store));
        clusterGroup.addLayer(marker);
        markerLookup.set(store.id, marker);
      }

      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
      const whatsappPhone = store.phone.startsWith("0") ? `60${store.phone.slice(1)}` : store.phone;

      const card = document.createElement("article");
      card.className = "location-store-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Papar ${store.name} pada peta`);
      card.innerHTML = `
        <div class="location-store-card-top">
          <span class="location-store-index">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <span class="location-store-type">${store.type}</span>
            <h4>${store.name}</h4>
          </div>
        </div>
        <p>${store.address}</p>
        <div class="location-store-meta">
          <span>
            <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21z"></path><circle cx="12" cy="9.5" r="2.3"></circle></svg>
            ${store.city}, ${store.state}
          </span>
          <span class="location-open-status"><i></i>Buka</span>
        </div>
        <div class="location-store-actions">
          <a href="tel:${store.phone}">Panggil</a>
          <a target="_blank" rel="noopener" href="https://wa.me/${whatsappPhone}">WhatsApp</a>
          <a target="_blank" rel="noopener" href="${mapsUrl}">Arah</a>
        </div>`;

      card.addEventListener("click", event => {
        if (event.target.closest("a")) return;
        focusStore(store, marker, card);
      });

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          focusStore(store, marker, card);
        }
      });

      marker?.on("click", () => {
        document.querySelectorAll(".location-store-card.is-active").forEach(item => item.classList.remove("is-active"));
        card.classList.add("is-active");
      });

      storeList?.appendChild(card);
    });

    if (!filtered.length) {
      createEmptyState();
    } else if (map && clusterGroup) {
      const bounds = L.latLngBounds(filtered.map(store => [store.lat, store.lng]));
      map.fitBounds(bounds, { padding: [42, 42], maxZoom: 10 });
      window.setTimeout(() => map.invalidateSize(false), 160);
    }
  }

  function setLocateLoading(loading) {
    locateButtons.forEach(button => {
      button.disabled = loading;
      button.classList.toggle("is-loading", loading);
      button.setAttribute("aria-busy", String(loading));
    });
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      alert("Pelayar anda tidak menyokong fungsi lokasi.");
      return;
    }

    setLocateLoading(true);

    navigator.geolocation.getCurrentPosition(position => {
      const userLatLng = [position.coords.latitude, position.coords.longitude];

      if (map) {
        if (userLocationLayer) map.removeLayer(userLocationLayer);
        userLocationLayer = L.circleMarker(userLatLng, {
          radius: 9,
          fillColor: "#e8b85e",
          color: "#ffffff",
          weight: 4,
          fillOpacity: 1
        }).addTo(map).bindPopup("Lokasi semasa anda").openPopup();

        map.flyTo(userLatLng, 12, { duration: 0.82 });
      }

      setLocateLoading(false);
    }, () => {
      setLocateLoading(false);
      alert("Lokasi tidak dapat diakses. Sila benarkan permission lokasi pada browser.");
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 120000
    });
  }

  searchInput?.addEventListener("input", renderStores);
  [typeFilter, stateFilter, sortFilter].forEach(input => input?.addEventListener("change", renderStores));
  locateButtons.forEach(button => button.addEventListener("click", useMyLocation));

  renderStores();

  // Final layout sync after CSS, fonts and the results panel have settled.
  const refreshMapLayout = () => {
    if (!map) return;
    window.requestAnimationFrame(() => map.invalidateSize({ pan: false, animate: false }));
  };

  window.setTimeout(refreshMapLayout, 250);
  window.setTimeout(refreshMapLayout, 900);

  if (document.fonts?.ready) {
    document.fonts.ready.then(refreshMapLayout).catch(() => {});
  }
})();
