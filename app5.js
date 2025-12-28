"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  res.render('db2', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.redirect('/public/keiyo_add.html');
});

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 }
];

app.get("/keiyo2", (req, res) => {
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

app.get("/keiyo2/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[ number ];
  if (detail) {
    res.render('keiyo2_detail', {id: number, data: detail} );
  } else {
    res.render('keiyo2_notfound', {id: number});
  }
});

app.get("/keiyo2/delete/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[ number ];
  if (detail) {
    res.render('keiyo2_delete', { id: number, data: detail });
  } else {
    res.render('keiyo2_notfound', {id: number});
  }
});

app.post("/keiyo2/delete/:number", (req, res) => {
  const number = req.params.number;
  if (station2[number]) {
    station2.splice(number, 1);
  }
  res.redirect('/keiyo2' );
});

app.get("/keiyo2_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let change = req.query.change;
  let passengers = req.query.passengers;
  let distance = req.query.distance;
  let newdata = { id: id, code: code, name: name, change: change, 
                  passengers: passengers, distance: distance };
  station2.push( newdata );
  res.redirect('/public/keiyo2_add.html');
});

app.post("/keiyo2", (req, res) => {
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

app.post("/keiyo2/update/:number", (req, res) => {
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});

let combat_plane = [
  { country:"America", model:"F-4", name:"ファントムⅡ" },
  { country:"America", model:"F-14", name:"トムキャット" },
  { country:"America", model:"F-15", name:"イーグル" },
  { country:"America", model:"F-16", name:"ファイティングファルコン" },
  { country:"America", model:"F/A-18", name:"ホーネット" },
  { country:"America", model:"F/A-18E/F", name:"スーパーホーネット" },
  { country:"America", model:"F-22", name:"ラプター" },
  { country:"America", model:"F-35", name:"ライトニングⅡ" },
];

app.get("/combat", (req, res) => {
  res.render('db3', { data: combat_plane });
});

app.get("/combat_add", (req, res) => {
  let country = req.query.country;
  let model = req.query.model;
  let name = req.query.name;
  let newdata = { country: country, model: model, name: name };
  combat_plane.push( newdata );
  res.redirect('/public/combat_add.html');
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else if( num==3 )cpu = 'パー';
  if(hand===cpu){
    judgement = 'あいこ';
    win += 0;
    total += 0;
  }
  else if(
    (hand === "グー" && cpu === "チョキ") || (hand === "チョキ" && cpu === "パー") || (hand === "パー" && cpu === "グー")){
    judgement = '勝ち';
    win += 1;
    total += 1;
  }
  else{
    judgement = '負け';
    win += 0;
    total += 1;
  }
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/janken2", (req, res) => {
  let hand = req.query.radio;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else if( num==3 )cpu = 'パー';
  if(hand == num){
    judgement = 'あいこ';
    win += 0;
    total += 0;
  }
  else if(
    (hand === "グー" && cpu === "チョキ") || (hand === "チョキ" && cpu === "パー") || (hand === "パー" && cpu === "グー")){
    judgement = '勝ち';
    win += 1;
    total += 1;
  }
  else{
    judgement = '負け';
    win += 0;
    total += 1;
  }
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken2', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
