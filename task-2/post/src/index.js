import { catAndDogFetcher, magicalCatRecognizer } from "./lib.js";

// Решение

const getCats = async () => {
  const allAnimals = await catAndDogFetcher.fetchAll();

  const topRatedCats = [];
  let i = 0;
  while (topRatedCats.length < 3) {
    const isCat = await magicalCatRecognizer.recognize(allAnimals[i]);
    if (isCat) {
      topRatedCats.push(allAnimals[i]);
    }
    i += 1;
  }

  return topRatedCats;
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
