import { catAndDogFetcher, magicalCatRecognizer } from "./lib.js";

const getCats = async () => {
  // Решение
};
const run = async () => {
  let topRatedCats;
  try {
    topRatedCats = await getCats();
  } catch (err) {
    console.error(err);
  }

  // Проверки
  topRatedCats?.length !== 3 && console.error("Должно быть 3 котика");
  !topRatedCats?.find((c) => c.id === "3") &&
    console.error("Третий котик должен быть в топе!");
};

run();