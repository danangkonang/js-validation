const validation = (data) => {
  let errors = []
  data.map((valid, key) => {
    /*
    * custom error message
    */ 
    let customMessages = []
    if (valid.messages !== undefined) {
      customMessages = valid.messages.split("|").map((message) => message);
    }

    let errorMessages = []
    valid.rules.split("|").map((rule, index) => {
      /*
      * check minimum character
      */
      if (rule.match("min")){
        let min = rule.split(":")[1]
        let isMin = minLengthValid(valid.data, min, customMessages[index]);
        if (isMin !== '') {
          errorMessages = errorMessages.concat(isMin)
        }
      }

      /*
      * check maximum character
      */
      if (rule.match("max")){
        let max = rule.split(":")[1]
        let isMax = maxLengthValid(valid.data, max, customMessages[index]);
        if (isMax !== '') {
          errorMessages = errorMessages.concat(isMax)
        }
      }

      /*
      * check required
      */
      if (rule === "required") {
        let isRequired = requiredValid(valid.data, customMessages[index]);
        if (isRequired !== '') {
          errorMessages = errorMessages.concat(isRequired)
        }
      }

      /*
      * check valid email address
      */
      if (rule === "email") {
        let isEmail = emailValid(valid.data, customMessages[index]);
        if (isEmail !== '') {
          errorMessages = errorMessages.concat(isEmail)
        }
      }

      /*
      * check valid number
      */
      if (rule === "number") {
        let isNumber = numberValid(valid.data, customMessages[index]);
        if (isNumber !== '') {
          errorMessages = errorMessages.concat(isNumber)
        }
      }

      /*
      * check valid url
      */
      if (rule === "url") {
        let isUrl = urlValid(valid.data, customMessages[index]);
        if (isUrl !== '') {
          errorMessages = errorMessages.concat(isUrl)
        }
      }

    });
    if (errorMessages.length > 0) {
      let e = [{
        name: valid.data,
        key: valid.key === undefined ? key : valid.key,
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

const minLengthValid = (value, min, customMessage) => {
  if (value.length <= min) {
    return customMessage !== undefined ? customMessage : `minimum length is "${min}"`
  }
  return ''
};

const maxLengthValid = (value, max, customMessage) => {
  if (value.length >= max) {
    return customMessage !== undefined ? customMessage : `maximum length is "${max}"`
  }
  return ''
};

const requiredValid = (value, customMessage) => {
  if (value === undefined || value === null || value === '') {
    return customMessage !== undefined ? customMessage : `this fied is required`
  }
  return ''
};

function emailValid(value, customMessage) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(String(value).toLowerCase())){
    return customMessage !== undefined ? customMessage : `this fied invalid email address`
  }
  return ''
}

function numberValid(value, customMessage) {
  if(!Number.isInteger(value)){
    return customMessage !== undefined ? customMessage : `this fied invalid number`
  }
  return ''
}

function urlValid(value, customMessage) {
  const url = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  if(!url.test(String(value).toLowerCase())){
    return customMessage !== undefined ? customMessage : `this fied invalid url`
  }
  return ''
}

const validationFile = (validate) => {
  let errors = []
  validate.map((check, key) => {
    /*
    * custom error message
    */ 
    let customMessage = []
    if (check.messages !== undefined) {
      customMessage = check.messages.split("|").map((message) => message);
    }

    let errorMessage = []
    let errorFilename = []

    if (check.data !== undefined) {
      check.data.map((file, index) => {
        check.rules.split("|").map((rule) => {
          /*
          * check minimum size file
          */
          if (rule.match("min")){
            let min = rule.split(":")[1]
            let isMinimumSize = sizeMinimumValid(file.size, min, customMessage[index]);
            if (isMinimumSize !== '') {
              errorMessage = errorMessage.concat(isMinimumSize)
            }
          }
    
          /*
          * check maximum size file
          */
          if (rule.match("max")){
            let max = rule.split(":")[1]
            let isMaximumSize = sizeMaximumValid(file.size, max, customMessage[index]);
            if (isMaximumSize !== '') {
              errorMessage = errorMessage.concat(isMaximumSize)
            }
          }
    
          /*
          * check maximum extension allowed
          */
          if (rule.match("type")){
            let isAllowFile = extensionValid(rule, file.originalname, customMessage[index])
            if (isAllowFile !== '') {
              errorMessage = errorMessage.concat(isAllowFile)
              errorFilename = errorFilename.concat(file.originalname)
            }
          }
    
          /*
          * check required
          */
          if (rule === "required") {
            // let isRequired = requiredValid(valid.data, customMessage[index]);
            // if (isRequired !== '') {
            //   errorMessage = errorMessage.concat(isRequired)
            // }
          }
    
        });
      })
    }
    if (errorMessage.length > 0) {
      let e = [{
        name: errorFilename.toString(),
        key: check.key === undefined ? key : check.key,
        message: errorMessage.toString(),
      }]
      errors = errors.concat(e)
    }
  })

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
}

function sizeMinimumValid(size, min, customMessage) {
  if (size < min) {
    return customMessage !== undefined ? customMessage : "minimum size file is " + min + "" 
  }
  return ''
}

function sizeMaximumValid(size, max, customMessage) {
  if (size > max) {
    return customMessage !== undefined ? customMessage : "maximum size file is " + max + "" 
  }
  return ''
}

function extensionValid(allowedFile, nameFile, customMessage) {
  let fileRule = allowedFile.split(":")[1]
  let arrayFileRule = fileRule.split(",")
  let regexExtension = '[^.]+$'
  let extension = nameFile.toLowerCase().match(regexExtension)
  let isAllow = arrayFileRule.includes(extension[0])
  if(!isAllow){
    return customMessage !== undefined ? customMessage : `this extensian file not allowed`
  }
  return ''
}

module.exports = {
  validation,
  validationFile,
};
