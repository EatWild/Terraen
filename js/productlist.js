const currentUrl = `https://dummyjson.com/recipes?limit=50`;
const listContainer = document.querySelector(".opskrift-container");
let allData = [];
let selectedWeight = "alle";
let selectedTime = "alle";

//HENT DATA
function getData() {
  fetch(currentUrl).then((result) =>
    result.json().then((data) => {
      showData(data.recipes);
      allData = data.recipes.map((recipe) => ({
        ...recipe,
        udstyr: udstyrPrOpskrift[recipe.id] ?? [],
      }));
    }),
  );
}
//FILTRE---------------------------------------------------------------------------------------------------
//Manuel fordeling af udstyr pr opskrift
const udstyrPrOpskrift = {
  1: ["gryde-baal", "pande"], // Classic Margherita Pizza
  2: ["trangia", "pande"], // Vegetarian Stir-Fry
  3: ["gryde-baal"], // Chocolate Chip Cookies
  4: ["trangia", "pande"], // Chicken Alfredo Pasta
  5: ["baal-rist", "pande"], // Mango Salsa Chicken
  6: ["trangia"], // Quinoa Salad with Avocado
  7: ["baal-rist", "pande"], // Tomato Basil Bruschetta
  8: ["pande", "trangia"], // Beef and Broccoli Stir-Fry
  9: ["ingen-ild"], // Caprese Salad
  10: ["trangia", "pande"], // Shrimp Scampi Pasta
  11: ["gryde-baal"], // Chicken Biryani
  12: ["pande", "gryde-baal"], // Chicken Karahi
  13: ["gryde-baal", "pande"], // Aloo Keema
  14: ["pande"], // Chapli Kebabs
  15: ["gryde-baal", "pande"], // Saag with Makki di Roti
  16: ["trangia"], // Japanese Ramen Soup
  17: ["gryde-baal", "trangia"], // Moroccan Chickpea Tagine
  18: ["pande", "baal-rist"], // Korean Bibimbap
  19: ["gryde-baal", "pande"], // Greek Moussaka
  20: ["gryde-baal", "pande", "forberedt-hjemme"], // Butter Chicken (Murgh Makhani)
  21: ["trangia", "gryde-baal"], // Thai Green Curry
  22: ["ingen-ild"], // Mango Lassi
  23: ["forberedt-hjemme", "ingen-ild"], // Italian Tiramisu
  24: ["spyd", "baal-rist"], // Turkish Kebabs
  25: ["ingen-ild"], // Blueberry Banana Smoothie
  26: ["baal-rist"], // Mexican Street Corn (Elote)
  27: ["gryde-baal"], // Russian Borscht
  28: ["pande", "trangia", "forberedt-hjemme"], // South Indian Masala Dosa
  29: ["pande", "trangia"], // Lebanese Falafel Wrap
  30: ["ingen-ild"], // Brazilian Caipirinha
  31: ["gryde-baal", "pande"], // Spanish Patatas Bravas
  32: ["trangia", "ingen-ild"], // Vietnamese Fresh Spring Rolls
  33: ["trangia"], // Mediterranean Quinoa Salad
  34: ["forberedt-hjemme"], // Japanese Matcha Green Tea Ice Cream
  35: ["trangia"], // Brazilian Chocolate Brigadeiros
  36: ["gryde-baal"], // Mexican Chicken Enchiladas
  37: ["trangia", "pande"], // Thai Coconut Shrimp Curry
  38: ["gryde-baal"], // Greek Spanakopita
  39: ["trangia"], // Moroccan Couscous Salad
  40: ["ingen-ild"], // Classic Mojito
  41: ["baal-rist", "pande"], // Caprese Bruschetta
  42: ["trangia", "pande"], // Teriyaki Chicken Stir-Fry
  43: ["ingen-ild"], // Mango Avocado Salsa
  44: ["trangia", "pande"], // Shrimp and Asparagus Stir-Fry
  45: ["gryde-baal", "pande"], // Italian Margherita Pizza
  46: ["trangia"], // Pesto Pasta with Cherry Tomatoes
  47: ["spyd", "baal-rist"], // Hawaiian Chicken Skewers
  48: ["forberedt-hjemme", "ingen-ild"], // Cucumber Avocado Rolls
  49: ["ingen-ild"], // Mediterranean Chickpea Salad
  50: ["ingen-ild"], // Pineapple Coconut Smoothie
};
console.log(udstyrPrOpskrift[4]);

let selectedEquipment = "alle";
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
//Udstyr-------------------------------------------------------
document.querySelectorAll(".udstyr button").forEach((btn) => {
  btn.addEventListener("click", btnClickedUdstyr);
});
function btnClickedUdstyr(event) {
  document.querySelectorAll(".udstyr button").forEach((btn) => {
    btn.classList = "";
  });
  event.target.classList.add("active-btn");
  selectedEquipment = event.currentTarget.dataset.udstyr;
  filterRecipes();
}

//Kombinering af filtre---------------------------------------------
//filterRecipes() tjekker begge betingelser og returnerer matchesWeight && matchesTime.
function filterRecipes() {
  const filteredRecipes = allData.filter((recipe) => {
    const totalIngredients = recipe.ingredients.length;
    const totalTime = udregnTid(recipe.prepTimeMinutes, recipe.cookTimeMinutes);

    const matchesWeight = selectedWeight === "alle" || (selectedWeight === "lett" && totalIngredients <= 5) || (selectedWeight === "mellem" && totalIngredients > 5 && totalIngredients <= 9) || (selectedWeight === "tung" && totalIngredients > 9);

    const matchesTime = selectedTime === "alle" || (selectedTime === "0-20" && totalTime <= 20) || (selectedTime === "20-45" && totalTime > 20 && totalTime <= 45) || (selectedTime === "over45" && totalTime > 45);

    const matchesEquipment = selectedEquipment === "alle" || recipe.udstyr.includes(selectedEquipment);

    return matchesWeight && matchesTime && matchesEquipment;
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
            <div class="grid_1-1">
            <h4 class="mobil">${recipe.name}</h4>
            <p>${udregnTid(recipe.prepTimeMinutes, recipe.cookTimeMinutes)} min</p></div
          </a>`;
  });
  listContainer.innerHTML = newInnerHTML;
}

getData();
