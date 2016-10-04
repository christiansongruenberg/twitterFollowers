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

var screenName = 'ScottDistasio';


function processUsers(error, data, response){
    fs.writeFileSync('followers', JSON.stringify(data.users[0]))
    if(error) {
        fs.writeFileSync(`${screenName}_last_error`, error.message);
        throw error
    }

    if(response.headers['x-rate-limit-remaining'] > 1){
        // process user stuff

        data.users.forEach( u => {
            var followerRow = [
                u.name,
                u.id,
                u.screen_name,
                sanitize(u.description),
                u.url,
                u.verified,
                u.followers_count,
                u.friends_count,
                Math.round(u.followers_count/u.friends_count*10)/10 + ' : 1 -> followers:following',
                u.friends_count,
                u.listed_count,
                u.status ? u.status.retweet_count : '',
                u.created_at,
                u.statuses_count,
                u.favourites_count,
                u.lang,
                u.location,
                u.time_zone,
                u.status ? u.status.place ? u.status.place.country : '' : '',
                u.status ? u.status.created_at : '',
                u.status ? u.status.id_str : '',
                u.status ? sanitize(u.status.text): '',
                u.status ? u.status.entities.hashtags.map(function(h){ return h.text }).join(' ') : '',
                u.status ? u.status.entities.symbols.toString() : '',
                u.status ? u.status.entities.user_mentions.map(function(u){ return u.screen_name }).join(' ') : '',
                u.status ? u.status.entities.urls.map(function(u){ return u.url}).join(' ') : '',
                u.status ? u.status.place ? u.status.place.name : '' : '',
                u.status ? u.status.place ? u.status.place.country : '' : '',
                u.status ? u.status.in_reply_to_screen_name : '',
                u.status ? u.status.in_reply_to_status_id : '',
                u.status ? u.status.retweet_count : '',
                u.status ? u.status.favorite_count : ''
            ];
            fs.appendFileSync(`${screenName}_followers.csv`,createRowStringFromArray(followerRow))

        });

        fs.writeFileSync(`${screenName}_next_cursor`, data.next_cursor_str);
        fs.writeFileSync(`${screenName}_headers`, JSON.stringify(response.headers));
        
        var next_cursor = data.next_cursor_str;
        if(next_cursor > 0 ){
            client.get('followers/list',{screen_name: screenName, count: 200, cursor: next_cursor}, processUsers);
        }
        
    }

}



    var next_cursor_file = `${screenName}_next_cursor`;
    var next_cursor;
    if(fs.existsSync(next_cursor_file)){
        next_cursor = fs.readFileSync(next_cursor_file, 'utf8');
    }else{
        next_cursor = -1;
    }
    var followers_file = `${screenName}_followers.csv`;
    if(!fs.existsSync(followers_file)){
        var mainHeaders = ["Basic Information",
            "",
            "",
            "",
            "",
            "Influence",
            "",
            "",
            "",
            "",
            "",
            "",
            "Activity",
            "",
            "",
            "Demographics",
            "",
            "",
            "",
            "Latest Tweet",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "If Reply",
            "Tweet ID",
            "Latest Tweet Engagement",
            ""
        ];

        var headers = ["Name",
            "ID",
            "Screen Name",
            "Description",
            "URL",
            "Verified",
            "Followers",
            "Following",
            "Ratio",
            "Friends",
            "Lists on",
            "Retweets of Latest Post",
            "Created Account",
            "Tweets",
            "Favourites",
            "Language",
            "Profile Location",
            "Timezone",
            "Latest Location",
            "Created At",
            "ID",
            "Tweet",
            "Hashtags",
            "Symbols",
            "Mentions",
            "URLs",
            "Place",
            "Location",
            "Reply To",
            "Original Tweet ID",
            "Retweets",
            "Favourites"];
        fs.appendFileSync(followers_file, screenName + " Crowdbabble Follower Download \n \n");
        fs.appendFileSync(followers_file, createRowStringFromArray(mainHeaders));
        fs.appendFileSync(followers_file, createRowStringFromArray(headers));
    }

    client.get('followers/list',{screen_name: screenName, count: 200, cursor: next_cursor}, processUsers);

function createRowStringFromArray(arr){
    return arr.reduce((row, value) => {
        return row + '"' + value + '"' + ',';
    }, '') + "\n"
}

function sanitize(text){
    return text.replace(/"/g, "'").replace(/\n/g, ' ')
}


