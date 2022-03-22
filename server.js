'use strict';

console.log('My First Server');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());

app.get('/weather', weatherHandler);

app.get('*', (request, response)=> {
  response.send('this is not the page you are looking for');
});

function weatherHandler(request, response){
  response.send(console.log('weather placeholder'));
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

