var express = require('express');
var app = express();
//to add assets like css : todo create assets 
app.use(express.static(__dirname +'/public'));



app.get('/',function(req,res){
    res.send("test");
  })

app.get('/menu',function(req,res){
  //todo create menu.html with a nice form
  //res.sendFile('menu.html')
});

  console.log("hello world");

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });