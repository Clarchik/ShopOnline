require('./db/mongoose')

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, _id, x-access-token, x-refresh-token");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token',
    );

    next();
});

app.use(bodyParser.json());

require('./db/routes/user/user.route')(app);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
