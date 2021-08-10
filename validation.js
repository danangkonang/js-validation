const validation = (valide) => {
  let errors = []
  valide.map((valid, key) => {
    /*
    * custom error message
    */ 
    let customMessages = []
    if (valid.messages !== undefined) {
      customMessages = valid.messages.split("|").map((message) => message);
    }

    /*
    * for key error data position
    */ 
    let errorMessages = []
    valid.rules.split("|").map((rule, index) => {
      /*
      * check minimum character
      */
      if (rule.match("min")){
        let min = rule.split(":")[1]
        let isMin = musthMinLength(valid.data, min, customMessages[index]);
        if (isMin !== '') {
          errorMessages = errorMessages.concat(isMin)
        }
      }

      /*
      * check maximum character
      */
      if (rule.match("max")){
        let max = rule.split(":")[1]
        let isMax = musthMAxLength(valid.data, max, customMessages[index]);
        if (isMax !== '') {
          errorMessages = errorMessages.concat(isMax)
        }
      }

      /*
      * check required
      */
      if (rule === "required") {
        let isRequired = musthRequired(valid.data, customMessages[index]);
        if (isRequired !== '') {
          errorMessages = errorMessages.concat(isRequired)
        }
      }

      /*
      * check valid email address
      */
      if (rule === "email") {
        let isEmail = validateEmail(valid.data, customMessages[index]);
        if (isEmail !== '') {
          errorMessages = errorMessages.concat(isEmail)
        }
      }

      /*
      * check valid number
      */
      if (rule === "number") {
        let isNumber = validateNumber(valid.data, customMessages[index]);
        if (isNumber !== '') {
          errorMessages = errorMessages.concat(isNumber)
        }
      }
    });
    if (errorMessages.length > 0) {
      let e = [{
        name: valid.data,
        key: key,
        message: errorMessages.toString(),
      }]
      errors = errors.concat(e)
    }
  });
  
  if (errors.length > 0) {
    return {
      isValid: false,
      errors: errors
    }
  }
  return {
    isValid: true,
    errors: errors
  }
};

const musthMinLength = (value, min, customMessage) => {
  if (value.length <= min) {
    return customMessage !== undefined ? customMessage : `minimum length is "${min}"`
  }
  return ''
};

const musthMAxLength = (value, max, customMessage) => {
  if (value.length >= max) {
    return customMessage !== undefined ? customMessage : `maximum length is "${max}"`
  }
  return ''
};

const musthRequired = (value, customMessage) => {
  if (value === undefined || value === null || value === '') {
    return customMessage !== undefined ? customMessage : `this fied is required`
  }
  return ''
};

function validateEmail(value, customMessage) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(String(value).toLowerCase())){
    return customMessage !== undefined ? customMessage : `this fied invalid email address`
  }
  return ''
}

function validateNumber(value, customMessage) {
  if(!Number.isInteger(value)){
    return customMessage !== undefined ? customMessage : `this fied invalid number`
  }
  return ''
}

module.exports = {
  validation,
};