import data from "./cats_and_dogs.json" assert {type: 'json'};

const catsAndDogs = Object.entries(data)
  .reduce((acc, [id, value]) => [...acc, { ...value, id }], [])
	.sort((a1, a2) => (a1.likes > a2.likes ? -1 : 1))
  .sort((a1, a2) => (a1.width * a1.height > a2.height * a2.width ? -1 : 1));

const result = {
  top: catsAndDogs.slice(0, 5),
  rest: catsAndDogs.slice(5)
};

console.log(result);

// Проверки
result.top.length !== 5 && console.error("top: Должно быть 5 зверюшек");
result.rest.length !== 10 && console.error("rest: Должно быть 10 зверюшек");

const isDesc = (arr) =>
  arr.reduce(
    (acc, v) => {
      if (acc[0] === false) return acc;
      const prev = acc[1];
      const area = v.width * v.height;
      if (prev < area) {
        return [false, -Infinity];
      }
      return [true, area];
    },
    [true, Infinity]
  );

isDesc(result.top)[0] !== true &&
  console.error("top: Должно быть отсортировано по возрастанию");

isDesc(result.rest)[0] !== true &&
  console.error("rest: Должно быть отсортировано по возрастанию");