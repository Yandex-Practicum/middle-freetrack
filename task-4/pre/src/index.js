import data from "./cats_and_dogs.json" assert { type: "json" };

const catsAndDogs = Object.entries(data)
  .reduce((acc, [id, value]) => [...acc, { ...value, id }], [])
  .map((i) => ({ ...i, filename: i.filename.replace("./", "images/") }))
  .sort((a1, a2) => (a1.width * a1.height > a2.height * a2.height ? -1 : 1));

const result = {
  top: catsAndDogs.slice(0, 5),
  rest: catsAndDogs.slice(5)
};

const animalWrapper = (entity) => `<li>
<button class="imageWrapper" aria-expanded="false">
  <img src="${entity.filename}" alt="" />
</button>
</li>`;

const createTemplate = (result) => `
<section>
<h2>Популярные животные</h2>
<ul class="animals top">${result.top.map(animalWrapper).join("\n")}</ul>
</section>
<section>
<h2>Остальные</h2>
<ul class="animals rest">${result.rest.map(animalWrapper).join("\n")}</ul>
</section>
`;

document.body.innerHTML = createTemplate(result);

// Проверки
const images = [...document.querySelectorAll("img")]
  .map((e) => e.outerHTML.match(/data\/(.*).png*/))
  .filter(Boolean);

images.length !== 15 && console.error("На странице должно быть 15 изображений");