import schedule from 'node-schedule';
import mongoose from 'mongoose';
import MONGODB_URL from '../src/config/db.config.js';
import walletPaymentRelease from '../src/cron/walletPaymentRelease.js';

// Mongo Configuration
mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //don't show the log when it is test
        console.log('Connected to %s', MONGODB_URL);
        console.log('App is running ... \n');
        console.log('Press CTRL + C to stop the process. \n');
    })
    .catch((err) => {
        console.error('App starting error:', err.message);
        process.exit(1);
    });

schedule.scheduleJob('*/30 * * * *', function () {
    console.log('execute the wallet amount cron at', new Date());
    walletPaymentRelease();
});
