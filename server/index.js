require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");

const passport = require('passport');
require('dotenv').config();
const Auth0Strategy = require("passport-auth0");


const port = 3000;

const app = express();

let monsters = [{name: 'Slime', description: 'A small slime, early adventurers thrive off these.', HP: 10, strength: 1, defense: 3, speed: 2, expValue: 10, image: 'http://www.realfast.dk/wp-content/uploads/2017/01/slime-jump.gif'},
{name: 'Small Goblin', description: 'Small green creature. Not usually feared unless in groups.', HP: 15, strength: 2, defense: 1, speed: 3, expValue: 12, image: 'https://opengameart.org/sites/default/files/Goblin_idle.gif'},
{name: 'Zombio', description: 'An undead, no one knows why they have risen again.', HP: 20, strength: 3, defense: 0, speed: 1, expValue: 14, image: 'https://i.pinimg.com/originals/2a/99/a8/2a99a878e17b7527ea1f72b7730c6be9.gif'},
{name: 'Lion', description: 'Large muscly cat. The females do most of the work.', HP: 18, strength: 3, defense: 2, speed: 3, expValue: 20, image: 'https://i.pinimg.com/originals/2a/99/a8/2a99a878e17b7527ea1f72b7730c6be9.gif'}]

let shop = [{name: 'Knife', pwr: 1, spd: 1, def: 0, price: 10, type: 'weapon'}, 
            {name: 'Sword', pwr: 1, spd: 0, def: 1, price: 12, type: 'weapon'},
            {name: 'Axe', pwr: 2, spd: 0, def: 0, price: 14, type: 'weapon'}, 
            {name: 'Helmet', pwr: 1, spd: 0, def: 1, price: 12, type: 'head'}, 
            {name: 'Leather Armor', pwr: 1, spd: 0, def: 1, price: 12, type: 'chest'}, 
            {name: 'Bracelet', pwr: 1, spd: 0, def: 1, price: 12, type: 'arms'}, 
            {name: 'High heels', pwr: 1, spd: 0, def: 1, price: 12, type: 'legs'}]

const {getClasses, getRaces, createNewHero, getHeroes} = require('./controllers/mainController.js')

//SAVED FOR BUILD
//app.use(express.static(`${__dirname}/public/build`));
//

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log(err));

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use( passport.initialize() )
app.use( passport.session() )

passport.use( 
    new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/api/login"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    
    console.log(profile)
    app.get('db').getUserByAuthId([profile.id]).then(response => {
        console.log(response, 'login response')

        if(!response[0]) {
            console.log(profile.id)
            app.get('db').createUserByAuthId([profile.id, 'email'])
            .then(created => {
                return done(null, created[0])
            })
        } else {
            console.log('hit!', response[0])
            return done(null, response[0])
            
        }
    })


    // return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
})



passport.deserializeUser(function(obj, done) {
    done(null, obj)
})

app.get('/api/login', passport.authenticate('auth0', {successRedirect: 'http://localhost:3001/characters'}))




app.get('/api/getMonster', (req, res) => {
  var item = monsters[Math.floor(Math.random()*monsters.length)]
  res.send(item)
})
app.get('/api/getShop', (req, res) => {
  res.send(shop)
})

app.get('/api/getUser', (req, res, next) => {
  if(req.user) {
    res.status(200).json(req.user.user_id)
  }
  next()
})

app.get('/api/getHeroes', getHeroes)

app.get('/api/getClasses', getClasses)
app.get('/api/getRaces', getRaces)

app.post('/api/newHero', createNewHero)

//LISTENING
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
