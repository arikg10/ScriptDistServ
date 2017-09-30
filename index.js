var express = require('express');
var app = express();
var getIP = require('ipware')().get_ip;
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";



app.get('/', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var ipInfo = getIP(req);
    console.log("=== " + req.query.referrer);
    console.log(ipInfo);


    res.send(ipInfo);

})
app.get('/test', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var ipInfo = getIP(req);
    console.log("=== " + req.query.referrer);
    console.log("=== " + req.query.user);
    var user = req.query.user;
    console.log(ipInfo);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("+++  "+ip);





    res.sendFile(path.join(__dirname + '/jscode.js'));
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var date = new Date();
        var current_hour = date.getTime();
        var myobj = {ref: req.query.referrer, time: current_hour, user: user};
        db.collection("incoming_requests").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });


});

app.listen(3000);