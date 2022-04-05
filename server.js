const express = require('express');
const app = express();

app.use('/js', express.static(__dirname + "/js"));

app.listen(8080, function(){
    console.log('listening on 8080')

});

app.get('/oct', function(요청, 응답){
    응답.send('옥탕크 전자 공식 사이트입니다.');

});

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html');

});

app.use('/css', express.static(__dirname + "/css"));

app.get("/user-inter/:userid/:itemid/:eventtype", (req, res) => {
    console.log("test");
    res.render("detail.html", {
      userid: "김홍구",
      itemid: "옥탕크 4월 프로모션",
      eventtype: "관심",
    });
  });