(function($) {

    $(document).ready(function() {

        /************************************************************

            Foundation

        ************************************************************/

        // Foundation init
        $(document).foundation();

        var mainMenu = new Foundation.DropdownMenu($('#mainMenu'), {});
        var offMain  = new Foundation.OffCanvas($('#offMain'), {
            transition: 'detached'
        });
        var faq      = new Foundation.Accordion($('#faq'),{});
        var mainMobile = new Foundation.Drilldown($('#mainMobile'), {
            animationEasing: 'linear',
            contentScroll: false
        });

        $('#faq li:first-of-type').addClass('is-active').children('[data-tab-content]').show();

        // Remove empty P tags created by WP inside of Accordion and Orbit
        $('.accordion p:empty, .orbit p:empty').remove();

        // Makes sure last grid item floats left
        $('.archive-grid .columns').last().addClass( 'end' );

        // Adds Flex Video to YouTube and Vimeo Embeds
        $('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').each(function() {
            if ( $(this).innerWidth() / $(this).innerHeight() > 1.5 ) {
                $(this).wrap("<div class='widescreen flex-video'/>");
            } else {
                $(this).wrap("<div class='flex-video'/>");
            }
        });

        // Header
        function stickyHeader() {
            $(window).scroll(function() {
                var $header = $('.c-header-wrap');
                if ($(this).scrollTop() >= 10) {
                    $header.addClass('sticky');
                } else {
                $header.removeClass('sticky');
                }   
            });
        }
        stickyHeader();

        $('.owl-carousel').owlCarousel({
            autoplay: true,
            loop: true,
            margin: 20,
            nav: false,
            dots: true,
            dotsEach: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                900: {
                    items: 2,
                }
            }
        });

        /************************************************************

            Navigation

        ************************************************************/

        // hamburger
        function hamburgerNav() {
            var $hb = $('.hamburger');
            var $cl = $('#offMain .close-button');
            $hb.on('click', function(e){
                e.preventDefault();
                $(this).toggleClass('is-active');
            });

            $cl.on('click', function() {
                $hb.removeClass('is-active');
            });
        }
        hamburgerNav();

        /************************************************************

            Homepage

        ************************************************************/ 

        // CoverVid
        if($('.c-vid').length > 0) {
            $('.c-vid__bck').coverVid(1920, 1080);
        }
        


        // Odd Even for homepage
        function skCount() {
            var $sk = $('.c-sidekick__block');

            $sk.each(function(i){
                if(!(i%2))  
                    $(this).addClass('odd');
                else
                    $(this).addClass('even');
                
            });

        }
        return skCount();

  });


})(jQuery);