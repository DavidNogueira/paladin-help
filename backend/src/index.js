const express = require('express');
const cors = require('cors');
const routes = require('./routes')

const app = express();

app.use(cors())//when in productions put the origin that is the domain of the app
app.use(express.json());
app.use(routes);
app.listen(3333);