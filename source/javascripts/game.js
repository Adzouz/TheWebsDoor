jQuery(function($) {

  if($('#page404').length == 1) {

    var ratio_speed = 2.5;
    var size_sprite_window = Math.ceil($(window).width() / 100) * 100;
    var link_size = 119;
    var max = 1071;
    var current_position = 0;
    setInterval(function() {
      if(current_position < max) {
        current_position += link_size;
      }
      else {
        current_position = 0;
      }
      $('.link-anim').css('background-position', '-'+current_position+'px');
    }, 60);

    backgroundScroll($('.ground'), size_sprite_window, ratio_speed * size_sprite_window); 

    $(window).resize(function() {
      size_sprite_window = Math.ceil($(window).width() / 100) * 100;
      backgroundScroll($('.ground'), size_sprite_window, ratio_speed * size_sprite_window); 
    });

    window.onkeydown = function(e) {
      if(e.keyCode == 32 && e.target == document.body && $(window).width() > 767) {
          e.preventDefault();
          jumpLink();
          return false;
      }
    };

    function backgroundScroll(el, width, speed){        
        el.animate({'background-position' : '-'+width+'px'}, speed, 'linear', function(){
            el.css('background-position','0');                
            backgroundScroll(el, width, speed);
        });
    }

    function jumpLink() {
      $('.link-anim').animate({ bottom: '250px' }, 200, "easeOutExpo", function() {
        $('.link-anim').stop().animate({ bottom: '100px' }, 100, "easeOutExpo");
      });
    }
  }

});