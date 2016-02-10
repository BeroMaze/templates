  var pageDisplay = 0;
  var allStories = [];
  var allTitles = [];
  var allCategories = [];
  var sortedArray = [];
  var aboutPageWords =[];

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

  var render = function() {
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
    homePage();
  };

  var loadAll = function(data){
    data.map(function(count, index){
      count = new Stories(data[index].id, data[index].title, data[index].publishedOn, data[index].category,  data[index].img,  data[index].miniDescription, data[index].body, data[index].daysAgo);
      index += 1;
      count +=1;
    });
    render();
  };

  var fetchArticles = function(){
    if (localStorage.data){
      loadAll(JSON.parse(localStorage.data));
    }
    else {
      $.getJSON('http://localhost:3000/articles', function(data) {
        loadAll(data);
        localStorage.data = JSON.stringify(data);
      });
    }
  }();

  var aboutPage = function() {
    var template = $('#aboutTemplate').html();
    var compileTemplate = Handlebars.compile(template);
    var html = compileTemplate(aboutPageWords[0]);
    $('main').append(html);
    $('#aboutPage').hide();
  };

  var fetchAbout = function(callback){
    if (localStorage.about){
      aboutPageWords = JSON.parse(localStorage.about);
      aboutPage();
      console.log("success");
    }
    else {
      $.getJSON('http://localhost:3000/about', function(data) {
        aboutPageWords = data;
        localStorage.about = JSON.stringify(data);
      }).done(function() {
          aboutPage();
          console.log("success");
        });
    }
  }();
