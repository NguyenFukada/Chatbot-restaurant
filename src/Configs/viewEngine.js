import express from "express";

// config view engine for an express app
let configViewEngine = (app) =>{
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/View");
}

module.exports = configViewEngine;
