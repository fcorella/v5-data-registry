#!/usr/bin/env node

// import path from 'path'; // was used for debugging

import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';

const userFriendlyNames = {
    "v5-rp-qr.pomcor.com": "Example City Police Department",
    "v5-rp-web.pomcor.com": "Bhutan Retal Cars Agency",
    "test-rp-web.pomcor.com": "Bhutan Retal Cars Agency"
}

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', './views');

http.createServer(app).listen(3052);
console.log("listening on port 3052");

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.redirect(303, '/data-registry-home-page.html');
});

app.get('/data-registry-home-page.html',function(req,res) {
    res.render('data-registry-home-page.handlebars', {});
});

app.get('/domain-designation', (req, res) => {
    const hostname = req.query.hostname;
    const domainDesignation =
	  userFriendlyNames.hasOwnProperty(hostname) ?
	  userFriendlyNames[hostname] :
	  hostname;
    res.set('Content-Type', 'text/html; charset=utf-8')
	.set('Access-Control-Allow-Origin', '*')
	.send(domainDesignation);
});    

app.use(function(req,res) {
    res.status(404).send('NOT FOUND');
});
app.use(function(err,req,res,next) {
    console.log("Error: " + err.stack);
    res.status(500).send('INTERNAL ERROR');
});
