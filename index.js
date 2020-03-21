const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// app credentials config
const config = require('./server/config/keys');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());


app.use('/api/dialogflow', require('./server/routes/dialogflow'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production'){

    // set static folder
    app.use(express.static('client/build'));

    // index.html for all page routes
    app.get('*', (req, res ) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server Running -> ${port}`)
});

module.exports = app;