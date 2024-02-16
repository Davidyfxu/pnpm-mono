import DrinksList from "@/components/DrinksList";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";
const fetchDrinks = async () => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("error");
  return await response.json();
};
const DrinksPage = async () => {
  const data = await fetchDrinks();
  return (
    <div>
      <DrinksList drinks={data?.drinks || []}></DrinksList>
    </div>
  );
};

export default DrinksPage;
