    import express from "express";
    import morgan from "morgan";
    import cors from "cors";
    import routes from "./routes.js"
    import chalk from 'chalk'

    const port = 8082;
    const app = express();
    const adress = 'localhost'

    app.listen(port, adress,()=>{
        console.log('Server has been setup in the port: ', port);
        console.log('With the the ip adress: ', chalk.yellow(adress));
    });
    
    app.use(express.json());
    app.use(cors());
    //app.use(morgan('combined'))

    app.use('/',routes);


