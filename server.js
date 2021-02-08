const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const https = require("https");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 8001;

app.listen(port);
console.log('listening at port: %j', port);
app.use('/', express.static('./client'));
app.use(cors());


app.post('/api/search', (req, res) => {
    console.log('req.body: %o', req.body);
    params = encodeURIComponent(req.body.name);
    if(req.body && req.body.page) params += "&page=" + req.body.page;
    if(req.body && req.body.pageSize) params += "&per_page=" + req.body.pageSize;
    console.log('params: %o', params);
    var options = {
        host: 'api.github.com',
        path: `/search/users?q=${params}`,
        method: 'GET',
        headers: {'user-agent': 'node.js'}
    };
    var request = https.request(options, function(response) {
        var body = '';
        response.on("data", function(chunk) {
            body += chunk.toString('utf8');
        });
    
        response.on("end", function() {
            var parsed = JSON.parse(body);
            res.json(parsed);
        });
    });
    request.end();
});

app.get('/api/details/:username', (req, res) => {
    var options = {
        host: 'api.github.com',
        path: `/users/${req.params.username}`,
        method: 'GET',
        headers: {'user-agent': 'node.js'}
    };
    var request = https.request(options, (response) => {
        var body = '';
        response.on("data", function(chunk) {
            body += chunk.toString('utf8');
        });
        response.on("end", function() {
            var parsed = JSON.parse(body);
            res.json(parsed);
        });
        }).on('error', (e) => {
            console.error(e);
    });
    request.end();
});

