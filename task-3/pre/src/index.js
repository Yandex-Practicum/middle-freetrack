import data from "./cats_and_dogs.json" assert {type: 'json'};

// Решение

// Проверки
const images = [...document.querySelectorAll("img")]
  .map((e) => e.outerHTML.match(/data\/(.*).png*/))
  .filter(Boolean);

images.length !== 15 && console.error("На странице должно быть 15 изображений");