import express from "express";
import HomeController from "../Controller/HomeController";
let router = express.Router();

let initWebRoutes = (app) =>{
    router.get("/", HomeController.getHomePage);
    router.post('/webhook', HomeController.postWebHook);
    router.get('/webhook', HomeController.getWebHook)
    router.post('/setup-profile', HomeController.setupProfile)
    router.post('/setup-pesistent-menu', HomeController.setupPersistentMenu)
    return app.use('/',router)
}

module.exports = initWebRoutes;