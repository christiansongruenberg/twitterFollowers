/**
 * Created by Christianson on 9/14/2016.
 */

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'iOHFQIRBjle2Jka7MR3qNQ',
    consumer_secret: 'QOdvnY6l6a2OvkSYDGNSqtP1yESrVLdBEJ79muQGk',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAAp1VgAAAAAAHsmdlrFthRUlLj%2BOH6Pz8S6jV7w%3DsGpOWn3VwPEaw29qY2ZVGHREUsjVoI6KG14rWm8zufaneX1LDC'
});

client.get('followers/list',{screen_name: 'TeamCrowdbabble', count: 200}, function(error, tweets, response) {
    if(error) throw error;
    console.log(Object.keys(tweets));  // The favorites.
});