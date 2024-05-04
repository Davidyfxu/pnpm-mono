import { post } from "../../common/utils";

export const getTop10BusinessNews = (p = {}) =>
  post(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3f871b99e7a84b999da0bb32cba1f387",
    p,
  );
