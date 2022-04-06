const express = require('express');
const app = express();
var AWS = require ('aws-sdk');
AWS.config.update({region:'us-east-1'});

app.use('/js', express.static(__dirname + "/js"));

app.listen(8080, function(){
    console.log('listening on 8080')

});

app.get('/oct', function(요청, 응답){
    응답.send(__dirname + '/oct.html');

});

app.get('/', function(요청, 응답){
    
    var personalizeruntime = new AWS.PersonalizeRuntime();
    var params = {
      campaignArn: 'arn:aws:personalize:us-east-1:593182458133:campaign/poc-campaign',
      numResults: '9',
      userId: '100'
    };
    personalizeruntime.getRecommendations(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    }); 
    응답.sendFile(__dirname + '/index.html');
});

app.use('/css', express.static(__dirname + "/css"));

app.get("/user-inter/:userid/:itemid/:eventtype", (req, res) => {
    console.log("test");
    res.render("detail.html", {
      userid: 100,
      itemid: 3780,
      eventtype: "watch",
    });
  });

 app.post('/', function(요청, 응답){
    var params = {
        eventList: [ /* required */
          {
            eventType: 'watch', /* required */
            sentAt: new Date, /* required */
            impression: [
              'STRING_VALUE',
              /* more items */
            ],
            itemId: '3253',
          },
          /* more items */
        ],
        sessionId: 'STRING_VALUE', /* required */
        trackingId: '1951d070-420b-477d-a02d-82e14e4c9f96', /* required */
        userId: '100'
      };
      personalizeevents.putEvents(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });

 });

