const minLengthValid = (value, min, customMessage) => {
  if (value.length <= min) {
    return customMessage !== undefined ? customMessage : `minimum length is "${min}"`
  }
  return ''
};

module.exports = {
  minLengthValid
};