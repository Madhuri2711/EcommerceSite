import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

import router from './src/routes/index.js';
import { MONGODB_URL } from './src/config/db.config.js';

const app = express();
const __dirname = path.resolve();

// enable CORS using npm package
app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/src/assets'));


// Mongo Configuration
mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //don't show the log when it is test
        console.log('Connected to %s');
        console.log('App is running ... \n');
        console.log('Press CTRL + C to stop the process. \n');
    })
    .catch((err) => {
        console.error('App starting error:', err.message);
        process.exit(1);
    });

app.use('/api/v1', router);

app.listen(process.env.PORT || 3003, () => {
    console.log('Your app is connected with 3003!');
});
