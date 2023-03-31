const express = require('express');
const router = require('./routers');

const app = express();
app.use(express.json());
app.use('/api/files', router);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json(err);
});
app.listen(8765, () => {
    console.log('Example app listening on port 8765!');
});
