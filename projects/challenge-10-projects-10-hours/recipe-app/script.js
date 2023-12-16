const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

const mealPopup = document.getElementById("meal-popup");
const popupClosBtn = document.getElementById("close-popup");
const mealInfoEl = document.getElementById("meal-info");

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `<div class="meal-header">
  ${random ? `<span class="random">Random Recipe</span>` : ""}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
          </div>
          <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
              <i class="fa fa-heart"></i>
            </button>
          </div>`;
  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealsLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealsLS(mealData.idMeal);
      btn.classList.add("active");
    }

    fetchFavMeals();
  });
  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
  mealsEl.appendChild(meal);
}

const getRandomMeal = async () => {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addMeal(randomMeal, true);
};
const getMealById = async (id) => {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
};
const getMealsBySearch = async (term) => {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const respData = await resp.json();
  const meals = respData.meals;
  return meals;
};

function updateLocalStorage(meal) {}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}
function removeMealsLS(mealId) {
  const mealIds = getMealsLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}
function addMealsLS(mealId) {
  const mealIds = getMealsLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}
async function fetchFavMeals() {
  // clean the container
  favoriteContainer.innerHTML = "";
  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    let meal = await getMealById(mealId);
    addMealFav(meal);
  }
}
function addMealFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
  <img
    src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}"
  />
  <span>${mealData.strMeal}</span>
  <button class="clear"><i class="fa-solid fa-xmark"></i></button>
`;

  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealsLS(mealData.idMeal);
    fetchFavMeals();
  });
  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
  favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
  mealInfoEl.innerHTML = "";
  const mealEl = document.createElement("div");

  const ingredients = [];
  // get ingredients and measures
  for (let i = 0; i < 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    }
  }

  mealEl.innerHTML = `
          <h1>${mealData.strMeal}</h1>
          <img
            src="${mealData.strMealThumb}"
            alt=""
          />
          <p>
            ${mealData.strInstructions}
          </p>
          <h3>Ingredients:</h3>
          <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>
         `;
  mealInfoEl.appendChild(mealEl);
  mealPopup.classList.remove("hidden");
}

getRandomMeal();
fetchFavMeals();

searchBtn.addEventListener("click", async () => {
  // clean container
  mealsEl.innerHTML = "";
  const search = searchTerm.value;
  const meals = await getMealsBySearch(search);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

popupClosBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
