 const dogs = require("../dogs.js")
 
 function createDogAddForm(request, response) {
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Dogs!</title>
    </head>
    <body>
      <h1>Create a dog</h1>
      <form method="POST">
        <label id="name">Dog name</label>
        <input id="name" name="name">
        <label id="breed">Dog breed</label>
        <input id="breed" name="breed">
        <button>Search</button>
      </form>
    </body>
  </html>
  `;
  response.end(html);
}

function addDogToObject(request, response) {
  const newDog = request.body;
  // console.log(newDog);
  const name = newDog.name.toLowerCase();
  dogs[name] = newDog;
  // console.log(dogs);
  response.redirect("/");
}

module.exports = {createDogAddForm, addDogToObject}