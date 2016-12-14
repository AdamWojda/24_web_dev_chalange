//---- Custom JS functionalities ----//
'use strict';

(function() {
    
    //---- Module - Scroll to anchor ----//
    var scrollToAnchor = {
        listContainer: $('[data-scroll-to-anchor]'),

        init: function() {

            scrollToAnchor.listContainer.each( function(i,element) {

                // Find links
                var link = $(element).find('a');

                // Loop through every link in set and do stuff :D
                link.each( function(index,singleLink) {

                    var type = "scroll";

                    // Disable module if we have a class on element
                    if ($(singleLink).hasClass('js-anchor--disable')) {
                        type = "disabled";
                    }

                    scrollToAnchor.clickEvent(singleLink, type);

                });

            });

        },

        clickEvent: function(element, type) {

            // Click with element from init function
            $(element).on('click', function(e) {
                var target,
                    offset = 0;

                // Set offset if specified
                if($(this).data('scroll-offset')) {
                    offset = $(this).data('scroll-offset');
                }

                // If has
                if($(element).data('scroll-target')) {
                    target = $(element).data('scroll-target');
                }

                // If not
                if(!$(element).data('scroll-target')) {
                    target = $(element).attr('href');
                }

                if (type == 'scroll') {

                    // Prevent default link behaviour
                    e.preventDefault();

                    // Call action with that element
                    scrollToAnchor.animate(offset, target);

                }

            });

        },

        animate: function(offset, target) {

            $('html, body').animate({
                    scrollTop: $(target).offset().top - offset
            }, 500);

        }

    };
    //---- Module - END ----//

    //---- Module - Multiple Owl Carousels ----//
    var carousels = {
        carousels_selector: $('[data-slider]'),

        init: function() {

            // Lopp through carousels
            carousels.carousels_selector.each( function() {

                // Get carousel name
                var carousel_name = $(this).attr('data-slider');

                // Enable looped carousel with customized or default settings
                $(this).owlCarousel(carousels.carousels_options(carousel_name));


            });

        },

        carousels_options: function(carousel_name){

            // Set var
            var carousel_settings;

            // Switch for settongs
            switch (carousel_name) {

                case 'intro-carousel':
                    carousel_settings = {
                        items: 1,
                    };
                    break;

                case 'trending-products':
                    carousel_settings = {
                        items: 1,
                    };
                    break;

                case 'blog':
                    carousel_settings = {
                        items: 2,
                        margin: 30,
                        dots: false,
                        nav: true,
                        loop: true,
                    };
                    break;

                default:
                    carousel_settings = {
                        items: 1,
                    };

            }

            // Return settings for each carousel
            return carousel_settings;

        }
    };
    //---- Module - END ----//

    //---- Modules - INIT ----//
    carousels.init();
    scrollToAnchor.init();
    //---- Modules - INIT END ----//

    $('input').on('input', function() {
        $(this).toggleClass('has-value')
    });

    function checkTop() {

        var main_header = $('#main-header'),
            color_class = 'l-header--color';

        if (document.body.scrollTop !== 0) {
            main_header.css({
                "background": "rgba(255, 255, 255, .9)"
            }, 250);
            main_header.addClass(color_class)
        }
        if (document.body.scrollTop === 0) {
            main_header.css({
                "background": "transparent"
            }, 250);
            main_header.removeClass(color_class)
        }

    };

    checkTop();
    $(document).scroll(function(){
        checkTop();
    });

}())
