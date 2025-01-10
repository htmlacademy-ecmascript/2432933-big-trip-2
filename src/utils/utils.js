const getArraysByType = (callBack, type) => callBack.map((item) => item[type]);

const getUppercaseWords = (type) => type.charAt(0).toUpperCase() + type.slice(1);

const findByKey = (array, key, value) => array.find((item) => item[key] === value);

export {getArraysByType, getUppercaseWords, findByKey,};
