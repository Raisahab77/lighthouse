const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { logger, logError, logInfo, logWarning } = require('./utils/logger');


// Routes

const logsRoute = require('./routes/loggerRoute');


const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/logs', logsRoute);


app.get('/', (req, res) => {
    logError("here is error", req, res, 500);
    logInfo("here is info", req, res, 200);
    logWarning("here is warning", req, res, 400);
    res.status(200).send("tmkc");
});

app.get('/post-form', (req, res) => {
    res.render('form');
});

app.get('/tmkc-form', (req, res) => {
    res.send('TmkcForm');
});

app.post('/submit-form', (req, res) => {
    try {
        let user = req.user.users_id;
        const email = req.body.email;
        const password = req.body.password;
        // Handle the form data
        if (email == '' || password == '') {
            logWarning("Bad request", req, res, 400);
            return res.status(400).send('bad request');
        }
        if (email == 'vikas@gmail.com' && password !== '1234') {
            logWarning("Invalid credentials", req, res, 400);
            return res.status(401).send('Unauthorized');
        }

        if (email == 'vikas@gmail.com' && password == '1234') {
            logInfo("Login successfull", req, res, 200);
            return res.status(200).send('login successfull');
        }
    } catch (error) {
        logError("Login error", req, res, 500);
        return res.status(500).send('internal server error');
    }
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))