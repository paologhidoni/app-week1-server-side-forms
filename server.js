const express = require("express");
const dogs = require("./dogs.js");

const server = express();

// store the values of the dogs object inside of the names array
const names = Object.values(dogs);
// console.log(names[0].name)


// HANDLERS

const addDog = require("./routes/addDog.js");



// CHALLENGE 1

// server.get("/", (request, response) =>{

//   let myString = "";
//   Object.values(dogs).forEach(el => {
//     myString += `<li>${el.name}</li>`;
//   });  

//   const html = `
//   <!doctype html>
//   <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Dogs!</title>
//     </head>
//     <body>
//       <ul>${myString}</ul>
//     </body>
//   </html>
//   `;

//   response.send(html);
// })



// CHALLENGE 2


// We create a route to display content in the home page
server.get("/", (request, response) => {

  // save the user's input inside the input variable, retrieving it from the request.query object
  let input = request.query.dogName  || "";

  // create an empty string that will hold our dog names list
  let dogNames = "";

  // loop though the dogs object elements and add to our dogNames string an li with each element's name.
  for (const dog of Object.values(dogs)) {

    const match = dog.name.toLowerCase().includes(input.toLowerCase());

    if(match || !input) {
      dogNames += `
      <li>
          <span>${dog.name}</span>
          <form action="/delete-dog" method="POST" style="display: inline;">
            <button name="name" value="${dog.name}" aria-label="Delete ${dog.name}">
              &times;
            </button>
          </form>
        </li>`;

    }

  }

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Dogs!</title>
    </head>
    <body>

      <ul>${dogNames}</ul>

      <form>
        <label for="dogName">Filter by dog name</label>
        <input name='dogName' id="dogName">
        <button type="submit">SUBMIT</button>
      </form>

    </body>
  </html>
  `;

  response.end(html);
})


// CHALLENGE 3 - ADDING DOGS

server.get("/add-dog", addDog.createDogAddForm);

const bodyParser = express.urlencoded({ extended: false });

server.post("/add-dog", bodyParser, addDog.addDogToObject);



// CHALLENGE 4 - DELETING DOGS

server.post("/delete-dog", bodyParser, (request, response) => {
  const nameToDelete = request.body.name.toLowerCase();
  delete dogs[nameToDelete];
  response.redirect("/");
});





const PORT = 4444;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));