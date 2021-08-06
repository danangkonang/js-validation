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
    let dataKey = valid.key === undefined ? key : valid.key

    valid.rules.split("|").map((rule, index) => {

      /*
      * check minimum character
      */
      if (rule.match("min")){
        let min = rule.split(":")[1]
        let isMin = musthMinLength(valid.data, min, customMessages[index], dataKey);
        errors = errors.concat(isMin)
      }

      /*
      * check maximum character
      */
      if (rule.match("max")){
        let max = rule.split(":")[1]
        let isMax = musthMAxLength(valid.data, max, customMessages[index], dataKey);
        errors = errors.concat(isMax)
      }

      /*
      * check required
      */
      if (rule === "required") {
        let isRequired = musthRequired(valid.data, customMessages[index], dataKey);
        errors = errors.concat(isRequired)
      }

      /*
      * check valid email address
      */
      if (rule === "email") {
        let isEmail = validateEmail(valid.data, customMessages[index], dataKey);
        errors = errors.concat(isEmail)
      }

      /*
      * check valid number
      */
      if (rule === "number") {
        let isNumber = validateNumber(valid.data, customMessages[index], dataKey);
        errors = errors.concat(isNumber)
      }
    });
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

const musthMinLength = (value, min, customMessage, key) => {
  if (value.length <= min) {
    return [{
      name: value,
      key: key,
      message: customMessage !== undefined ? customMessage : `minimum length is "${min}"`,
    }]
  }
  return []
};

const musthMAxLength = (value, max, customMessage, key) => {
  if (value.length >= max) {
    return [{
      name: value,
      key: key,
      message: customMessage !== undefined ? customMessage : `maximum length is "${max}"`,
    }]
  }
  return []
};

const musthRequired = (value, customMessage, key) => {
  if (value === undefined || value === null || value === '') {
    return {
      name: value,
      key: key,
      message: customMessage !== undefined ? customMessage : `"${value}" is required`
    }
  }
  return []
};

function validateEmail(value, customMessage, key) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(String(value).toLowerCase())){
    return {
      name: value,
      key: key,
      message: customMessage !== undefined ? customMessage : `"${value}" not valid email`
    }
  }
  return []
}

function validateNumber(value, customMessage, key) {
  if(!Number.isInteger(value)){
    return {
      name: value,
      key: key,
      message: customMessage !== undefined ? customMessage : `"${value}" not valid number`
    }
  }
  return []
}

module.exports = {
  validation,
};