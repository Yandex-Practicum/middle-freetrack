function test() {
  const errors = [];
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
  const index = Tester.getPaneContent(panes, "index.html");
  const importData = `const data = ${Tester.getPaneContent(panes, "src/cats_and_dogs.json")}`;
  const script =
    `${importData}\n` +
    Tester.getPaneContent(panes, "src/index.js").replace(/import.*/, "");
  console.log(script)
  const parser = new DOMParser();
  const doc = parser.parseFromString(index, "text/html");
  try {
    const result = new Function(
      "document",
      `${script}
                                    return result;`
    )(doc);
    if (result.top?.length !== 5) {
      errors.push("test.errors.middle.entry1.top"); //('top: Должно быть 5 зверюшек');
    }
    if (result.rest?.length !== 10) {
      errors.push("test.errors.middle.entry1.rest"); //('rest: Должно быть 10 зверюшек');
    }
    if (isDesc(result.top)[0] !== true) {
      errors.push("test.errors.middle.entry1.topSort"); //('top: Должно быть отсортировано по возрастанию');
    }
    if (isDesc(result.rest)[0] !== true) {
      errors.push("test.errors.middle.entry1.restSort"); //('rest: Должно быть отсортировано по возрастанию');
    }
  } catch (excep) {
    errors.push('test.errors.js.expression.ErrorInStudentCode.wrongExpression');
  }

  return { errors };
}

return test();