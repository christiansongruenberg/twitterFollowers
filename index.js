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


function processUsers(error, data, response){

    if(error) {
        fs.writeFileSync(`${screenName}_last_error`, error.message);
        throw error
    }

    if(response.headers['x-rate-limit-remaining'] > 1){
        // process user stuff

        data.users.forEach( u => {
            fs.appendFileSync(`${screenName}_followers.csv`,`${u.screen_name}, "${u.description}", ${u.id_str}, ${u.followers_count} \n`)

        });

        fs.writeFileSync(`${screenName}_next_cursor`, data.next_cursor_str);
        fs.writeFileSync(`${screenName}_headers`, JSON.stringify(response.headers));
        
        var next_cursor = data.next_cursor_str;
        if(next_cursor > 0 ){
            client.get('followers/list',{screen_name: screenName, count: 200, cursor: next_cursor}, processUsers);    
        }
        
    }

}

setInterval(function() {

    var next_cursor_file = `${screenName}_next_cursor`;
    var next_cursor;
    if(fs.existsSync(next_cursor_file)){
        next_cursor = fs.readFileSync(next_cursor_file, 'utf8');
    }else{
        next_cursor = -1;
    }
    var followers_file = `${screenName}_followers.csv`;
    if(!fs.existsSync(followers_file)){
        fs.appendFileSync(followers_file, "Screen Name, Description, User ID, Followers Count \n")
    }

    client.get('followers/list',{screen_name: screenName, count: 200, cursor: next_cursor}, processUsers);
}, 15*60*1000);
