/** HaloGo Partner — Concept & Mini Store Locator
 * Data source: uploaded workbook tab "Concept & Mini Store".
 * Map pins use area focal points; the "Arah" button opens the full address in Google Maps.
 */
(() => {
  "use strict";

  const stores = [{"id":46295,"name":"Halo Telco Concept Store – Klang","type":"Concept Store","owner":"Teh Man Soon","state":"Selangor","city":"Klang","postcode":"41200","address":"No. 29-G, Jalan Resak 2/KS7, Bandar Botanic, 41200 Klang, Selangor","openingHours":"9.00am – 6.00pm","phone":"601120239999","lat":2.9991,"lng":101.4457,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=No.+29-G%2C+Jalan+Resak+2%2FKS7%2C+Bandar+Botanic%2C+41200+Klang%2C+Selangor","status":""},{"id":449,"name":"Halo Telco Mini Store – Banting","type":"Mini Store","owner":"Muhammad Faizal Bin Mohd Zawawi","state":"Selangor","city":"Banting","postcode":"42700","address":"No. 2, Lot 6275, Jalan Susur Intan Kanan, Bukit Changgang, 42700 Banting, Selangor","openingHours":"9.00am – 6.00pm","phone":"601135464748","lat":2.8257,"lng":101.6242,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=No.+2%2C+Lot+6275%2C+Jalan+Susur+Intan+Kanan%2C+Bukit+Changgang%2C+42700+Banting%2C+Selangor","status":""},{"id":141242,"name":"Halo Telco Concept Store – Skudai","type":"Concept Store","owner":"Nor 'Asyikin Binti Abd Hamid","state":"Johor","city":"Skudai","postcode":"81300","address":"No. 17, Jalan Suasa 1, Taman Sri Skudai, 81300 Skudai, Johor","openingHours":"10.00am – 5.00pm","phone":"60108363676","lat":1.5373,"lng":103.6578,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=No.+17%2C+Jalan+Suasa+1%2C+Taman+Sri+Skudai%2C+81300+Skudai%2C+Johor","status":""},{"id":11731,"name":"Halo Telco Concept Store – Pasir Gudang","type":"Concept Store","owner":"Juliana Binti Atan","state":"Johor","city":"Pasir Gudang","postcode":"81700","address":"No. 7, Lot 217395, Tingkat Bawah, Bangunan Haji Baharum, Jalan Muafakat, Kampung Pasir Puteh, 81700 Pasir Gudang, Johor","openingHours":"9.00am – 6.00pm","phone":"60177841828","lat":1.468,"lng":103.9434,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=No.+7%2C+Lot+217395%2C+Tingkat+Bawah%2C+Bangunan+Haji+Baharum%2C+Jalan+Muafakat%2C+Kampung+Pasir+Puteh%2C+81700+Pasir+Gudang%2C+Johor","status":""},{"id":210,"name":"Halo Telco Concept Store – Senawang","type":"Concept Store","owner":"Mohd Fakhrullah Bin Mohd Zawawi","state":"Negeri Sembilan","city":"Senawang","postcode":"70400","address":"32-G, Jalan Bunga Raya 7, Pusat Perniagaan Senawang, 70400 Seremban, Negeri Sembilan","openingHours":"9.00am – 6.00pm","phone":"60142134049","lat":2.6929,"lng":101.9429,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=32-G%2C+Jalan+Bunga+Raya+7%2C+Pusat+Perniagaan+Senawang%2C+70400+Seremban%2C+Negeri+Sembilan","status":""},{"id":13139,"name":"Halo Telco Mini Store – Machang","type":"Mini Store","owner":"Azhar Bin Mohamed Nor","state":"Kelantan","city":"Machang","postcode":"18500","address":"Lot 1565B, Taman Nuri, 18500 Machang, Kelantan","openingHours":"10.00am – 5.00pm","phone":"60107723669","lat":5.7643,"lng":102.2142,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Lot+1565B%2C+Taman+Nuri%2C+18500+Machang%2C+Kelantan","status":""},{"id":1214,"name":"Halo Telco Concept Store – Tanah Merah","type":"Concept Store","owner":"Mohd Azri Bin Jaafar","state":"Kelantan","city":"Tanah Merah","postcode":"17500","address":"Lot 3238, Jalan Ismail Petra, Kampung Banggol Tok Ajar, 17500 Tanah Merah, Kelantan","openingHours":"9.00am – 6.00pm","phone":"60139711170","lat":5.8084,"lng":102.1509,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Lot+3238%2C+Jalan+Ismail+Petra%2C+Kampung+Banggol+Tok+Ajar%2C+17500+Tanah+Merah%2C+Kelantan","status":""},{"id":284346,"name":"Halo Telco Concept Store – Kota Bharu","type":"Concept Store","owner":"Puteri Faten Syamimi Binti Ahmad Nazree","state":"Kelantan","city":"Kota Bharu","postcode":"15200","address":"Lot 1853, PT 731, Jalan Dusun Raja, Mukim Tapang, Kampung Cempaka, 15200 Kota Bharu, Kelantan","openingHours":"9.00am – 6.00pm","phone":"60107938988","lat":6.1254,"lng":102.2381,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Lot+1853%2C+PT+731%2C+Jalan+Dusun+Raja%2C+Mukim+Tapang%2C+Kampung+Cempaka%2C+15200+Kota+Bharu%2C+Kelantan","status":""},{"id":18,"name":"Halo Telco Concept Store – Alor Setar","type":"Concept Store","owner":"Mohd Afiq Bin Abdullah","state":"Kedah","city":"Alor Setar","postcode":"05050","address":"No. 66, Ground Floor, Kompleks Persiaran Sultan Abdul Hamid, 05050 Alor Setar, Kedah","openingHours":"10.00am – 6.00pm","phone":"601120202003","lat":6.1248,"lng":100.3678,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=No.+66%2C+Ground+Floor%2C+Kompleks+Persiaran+Sultan+Abdul+Hamid%2C+05050+Alor+Setar%2C+Kedah","status":""},{"id":14772,"name":"Halo Telco Mini Store – Sungai Petani","type":"Mini Store","owner":"Ikhwanzaini Bin Md Desa","state":"Kedah","city":"Sungai Petani","postcode":"08000","address":"No. 7, Jalan 2, Aman Square, 08000 Sungai Petani, Kedah","openingHours":"10.00am – 5.00pm","phone":"60194058202","lat":5.647,"lng":100.4877,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=No.+7%2C+Jalan+2%2C+Aman+Square%2C+08000+Sungai+Petani%2C+Kedah","status":""},{"id":1809904,"name":"Halo Telco Mini Store – Merbok","type":"Mini Store","owner":"Mohd Firdaus Bin Mat Akhir","state":"Kedah","city":"Merbok","postcode":"08400","address":"Masjid Al-Busyra Merbok, Jalan Tanjung Dawai, 08400 Merbok, Kedah","openingHours":"10.00am – 10.00pm","phone":"60195502991","lat":5.7212,"lng":100.4142,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Masjid+Al-Busyra+Merbok%2C+Jalan+Tanjung+Dawai%2C+08400+Merbok%2C+Kedah","status":""},{"id":123,"name":"Halo Telco Mini Store – Chendering","type":"Mini Store","owner":"Nazri Bin Muhamat","state":"Terengganu","city":"Chendering","postcode":"21080","address":"Lot 851, Jalan Kubang Ikan, Kampung Kubang Ikan, Chendering, 21080 Kuala Terengganu, Terengganu","openingHours":"10.00am – 10.00pm","phone":"60139909755","lat":5.2601,"lng":103.1677,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Lot+851%2C+Jalan+Kubang+Ikan%2C+Kampung+Kubang+Ikan%2C+Chendering%2C+21080+Kuala+Terengganu%2C+Terengganu","status":""},{"id":75221,"name":"Halo Telco Concept Store – Kuantan","type":"Concept Store","owner":"Jamil Bin Sharipuddin","state":"Pahang","city":"Kuantan","postcode":"25200","address":"Lot DG9, Kompleks Dagangan Mahkota, Bandar Indera Mahkota, 25200 Kuantan, Pahang","openingHours":"9.00am – 5.00pm","phone":"60129617458","lat":3.8385,"lng":103.3002,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Lot+DG9%2C+Kompleks+Dagangan+Mahkota%2C+Bandar+Indera+Mahkota%2C+25200+Kuantan%2C+Pahang","status":""},{"id":57023,"name":"Halo Telco Concept Store – Bukit Katil","type":"Concept Store","owner":"Lim Siow Yuin","state":"Melaka","city":"Bukit Katil","postcode":"75450","address":"No. 5, Jalan IKS BK 1, Taman IKS Bukit Katil, 75450 Bukit Katil, Melaka","openingHours":"9.30am – 6.00pm","phone":"60107717548","lat":2.2302,"lng":102.2858,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=No.+5%2C+Jalan+IKS+BK+1%2C+Taman+IKS+Bukit+Katil%2C+75450+Bukit+Katil%2C+Melaka","status":""},{"id":149489,"name":"Halo Telco Mini Store – Ipoh","type":"Mini Store","owner":"Kamarul Zaman Bin Jahan Khir","state":"Perak","city":"Ipoh","postcode":"30100","address":"GP 8, Bazar Medan Kidd, Jalan Tun Abdul Razak, 30100 Ipoh, Perak","openingHours":"8.00am – 5.00pm","phone":"601155087736","lat":4.5969,"lng":101.0828,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=GP+8%2C+Bazar+Medan+Kidd%2C+Jalan+Tun+Abdul+Razak%2C+30100+Ipoh%2C+Perak","status":""},{"id":2237,"name":"Halo Telco Concept Store – Tawau","type":"Concept Store","owner":"Mohd Irwan Mohd Sidik","state":"Sabah","city":"Tawau","postcode":"91000","address":"Ground Floor, TB314, Complex Fajar, 91000 Tawau, Sabah","openingHours":"10.00am – 5.00pm","phone":"601150505067","lat":4.2448,"lng":117.8912,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Ground+Floor%2C+TB314%2C+Complex+Fajar%2C+91000+Tawau%2C+Sabah","status":""},{"id":24125,"name":"Halo Telco Mini Store – Sandakan","type":"Mini Store","owner":"Fauziah Binti Salih","state":"Sabah","city":"Sandakan","postcode":"90000","address":"Annie's Cooking Studio, Ground Floor, Shop Lot 2-3, Taman Tshun Nyen, 90000 Sandakan, Sabah","openingHours":"9.00am – 6.00pm","phone":"601135602307","lat":5.8394,"lng":118.1172,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Annie%27s+Cooking+Studio%2C+Ground+Floor%2C+Shop+Lot+2-3%2C+Taman+Tshun+Nyen%2C+90000+Sandakan%2C+Sabah","status":"Lokasi sementara"},{"id":500476,"name":"Halo Telco Concept Store – Sibu","type":"Concept Store","owner":"Ong Leng Sing","state":"Sarawak","city":"Sibu","postcode":"96000","address":"No. 1J, Lorong Ulu Sungai Merah 40E, 96000 Sibu, Sarawak","openingHours":"9.00am – 6.00pm","phone":"601150507770","lat":2.3195,"lng":111.842,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=No.+1J%2C+Lorong+Ulu+Sungai+Merah+40E%2C+96000+Sibu%2C+Sarawak","status":""}];
  const malaysiaView = { center: [4.2105, 108.9758], zoom: 6 };
  const mapElement = document.getElementById("map");
  const storeList = document.getElementById("storeList");
  const resultCount = document.getElementById("resultCount");
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const stateFilter = document.getElementById("stateFilter");
  const locateBtn = document.getElementById("toolbarLocateBtn");
  const resetMapBtn = document.getElementById("resetMapBtn");

  if (!mapElement || !storeList || !resultCount || !searchInput || !typeFilter || !stateFilter || !locateBtn || !resetMapBtn) return;

  let map;
  let clusterGroup;
  let filteredStores = [...stores];
  let userLocationLayer = null;
  const markerLookup = new Map();
  const cardLookup = new Map();

  [...new Set(stores.map(store => store.type))].sort().forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    typeFilter.appendChild(option);
  });

  [...new Set(stores.map(store => store.state))].sort().forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    stateFilter.appendChild(option);
  });

  function markerIcon(store) {
    const isMiniStore = store.type === "Mini Store";
    return L.divIcon({
      className: "location-halo-marker-wrap",
      html: `<div class="location-halo-marker ${isMiniStore ? "location-halo-marker--mini" : ""}"><span>${isMiniStore ? "M" : "C"}</span></div>`,
      iconSize: [38, 46],
      iconAnchor: [19, 44],
      popupAnchor: [0, -40]
    });
  }

  function whatsappUrl(store) {
    const number = store.phone.startsWith("0") ? `60${store.phone.slice(1)}` : store.phone;
    return `https://wa.me/${number}?text=${encodeURIComponent(`Assalamualaikum. Saya ingin bertanya tentang lokasi ${store.name}.`)}`;
  }

  function phoneDisplay(phone) {
    const digits = String(phone).replace(/\D/g, "");
    if (digits.startsWith("60")) return `+${digits.slice(0, 2)} ${digits.slice(2, 4)}-${digits.slice(4, 8)} ${digits.slice(8)}`;
    return phone;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function initializeMap() {
    map = L.map("map", {
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      boxZoom: true,
      keyboard: true
    }).setView(malaysiaView.center, malaysiaView.zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    clusterGroup = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 42,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      iconCreateFunction(cluster) {
        return L.divIcon({
          html: `<div>${cluster.getChildCount()}</div>`,
          className: "location-custom-cluster",
          iconSize: [48, 48]
        });
      }
    });

    map.addLayer(clusterGroup);
  }

  function fitVisibleStores() {
    if (filteredStores.length) {
      map.fitBounds(
        L.latLngBounds(filteredStores.map(store => [store.lat, store.lng])),
        { padding: [44, 44], maxZoom: 10 }
      );
    } else {
      map.setView(malaysiaView.center, malaysiaView.zoom);
    }
  }

  function focusStore(store) {
    const marker = markerLookup.get(store.id);
    const card = cardLookup.get(store.id);
    if (!marker) return;

    document.querySelectorAll(".location-store-card.is-active").forEach(element => element.classList.remove("is-active"));
    card?.classList.add("is-active");

    clusterGroup.zoomToShowLayer(marker, () => {
      map.flyTo(marker.getLatLng(), 15, { animate: true, duration: 0.85 });
      window.setTimeout(() => marker.openPopup(), 420);
    });
  }

  function detailRow(icon, text, extraClass = "") {
    return `<div class="location-store-detail ${extraClass}">${icon}<span>${escapeHtml(text)}</span></div>`;
  }

  const clockIcon = '<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>';
  const personIcon = '<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M5 21a7 7 0 0 1 14 0"></path></svg>';

  function buildCard(store) {
    const card = document.createElement("article");
    card.className = "location-store-card";
    card.dataset.storeType = store.type;
    card.tabIndex = 0;

    card.innerHTML = `
      <div class="location-store-badges">
        <span class="location-store-type">${escapeHtml(store.type)}</span>
        ${store.status ? `<span class="location-store-status">${escapeHtml(store.status)}</span>` : ""}
      </div>
      <h4>${escapeHtml(store.name)}</h4>
      <p>${escapeHtml(store.address)}</p>
      <div class="location-store-meta">
        <span>${escapeHtml(store.city)}, ${escapeHtml(store.state)}</span>
        <span>${escapeHtml(store.postcode)}</span>
      </div>
      <div class="location-store-details">
        ${detailRow(clockIcon, store.openingHours)}
        ${detailRow(personIcon, `Pengusaha: ${store.owner}`, "location-store-owner")}
      </div>
      <div class="location-store-actions">
        <a href="tel:+${escapeHtml(store.phone)}">Panggil</a>
        <a target="_blank" rel="noopener noreferrer" href="${whatsappUrl(store)}">WhatsApp</a>
        <a target="_blank" rel="noopener noreferrer" href="${escapeHtml(store.mapsUrl)}">Arah</a>
      </div>`;

    card.addEventListener("click", event => {
      if (!event.target.closest("a")) focusStore(store);
    });

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        focusStore(store);
      }
    });

    return card;
  }

  function popupContent(store) {
    return `<div class="location-map-popup">
      <span class="popup-type">${escapeHtml(store.type)}</span>
      <strong>${escapeHtml(store.name)}</strong>
      <p>${escapeHtml(store.address)}</p>
      <div class="popup-meta">
        <span><b>Waktu:</b> ${escapeHtml(store.openingHours)}</span>
        <span><b>Telefon:</b> ${escapeHtml(phoneDisplay(store.phone))}</span>
      </div>
      <a target="_blank" rel="noopener noreferrer" href="${escapeHtml(store.mapsUrl)}">Buka Google Maps</a>
    </div>`;
  }

  function render() {
    const keyword = searchInput.value.trim().toLowerCase();
    const type = typeFilter.value;
    const state = stateFilter.value;

    filteredStores = stores.filter(store => {
      const haystack = `${store.name} ${store.type} ${store.owner} ${store.city} ${store.state} ${store.address} ${store.openingHours}`.toLowerCase();
      return (!keyword || haystack.includes(keyword))
        && (type === "all" || store.type === type)
        && (state === "all" || store.state === state);
    });

    resultCount.textContent = String(filteredStores.length);
    storeList.innerHTML = "";
    clusterGroup.clearLayers();
    markerLookup.clear();
    cardLookup.clear();

    if (!filteredStores.length) {
      storeList.innerHTML = '<div class="location-empty-state"><strong>Tiada lokasi ditemui.</strong><span>Cuba kata kunci atau pilihan filter yang lain.</span></div>';
    }

    filteredStores.forEach(store => {
      const marker = L.marker([store.lat, store.lng], { icon: markerIcon(store) })
        .bindPopup(popupContent(store));

      marker.on("click", () => {
        const card = cardLookup.get(store.id);
        document.querySelectorAll(".location-store-card.is-active").forEach(element => element.classList.remove("is-active"));
        card?.classList.add("is-active");
        card?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });

      clusterGroup.addLayer(marker);
      markerLookup.set(store.id, marker);

      const card = buildCard(store);
      cardLookup.set(store.id, card);
      storeList.appendChild(card);
    });

    fitVisibleStores();
    window.setTimeout(() => map.invalidateSize({ pan: false, animate: false }), 100);
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      window.alert("Pelayar anda tidak menyokong fungsi lokasi.");
      return;
    }

    locateBtn.disabled = true;
    navigator.geolocation.getCurrentPosition(position => {
      const latlng = [position.coords.latitude, position.coords.longitude];

      if (userLocationLayer) map.removeLayer(userLocationLayer);
      userLocationLayer = L.circleMarker(latlng, {
        radius: 9,
        fillColor: "#e8ba65",
        color: "#fff",
        weight: 4,
        fillOpacity: 1
      }).addTo(map).bindPopup("Lokasi semasa anda").openPopup();

      map.flyTo(latlng, 13, { animate: true, duration: 0.8 });
      locateBtn.disabled = false;
    }, () => {
      locateBtn.disabled = false;
      window.alert("Lokasi tidak dapat diakses. Sila benarkan permission lokasi pada browser.");
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 120000
    });
  }

  function start() {
    initializeMap();
    render();

    searchInput.addEventListener("input", render);
    typeFilter.addEventListener("change", render);
    stateFilter.addEventListener("change", render);
    locateBtn.addEventListener("click", useMyLocation);
    resetMapBtn.addEventListener("click", fitVisibleStores);

    window.setTimeout(() => map.invalidateSize({ pan: false, animate: false }), 250);
    document.fonts?.ready?.then(() => map.invalidateSize({ pan: false, animate: false }));
  }

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
})();
