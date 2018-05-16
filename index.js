require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");

const port = 3000;

const app = express();

//SAVED FOR BUILD
//app.use(express.static(`${__dirname}/public/build`));
//

let color = 'blue'
let startInfo = [['Cheeseburger', '$6.99', 'A food item with meat, bread and cheese.'], ['Grilled Cheese', '$4.99', 'A sandwitch with only cheese on the inside.']]

// massive(process.env.CONNECTION_STRING)
//   .then(db => {
//     app.set("db", db);
//   })
//   .catch(err => console.log(err));

app.use(json());
app.use(cors());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// );

app.get('/api/getColor', (req, res) => {
    res.send(color)
})
app.get('/api/serverInfo', (req, res) => {
  res.send(startInfo)
})
app.post('/api/addNewFoodToList', (req, res) => {
  startInfo.push([req.body.name, req.body.price, req.body.description])
  res.send(startInfo)
})

//LISTENING
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
