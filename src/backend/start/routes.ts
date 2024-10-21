import ApisController from 'App/Controllers/Http/ApisController';
import { Router } from 'express';
const Route = Router();

Route.get('/greet',ApisController.greet)

Route.post('/configuration/insert', ApisController.insert_configuration)
Route.post('/configuration/login', ApisController.login)

// Insert Data 
Route.post('/configuration/update-water-consumption', ApisController.updateWaterConsumption);


/*
Route.get('/configurations',ApisController.configurations)
Route.post('/configuration/update', ApisController.update_configuration)
Route.post('/configuration/delete', ApisController.delete_configuration)
*/

export { Route as routes };
