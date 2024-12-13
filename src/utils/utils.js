

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const findByKey = (array, key, value) => array.find((item) => item[key] === value);

export {getRandomArrayElement, findByKey,};
