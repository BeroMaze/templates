  sizing = function() {
    var width = $(window).width();
    var height = $(window).height();
    var header = $('header').css('height');
    var footer = $('footer').css('height');
    if(header > 25){
      $('header').css('height', (height * 0.095));
    }
    if(footer > 25){
      $('footer').css('height', height * 0.095);
    }
    if (height < 500) {
      $('#created').hide();
      $('#media').css('width', '98%');
    }
    else{
      $('#created').show();
      $('#media').css('width', '70%');
    }
    $('#searchFind').css('width', width);
    $('main').css('height', height * 0.80);
    $('#searchFind').css('height', height * 0.80);
    $('.articles').css('height', height * 0.80);
    $('.front').css('height', height * 0.80);
    $('.back').css('height', height * 0.80);
    $('.aboutTop').css('width', width);
    $('.aboutTop').css('height', height * 0.35);
    $('.aboutMiddle').css('width', width);
    $('.aboutMiddle').css('height', height * 0.15);
    $('.aMidLeft').css('width', width / 1.8);
    $('.aMidLeft').css('height', 'auto');
    $('.aMidRight').css('width', width / 2.2);
    $('.aMidRight').css('height', 'auto');
    $('.aboutBottom').css('width', width);
    $('.aboutBottom').css('height', height * 0.35);
  };
  sizing();

  $( window ).resize(function() {
    sizing();
  });

  $('#stories').on('click', function(event) {
    event.preventDefault();
    $('#aboutPage').hide();
    $('#searchFind').empty();
    $('#searchFind').hide();
    $('#contactPage').remove();
    $('#searchPage').remove();
    $('.articles').show();
  });

  $('#about').on('click', function(event) {
    event.preventDefault();
    $('.articles').hide();
    $('#searchFind').empty();
    $('#searchFind').hide();
    $('#contactPage').remove();
    $('#searchPage').remove();
    $('#aboutPage').show();
    sizing();
  });

  $('#contact').on('click', function(event) {
    event.preventDefault();
    $('#searchFind').empty();
    $('#searchFind').hide();
    $('#aboutPage').hide();
    $('.articles').hide();
    $('#searchPage').remove();
    $('#contactPage').remove();
    $('main').append('<div id="contactPage"><form action="contactMe">Let me know what your thinking: </br> First name: </br> <input type="text" name="fname"></br> Last name: </br> <input type="text" name="lname"> </br>Email: </br> <input type="email" name="email"></br> Let Us Know: </br><textarea rows="10" cols="50"></textarea><br> <input type="submit" value="Submit"></form> <img src="./img/corey.jpg" id="contactImg"/></div>');
  });

  $('#search').on('click', function(event) {
    event.preventDefault();
    $('#searchPage').remove();
    $('#searchFind').empty();
    $('#searchFind').hide();
    $('#aboutPage').hide();
    $('.articles').hide();
    $('#contactPage').remove();
    $('main').append("<div id='searchPage'><div id='searchTop'>Search Article's: <input id='searchBox' type='search'></div><div id=searchAble><div id='titles'><h5 class='searchTitles'><u>Titles</u></h5></div><div id='category'><h5 class='searchCategory'><u>Categories</u></h5></div></div></div>");
    var titleToPage = function() {
      allTitles.forEach(function(each){
        $('#titles').append('<p class="eachtitle">' + each + '</p>');
      });
    }();

    var categoryToPage = function() {
      allCategories.forEach(function(each){
        $('#category').append('<p class="eachCategory">' + each + '</p>');
      });
    }();
    var pickArticle = function() {
      $('.eachtitle').on('click', function(event) {
        event.preventDefault();
        $('#searchPage').remove();
        var pick = $(this).html();
        sortedArray.forEach(function(each) {
          if (each.title === pick) {
            var template = $('#articleTemplate').html();
            var compileTemplate = Handlebars.compile(template);
            var html = compileTemplate(each);
            $('#searchFind').append(html);
            $('#searchFind').show();
            sizing();
            events();
          }
        });
      });
    };

    $('.eachCategory').on('click', function(event) {
      event.preventDefault();
      var pick = $(this).html();
      $('.eachtitle').remove();
      sortedArray.forEach(function(each) {
        if (each.category === pick) {
          $('#titles').append('<p class="eachtitle">' + each.title + '</p>');
        }
      });
      pickArticle();
      events();
    });
    pickArticle();

    $('#searchBox').on('keyup', function(event) {
      event.preventDefault();
      var searchText = $(this).val(); // value in search box
      if (searchText === "") {
        $('.eachtitle').remove();
        allTitles.forEach(function(each){
          $('#titles').append('<p class="eachtitle">' + each + '</p>');
        });
      }
      else{
        var allTitlesSearch = []; // array of all titles that match
        var ReducedArrayTitles = []; // array of titles that has been reduced
        searchText = searchText.split(' '); //slit the search word appart
        // check to see if each search word matches any articles
        searchText.forEach(function(theWord) {
          // go thought the object array to see if there is a match
          sortedArray.forEach(function(each) {
            var titleWords = (each.title).split(' '); // take title and split each word
            var bodyWords = (each.body).split(' '); // take body and split each word
            var allWords = titleWords.concat(bodyWords); // join body and title words together
            allWords.forEach(function(word) { // search allWords array for matches
              // check to see if words match
              if ((word).toLowerCase() === theWord.toLowerCase()) {
                allTitlesSearch.push(each.title); // push matching articles to new array
              }
            });
          });
          allTitlesSearch.reduce(function(array, index){ // take out doubles
            if (array.indexOf(index) < 0) {
              array.push(index);
            }
            return array;
          }, ReducedArrayTitles); // push to new array of unique
          $('.eachtitle').remove();
          ReducedArrayTitles.forEach(function(title){ // append to page
            $('#titles').append('<p class="eachtitle">' + title + '</p>');
          });
        });
        pickArticle();
        events();
      }
    });
  });


  $('.navList').hover(function(){
    $(this).toggleClass('swing animated');
  });
  $('.mediaPics').hover(function() {
    $(this).toggleClass('flip animated');
  });
  $('#linkedIn').on('click', function(event) {
    event.preventDefault();
    window.open("https://www.linkedin.com/in/coreyberning");
  });
  $('#google').on('click', function(event) {
    event.preventDefault();
    window.open("https://plus.google.com/u/0/105555715243460866385");
  });
  $('#facebook').on('click', function(event) {
    event.preventDefault();
    window.open("https://www.facebook.com/corey.berning");
  });
  $('#twitter').on('click', function(event) {
    event.preventDefault();
    window.open("http://www.twitter.com/beromaze");
  });

  var events = function() {
    $('.readOnArrow').hover(function() {
      $(this).toggleClass('rubberBand animated');
    });
    $('.headBackArrow').hover(function() {
      $(this).toggleClass('rubberBand animated');
    });

    $('.readOnArrow').on('click', function() {
      $('.front').addClass('fadeOutRight animated');
      setTimeout(function() {
        $('.front').hide();
        $('.back').show('slow');
        $('article').css('overflow-Y', 'scroll');
        $('.front').removeClass('fadeOutRight animated');
      }, 600);
    });

    $('.headBackArrow').on('click', function() {
    $('.back').addClass('fadeOutLeft animated');
      setTimeout(function() {
        $('.back').hide();
        $('.swiper-pagination').show();
        $('.front').show('slow');
        $('.back').removeClass('fadeOutleft animated');
      }, 600);
    });
  };
  events();

  var onPage = 1;
  $(window).scroll(function() {
    var move = $(window).scrollLeft();
    if (move === 6) {
      onPage += 1;
      $("main").dragend({
        scrollToPage: onPage
      });
      move = 0;
      console.log(next);
    }
    else if(move === (-6)){
      onPage -= 1;
      $("main").dragend({
        scrollToPage: onPage
      });
      move = 0;
    }
  });
