import { data } from "./cats_and_dogs.js";

const catsAndDogs = Object.entries(data)
    .reduce((acc, [id, value]) => [...acc, { ...value, id }], [])
    .sort((a1, a2) => (a1.likes > a2.likes ? -1 : 1));

const result = {
  top: catsAndDogs.slice(0, 5).sort((a1, a2) => (a1.width * a1.height > a2.height * a2.width ? -1 : 1)),
  rest: catsAndDogs.slice(5).sort((a1, a2) => (a1.width * a1.height > a2.height * a2.width ? -1 : 1)),
};

const topContainer = document.querySelector('.animals-top');
const restContainer = document.querySelector('.animals-rest');
const createAnimalItem = (entity) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = entity.filename;
  li.appendChild(img);

  return li;
};

const fillContainer = (arr, container) => {
  arr.forEach(item => {
    container.appendChild(createAnimalItem(item));
  });
};

fillContainer(result.top, topContainer);
fillContainer(result.rest, restContainer);

// Проверки
const images = [...document.querySelectorAll("img")]
  .map((e) => e.outerHTML.match(/data\/(.*).png*/))
  .filter(Boolean);

images.length !== 15 && console.error("На странице должно быть 15 изображений");
