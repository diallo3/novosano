// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

// - CoverVid
var coverVid = function (elem, width, height) {

    // call sizeVideo on load
    sizeVideo();

    // debounce for resize function
    function debounce(fn, delay) {
        var timer = null;

        return function () {
            var context = this,
                args = arguments;

            window.clearTimeout(timer);

            timer = window.setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    // call sizeVideo on resize
    window.addEventListener('resize', debounce(sizeVideo, 50));

    // Set necessary styles to position video "center center"
    elem.style.position = 'absolute';
    elem.style.top = '50%';
    elem.style.left = '50%';
    elem.style['-webkit-transform'] = 'translate(-50%, -50%)';
    elem.style['-ms-transform'] = 'translate(-50%, -50%)';
    elem.style.transform = 'translate(-50%, -50%)';

    // Set overflow hidden on parent element
    elem.parentNode.style.overflow = 'hidden';

    // Get image defined on poster attribute of video
    var posterImage = elem.getAttribute('poster');

    // Remove poster to disable
    elem.removeAttribute('poster');

    // Set poster image as a background cover image on parent element
    elem.parentNode.style.backgroundImage = 'url(' + posterImage + ')';
    elem.parentNode.style.backgroundSize = 'cover';
    elem.parentNode.style.backgroundPosition = 'center center';

    // Define the attached selector
    function sizeVideo() {

        // Get parent element height and width
        var parentHeight = elem.parentNode.offsetHeight;
        var parentWidth = elem.parentNode.offsetWidth;

        // Get native video width and height
        var nativeWidth = width;
        var nativeHeight = height;

        // Get the scale factors
        var heightScaleFactor = parentHeight / nativeHeight;
        var widthScaleFactor = parentWidth / nativeWidth;

        // Based on highest scale factor set width and height
        if (widthScaleFactor > heightScaleFactor) {
            elem.style.height = 'auto';
            elem.style.width = parentWidth+'px';
        } else {
            elem.style.height = parentHeight+'px';
            elem.style.width = 'auto';
        }
    }

    // Check for video support
    var supportsVideo = (typeof(elem.canPlayType) != 'undefined') ? true : false;

    // Check if mobile
    var isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
        isMobile = true;

    // Remove video if not supported or mobile
    if (!supportsVideo || isMobile) {
        elem && elem.parentNode && elem.parentNode.removeChild(elem);
    }
};

if (window.jQuery) {
    jQuery.fn.extend({
        'coverVid': function () {
            coverVid(this[0], arguments[0], arguments[1]);
            return this;
        }
    });
}
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