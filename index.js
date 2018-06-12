require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");



const port = 3000;

const app = express();

let monsters = [{name: 'Slime', description: 'A small slime, early adventurers thrive off these.', HP: 10, strength: 1, defense: 3, speed: 2, expValue: 10},
{name: 'Small Goblin', description: 'Small green creature. Not usually feared unless in groups.', HP: 10, strength: 2, defense: 1, speed: 3, expValue: 12}]

//SAVED FOR BUILD
//app.use(express.static(`${__dirname}/public/build`));
//

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

// app.get('/api/getColor', (req, res) => {
//     res.send(color)
// })
app.get('/api/getMonster', (req, res) => {
  res.send(monsters[0])
})
// app.post('/api/addNewFoodToList', (req, res) => {
//   startInfo.push([req.body.name, req.body.price, req.body.description])
//   res.send(startInfo)
// })

//LISTENING
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
