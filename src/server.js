'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const Data = require('./data.js');
const cors = require('cors');
app.use(cors());
// const port = await mongoServer.getPort();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
 
app.get('/items', Data.getAllItems);
app.get('/items/:id', Data.getOneItem);
app.delete('/items/:id', Data.deleteOneItem);
app.post('/items', Data.addAnItem);
app.put('/items/:id', Data.updateOneItem)

app.use('*', (req,res) => {
  res.status(404).send('These are not the droids you are looking for.');
});

app.use(  (error,req,res) => {
  res.status(500).send(`My Bad ... ${error.message}`);
  
});

module.exports = {
  server: app,
  start: (port) => {

    app.listen(port, console.log(`Server is up and running on port: ${port}`));
  },
};
