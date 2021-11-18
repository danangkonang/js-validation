# @danangkonang/js-validation

## Description

simple validation for java script

## Install

Install with npm:

```bash
npm install @danangkonang/js-validation
```

Install with yarn:

```bash
yarn add @danangkonang/js-validation
```

## Rules
- required
- email
- max:number
- min:number
- number
- url

## Simple Example
```js
const validation = require('@danangkonang/js-validation');

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
  //       name: '',
  //       key: 0,
  //       message: 'this fied is required,this fied not valid email'
  //     },
  //     {
  //        name: '23july',
  //        key: 2,
  //        message: 'this fied not valid number'
  //      }
  //   ]
  // }

};
```

## With Custom Message

```js
  let form = [
    {
      data: "email@example.com",
      rules: "required|email",
      messages: "email mush be required|invalid email address",
    }
  ]
```

## Make Custom Key To Your Data

```js
  let form = [
    {
      data: "email@email.com",
      rules: "required|email",
      key: "your key",
    }
  ]
```

## File validation

```js
let isValid = validation.validation([
  {
    data: files,
    rules: 'min:1000|max:120000|type:jpg,png,pdf,docx',
  }
]);
console.log(isValid);
// validation.validation([
//   {
//     data: [],
//     rules: 'min:1000|max:120000|type:jpg,png,pdf,docx',
//   }
// ]);
```
