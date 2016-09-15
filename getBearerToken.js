/**
 * Created by Christianson on 9/14/2016.
 */
var request = require('request');
var consumer_key = 'iOHFQIRBjle2Jka7MR3qNQ';
var consumer_secret = 'QOdvnY6l6a2OvkSYDGNSqtP1yESrVLdBEJ79muQGk';
var enc_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');

var oauthOptions = {
    url: 'https://api.twitter.com/oauth2/token',
    headers: {'Authorization': 'Basic ' + enc_secret, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    body: 'grant_type=client_credentials'
};

request.post(oauthOptions, function(e, r, body) {
    console.log(body)
});