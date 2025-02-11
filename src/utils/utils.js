const getArraysByType = (callBack, type) => callBack.map((item) => item[type]);

const getUppercaseWords = (type) => type.charAt(0).toUpperCase() + type.slice(1);

const findByKey = (elements, key, value) => elements.find((item) => item[key] === value);

const getDisabledAttribute = (isDisabled) => isDisabled ? 'disabled' : '';

export {getArraysByType, getUppercaseWords, findByKey, getDisabledAttribute};
