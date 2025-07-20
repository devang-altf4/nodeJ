const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());
const MONGODB_URI = process.env.MONGODB_URI; 


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


const urlRouter = require('./routers/url');
app.use('/url', urlRouter);
app.use('/url:id', urlRouter);
