jQuery(function($) {

  if($('#page404').length == 1) {

    var ratio_speed = 2;
    var size_sprite_window = Math.ceil($(window).width() / 100) * 100;
    var link_size = 119;
    var max = 1071;
    var current_position = 0;
    var fence_just_spawned = 0;
    var speed = ratio_speed * size_sprite_window;
    setInterval(function() {
      if(current_position < max) {
        current_position += link_size;
      }
      else {
        current_position = 0;
      }
      $('.link-anim').css('background-position', '-'+current_position+'px');
    }, 60);

    backgroundScroll($('.ground'), size_sprite_window, speed);
    animateFences();

    $(window).resize(function() {
      size_sprite_window = Math.ceil($(window).width() / 100) * 100;
      backgroundScroll($('.ground'), size_sprite_window, speed); 
    });

    window.onkeydown = function(e) {
      if(e.keyCode == 32 && e.target == document.body && $(window).width() > 767) {
          e.preventDefault();
          jumpLink();
          return false;
      }
    };

    function backgroundScroll(el, width, speed) {        
      el.animate({'background-position' : '-'+width+'px'}, speed, 'linear', function() {
        el.css('background-position','0');
        backgroundScroll(el, width, speed);
      });
    }
  
    function moveFence(el, width, speed) {     
      el.animate({'right' : width+'px'}, speed, 'linear', function() {
        el.remove();
      });
    }

    function jumpLink() {
      $('.link-anim').animate({ bottom: '250px' }, 300, "easeOutExpo", function() {
        $('.link-anim').stop().animate({ bottom: '100px' }, 200, "easeOutExpo");
      });
    }

    function animateFences() {
      setInterval(function() {
        if(Math.floor((Math.random() * 10) + 1) == 1 && fence_just_spawned == 0) {
          var $fence = $("<div>", {"class": "fence"});
          $('.fences').append($fence);
          moveFence($fence, size_sprite_window, speed + 140);
          fence_just_spawned = 100;
        }
        if(fence_just_spawned > 0) {
          fence_just_spawned += 100;
        }
        if(fence_just_spawned >= 1000) {
          fence_just_spawned = 0;
        }
      }, 100);
    }
  }

});