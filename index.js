const express = require('express');
const moment = require('moment');
const path = require('path');

var app=express();
var port=process.env.PORT||3000;
app.listen(port,function(err,data){
  if(err) throw err;
  console.log("Running at port:"+port);
})

app.get('/',function(req,res){
    var fileName=path.join(__dirname,'/index.html');
    res.sendFile(fileName,function(err){
      if(err) throw err;
      console.log("Sent file success!");
    })
})

app.get('/:date',function(req,res){
  var myDate;
  if(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(req.params.date)){
    myDate=moment(req.params.date,"X");
  }else myDate=moment(req.params.date,"MMMM D,YYYY");

  if(myDate.isValid()){
    res.json({
      unix:myDate.format("X"),
      natural:myDate.format("MMMM D,YYYY")
    })
  }else{
    res.json({
      unix:null,
      natural:null
    })
  }
});
