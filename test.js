const validation = require('./validation');
function testing(){
  let form = [
    {
      data: "email@email.com",
      rules: "required|email|max:50|min:5|number",
      messages: "required|invalid email|maximum 10 caracter|minimum 5 caracter|musth valid number",
      key: "email-key",
    },
    {
      data: "",
      rules: "required|email",
    },
    {
      data: "foo",
      rules: "required",
    },
    {
      data: "23july",
      rules: "required|number|min:1",
    },
    {
      data: "https://july.com?testing=we&a=oi",
      rules: "url",
    }
  ]

  let isValid = validation.validation(form);
  console.log(isValid);
};

testing();
