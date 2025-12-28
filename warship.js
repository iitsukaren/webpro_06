"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let warship = [
  { id:1 , modelname:"いずも型護衛艦"                 , shipclass:"ヘリコプター搭載型護衛艦→多目的空母？" , country:"日本"     , length:"248.0" , displacement:"基準19,500(満載26,000)"  , startyear:"2015" , sister:"2(現役2隻)"                  , image:"kaga.jpg"},
  { id:2 , modelname:"キーロフ級ミサイル巡洋艦"         , shipclass:"重原子力ミサイル巡洋艦"              , country:"ロシア"   , length:"251.0" , displacement:"基準24,300(満載24,500)"  , startyear:"1980" , sister:"4(現役2隻)"                  , image:"kirov.jpg"},
  { id:3 , modelname:"アドミラル・クズネツォフ"         , shipclass:"重航空巡洋艦(航空母艦)"              , country:"ロシア"   , length:"305.0" , displacement:"基準53,000(満載59,100)"  , startyear:"1990" , sister:"現役"                       , image:"Kuznetsov.jpg"},
  { id:4 , modelname:"ズムウォルト級ミサイル駆逐艦"     , shipclass:"ミサイル駆逐艦"                     , country:"アメリカ" , length:"183.0" , displacement:"満載14,797"              , startyear:"2016" , sister:"3(現役3隻)"                  , image:"Zumwalt.jpg"},
  { id:5 , modelname:"ジェラルド・R・フォード級航空母艦" , shipclass:"航空母艦(原子力空母)"               , country:"アメリカ" , length:"337.0" , displacement:"満載101,600"             , startyear:"2017" , sister:"1(現役1隻+建造中2隻+計画中3隻)" , image:"Ford.jpg"},
  { id:6 , modelname:"南昌級駆逐艦"                   , shipclass:"ミサイル駆逐艦(ミサイル巡洋艦？)"     , country:"中国"    , length:"180.0" , displacement:"基準11,000?(満載13,000?)" , startyear:"2020" , sister:"8(現役8隻+改良型建造中6隻)"     , image:"055C.jpg"}
];

app.get("/", (req, res) => {
  res.render('warship', {data: warship} );
});

app.get("/create", (req, res) => {
  res.redirect('/public/warship_new.html');
});

app.get("/:number", (req, res) => {
  const number = req.params.number;
  const detail = warship[ number ];
  res.render('warship_detail', {id: number, data: detail} );
});

app.get("/delete/:number", (req, res) => {
  const number = req.params.number;
  const detail = warship[ number ];
  res.render('warship_delete', { id: number, data: detail });
});

app.post("/delete/:number", (req, res) => {
  const number = req.params.number;
  warship.splice(number, 1);
  const deletenumber = parseInt(req.params.number) + 1; //parseIntで文字列状態の数字を基数の整数に変換している
  console.log(`ID${deletenumber}delete!`);//バックコートと${}で{}内の変数を文字列に組み込める
  res.redirect('/' );
});

app.post("/", (req, res) => {
  const id = warship.length + 1;
  const modelname = req.body.modelname;
  const shipclass = req.body.shipclass;
  const country = req.body.country;
  const length = req.body.length;
  const displacement = req.body.displacement;
  const startyear = req.body.startyear;
  const sister = req.body.sister;
  const image = req.body.image;
  warship.push( { id: id, modelname: modelname, shipclass: shipclass, country: country, length: length, displacement: displacement, startyear: startyear, sister: sister, image: image} );
  console.log( warship );
  res.render('warship', {data: warship} );
});

app.get("/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = warship[ number ];
  res.render('warship_edit', {id: number, data: detail} );
});

app.post("/update/:number", (req, res) => {
  warship[req.params.number].modelname = req.body.modelname;
  warship[req.params.number].shipclass = req.body.shipclass;
  warship[req.params.number].country = req.body.country;
  warship[req.params.number].length = req.body.length;
  warship[req.params.number].displacement = req.body.displacement;
  warship[req.params.number].startyear = req.body.startyear;
  warship[req.params.number].sister = req.body.sister;
  warship[req.params.number].image = req.body.image;
  console.log( warship );
  res.redirect('/' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));