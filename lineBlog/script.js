var pageDisplay = 0;
var allStories = [];
var allTitles = [];
var allCategories = [];
var sortedArray = [];

var Stories = function(id, title, publishedOn, category, img, miniDescription, body){
  this.id = id;
  this.title = title;
  this.publishedOn = publishedOn;
  this.category = category;
  this.img = img;
  this.miniDescription = miniDescription;
  this.body = body;
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  allStories.push(this);
};

articles.map(function(count, index){
  count = new Stories(articles[index].id, articles[index].title, articles[index].publishedOn, articles[index].category,  articles[index].img,  articles[index].miniDescription, articles[index].body, articles[index].daysAgo);
  index += 1;
  count +=1;
});

allStories.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
}).map(function(each){
  sortedArray.push(each);
});

allStories.map(function(each){
    return each.title;
}).reduce(function(array, index){
  if (array.indexOf(index) < 0) {
    array.push(index);
  }
  return array;
}, allTitles);

allStories.map(function(each){
  return each.category;
}).reduce(function(array, index){
  if (array.indexOf(index) < 0) {
    array.push(index);
  }
  return array;
}, allCategories);

var homePage = function() {
  var template = $('#articleTemplate').html();
  var compileTemplate = Handlebars.compile(template);
  sortedArray.forEach(function(each) {
  var html = compileTemplate(each);
  $('main').append(html);
  $('.back').hide();
  $('#searchFind').hide();
  });
  $("main").dragend();
};
homePage();

var aboutPage = function() {
  var template = $('#aboutTemplate').html();
  var compileTemplate = Handlebars.compile(template);
  var html = compileTemplate(aboutWords);
  $('main').append(html);
  $('#aboutPage').hide();
};
aboutPage();
