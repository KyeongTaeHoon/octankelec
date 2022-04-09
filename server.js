const db_config = require(__dirname + '/database.js');
const express = require('express');
const app = express();
var AWS = require ('aws-sdk');
AWS.config.update({region:'us-east-1'});
const bodyParser = require('body-parser');
const personalizeruntime = new AWS.PersonalizeRuntime();
const personalizeevents = new AWS.PersonalizeEvents();
const conn = db_config.init();

//ryz
const ejs = require("ejs");
const fs = require('fs');
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);
//

db_config.connect(conn);
AWS.config.update({region:'us-east-1'});

app.use('/js', express.static(__dirname + "/js"));
app.use(bodyParser.json());
app.listen(80, function(){
    console.log('listening on 80')

});

app.get('/oct', function(요청, 응답){
    응답.send(__dirname + '/oct.html');

});

//ryz
app.get('/', function(요청, 응답){

  let apiBody = [];
    var personalizeruntime = new AWS.PersonalizeRuntime();
    var params = {
      campaignArn: 'arn:aws:personalize:us-east-1:593182458133:campaign/poc-campaign',
      numResults: '9',
      userId: '100'
    };
    personalizeruntime.getRecommendations(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      
      else {
        var body = JSON.parse(fs.readFileSync('./item.json', 'utf8'));
    var resultBody =[];
       apiBody = data.itemList;
       console.log(apiBody);
       for(var i = 0; i<apiBody.length; i++){
        for(var j = 0; j<body.result.length; j++){
          if (body.result[j].id == apiBody[i].itemId){   
            console.log(body.result[j].id) 
            resultBody.push({"id":body.result[j].id, "image":body.result[j].image, "data1":body.result[j].data1, "data2":body.result[j].data2, "data3":body.result[j].data3, "data4":body.result[j].data4, "data5":body.result[j].data5});      
            break;      
          }
          
        };      
      };
  
      var merged = resultBody.concat(body.result);
      var result = merged.filter(function(item1, idx1){
        //filter() 메서드는 콜백함수에서 정의한 조건이 true인 항목만 리턴한다.(필터링)
          return merged.findIndex(function(item2, idx){
            //findIndex() 메서드는 콜백함수에 정의한 조건이 true인 항목의 index를 리턴한다.
              return item1.id == item2.id
          }) == idx1;
      });
  //     console.log("haha");
  // console.log(result);
  // console.log("haha");
  console.log('result',result);
      응답.render('index', {'num' : result.length, 'body' : result} );
  
                  // successful response
      }    
    });  
  });

  
    
//ryz


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
    console.log(req.body);
    status = 'success';
  }
  });
  /*무슨 용도인지 모르겠으나 put event*/
  const params2 = {
    eventList: [ /* required */
      {
        eventType: eventtype, /* required */
        sentAt: timestamp, /* required */
        
        itemId: itemid,
      },
      /* more items */
    ],
    sessionId: 'req.sessionID', /* required */
    trackingId: '1951d070-420b-477d-a02d-82e14e4c9f96', /* required */
    userId: userid
  };
  personalizeevents.putEvents(params2, function(err, data) {
    if (err) status = 'fail'; // an error occurred
    else     {

      status='success';
    }           // successful response
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

    personalizeruntime.getRecommendations(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else{
        result = data 
        
      }               // successful response
    }); 
    응답.send(result.itemList);
    // 응답.sendFile(__dirname + '/index.html');
  });
 