$('.navList').hover(function(){
  $(this).toggleClass('swing animated');
});
$('.mediaPics').hover(function() {
  $(this).toggleClass('flip animated');
});

function events() {
  $('.next').hover(function() {
    $(this).toggleClass('flash animated');
  });
  $('.before').hover(function() {
    $(this).toggleClass('flash animated');
  });
  $('.readOnBox').hover(function() {
    $(this).toggleClass('rubberBand animated');
  });
  $('.headBackBox').hover(function() {
    $(this).toggleClass('rubberBand animated');
  });

  $('.readOnBox').on('click', function() {
    $('.front').addClass('fadeOutRight animated');
    setTimeout(function() {
      $('.front').hide();
      $('.back').show('slow');
      $('.front').removeClass('fadeOutRight animated');
      console.log(pageDisplay);
    }, 600);
  });

  $('.headBackBox').on('click', function() {
  $('.back').addClass('fadeOutLeft animated');
    setTimeout(function() {
      $('.back').hide();
      $('.front').show('slow');
      $('.back').removeClass('fadeOutleft animated');
      console.log(pageDisplay);
    }, 600);
  });

 $('.next').on('click', function() {
    event.preventDefault();
    nextPage();
  });

  $('.before').on('click', function() {
    event.preventDefault();
      previousPage();
  });

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
            // headBack();
            break;

            case 38: // up
            previousPage();
            break;

            case 39: // right
            // readMore();
            break;

            case 40: // down
            nextPage();
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
};
events();
