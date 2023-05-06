import express from "express"
import bodyParser from "body-parser";
import viewEngine from "./Configs/viewEngine"
import webRoutes from "./routes/web"

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// config view engine
viewEngine(app);

//config web route
webRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("App is running at the port: "+port);
})