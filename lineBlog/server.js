"use strict"

var express = require('express');
var app = express();
var config = require('./config');
var models = require('./models');
var projects = require('./objects').articles;
var about = require('./objects').aboutWords;
var PORT = config.PORT;
var DB = config.DB;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/articles', function(req, res) {
  models.Article.findAll().then(function(articles){
    res.json(articles);
  });
});

app.get('/about', function(req, res) {
  models.About.findAll().then(function(about){
    res.json(about);
  });
});

models.sequelize.sync({force: true}).then(function (y) {
  projects.forEach(function(each){
    models.Article.create({
      title:            each.title,
      publishedOn:      each.publishedOn,
      category:         each.category,
      img:              each.img,
      miniDescription:  each.miniDescription,
      body:             each.body
    });
  });

  models.About.create({
    aboutTop:           about.aboutTop,
    aboutMiddleLeft:    about.aboutMiddleLeft,
    aboutMiddleRight:   about.aboutMiddleRight,
    aboutBottom:        about.aboutBottom
  });

});

models.sequelize.sync().then(function(x) {
  app.listen(PORT, function() {
    console.log('server started');
    console.log('listening on PORT: ', + PORT);
    console.log('DB URI STRING: ', + DB);
  });
});
