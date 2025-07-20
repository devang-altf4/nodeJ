const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const urlRouter = require('./routers/url');
app.use('/url', urlRouter);