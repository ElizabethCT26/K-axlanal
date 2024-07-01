import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes.js"

const port = 8082;
const app = express();

app.listen(port, ()=>{
    console.log('Server has been setup in the port: ', port)
});

app.use(cors());
app.use('/',routes);

