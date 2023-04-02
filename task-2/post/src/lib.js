import { data } from "./cats_and_dogs.js";

const clearedData = Object.entries(data)
  .reduce(
    (acc, [id, { width, height, likes, filename }]) => [
      ...acc,
      { id, width, height, likes, filename }
    ],
    []
  )
  .sort((a1, a2) => (a2.likes - a1.likes));

export const catAndDogFetcher = {
  fetchAll: () => Promise.resolve(clearedData)
};

export const magicalCatRecognizer = {
  recognize: (animal) => Promise.resolve(data[animal.id].label === 0)
};
