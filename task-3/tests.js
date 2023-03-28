const errors = [];

try {
  const images = [...document.querySelectorAll("img")]
    .map((e) => e.outerHTML.match(/data\/(.*).png*/))
    .filter(Boolean);

  if (images.length < 15) {
    errors.push('test.errors.middle.entry3.wrongLength') //На странице должно быть 15 изображений
  }

} catch (e) {
  errors.push('test.errors.js.expression.ErrorInStudentCode.wrongExpression');
}

return {
  errors
};