export const getRandomMeal = async () => {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  return await resp.json();
};
export const getMealById = async (id: string) => {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const respData = await resp.json();
  return respData.meals[0];
};
export const getMealsBySearch = async (term: string) => {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  return await resp.json();
};
