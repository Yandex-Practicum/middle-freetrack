const createGrid = (rectElements) => {
  const first = rectElements[0];
  const grid = [[first]];

  for (let row = 0, i = 1; i < rectElements.length; i++) {
    if (rectElements[i].left === first.left) {
      row += 1;
      grid.push([]);
    }
    grid[row].push(rectElements[i]);
  }
  return grid;
};

const widthItem = (width, count) => (width - (count - 1) * 24) / count;

const checkCountItems = (items, rectItems) =>
  new Promise((resolve, reject) => {
    if (items.length < 15) {
      reject("test.errors.middle.entry3.wrongLength"); //На странице должно быть 15 изображений
    }
    resolve();
  });

const checkImageCover = (items, rectItems) =>
  new Promise((resolve, reject) => {
    const isNotCover = items.some((item, index) => {
      const rectImage = item.querySelector("img").getBoundingClientRect();
      const rectItem = rectItems[index];
      return (
        rectImage.width !== rectItem.width ||
        rectImage.height !== rectItem.height
      );
    });
    if (isNotCover) {
      reject("test.errors.middle.entry4.imageCover"); //Картинки должны полностью заполнять контейнер
    }
    resolve();
  });

const checkSquare = (rectItems) =>
  new Promise((resolve, reject) => {
    const isNotSquares = rectItems.some((e) => e.width !== e.height);
    if (isNotSquares) {
      reject("test.errors.middle.entry4.square"); //Изображения должны быть квадратными
    }
    resolve();
  });

const checkSize = (rectItems) =>
  new Promise((resolve, reject) => {
    const isIncorrectSize = rectItems.some((e) => e.width < 250);
    if (isIncorrectSize) {
      reject("test.errors.middle.entry4.size"); //Размеры картинки не меньше 250 пикселей
    }
    resolve();
  });

const checkSameSize = (rectItems) =>
  new Promise((resolve, reject) => {
    const isNotSameSize = rectItems.some(
      (e) => rectItems[0].width !== e.width || rectItems[0].height !== e.height
    );
    if (isNotSameSize) {
      reject("test.errors.middle.entry4.sameSize"); //Размеры картинок должны быть одинаковы для каждой секции (могут отличаться в разных секциях)
    }
    resolve();
  });

const checkRow = (rectItems) =>
  new Promise((resolve, reject) => {
    const grid = createGrid(rectItems);
    if (grid[0].length < 2 && document.body.clientWidth < 541) {
      reject("test.errors.middle.entry4.frameWidth") //Увеличьте ширину фрейма в тренажёре с вёрсткой так, чтобы в ряд умещалось, как минимум два элемента
    }
    if (grid[0].length < 2) {
      reject("test.errors.middle.entry4.row"); //Картинки должны располагаться в ряд
    }
    resolve();
  });

const checkWidth = (rectItems) =>
  new Promise((resolve, reject) => {
    const grid = createGrid(rectItems);
    const width = widthItem(document.body.clientWidth, grid[0].length);
    const itemWidth = rectItems[0].width || 0;
    if (Math.abs(itemWidth - width) > 20) {
      reject({
        id: 'test.errors.middle.entry4.width',
        values: {
          width
        }
      }); //Ширина картинки должна быть близка к ${width}px
    }
    resolve();
  });

const checkOffsetLeft = (rectItems) =>
  new Promise((resolve, reject) => {
    const grid = createGrid(rectItems);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 1; j < grid[i].length; j++) {
        const prevElement = grid[i][j - 1];
        const element = grid[i][j];
        const offset = element.left - prevElement.left - prevElement.width;
        if (Math.abs(offset - 24) >= 1) {
          reject("test.errors.middle.entry4.offsetLeft"); //Расстояние между соседними элементами по горизонтали должно быть 24px
        }
      }
    }

    resolve();
  });

const checkOffsetTop = (rectItems) =>
  new Promise((resolve, reject) => {
    const grid = createGrid(rectItems);
    for (let i = 1; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const topElement = grid[i - 1][0];
        const element = grid[i][j];
        const offset = element.top - topElement.top - topElement.height;
        if (Math.abs(offset - 24) >= 1) {
          reject("test.errors.middle.entry4.offsetTop"); //Расстояние между соседними элементами по вертикали должно быть 24px
        }
      }
    }

    resolve();
  });

function test() {
  const topItems = [...document.querySelectorAll(".animals.top li")].filter((e) =>
    e.outerHTML.match(/data\/(.*).png*/)
  );
  const restItems = [
    ...document.querySelectorAll(".animals.rest li")
  ].filter((e) => e.outerHTML.match(/data\/(.*).png*/));
  const items = [...topItems, ...restItems];
  const rectTopItems = topItems.map((e) => e.getBoundingClientRect());
  const rectRestItems = restItems.map((e) => e.getBoundingClientRect());
  const rectItems = [...rectTopItems, ...rectRestItems];

  return {
    errors: Promise.all([
      checkCountItems(items),
      checkImageCover(items, rectItems),
      checkSquare(rectItems),
      checkSize(rectItems),
      checkSameSize(rectTopItems),
      checkSameSize(rectRestItems),
      checkRow(rectTopItems),
      //checkRow(rectRestItems),
      //checkWidth(rectTopItems),
      //checkWidth(rectRestItems),
      checkOffsetLeft(rectTopItems),
      checkOffsetLeft(rectRestItems),
      checkOffsetTop(rectTopItems),
      checkOffsetTop(rectRestItems)
    ])
      .then((_) => [])
      .catch((error) => [error]),
  }
}

return test();