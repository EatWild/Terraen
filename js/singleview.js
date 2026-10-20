"use strict";
const params = new URLSearchParams(window.location.search);
const selectedID = params.get("id") || 17;

const detailURL = `https://dummyjson.com/recipes/${selectedID}`;
const opskriftIndhold = document.querySelector(".opskriftIndhold");

function loadData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
}

function showDetails(detail) {
  console.log("detail", detail);

  document.title = `Terræn — ${detail.name}`;

  opskriftIndhold.innerHTML = `
      <nav class="breadcrumbs">
        <ol>
          <li><a href="index.html">Forside</a></li>
          <li><a href="productlist.html">Opskrifter</a></li>
          <li class="breadcrumb-navn">${detail.name}</li>
        </ol>
      </nav>
    <section class="opskrift-top">
      <img class="opskrift-billede" src="${detail.image}" alt="${detail.name}">
      <div class="opskrift-tekst">
        <h1 class="opskrift-titel">${detail.name}</h1>
        <dl class="info-liste">

          <div class="info">
            <dt>Tid</dt>
            <dd>${tid(detail)}<br>${detail.prepTimeMinutes + detail.cookTimeMinutes} min i alt</dd>
          </div>
          <div class="info">
            <dt>Oppakning</dt>
            <dd>${oppakning(detail)}<br>${detail.ingredients.length} ingredienser</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="opskrift-detaljer">
      <div class="pakkeliste">
        <p class="caps lille-overskrift">Pakkeliste</p>
        <h2 class="pakkeliste-titel">${detail.ingredients.length} ingredienser</h2>
        <div class="pakkeliste-tekst">
          <p>Oppakning: <strong>${oppakning(detail)}</strong></p>
          <p>Sæt flueben, når det er i tasken.</p>
        </div>
        <ul class="ingrediens-liste">
          ${detail.ingredients.map((ingrediens) => `<li><label><input type="checkbox"><span>${ingrediens}</span></label></li>`).join("")}
        </ul>
      </div>
      <div class="fremgangsmaade">
        <p class="caps lille-overskrift">Fremgangsmåde</p>
        <h2 class="fremgangsmaade-titel">Sådan gør du</h2>
        <ol class="trin-liste">
          ${detail.instructions.map((step, i) => `<li><span class="trin-nummer">0${i + 1}</span><p>${step}</p></li>`).join("")}
        </ol>
      </div>
    </section>`;
}

// Oppakning
function oppakning(detail) {
  const antal = detail.ingredients.length;
  if (antal <= 7) return "Let";
  if (antal <= 9) return "Mellem";
  return "Tung";
}

// Tid
function tid(detail) {
  const min = detail.prepTimeMinutes + detail.cookTimeMinutes;
  if (min <= 20) return "Hurtig";
  if (min <= 45) return "Medium";
  return "Lang";
}

loadData(detailURL);

// <div class="info">
//   <dt>Udstyr</dt>
//   <dd></dd>
// </div>;
