const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController.js')

/**
 *David Nogueira
 * Routes and resources
 */

/**
 * param types
 * Query params: Named parameters send on the rout after "?" (filters, pagination...)
 * Route params: Used to identify resources (ex: /users/id)
 * Request Body: used to create or change resources (ex create a user)
 */

/**
 * Query builder
 * Knext
 */
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;