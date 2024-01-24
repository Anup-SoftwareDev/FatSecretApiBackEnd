const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/fatsecret', (req, res) => {
    const formData = {
        method: req.body.method,
        search_expression: req.body.search_expression,
        format: req.body.format
    };

    const options = {
        method: 'POST',
        url: 'https://platform.fatsecret.com/rest/server.api',
        headers: {
            'Authorization': req.header('Authorization'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: formData
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).send(error);
        }
        res.send(body);
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
