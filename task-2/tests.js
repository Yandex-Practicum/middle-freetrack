function test() {
  const index = Tester.getPaneContent(panes, "index.html");
  const doc = new DOMParser().parseFromString(index, "text/html");
  const importData = `const data = ${Tester.getPaneContent(
    panes,
    "src/cats_and_dogs.json"
  )}`;

  const importLib = `const clearedData=Object.entries(data).reduce((e,[i,{width:a,height:t,likes:l,filename:r}])=>[...e,{id:i,width:a,height:t,likes:l,filename:r}],[]).sort((e,i)=>i.likes-e.likes),catAndDogFetcher={fetchAll:()=>Promise.resolve(clearedData)},magicalCatRecognizer={recognize:e=>Promise.resolve(0===data[e.id].label)};`;
  const script =
    `${importData}\n${importLib}\n` +
    Tester.getPaneContent(panes, "src/index.js").replace(/import.*/, "");
  userFunName = "getCats";

  try {
    if (Tester.getPaneContent(panes, "src/lib.js").replace(/\s+/g, '') !== Tester.getPaneContent(answer_panes, "src/lib.js").replace(/\s+/g, '')) {
      throw new Error();
    }
  } catch (e) {
    return {
      errors: [{
        id: 'test.errors.file.changed',
        values: {
          filepath: 'src/lib.js'
        }
      }]
    }
  }

  try {
    const fun = new Function(`${script}
return ${userFunName};`);
    const f = fun();
    if (typeof f !== "function") throw new Error();
  } catch (excep) {
    return {
      errors: ["test.errors.js.expression.ErrorInStudentCode.wrongExpression"],
    };
  }

  const __promises = [];
  const checkTopCats = new Promise(async (resolve) => {
    //const AsyncFunction = async function () {}.constructor;

    const getCats = new Function(
      `${script}
return ${userFunName};`
    );

    const topRatedCats = await getCats()();
    if (topRatedCats?.length !== 3) {
      resolve("test.errors.middle.entry2.wrongLength"); // Должно быть 3 котика
    }
    !topRatedCats.find((c) => c.id === "3") &&
      resolve("test.errors.middle.entry2.wrongId"); // Третий котик должен быть в топе!

    resolve();
  });

  __promises.push(checkTopCats);

  return {
    errors: Promise.all(__promises)
      .then((errors) => {
        return [...errors.filter((e) => e)];
      })
      .catch((e) => {
        console.log(e);
        return ["Какой-то из промисов зареджектился..."];
      }),
  };
}

return test();