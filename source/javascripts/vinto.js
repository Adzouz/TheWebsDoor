(function( $ ) {

  'use strict';

  var body 		= $( 'body' ),
    _window 	= $( window ),
    main_nav 	= $( '#main-nav' ),
    mobile_nav_trigger = $( '#trigger-mobile-nav' );

	/*	==================================================
		# One Page Navigation
		================================================== */
		$( function() {

			// Give the first section a top padding that equals
			// the header (top) height. We assume the first section
			// is the next element after the header (top).
			var top_header = $('#top');
      $('body').css('padding-top', top_header.height());

      var $root = $('html, body');

      $('#main-nav .nav a[href^="/#"]').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href').substr(1);

        $root.animate({
          scrollTop: $(href).offset().top
        }, 800, 'easeInOutQuint', function () {
          window.location.hash = href;
        });

        main_nav.find('li').removeClass('current-menu-item');
        $(this).parent().addClass('current-menu-item');

        if ($(window).width() < 992) {
          mobile_nav_trigger.find('.fa').toggleClass('fa-bars').toggleClass('fa-window-close-o');
          $('body').toggleClass('menu-mobile-opened');
        }

        return false;
      });

      $(window).scroll(function () {
        $('#main-nav .nav a[href^="/#"]').each(function() {
          var idSection = $(this).attr('href').substr(1);
					if ($(idSection).length > 0 && $(window).scrollTop() > $(idSection).offset().top - 100 && $(window).scrollTop() < $(idSection).offset().top + $(idSection).height()) {
            main_nav.find('li').removeClass('current-menu-item');
            $(this).parent().addClass('current-menu-item');
          }
        });
      });

			// initialize the current menu item of the main
			// navigation by scrolling
			_window.scroll();

			// Mobile Navigation
			// When a user clicks on the mobile navigation trigger we
			// want to check if the main navigation is opened or closed.
			// According to the status, we want to slide up or down.
			mobile_nav_trigger.on('click', function(){
				main_nav.stop().slideToggle();
				$(this).find('.fa').toggleClass('fa-bars').toggleClass('fa-window-close-o');
				$('body').toggleClass('menu-mobile-opened');
			});

			// Function for closing the mobile navigation after the
			// user has clicked on an item.
			var close_mobile_nav = function() {
				mobile_nav_trigger.addClass('closed').removeClass('opened');
				main_nav.slideUp();
			};

			// When the user resizes the browser from under 991px to
			// bigger, we want to set the mobile nav to invisible.
			_window.resize( function() {
				if ( _window.width() < 992 ) {
					main_nav.css('display', 'none');
					main_nav.find( 'a' ).on('click', close_mobile_nav);
				} else {
					mobile_nav_trigger.find('.fa').addClass('fa-bars').removeClass('fa-window-close-o');
					$('body').removeClass('menu-mobile-opened');
					main_nav.css({
						'display': 'block',
						'height': ''
					});
					main_nav.find( 'a' ).off('click', close_mobile_nav);
				}
				var top_header = $('#top');
				$('body').css('padding-top', top_header.height());
			});

			// initialize window resize function on load
			_window.resize();

			// Header Box
			// Functionality of the slide out menu (aka Header Box).
			// On initial click we want to slide out the header box and
			// else close the header box.

			var header_box_inner 	= $( '#header-box .header-box-inner' ),
				header_box_trigger 	= $( '.header-box-trigger' );

			$( '.header-box-trigger' ).on( 'click', function() {
				header_box_inner.slideToggle(800, 'easeOutBounce');
				header_box_trigger.children('i.fa').toggleClass('fa-plus').toggleClass('fa-minus');
				header_box_inner.toggleClass('opened').toggleClass('closed');
			});

			$('.diamondslider').each(function() {
				var filter = $(this).prev('.diamondslider-filter');
			});

			$('.diamond-filter li a[data-filter]').on('click', function(e) {
				e.preventDefault();
				var category = $(this).attr('data-filter');
				var diamondfilter = $(this).parents('.diamond-filter');
				var diamondslider = diamondfilter.next('.diamondslider');
				diamondfilter.find('li').removeClass('active');
				$(this).parent().addClass('active');
				diamondslider.find('.diamond').removeClass('highlighted');
				diamondslider.find('.diamond[data-category="'+category+'"]').addClass('highlighted');
				if (category == '*') {
					diamondslider.find('.diamond').addClass('highlighted');
				}
			});
			checkParameters();
		});

		function checkParameters() {
			var sentParam = getURLParameter('sent');
			if (typeof sentParam != 'undefined') {
				$('.alert-email-sent').show();
				if(sentParam == 1) {
					$('.alert-email-sent .success').show();
				}
				else if(sentParam == 0) {
					$('.alert-email-sent').css('background-color', '#c0392b');
					$('.alert-email-sent .error').show();
				}
			}
		}

		function getURLParameter(sParam) {
			var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
          return sParameterName[1];
        }
      }
		}

	/*	==================================================
		# Initialize hashchange to check if a user
		# refreshes a portfolio item or directly goes
		# to one through the URL bar.
		================================================== */
		_window.bind('load', function () {
			_window.trigger('hashchange');
		});


	/*	==================================================
		# Initialize all the reloadable JavaScript
		================================================== */
		$(function() {
			reload_js();
		});

	/*	==================================================
		# DiamondSlider
		# Portfolio and Team Diamond Sliders
		================================================== */
		$(function() {
			// When a user hovers over an diamondslider item
			// we want to show the item information.
			$('.diamondslider .slides > li').hover(function() {
        if ($(this).hasClass('highlighted')) {
          var itemhover = $(this).find('.item-hover');
          if (!itemhover.hasClass('show')) {
            itemhover.stop().show();
            itemhover.find('.hover-title').stop().animate({
              'margin-top': '37.3134%',
            }, 300, 'easeInOutCirc');
          }
        }
      }, function() {
        if ($(this).hasClass('highlighted')) {
          var itemhover = $(this).find('.item-hover');
          if (!itemhover.hasClass('show')) {
            itemhover.find('.hover-title').stop().animate({
              'margin-top': '-30%',
            }, 300, 'easeInOutCirc');
            itemhover.stop().hide();
          }
        }
      });
		});

	  /* ==================================================
		# Disable Parallax If Touch Device
		================================================== */
		$(function() {
			if (Modernizr.touch) {
				$('.parallax').addClass('disable-parallax');
      } else {
        $('.parallax').removeClass('disable-parallax');
      }
		});


	  /* ==================================================
		# Initialize the parallax sections on load.
		================================================== */
		var init_parallax = function() {
			$( '#parallax-index' ).parallax('30%', 0.1);
			$( '#parallax-cta' ).parallax('30%', 0.1);
			$( '#parallax-clients' ).parallax('30%', 0.1);
			$( '#parallax-contact' ).parallax('30%', 0.1);
			$( '#parallax-blog' ).parallax('30%', 0.1);
		};
		_window.bind('load', init_parallax);

  /* ==================================================
  # Function for easily reloading certain jQuery
  # scripts that have to be dynamically reloaded.
  ================================================== */
  var reload_js = function() {
    // CSS3 Animations
    // Every element that has data for being animated
    // will be animated. We only want to initialize
    // this functionality for not touch devices.
    if ( !Modernizr.touch ) {
      $( '.animated' ).appear();
      _window.trigger( 'scroll' );

      $(document.body).on('appear', '.animated', function() {
        var animationType	= $(this).attr( 'data-animation' );
        var animationDelay 	= $(this).attr( 'data-animation-delay' );

        $(this).each(function() {
          var $this = $( this );

          // add the custom animation delay to the element
          $this.css({
            '-webkit-animation-delay': animationDelay,
            '-moz-animation-delay': animationDelay,
            'animation-delay': animationDelay,
          });
          // add the animation to the element
          $this.addClass(animationType);

          if ($this.hasClass('no-opacity')) {
            $this.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
              $this.removeClass('no-opacity');
            });
          }
        });
      });
    }
    else {
      $('.animated').each(function() {
        $(this).removeClass('animated no-opacity');
      });
    }
  };

	if (!Modernizr.svg) {
    var imgs = document.getElementsByTagName('img');
    var svgExtension = /.*\.svg$/
    var l = imgs.length;
    for (var i = 0; i < l; i++) {
      if (imgs[i].src.match(svgExtension)) {
        imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
        console.log(imgs[i].src);
      }
    }
	}

})(jQuery);