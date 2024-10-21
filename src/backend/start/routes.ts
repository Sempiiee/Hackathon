import ApisController from 'App/Controllers/Http/ApisController';
import { Router } from 'express';
const Route = Router();

Route.get('/greet',ApisController.greet)

Route.post('/configuration/insert', ApisController.insert_configuration)
Route.post('/configuration/login', ApisController.login)

// Insert Data 
Route.post('/configuration/update-water-consumption', ApisController.updateWaterConsumption);

// See Statistics
Route.post('/configuration/fetch-water-consumption', ApisController.fetchWaterConsumptionStats);

// See Leaderboard
Route.post('/configuration/fetch-leaderboard', ApisController.fetchLeaderBoard);

// See profile
Route.post('/configuration/fetch-profile', ApisController.fetchProfile);

export { Route as routes };