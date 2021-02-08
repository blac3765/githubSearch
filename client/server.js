const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const http = require('http');
const https = require("https");
// const request = require("request");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 8001;

app.listen(port);
console.log('listening at port: %j', port);
app.use('/', express.static('./client'));
app.use(cors());

let additionalInfo = null;

app.post('/api/search', (req, res) => {
    console.log('req: %o', encodeURIComponent(req.body.name));
    params = encodeURIComponent(req.body.name);
    if(req.body && req.body.page) params += "&page=" + req.body.page;
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
            parsed.items.forEach(item => {
                var path = item.url.split('com');
                var options = {
                    host: 'api.github.com',
                    path: path[1],
                    method: 'GET',
                    headers: {'user-agent': 'node.js'}
                };
                var request = https.request(options, (response) => {
                    var body = '';
                    response.on("data", function(chunk) {
                        body += chunk.toString('utf8');
                    });
                    response.on("end", function() {
                        var additionalParsed = JSON.parse(body);
                        item['additionalInfo'] = additionalParsed;
                        console.log('addionalParsed: %o', additionalParsed);
                    });
                    }).on('error', (e) => {
                        console.error(e);
                });
                request.end();
            });
            res.json(parsed);
        });
    });
    
    request.end();
});

function getAdditionalInfo(url) {
    var path = url.split('com');
    console.log('path: %o', path);
    var options = {
        host: 'api.github.com',
        path: path[1],
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
            additionalInfo = parsed;
        });
        }).on('error', (e) => {
            console.error(e);
    });
    request.end();
};

