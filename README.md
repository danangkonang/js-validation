# Java Script Validation

## basic example
```js
const validation = require('./validation');

function index(){
  let form = [
    {
      data: "email@email.com",
      rules: "required|email",
    },
    {
      data: "foo",
      rules: "required",
    },
    {
      data: "23july",
      rules: "required|number|min:1",
    }
  ]

  let isValid = validation.validation(form);
  console.log(isValid);
  // {
  //   isValid: false,
  //   errors: [
  //     {
  //       name: '23july',
  //       key: 2,
  //       message: '"23july" not valid number'
  //     }
  //   ]
  // }
};
```

## Rules
- required
- email
- max:number
- min:number
- number

## with custom message

```js
  let form = [
    {
      data: "email@example.com",
      rules: "required|email",
      messages: "email mush be required|invalid email address",
    }
  ]
```

## add custom key for your data

```js
  let form = [
    {
      data: "email@email.com",
      rules: "required|email",
      key: "your key",
    }
  ]
```
