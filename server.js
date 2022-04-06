const db_config = require(__dirname + '/database.js');
const express = require('express');
const app = express();
var AWS = require ('aws-sdk');
AWS.config.update({region:'us-east-1'});
const bodyParser = require('body-parser');
const personalizeruntime = new AWS.PersonalizeRuntime();
const personalizeevents = new AWS.PersonalizeEvents();
const conn = db_config.init();

db_config.connect(conn);
AWS.config.update({region:'us-east-1'});

app.use('/js', express.static(__dirname + "/js"));
app.use(bodyParser.json());
app.listen(8080, function(){
    console.log('listening on 8080')

});

app.get('/oct', function(요청, 응답){
    응답.send(__dirname + '/oct.html');

});

app.get('/', function(요청, 응답){
  응답.sendFile(__dirname + '/index.html');

    // var params = {
//       campaignArn: 'arn:aws:personalize:us-east-1:593182458133:campaign/poc-campaign',
//       numResults: '9',
//       userId: '100'
//     };
//     personalizeruntime.getRecommendations(params, function(err, data) {
//       if (err) console.log(err, err.stack); // an error occurred
//       else     console.log(data);           // successful response
//     }); 
//     응답.sendFile(__dirname + '/index.html');
});

app.use('/css', express.static(__dirname + "/css"));

app.post("/user-inter", (req, res) => {
  const { userid, itemid, eventtype } = req.body;
  let status = "success";
  const timestamp = Math.floor(+ new Date() / 1000);
  /*db insert*/
  const sql = 'INSERT INTO rating_sample_csv(USER_ID,ITEM_ID,TIMESTAMP,EVENT_TYPE)VALUES(?,?,?,?)';
  const params = [userid,itemid,timestamp,eventtype];
  conn.query(sql,params,function(err,rows,fields) {
  if(err){
    status= 'fail'
  }else{
    status = 'success';
  }
  });
  /*무슨 용도인지 모르겠으나 put event*/
  const params2 = {
    eventList: [ /* required */
      {
        eventType: eventtype, /* required */
        sentAt: timestamp, /* required */
        impression: [
          'STRING_VALUE',
          /* more items */
        ],
        itemId: itemid,
      },
      /* more items */
    ],
    sessionId: 'STRING_VALUE', /* required */
    trackingId: '1951d070-420b-477d-a02d-82e14e4c9f96', /* required */
    userId: userid
  };
  personalizeevents.putEvents(params2, function(err, data) {
    if (err) status = 'fail'; // an error occurred
    else     status='success';           // successful response
  });
  res.send({ status});

});

app.post('/getlist', function(요청, 응답){
  const {userId , numResults, campaignArn} = 요청.body
  let result;
   var params = { 
      campaignArn: 'arn:aws:personalize:us-east-1:593182458133:campaign/poc-campaign',
      numResults: '9',
      userId: '100' 
    };
    console.log(userId)
    personalizeruntime.getRecommendations(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else{
        result = data 
        console.log(data)
      }               // successful response
    }); 
    응답.send(result.itemList);
    // 응답.sendFile(__dirname + '/index.html');
  });
 