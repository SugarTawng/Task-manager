const express = require('express');
const task = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const app = express();
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const port = process.env.PORT || 3000;


app.use(express.static('./public'));
app.use(express.json());


app.use('/api/v1/tasks/', task);
app.use(errorHandlerMiddleware)
app.use(notFound);



const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(3000, ()=>{
            console.log(`Listening in port ${port}`);
        })
    }catch (error){
        console.log(error);
    }
}
start();
