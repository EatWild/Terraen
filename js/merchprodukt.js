"use strict";
const params = new URLSearchParams(window.location.search);
const selectedID = params.get("id") || 3;

const produktIndhold = document.querySelector(".produktIndhold");
const mereMerchListe = document.querySelector(".mereMerchListe");

// Produkter
const produkter = [
  {
    id: 3,
    navn: "Termoflaske",
    billede: "termoflaske",
    kortTekst: "0,75 l · Natsø · Arresø",
    pris: 349,
    enhed: "",
    sted: "Arresø · Danmarks største sø · 55°58′N 12°06′E",
    beskrivelse: "0,75 l i dyb søblå. Flasken handler om vand, derfor bærer den koordinatet for Danmarks største sø. Holder kaffen varm i 12 timer og vandet koldt i 24.",
    farve: "Natsø",
    materialer: "Dobbeltvægget rustfrit stål, pulverlakeret. Låg i bambus og silikone.",
    maal: "Højde 28 cm. Diameter 8 cm. Vægt 420 g.",
    pleje: "Vask i hånden. Må ikke komme i opvaskemaskine eller fryser.",
  },
  {
    id: 6,
    navn: "Hue",
    billede: "hue",
    kortTekst: "Merinould · glødmærkat · Rold Skov",
    pris: 229,
    enhed: "",
    sted: "Rold Skov · 56°48′N 9°51′E",
    beskrivelse: "En ribstrikket hue i skovgrøn merinould. Logoet sidder på opslaget og koordinatet til Rold Skov på siden.",
    farve: "Skovgrøn",
    materialer: "100 % merinould.",
    maal: "One size.",
    pleje: "Uldvask ved 30 grader. Tørres liggende.",
  },
  {
    id: 5,
    navn: "Kasket",
    billede: "kasket",
    kortTekst: "Økologisk bomuld · Klitmøller",
    pris: 249,
    enhed: "",
    sted: "Klitmøller · 57°02′N 8°29′E",
    beskrivelse: "En vasket kasket i sandfarvet bomuld med logoet broderet på fronten og koordinatet til Klitmøller på siden.",
    farve: "Klitsand",
    materialer: "100 % økologisk bomuld. Spænde i messing.",
    maal: "One size. Justerbar bagpå.",
    pleje: "Vask i hånden ved 30 grader. Lufttørres.",
  },
  {
    id: 4,
    navn: "Vandretaske",
    billede: "vandretaske",
    kortTekst: "24 l · Natskov · Himmelbjerget",
    pris: 899,
    enhed: "",
    sted: "Himmelbjerget · 56°06′N 9°41′E",
    beskrivelse: "En 24 liters dagstaske med plads til madpakke, trangia og en ekstra trøje. Højdekurverne fra kortet er trykt på forsiden.",
    farve: "Natskov",
    materialer: "Ripstop nylon af genbrugsmateriale. Vandafvisende overflade.",
    maal: "24 liter. 50 × 30 × 18 cm. Vægt 780 g.",
    pleje: "Børst snavs af, og vask i hånden med mild sæbe. Lufttørres.",
  },
  {
    id: 2,
    navn: "Krydderisæt",
    billede: "krydderisaet",
    kortTekst: "4 × 40 g · én dåse pr. landskab",
    pris: 199,
    enhed: "",
    sted: "4 landskaber · 4 blandinger",
    beskrivelse: "Fire krydderiblandinger, der passer til opskrifterne. Citron og dild til stranden, svampe og timian til skoven, citronsalt og fennikel til søen og chili og spidskommen til bjerget.",
    farve: "Fire landskaber",
    materialer: "Glas med metallåg. Æske i genbrugspap.",
    maal: "4 dåser á 40 g. Æsken måler 20 × 14 × 6 cm.",
    pleje: "Opbevares tørt og mørkt. Holdbar i 12 måneder.",
  },
  {
    id: 1,
    navn: "Opskriftskort",
    billede: "opskriftskort",
    kortTekst: "Vandfast papir · 4 landskaber",
    pris: 149,
    enhed: " / stk.",
    sted: "Stranden · Skoven · Søen · Bjerget",
    beskrivelse: "Fire foldekort, et til hvert landskab. Hvert kort har seks opskrifter, der kan laves over bål eller trangia, og koordinatet til stedet på forsiden.",
    farve: "Fire landskaber",
    materialer: "Vandfast stenpapir, der kan tåle regn, fedtfingre og en tur i rygsækken.",
    maal: "Foldet: 10 × 15 cm. Udfoldet: 60 × 15 cm.",
    pleje: "Tør af med en fugtig klud. Må ikke ligge i direkte sol i længere tid.",
  },
];

function showDetails(detail) {
  console.log("detail", detail);

  document.title = `Terræn — ${detail.navn}`;

  produktIndhold.innerHTML = `
    <nav class="breadcrumbs">
      <ol>
        <li><a href="index.html">Forside</a></li>
        <li><a href="merch.html">Merch</a></li>
        <li class="breadcrumb-navn">${detail.navn}</li>
      </ol>
    </nav>

    <section class="produkt">
      <div class="galleri">
        <img class="hovedbillede" src="imgs/merch/${detail.billede}-1.webp" alt="${detail.navn}">
        <div class="thumbs">
          ${[1, 2, 3, 4].map((nr) => `<button class="thumb${nr === 1 ? " aktiv" : ""}" data-billede="imgs/merch/${detail.billede}-${nr}.webp"><img src="imgs/merch/${detail.billede}-${nr}.webp" alt="${detail.navn} billede ${nr}"></button>`).join("")}
        </div>
      </div>

      <div class="produkt-info">
        <h1 class="produkt-titel">${detail.navn}</h1>
        <p class="caps lille-overskrift">${detail.sted}</p>
        <p class="produkt-pris">${detail.pris} kr${detail.enhed}</p>
        <p class="produkt-beskrivelse">${detail.beskrivelse}</p>
        <p class="caps lille-overskrift">Farve · ${detail.farve}</p>

        <div class="koeb">
          <p class="caps lille-overskrift">Antal</p>
          <div class="koeb-raekke">
            <div class="antal">
              <button class="antal-minus" aria-label="Færre">−</button>
              <span class="antal-tal">1</span>
              <button class="antal-plus" aria-label="Flere">+</button>
            </div>
            <button class="cta-btn koeb-knap">Læg i kurven</button>
          </div>
          <p class="fragt">Fri fragt over 499 kr · 30 dages returret</p>
        </div>

        <div class="fold-ud">
          <details open>
            <summary>Materialer</summary>
            <p>${detail.materialer}</p>
          </details>
          <details>
            <summary>Mål</summary>
            <p>${detail.maal}</p>
          </details>
          <details>
            <summary>Pleje</summary>
            <p>${detail.pleje}</p>
          </details>
        </div>
      </div>
    </section>`;

  skiftBillede();
  antal();
}

// Skift billede
function skiftBillede() {
  const hovedbillede = document.querySelector(".hovedbillede");
  const thumbs = document.querySelectorAll(".thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      hovedbillede.src = thumb.dataset.billede;
      thumbs.forEach((t) => t.classList.remove("aktiv"));
      thumb.classList.add("aktiv");
    });
  });
}

// Antal
function antal() {
  const tal = document.querySelector(".antal-tal");
  let antal = 1;

  document.querySelector(".antal-minus").addEventListener("click", () => {
    if (antal > 1) antal--;
    tal.textContent = antal;
  });
  document.querySelector(".antal-plus").addEventListener("click", () => {
    antal++;
    tal.textContent = antal;
  });
}

// Mere merch
function showMere(produkter) {
  const index = produkter.findIndex((produkt) => produkt.id == selectedID);
  const andre = [...produkter.slice(index + 1), ...produkter.slice(0, index)].slice(0, 3);

  mereMerchListe.innerHTML = andre
    .map(
      (produkt) => `
      <li class="merch-kort">
        <a href="merchprodukt.html?id=${produkt.id}">
          <img class="merch-kort-billede" src="imgs/merch/${produkt.billede}-1.webp" alt="${produkt.navn}">
          <h3 class="merch-kort-navn">${produkt.navn}</h3>
          <p class="merch-kort-tekst">${produkt.kortTekst}</p>
          <p class="merch-kort-pris">${produkt.pris} kr${produkt.enhed}</p>
        </a>
      </li>`,
    )
    .join("");
}

const detail = produkter.find((produkt) => produkt.id == selectedID);
showDetails(detail);
showMere(produkter);
