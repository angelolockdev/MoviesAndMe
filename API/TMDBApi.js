//import API_TOKEN from "../Helpers/token";
const API_TOKEN = "18be2b6567aa71475198bd95721cfbd7";

export function getFilmsFromApiWithSearchedText(search, page) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${search}&page=${page}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}
export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}
