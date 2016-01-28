var pageDisplay = 0;
var allStories = [];
var allTitles = [];
var allCatagories = [];
var sortedArray = [];

var Stories = function(id, title, publishedOn, catagory, img, miniDescription, body){
  this.id = id;
  this.title = title;
  this.publishedOn = publishedOn;
  this.catagory = catagory;
  this.img = img;
  this.miniDescription = miniDescription;
  this.body = body;
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  allStories.push(this);
};
articles.map(function(count, index){
  count = new Stories(articles[index].id, articles[index].title, articles[index].publishedOn, articles[index].catagory,  articles[index].img,  articles[index].miniDescription, articles[index].body, articles[index].daysAgo);
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
    return each.catagory;
  }).reduce(function(array, index){
    if (array.indexOf(index) < 0) {
      array.push(index);
    }
    return array;
}, allCatagories);

var homePage = function() {
  var template = $('#articleTemplate').html();
  var compileTemplate = Handlebars.compile(template);
  var html = compileTemplate(sortedArray[0]);
  $('main').append(html);
  $('.back').hide();
  if (pageDisplay === 0) {
    $('.before').hide();
  }
};
homePage();

var nextPage = function() {
  $('main').empty();
  pageDisplay += 1;
  var template = $('#articleTemplate').html();
  var compileTemplate = Handlebars.compile(template);
  var html = compileTemplate(sortedArray[pageDisplay]);
  $('main').append(html);
  $('.back').hide();
  console.log(pageDisplay);
  check = sortedArray[pageDisplay + 1];
  if (pageDisplay === 0) {
    $('.before').hide();
  }
  else if ( check === undefined) {
    $('.next').hide();
  }
  events();
};

var previousPage = function() {
  pageDisplay -= 1;
  $('main').empty();
  var template = $('#articleTemplate').html();
  var compileTemplate = Handlebars.compile(template);
  var html = compileTemplate(sortedArray[pageDisplay]);
  $('main').append(html);
  $('.back').hide();
  console.log(pageDisplay);
  check = sortedArray[pageDisplay + 1];
  if (pageDisplay === 0) {
    $('.before').hide();
  }
  else if (check === undefined) {
    $('.next').hide();
  }
  events();
};
