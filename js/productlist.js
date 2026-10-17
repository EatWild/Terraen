const currentUrl = `https://dummyjson.com/recipes?limit=50`;
const listContainer = document.querySelector(".opskrift-container");
let allData = [];

//HENT DATA
function getData() {
  fetch(currentUrl).then((result) =>
    result.json().then((data) => {
      allData = data.recipes;
      showData(allData);
    }),
  );
}
//FILTRE---------------------------------------------------------------------------------------------------
//Udregning/"lommeregner"
const udregnTid = (forberedelsesTid, tilberedningsTid) => {
  return forberedelsesTid + tilberedningsTid;
};
//Vægt (antal ingredienser)--------------------------------------
document.querySelectorAll(".oppakning button").forEach((btn) => {
  btn.addEventListener("click", btnClickedWeight);
});
function btnClickedWeight(event) {
  const selectedWeight = event.target.dataset.oppakning;
  console.log(event.target.dataset.oppakning);

  if (selectedWeight === "alle") {
    showData(allData);
    return;
  }

  const filteredRecipes = allData.filter((recipe) => {
    const totalIngredients = recipe.ingredients.length;

    if (selectedWeight === "lett") {
      return totalIngredients <= 5;
    }
    if (selectedWeight === "mellem") {
      return totalIngredients > 5 && totalIngredients <= 9;
    }
    if (selectedWeight === "tung") {
      return totalIngredients > 9;
    }
  });

  showData(filteredRecipes);
}
//Tid i alt-------------------------------------------------------
document.querySelectorAll(".total-tid button").forEach((btn) => {
  btn.addEventListener("click", btnClickedTime);
});
function btnClickedTime(event) {
  const selectedTime = event.currentTarget.dataset.tid;
  console.log(event.currentTarget.dataset.tid);

  if (selectedTime === "alle") {
    showData(allData);
    return;
  }

  const filteredRecipes = allData.filter((recipe) => {
    const totalTime = udregnTid(recipe.prepTimeMinutes, recipe.cookTimeMinutes);

    if (selectedTime === "0-20") {
      return totalTime <= 20;
    }
    if (selectedTime === "20-45") {
      return totalTime > 20 && totalTime <= 45;
    }
    return totalTime > 45;
  });

  showData(filteredRecipes);
}

//VISNING AF DATA--------------------------------------------------------------------------------------------------------
function showData(recipes) {
  console.log(recipes);
  listContainer.innerHTML = "";
  let newInnerHTML = "";

  recipes.forEach((recipe) => {
    // console.log(udregnTid(recipe.prepTimeMinutes, recipe.cookTimeMinutes));
    // ${udregnTid(recipe.prepTimeMinutes, recipe.cookTimeMinutes)}
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
