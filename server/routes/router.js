const express = require("express");
const route = express.Router();

// requiring render.js
const services = require("../services/render");
const controller = require("../controller/controller.js");

/** 
 * @description Root route
 * @method GET/
*/

route.get("/", services.homeRoutes);

/** 
 * @description Add users
 * @method GET/add_user
*/

route.get("/add_user", services.add_user);

/** 
 * @description update user
 * @method GET/update_user
*/

route.get("/update_user", services.update_user);

// API
route.post('/api/users', controller.create);    
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route;