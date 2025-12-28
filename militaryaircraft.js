"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let militaryaircraft = [
  { id:1 , modelname:"F-14:Tomcat"            , airclass:"fighter" , manufacturer:"Grumman"                       , country:"america"                         , startyear:"1974"                 , image:"F-14.jpg"},
  { id:2 , modelname:"F-15:Eagle"             , airclass:"fighter" , manufacturer:"McDonnell Douglas"             , country:"america"                         , startyear:"1976"                 , image:"F-15.jpg"},
  { id:3 , modelname:"F-16:Fighting Falcon"   , airclass:"fighter" , manufacturer:"General Dynamics"              , country:"america"                         , startyear:"1978"                 , image:"F-16.jpg"},
  { id:4 , modelname:"F/A-18:Hornet"          , airclass:"fighter" , manufacturer:"McDonnell Douglas"             , country:"america"                         , startyear:"1983"                 , image:"F-18.jpg"},
  { id:5 , modelname:"F/A-18E/F:Super Hornet" , airclass:"fighter" , manufacturer:"McDonnell Douglas"             , country:"america"                         , startyear:"1999"                 , image:"F-18EF.jpg"},
  { id:6 , modelname:"F-22:Raptor"            , airclass:"fighter" , manufacturer:"Lockheed Martin & Boeing"      , country:"america"                         , startyear:"2005"                 , image:"F-22.jpg"},
  { id:7 , modelname:"F-35A/B/C:Lightning II" , airclass:"fighter" , manufacturer:"Lockheed Martin"               , country:"america"                         , startyear:"A:2016 B:2015 C:2019" , image:"F-35A.jpg"},
  { id:8 , modelname:"B-1:Lancer"             , airclass:"Bomber " , manufacturer:"Rockwell"                      , country:"america"                         , startyear:"1986"                 , image:"B-1.jpg"},
  { id:9 , modelname:"B-2:Spirit"             , airclass:"Bomber " , manufacturer:"Northrop Grumman"              , country:"america"                         , startyear:"1997"                 , image:"B-2.jpg"},
  { id:10, modelname:"B-21:Raider"            , airclass:"Bomber " , manufacturer:"Northrop Grumman"              , country:"america"                         , startyear:"202X~?"               , image:"B-21.jpg"},
  { id:11, modelname:"A-10:Thunderbolt II"    , airclass:"Attack"  , manufacturer:"Fairchild Republic"            , country:"america"                         , startyear:"1977"                 , image:"A-10.jpg"},
  { id:12, modelname:"Mig-25"                 , airclass:"fighter" , manufacturer:"OKB-155(Mig)"                  , country:"USSR"                            , startyear:"1968"                 , image:"Mig-25.jpg"},
  { id:13, modelname:"Su-27"                  , airclass:"fighter" , manufacturer:"OKB-51(Sukhoi)"                , country:"USSR"                            , startyear:"1985"                 , image:"Su-27.jpg"},
  { id:14, modelname:"Su-30"                  , airclass:"fighter" , manufacturer:"OKB-51(Sukhoi)"                , country:"USSR~Russia"                     , startyear:"1997"                 , image:"Su-30.jpg"},
  { id:15, modelname:"Su-57"                  , airclass:"fighter" , manufacturer:"Sukhoi"                        , country:"Russia"                          , startyear:"2020"                 , image:"Su-57.jpg"},
  { id:16, modelname:"F-2"                    , airclass:"fighter" , manufacturer:"三菱重工業 & Lockheed Martin"    , country:"Japan"                           , startyear:"2000"                 , image:"F-2.jpg"},
  { id:17, modelname:"Rafale"                 , airclass:"fighter" , manufacturer:"Dassault Aviation"             , country:"France"                          , startyear:"2000"                 , image:"Rafale.jpg"},
  { id:18, modelname:"Eurofighter Typhoon"    , airclass:"fighter" , manufacturer:"Eurofighter Jagdflugzeug GmbH" , country:"UK & Germany & Italy & Spain"    , startyear:"2003"                 , image:"EurofighterTyphoon.jpg"},
  { id:19, modelname:"Gripen"                 , airclass:"fighter" , manufacturer:"SAAB"                          , country:"Sweden"                          , startyear:"1996"                 , image:"Gripen.jpg"},
  { id:20, modelname:"J-20"                   , airclass:"fighter" , manufacturer:"中国航空工業集団有限公司"          , country:"China"                           , startyear:"2017"                 , image:"J-20.jpg"}
];

app.get("/", (req, res) => {
  res.render('aircraft', {data: militaryaircraft} );
});

app.get("/create", (req, res) => {
  res.redirect('/public/aircraft_new.html');
});

app.get("/:number", (req, res) => {
  const number = req.params.number;
  const detail = militaryaircraft[ number ];
  res.render('aircraft_detail', {id: number, data: detail} );
});

app.get("/delete/:number", (req, res) => {
  const number = req.params.number;
  const detail = militaryaircraft[ number ];
  res.render('aircraft_delete', { id: number, data: detail });
});

app.post("/delete/:number", (req, res) => {
  const number = req.params.number;
  militaryaircraft.splice(number, 1);
  /*const deletenumber = parseInt(req.params.number) + 1; //parseIntで文字列状態の数字を基数の整数に変換している
  console.log(`ID${deletenumber}delete!`);//バックコートと${}で{}内の変数を文字列に組み込める*/
  console.log( militaryaircraft );
  res.redirect('/' );
});

app.post("/", (req, res) => {
  const id = militaryaircraft.length + 1;
  const modelname = req.body.modelname;
  const airclass = req.body.airclass;
  const manufacturer = req.body.manufacturer;
  const country = req.body.country;
  const startyear = req.body.startyear;
  const image = req.body.image;
  militaryaircraft.push( { id: id, modelname: modelname, airclass: airclass, manufacturer: manufacturer, country: country, startyear: startyear, image: image} );
  console.log( militaryaircraft );
  res.render('aircraft', {data: militaryaircraft} );
});

app.get("/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = militaryaircraft[ number ];
  res.render('aircraft_edit', {id: number, data: detail} );
});

app.post("/update/:number", (req, res) => {
  militaryaircraft[req.params.number].modelname = req.body.modelname;
  militaryaircraft[req.params.number].airclass = req.body.airclass;
  militaryaircraft[req.params.number].manufacturer = req.body.manufacturer;
  militaryaircraft[req.params.number].country = req.body.country;
  militaryaircraft[req.params.number].startyear = req.body.startyear;
  militaryaircraft[req.params.number].image = req.body.image;
  console.log( militaryaircraft );
  res.redirect('/' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));