require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const POKEDEX = require('./pokedex.json');

const app = express();
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }


  // move to the next middleware
  next()
  })

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]
function handleGetTypes(req, res) {
  res.json(validTypes);
}

function handleGetPokemon(req, res) {
  let response = POKEDEX.pokemon;

  if(req.query.name) {
    response = response.filter(pokemon => 
      pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }

  if (req.query.type) {
    response = response.filter(pokemon =>
      pokemon.type.includes(req.query.type)
    )
  }
  res.json(response)
}

app.get('/types', handleGetTypes);

app.get('/pokemon', handleGetPokemon)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => { });



