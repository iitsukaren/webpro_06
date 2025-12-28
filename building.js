"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let building = [
  { id:1 , name:"東京スカイツリー"                  , type:"自立電波塔"    ,countrycity:"日本・東京"               , height:"634" , floorarea:"229,728"   , completion:"2012" , image:"skytree.jpg"},
  { id:2 , name:"トーチタワー"                     , type:"高層ビル"      ,countrycity:"日本・東京"               , height:"385" , floorarea:"553,000"   , completion:"2028?" , image:"torch.jpg"},
  { id:3 , name:"ブルジュ・ハリファ"                , type:"高層ビル"      ,countrycity:"UAE・ドバイ"              , height:"828" , floorarea:"527,000"   , completion:"2010" , image:"Burj.jpg"},
  { id:4 , name:"ムルデカ118"                     , type:"高層ビル"      ,countrycity:"マレーシア・クアラルンプール" , height:"679" , floorarea:"292,000"   , completion:"2023" , image:"Merdeka118.jpg"},
  { id:5 , name:"上海中心"                        , type:"高層ビル"      ,countrycity:"中国・上海"                , height:"632" , floorarea:"380,000"   , completion:"2016" , image:"Shanghai.jpg"},
  { id:6 , name:"アブラージュ・アル・ベイト・タワーズ" , type:"高層ビル"      ,countrycity:"サウジアラビア・メッカ"      , height:"601" , floorarea:"1,575,815" , completion:"2012" , image:"Makkah.jpg"}
];

app.get("/", (req, res) => {
  res.render('building', {data: building} );
});

app.get("/create", (req, res) => {
  res.redirect('/public/building_new.html');
});

app.get("/:number", (req, res) => {
  const number = req.params.number;
  const detail = building[ number ];
  res.render('building_detail', {id: number, data: detail} );
});

app.get("/delete/:number", (req, res) => {
  const number = req.params.number;
  const detail = building[ number ];
  res.render('building_delete', { id: number, data: detail });
});

app.post("/delete/:number", (req, res) => {
  const number = req.params.number;
  building.splice(number, 1);
  /*const deletenumber = parseInt(req.params.number) + 1; //parseIntで文字列状態の数字を基数の整数に変換している
  console.log(`ID${deletenumber}delete!`);//バックコートと${}で{}内の変数を文字列に組み込める*/
  console.log( building );
  res.redirect('/' );
});

app.post("/", (req, res) => {
  const id = building.length + 1;
  const name = req.body.name;
  const type = req.body.type;
  const countrycity = req.body.countrycity;
  const height = req.body.height;
  const floorarea = req.body.floorarea;
  const completion = req.body.completion;
  const image = req.body.image;
  building.push( { id: id, name: name, type: type, countrycity: countrycity, height: height, floorarea: floorarea, completion: completion, image: image} );
  console.log( building );
  res.render('building', {data: building} );
});

app.get("/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = building[ number ];
  res.render('building_edit', {id: number, data: detail} );
});

app.post("/update/:number", (req, res) => {
  building[req.params.number].name = req.body.name;
  building[req.params.number].type = req.body.type;
  building[req.params.number].countrycity = req.body.countrycity;
  building[req.params.number].height = req.body.height;
  building[req.params.number].floorarea = req.body.floorarea;
  building[req.params.number].completion = req.body.completion;
  building[req.params.number].image = req.body.image;
  console.log( building );
  res.redirect('/' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));