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

        $('.o-slide').owlCarousel({
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

        $('.c-orbit').owlCarousel({
            autoplay: true,
            loop: true,
            margin: 1,
            nav: false,
            dots: false,
            items: 1
        });

        $('#subscribeModal').slickModals({
            // Hide on pages
            hideOnPages: '',
            // Popup type
            popupType: 'scrolled',
            delayTime: 0,
            scrollTopDistance: 220,
            // Auto closing
            autoClose: true,
            autoCloseDelay: 30000,
            // Statistics
            enableStats: false,
            fileLocation: 'slickStats/collect.php',
            modalName: 'Subscribe',
            modalSummary: '',
            callToAction: 'cta',
            // Popup cookies
            setCookie: false,
            cookieDays: 1,
            cookieTriggerClass: 'subscribeCookie-1',
            cookieName: 'subscribeModal-1',
            cookieScope: 'domain',
            // Overlay styling
            overlayVisible: false,
            overlayClosesModal: true,
            overlayColor: 'rgba(0, 0, 0, 0.8)',
            overlayAnimationDuration: '0.4',
            overlayAnimationEffect: 'fadeIn',
            // Background effects
            pageAnimationDuration: '0.4',
            pageAnimationEffect: 'none',
            pageBlurRadius: '1px',
            pageScaleValue: '0.9',
            pageMoveDistance: '30%',
            // Popup styling
            popupWidth: '480px',
            popupHeight: '320px',
            popupLocation: 'bottomLeft',
            popupAnimationDuration: '0.4',
            popupAnimationEffect: 'fadeIn',
            popupBoxShadow: '0 0 20px rgba(0,0,0,0.4)',
            popupBackground: 'rgba(255, 255, 255, 1)',
            popupRadius: '4px',
            popupMargin: '0px',
            popupPadding: '0px',
            // Mobile rules
            showOnMobile: true,
            responsive: true,
            mobileBreakPoint: '480px',
            mobileLocation: 'center',
            mobileWidth: '90%',
            mobileHeight: '380px',
            mobileRadius: '0px',
            mobileMargin: '0px',
            mobilePadding: '24px',
            // Animate content
            contentAnimation: true,
            contentAnimationEffect: 'slideBottom',
            contentAnimationDuration: '0.4',
            contentAnimationDelay: '0.4',
            // Youtube videos
            videoSupport: false,
            videoAutoPlay: false,
            videoStopOnClose: false,
            // Close and reopen button
            addCloseButton: true,
            buttonStyle: 'circle',
            enableESC: true,
            reopenClass: 'openSlickModal-1',
            // Additional events
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

        // back to top
        function backTop() {
            var $offset = 300;
            var $opacity = 1200;
            var $duration = 700;
            var $back_top = $('.back-to-top');

            $(window).scroll(function(){
                var $this = $(this);
                ( $this.scrollTop() > $offset ) ? $back_top.addClass('is-visible') : $back_top.removeClass('is-visible is-fade-out');
                if( $this.scrollTop() > $opacity) {
                    $back_top.addClass('is-fade-out');
                }
            });

            $back_top.on('click', function(e) {
                e.preventDefault();
                $('body,html').animate({
                    scrollTop: 0,
                    },
                    $duration
                );
            });
        }
        backTop();

        /************************************************************

            Homepage

        ************************************************************/ 

        // CoverVid
        if($('.c-vid')[0]) {
            $('.c-vid__bck').coverVid(1920, 1080);
            console.log('video')
        } else {
            console.log('no video')
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