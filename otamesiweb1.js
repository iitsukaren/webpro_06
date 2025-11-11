const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/otamesiweb1", (req, res) => {
  let nowtime = new Date();
  let daweek = nowtime.getDay()+1;
  let day = "";
  
  if(daweek == 1){
    day = "日曜日"
  }
  else if(daweek == 2){
    day = "月曜日"
  }
  else if(daweek == 3){
    day = "火曜日"
  }
  else if(daweek == 4){
    day = "水曜日"
  }
  else if(daweek == 5){
    day = "木曜日"
  }
  else if(daweek == 6){
    day = "金曜日"
  }
  else if(daweek == 7){
    day = "土曜日"
  }

  let now = [nowtime.getFullYear()+"年",
             nowtime.getMonth()+1+"月",
             nowtime.getDate()+"日",
             nowtime.getHours()+"時",
             nowtime.getMinutes()+"分",
             nowtime.getSeconds()+"秒",
             day];

  res.render( 'otamesiweb1', {mytime:now} );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));