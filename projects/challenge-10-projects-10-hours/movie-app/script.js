const APIURL =
  "https://api.themoviedb.org/3/movie/550?api_key=885504ecca706f8974489c92c9124b40";
// async function getMovies() {
//   const resp = await fetch(APIURL);
//   const respData = await resp.json();
//   console.log(respData);
//   return respData;
// }

// getMovies();
fetch(APIURL)
  .then((response) => response.json())
  .then((data) => console.log(data));
