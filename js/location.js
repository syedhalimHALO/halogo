/** HaloGo Partner — Coordinates-only Store Locator */
(() => {
  "use strict";
  const stores = [{"id":500476,"name":"Telco Gemilang Borneo","type":"Partner / Agent","state":"Sarawak","city":"Sibu","postcode":"96000","address":"NO.4 , G/FLOOR , LORONG 2 , JALAN LING KAI CHENG ,96000, SIBU, sarawak, MALAYSIA","phone":"01150507770","email":"telcogemilangborneosibu@gmail.com","lat":2.3175437,"lng":111.8499797,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=NO.4+%2C+G%2FFLOOR+%2C+LORONG+2+%2C+JALAN+LING+KAI+CHENG+%2C96000%2C+SIBU%2C+sarawak%2C+MALAYSIA","notes":"OK"},{"id":117,"name":"GADGET POINT TRADING","type":"Partner / Agent","state":"Johor","city":"Batu Pahat","postcode":"83000","address":"No 38, jalan bintang 12, taman koperasi bahagia,83000, Batu Pahat, johor, Malaysia","phone":"0105223341","email":"gadgetpointtrading@yahoo.com","lat":1.860249,"lng":102.947619,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=No+38%2C+jalan+bintang+12%2C+taman+koperasi+bahagia%2C83000%2C+Batu+Pahat%2C+johor%2C+Malaysia","notes":"OK"},{"id":24125,"name":"F&J MINI STORE SANDAKAN ( 01135602307 )","type":"Mini Store","state":"Sabah","city":"Sandakan","postcode":"90000","address":"LOT 9 BLOK B TINGKAT BAWAH TAMAN GRANDVIEW FASA 2 JALAN BULI SIM-SIM90000, Sandakan, sabah, Malaysia","phone":"01135612307","email":"jimmykrkeanz@gmail.com","lat":5.863546,"lng":118.1203,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=LOT+9+BLOK+B+TINGKAT+BAWAH+TAMAN+GRANDVIEW+FASA+2+JALAN+BULI+SIM-SIM90000%2C+Sandakan%2C+sabah%2C+Malaysia","notes":"OK"},{"id":37,"name":"MIRAS VENTURES","type":"Partner / Agent","state":"W.P. Kuala Lumpur","city":"Kuala Lumpur","postcode":"56000","address":"Residensi Razakmas Jalan Bakti Bandar Tun Razak56000, KUALA LUMPUR, wilayah persekutuan kuala lumpur, Malaysia","phone":"01150505098","email":"mirasventures88@gmail.com","lat":3.0924405,"lng":101.7198605,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Residensi+Razakmas+Jalan+Bakti+Bandar+Tun+Razak56000%2C+KUALA+LUMPUR%2C+wilayah+persekutuan+kuala+lumpur%2C+Malaysia","notes":"OK"},{"id":50,"name":"AZWAN (EG PULAU INDAH,PORT KLANG)","type":"EasyGo / Partner","state":"Selangor","city":"Pelabuhan Klang","postcode":"42920","address":"NO 48 JALAN SAMUDERA 10/6 LAGUNA PARK,PULAU INDAH42920, PELABUHAN KLANG, selangor, Malaysia","phone":"01159295929","email":"azwanaris87@gmail.com","lat":2.94375,"lng":101.35613,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=NO+48+JALAN+SAMUDERA+10%2F6+LAGUNA+PARK%2CPULAU+INDAH42920%2C+PELABUHAN+KLANG%2C+selangor%2C+Malaysia","notes":"OK"},{"id":2788,"name":"ABE RUL ENTERPRISE","type":"Partner / Agent","state":"Kelantan","city":"Pasir Mas","postcode":"17000","address":"Lot 1149-D Jalan Lemal17000, Pasir Mas, kelantan, Malaysia","phone":"0195895605","email":"amirul199562@gmail.com","lat":6.027222,"lng":102.144917,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Lot+1149-D+Jalan+Lemal17000%2C+Pasir+Mas%2C+kelantan%2C+Malaysia","notes":"OK"},{"id":14750,"name":"DMG EMPIRE","type":"Partner / Agent","state":"Perlis","city":"Simpang Empat","postcode":"02700","address":"NO.23 JALAN SUNGAI PADANG,02700, SIMPANG EMPAT, perlis, Malaysia","phone":"01118517038","email":"masshitah1985@gmail.com","lat":6.3229104,"lng":100.1844619,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=NO.23+JALAN+SUNGAI+PADANG%2C02700%2C+SIMPANG+EMPAT%2C+perlis%2C+Malaysia","notes":"OK"},{"id":16349,"name":"IZA HASNITA BINTI JANTAN","type":"Partner / Agent","state":"Negeri Sembilan","city":"Gemencheh","postcode":"73200","address":"NO 1, BAZAR MARA GEMENCHEH LAMA, GEMENCHEH ,NEGERI SEMBILAN73200, Gemencheh, negeri sembilan, Malaysia","phone":"0192323205","email":"izazamry@gmail.com","lat":2.5574059,"lng":102.4182597,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=NO+1%2C+BAZAR+MARA+GEMENCHEH+LAMA%2C+GEMENCHEH+%2CNEGERI+SEMBILAN73200%2C+Gemencheh%2C+negeri+sembilan%2C+Malaysia","notes":"OK"},{"id":30919,"name":"MOBILE PRO IT SOLUTION","type":"Partner / Agent","state":"Selangor","city":"Shah Alam","postcode":"40000","address":"LOT 01-177B, TINGKAT SATU KOMPLEKS PKNS SHAH ALAM, SEKSYEN 14, 40000 SHAH ALAM, SELANGOR.40000, Shah Alam, selangor, Malaysia","phone":"0169980008","email":"firdausrohan@gmail.com","lat":3.0706628,"lng":101.5150656,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=LOT+01-177B%2C+TINGKAT+SATU+KOMPLEKS+PKNS+SHAH+ALAM%2C+SEKSYEN+14%2C+40000+SHAH+ALAM%2C+SELANGOR.40000%2C+Shah+Alam%2C+selangor%2C+Malaysia","notes":"Poskod berulang dalam alamat"},{"id":47421,"name":"MOHAMAD ZAKARIA BIN DELAH","type":"Partner / Agent","state":"Sarawak","city":"Bandar Baru Semariang","postcode":"93050","address":"LOT 1230 LORONG CAHYA MATA 2C,RPR OFF JALAN SULTAN TENGAH93050, BANDAR BARU SEMARIANG, sarawak, MALAYSIA","phone":"0109745131","email":"mzria87@gmail.com","lat":1.634297,"lng":110.338066,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=LOT+1230+LORONG+CAHYA+MATA+2C%2CRPR+OFF+JALAN+SULTAN+TENGAH93050%2C+BANDAR+BARU+SEMARIANG%2C+sarawak%2C+MALAYSIA","notes":"OK"},{"id":124505,"name":"KHAIRUL MAKMUR BIN SHARIF","type":"Partner / Agent","state":"Pahang","city":"Bandar Pusat Jengka","postcode":"","address":"NO 351 FELDA JENGKA 1326400, Bandar Pusat Jengka, pahang, MALAYSIA","phone":"0172755227","email":"khairulmakmur888@gmail.com","lat":3.76049,"lng":102.46216,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=NO+351+FELDA+JENGKA+1326400%2C+Bandar+Pusat+Jengka%2C+pahang%2C+MALAYSIA","notes":"Poskod tiada/tidak dikenal pasti; Telefon berulang"},{"id":136587,"name":"TELCOFFEE NETWORK","type":"Partner / Agent","state":"Sabah","city":"Lahad Datu","postcode":"91100","address":"Lot 135 , MDLD 8735 , Phase 5 , Bandar Sri Perdana , Jalan Silam,91100, Lahad Datu, sabah, Malaysia","phone":"01135329383","email":"mrhalotelco@gmail.com","lat":5.0264756,"lng":118.2900159,"mapsUrl":"https://www.google.com/maps/search/?api=1&query=Lot+135+%2C+MDLD+8735+%2C+Phase+5+%2C+Bandar+Sri+Perdana+%2C+Jalan+Silam%2C91100%2C+Lahad+Datu%2C+sabah%2C+Malaysia","notes":"OK"}];
  const malaysiaView = { center: [4.2105, 108.9758], zoom: 6 };
  const mapElement = document.getElementById("map");
  const storeList = document.getElementById("storeList");
  const resultCount = document.getElementById("resultCount");
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const stateFilter = document.getElementById("stateFilter");
  const locateBtn = document.getElementById("toolbarLocateBtn");
  const resetMapBtn = document.getElementById("resetMapBtn");
  let map, clusterGroup, filteredStores = [...stores], userLocationLayer = null;
  const markerLookup = new Map();
  const cardLookup = new Map();

  [...new Set(stores.map(s => s.type))].sort().forEach(value => {
    const option = document.createElement("option"); option.value = value; option.textContent = value; typeFilter.appendChild(option);
  });
  [...new Set(stores.map(s => s.state))].sort().forEach(value => {
    const option = document.createElement("option"); option.value = value; option.textContent = value; stateFilter.appendChild(option);
  });

  function markerIcon() {
    return L.divIcon({className:"location-halo-marker-wrap",html:'<div class="location-halo-marker"><span>H</span></div>',iconSize:[38,46],iconAnchor:[19,44],popupAnchor:[0,-40]});
  }

  function whatsappUrl(store) {
    const number = store.phone.startsWith("0") ? `60${store.phone.slice(1)}` : store.phone;
    return `https://wa.me/${number}?text=${encodeURIComponent(`Assalamualaikum. Saya ingin bertanya tentang lokasi Halo Telco: ${store.name}.`)}`;
  }

  function initializeMap() {
    map = L.map("map", {zoomControl:true,scrollWheelZoom:true,doubleClickZoom:true,touchZoom:true,boxZoom:true,keyboard:true})
      .setView(malaysiaView.center, malaysiaView.zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom:19,attribution:"&copy; OpenStreetMap contributors"}).addTo(map);
    clusterGroup = L.markerClusterGroup({showCoverageOnHover:false,maxClusterRadius:42,spiderfyOnMaxZoom:true,zoomToBoundsOnClick:true,
      iconCreateFunction(cluster){return L.divIcon({html:`<div>${cluster.getChildCount()}</div>`,className:"location-custom-cluster",iconSize:[48,48]});}
    });
    map.addLayer(clusterGroup);
  }

  function focusStore(store) {
    const marker = markerLookup.get(store.id);
    const card = cardLookup.get(store.id);
    if (!marker) return;
    document.querySelectorAll(".location-store-card.is-active").forEach(el => el.classList.remove("is-active"));
    card?.classList.add("is-active");
    clusterGroup.zoomToShowLayer(marker, () => {
      map.flyTo(marker.getLatLng(), 16, {animate:true,duration:.85});
      window.setTimeout(() => marker.openPopup(), 420);
    });
  }

  function buildCard(store) {
    const card = document.createElement("article");
    card.className = "location-store-card";
    card.tabIndex = 0;
    card.innerHTML = `<span class="location-store-type">${store.type}</span><h4>${store.name}</h4><p>${store.address}</p>
      <div class="location-store-meta"><span>${store.city}, ${store.state}</span><span>${store.postcode || ""}</span></div>
      <div class="location-store-actions"><a href="tel:${store.phone}">Panggil</a><a target="_blank" rel="noopener" href="${whatsappUrl(store)}">WhatsApp</a><a target="_blank" rel="noopener" href="${store.mapsUrl}">Arah</a></div>`;
    card.addEventListener("click", e => { if (!e.target.closest("a")) focusStore(store); });
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); focusStore(store); } });
    return card;
  }

  function render() {
    const keyword = searchInput.value.trim().toLowerCase(), type = typeFilter.value, state = stateFilter.value;
    filteredStores = stores.filter(store => {
      const haystack = `${store.name} ${store.type} ${store.city} ${store.state} ${store.address}`.toLowerCase();
      return (!keyword || haystack.includes(keyword)) && (type === "all" || store.type === type) && (state === "all" || store.state === state);
    });
    resultCount.textContent = String(filteredStores.length);
    storeList.innerHTML = ""; clusterGroup.clearLayers(); markerLookup.clear(); cardLookup.clear();
    filteredStores.forEach(store => {
      const marker = L.marker([store.lat,store.lng],{icon:markerIcon()}).bindPopup(`<div class="location-map-popup"><strong>${store.name}</strong><p>${store.address}</p><a target="_blank" rel="noopener" href="${store.mapsUrl}">Buka Google Maps</a></div>`);
      marker.on("click", () => { const card = cardLookup.get(store.id); document.querySelectorAll(".location-store-card.is-active").forEach(el => el.classList.remove("is-active")); card?.classList.add("is-active"); card?.scrollIntoView({behavior:"smooth",block:"nearest"}); });
      clusterGroup.addLayer(marker); markerLookup.set(store.id, marker);
      const card = buildCard(store); cardLookup.set(store.id, card); storeList.appendChild(card);
    });
    if (filteredStores.length) map.fitBounds(L.latLngBounds(filteredStores.map(s => [s.lat,s.lng])),{padding:[44,44],maxZoom:10});
    else map.setView(malaysiaView.center, malaysiaView.zoom);
    window.setTimeout(() => map.invalidateSize({pan:false,animate:false}),100);
  }

  function useMyLocation() {
    if (!navigator.geolocation) return alert("Pelayar anda tidak menyokong fungsi lokasi.");
    locateBtn.disabled = true;
    navigator.geolocation.getCurrentPosition(pos => {
      const latlng = [pos.coords.latitude,pos.coords.longitude];
      if (userLocationLayer) map.removeLayer(userLocationLayer);
      userLocationLayer = L.circleMarker(latlng,{radius:9,fillColor:"#e8ba65",color:"#fff",weight:4,fillOpacity:1}).addTo(map).bindPopup("Lokasi semasa anda").openPopup();
      map.flyTo(latlng,13,{animate:true,duration:.8}); locateBtn.disabled = false;
    },() => {locateBtn.disabled=false;alert("Lokasi tidak dapat diakses. Sila benarkan permission lokasi pada browser.");},{enableHighAccuracy:true,timeout:10000,maximumAge:120000});
  }

  function start() {
    initializeMap(); render();
    searchInput.addEventListener("input",render); typeFilter.addEventListener("change",render); stateFilter.addEventListener("change",render);
    locateBtn.addEventListener("click",useMyLocation);
    resetMapBtn.addEventListener("click",() => { if (filteredStores.length) map.fitBounds(L.latLngBounds(filteredStores.map(s => [s.lat,s.lng])),{padding:[44,44],maxZoom:10}); });
    window.setTimeout(() => map.invalidateSize({pan:false,animate:false}),250);
    document.fonts?.ready?.then(() => map.invalidateSize({pan:false,animate:false}));
  }

  if (document.readyState === "complete") start(); else window.addEventListener("load",start,{once:true});
})();
