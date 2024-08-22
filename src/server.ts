import express from 'express';
import bodyParser from 'body-parser';
import  config  from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import indexRoutes from './routes/indexRoutes';

const app = express();

const PORT = config.get<number>('port') || 3000;

// For parsing application/json
app.use(bodyParser.json());

//Routes
// app.use('/api/v1', shoppingRouter);
app.use('/api/v1', indexRoutes); 

app.listen(PORT, async ()=>{
    logger.info(`App is Runing on : ${PORT}`);
    await connect();
})