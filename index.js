require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");



const port = 3000;

const app = express();

let monsters = [{name: 'Slime', description: 'A small slime, early adventurers thrive off these.', HP: 10, strength: 1, defense: 3, speed: 2, expValue: 10, image: 'http://www.realfast.dk/wp-content/uploads/2017/01/slime-jump.gif'},
{name: 'Small Goblin', description: 'Small green creature. Not usually feared unless in groups.', HP: 10, strength: 2, defense: 1, speed: 3, expValue: 12, image: 'https://opengameart.org/sites/default/files/Goblin_idle.gif'}]

let shop = [{name: 'Knife', pwr: 1, spd: 1, def: null, price: 10}, 
            {name: 'Sword', pwr: 1, spd: null, def: 1, price: 12},
            {name: 'Axe', pwr: 2, spd: null, def: null, price: 14}]

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
  var item = monsters[Math.floor(Math.random()*monsters.length)]
  res.send(item)
})
app.get('/api/getShop', (req, res) => {
  res.send(shop)
})

//LISTENING
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
