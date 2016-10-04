/**
 * Created by Christianson on 9/22/2016.
 */
/**
 * Created by Christianson on 9/14/2016.
 */

var Twitter = require('twitter');
var fs = require('fs');
var client = new Twitter({
    consumer_key: 'iOHFQIRBjle2Jka7MR3qNQ',
    consumer_secret: 'QOdvnY6l6a2OvkSYDGNSqtP1yESrVLdBEJ79muQGk',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAAp1VgAAAAAAHsmdlrFthRUlLj%2BOH6Pz8S6jV7w%3DsGpOWn3VwPEaw29qY2ZVGHREUsjVoI6KG14rWm8zufaneX1LDC'
});

var screenName = 'Sam___Hurley';

client.get('followers/list',{screen_name: screenName, count: 20, cursor: -1},function(error, data, response){
    debugger;
});

