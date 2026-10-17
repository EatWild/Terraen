const currentUrl = `https://dummyjson.com/recipes?limit=50`;
const listContainer = document.querySelector(".opskrift-container");
let allData = [];
let selectedWeight = "alle";
let selectedTime = "alle";

//HENT DATA
function getData() {
  fetch(currentUrl).then((result) =>
    result.json().then((data) => {
      allData = data.recipes;
      showData(data.recipes);
    }),
  );
}
//FILTRE---------------------------------------------------------------------------------------------------
//Vægt (antal ingredienser)--------------------------------------
document.querySelectorAll(".oppakning button").forEach((btn) => {
  btn.addEventListener("click", btnClickedWeight);
});
function btnClickedWeight(event) {
  document.querySelectorAll(".oppakning button").forEach((btn) => {
    btn.classList = "";
  });
  event.target.classList.add("active-btn");
  selectedWeight = event.currentTarget.dataset.oppakning;
  filterRecipes();
}
//Tid i alt-------------------------------------------------------
document.querySelectorAll(".total-tid button").forEach((btn) => {
  btn.addEventListener("click", btnClickedTime);
});
function btnClickedTime(event) {
  document.querySelectorAll(".total-tid button").forEach((btn) => {
    btn.classList = "";
  });
  event.target.classList.add("active-btn");
  selectedTime = event.currentTarget.dataset.tid;
  filterRecipes();
}
// //Udregning/"lommeregner"
const udregnTid = (forberedelsesTid, tilberedningsTid) => {
  return forberedelsesTid + tilberedningsTid;
};

//Kombinering af filtre---------------------------------------------
//filterRecipes() tjekker begge betingelser og returnerer matchesWeight && matchesTime.
function filterRecipes() {
  const filteredRecipes = allData.filter((recipe) => {
    const totalIngredients = recipe.ingredients.length;
    const totalTime = udregnTid(recipe.prepTimeMinutes, recipe.cookTimeMinutes);

    const matchesWeight = selectedWeight === "alle" || (selectedWeight === "lett" && totalIngredients <= 5) || (selectedWeight === "mellem" && totalIngredients > 5 && totalIngredients <= 9) || (selectedWeight === "tung" && totalIngredients > 9);

    const matchesTime = selectedTime === "alle" || (selectedTime === "0-20" && totalTime <= 20) || (selectedTime === "20-45" && totalTime > 20 && totalTime <= 45) || (selectedTime === "over45" && totalTime > 45);

    return matchesWeight && matchesTime;
  });

  showData(filteredRecipes);
}
//VISNING AF DATA--------------------------------------------------------------------------------------------------------
function showData(recipes) {
  console.log(recipes);
  listContainer.innerHTML = "";
  document.querySelector(".antal").innerHTML = `<strong>${recipes.length}</strong>`;
  let newInnerHTML = "";

  recipes.forEach((recipe) => {
    newInnerHTML += `
          <a href="singleview.html?id=${recipe.id}" class="opskrift">
            <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="Billede af ${recipe.name}" />
            <h4 class="mobil">${recipe.name}</h4>
            <p>${udregnTid(recipe.prepTimeMinutes, recipe.cookTimeMinutes)} minutter</p>
          </a>`;
  });
  listContainer.innerHTML = newInnerHTML;
}

getData();
