import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';

import swaggerUI from 'swagger-ui-express';
// import schedule from 'node-schedule';
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import serviceAccount from './src/config/inani-dev-firebase-adminsdk-g29jd-59b5d053d6.json';

initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://inani-dev-default-rtdb.firebaseio.com/'
});

import router from './src/routes/index.js';
import { MONGODB_SERVER_URL, MONGODB_URL } from './src/config/db.config';
// import MONGODB_URL from './src/config/db.config.js';
// import orderTracking from './src/cron/orderTracking.js';
// import walletPaymentRelease from './src/cron/walletPaymentRelease.js';
//const collection = require("./src/models/admin");
const app = express();
const __dirname = path.resolve();

// enable CORS using npm package
app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/src/assets'));

// Mongo Configuration
mongoose
    .connect(MONGODB_SERVER_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //don't show the log when it is test
        console.log('Connected to %s', MONGODB_SERVER_URL);
        console.log('Website is running ... \n');
        console.log('Press CTRL + C to stop the process. \n');
    })
    .catch((err) => {
        console.error('App starting error:', err.message);
        process.exit(1);
    });

app.use('/api/v1', router);

// app.post("/",async(req,res)=>{
//     const{email,password}=req.body

//     try{
//         const check=await collection.findOne({email:email})

//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("notexist")
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })

app.listen(process.env.PORT || 3002, () => {
    console.log('Your app is connected with 3002!');
});

// schedule.scheduleJob('0 0 */4 * * *', function () {
//     console.log('execute the tracking cron at', new Date());
//     orderTracking();
// });

// schedule.scheduleJob('0 0 */6 * * *', function () {
//     console.log('execute the wallet cron at', new Date());
//     walletPaymentRelease();
// });

//Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Inani Development API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/auth.route.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));