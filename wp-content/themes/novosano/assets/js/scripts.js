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

/* ---------------------------------------------------------

- document:  Slick Modals - HTML5 and CSS3 powered modal popups
- author:    Capelle @ Codecanyon
- profile:   http://codecanyon.net/user/Capelle
- version:   4.2

---------------------------------------------------------- */

(function ($) {
    $.fn.slickModals = function (options) {

        // Settings
        var settings = $.extend({
            cookieTriggerClass: 'setSlickCookie',
            cookieName: 'slickCookie'
        }, options);

        // Start each popup
        return this.each(function () {
            var self = this,
                cookieIsSet  = document.cookie.indexOf(settings.cookieName) >= 0,
                currentPath  = window.location.pathname,
                canBeShown   = $.inArray(currentPath, settings.hideOnPages) === -1,
                videoSel     = $(self).find('iframe[src*="youtube.com"]'),
                videoURL     = videoSel.attr('src'),
                pageElements = $('body > *').not('.slickModal, script, style')

            // Popup location fixing
            function locationFix(param) {
                if (param === 'center') {
                    $(self).children('.slickWindow').css({
                        'margin' : 'auto'
                    });
                } else if ((param === 'bottomCenter') || (param === 'topCenter')) {
                    $(self).children('.slickWindow').css({
                        'margin-left' : 'auto',
                        'margin-right' : 'auto'
                    });
                } else if ((param === 'right') || (param === 'left')) {
                    $(self).children('.slickWindow').css({
                        'margin-top' : 'auto',
                        'margin-bottom' : 'auto'
                    });
                }
            };

            // Overlay speed check
            var overlaySpeed = 0;
            switch(settings.overlayVisible) {
                case true  : overlaySpeed = parseFloat(settings.overlayAnimationDuration); break;
                case false : overlaySpeed = 0; break;
            };

            // Popup styling
            function popupStyling() {
                $(self).children('.slickWindow').addClass('animated').css({
                    'box-shadow' : settings.popupBoxShadow,
                    'background' : settings.popupBackground,
                    '-webkit-animation-duration' : settings.popupAnimationDuration + 's',
                    'animation-duration' : settings.popupAnimationDuration + 's',
                    '-webkit-animation-delay' : overlaySpeed / 2 + 's',
                    'animation-delay' : overlaySpeed / 2 + 's'
                });
                if (settings.responsive) {
                    if ($(window).width() <= settings.mobileBreakPoint) {
                        $(self).children('.slickWindow').addClass(settings.mobileLocation).css({
                            'border-radius' : settings.mobileRadius,
                            'width' : settings.mobileWidth,
                            'height' : settings.mobileHeight,
                            'margin' : settings.mobileMargin,
                            'padding' : settings.mobilePadding
                        })
                        locationFix(settings.mobileLocation);
                    } else {
                        $(self).children('.slickWindow').addClass(settings.popupLocation).css({
                            'border-radius' : settings.popupRadius,
                            'width' : settings.popupWidth,
                            'height' : settings.popupHeight,
                            'margin' : settings.popupMargin,
                            'padding' : settings.popupPadding
                        })
                        locationFix(settings.popupLocation);
                    }
                } else {
                    $(self).children('.slickWindow').addClass(settings.popupLocation).css({
                        'border-radius' : settings.popupRadius,
                        'width' : settings.popupWidth,
                        'height' : settings.popupHeight,
                        'margin' : settings.popupMargin,
                        'padding' : settings.popupPadding
                    })
                    locationFix(settings.popupLocation);
                }
            };

            // Add effect class
            function addEffectClass() {
                $(self).children('.slickOverlay').removeClass('fadeOut').addClass(settings.overlayAnimationEffect);
                $(self).children('.slickWindow').removeClass('fadeOut').addClass(settings.popupAnimationEffect);
            };

            // Remove effect class
            function removeEffectClass() {
                $(self).children('.slickWindow').removeClass(settings.popupAnimationEffect).addClass('fadeOut');
                setTimeout(function() {
                    $(self).children('.slickOverlay').removeClass(settings.overlayAnimationEffect).addClass('fadeOut');
                }, parseFloat(settings.popupAnimationDuration) * 1000 / 2);
            };

            // Content wrap
            function wrapContent() {
                if (settings.contentAnimation) {
                    $(self).children('.slickWindow').children().not('.slickCloseBtn').wrapAll('<div class="slickContent"></div>');
                }
            };

            // Add content animation
            function addContentClass() {
                if (settings.contentAnimation) {
                    $(self).find('.slickWindow .slickContent').addClass(settings.contentAnimationEffect + ' ' + 'animated').css({
                        '-webkit-animation-duration' : settings.contentAnimationDuration + 's',
                        'animation-duration' : settings.contentAnimationDuration + 's',
                        '-webkit-animation-delay' : settings.contentAnimationDelay + 's',
                        'animation-delay' : settings.contentAnimationDelay + 's'
                    })
                }
            };

            // Remove content animation
            function removeContentClass() {
                if (settings.contentAnimation) {
                    $(self).find('.slickWindow .slickContent').removeClass(settings.contentAnimationEffect);
                }
            };

            // Page effects
            function startPageEffects() {
                if (settings.pageAnimationEffect) {
                    pageElements.css({
                       '-webkit-transition-duration' : settings.pageAnimationDuration + 's',
                       'transition-duration' : settings.pageAnimationDuration + 's'
                    });
                    if (settings.pageAnimationEffect === 'blur') {
                        pageElements.addClass('blurred').css({
                            '-webkit-filter' : 'blur' + '(' + settings.pageBlurRadius + ')',
                            'filter' : 'blur' + '(' + settings.pageBlurRadius +')'
                        });
                    } else if (settings.pageAnimationEffect === 'scale') {
                        pageElements.addClass('scaled').css({
                            '-webkit-transform' : 'scale' + '(' + settings.pageScaleValue + ')',
                            'transform' : 'scale' + '(' + settings.pageScaleValue + ')'
                        });
                    } else if (settings.pageAnimationEffect.indexOf('move') > -1) {
                        var moveDir = settings.pageAnimationEffect;
                        switch(true) {
                            case (moveDir === 'moveUp'):    axis = 'Y'; sign = '-'; break;
                            case (moveDir === 'moveDown'):  axis = 'Y'; sign = '';  break;
                            case (moveDir === 'moveLeft'):  axis = 'X'; sign = '-'; break;
                            case (moveDir === 'moveRight'): axis = 'X'; sign = '';  break;
                        }
                        pageElements.addClass('moved').css({
                            '-webkit-transform' : 'translate' + axis + '(' + sign + '' + parseFloat(settings.pageMoveDistance) + '%)',
                            'transform' : 'translate' + axis + '(' + sign + '' + parseFloat(settings.pageMoveDistance) + '%)'
                        });
                    }
                }
            };

            // Remove page effects
            function endPageEffects() {
                if (pageElements.hasClass('blurred') || pageElements.hasClass('scaled') || pageElements.hasClass('moved')) {
                    pageElements.removeClass('blurred scaled moved').css({
                        '-webkit-transform' : '',
                        'transform' : '',
                        '-webkit-filter' : '',
                        'filter' : ''
                    });
                }
            };

            // Overlay styling
            function showOverlay() {
                if (settings.overlayVisible) {
                    $(self).prepend('<div class="slickOverlay animated">' + '</div>');
                    if (settings.overlayClosesModal) {
                        $(self).children('.slickOverlay').addClass('closeModal');
                    }
                    $(self).children('.slickOverlay').css({
                        'background' : settings.overlayColor,
                        '-webkit-animation-duration' : overlaySpeed + 's',
                        'animation-duration' : overlaySpeed + 's'
                    });
                    if (settings.setCookie) {
                        $(self).children('.slickOverlay').addClass(settings.cookieTriggerClass);
                    }
                }
            };

            // Add close button
            function appendCloseButton() {
                if (settings.addCloseButton) {
                    $(self).children('.slickWindow').prepend('<div class="slickCloseBtn close closeModal ' + settings.buttonStyle + '">' + '</div>');
                    if (settings.setCookie) {
                        $(self).find('.slickWindow').children('.closeModal').addClass(settings.cookieTriggerClass)
                    }
                }
            };

            // Close modal on ESC key press
            function activateESC() {
                if (settings.enableESC) {
                    $(window).bind('keydown', function(e) {
                        if (e.keyCode === 27) {
                            disableSlick();
                            if (settings.setCookie) {
                                setSlickCookie();
                            }
                        }
                    });
                }
            };

            // After init
            function slickOnLoad() {
                if (settings.onSlickLoad !== undefined) {
                    settings.onSlickLoad();
                }
            };

            // Before init
            function slickOnClose() {
                if (settings.onSlickClose !== undefined) {
                    settings.onSlickClose();
                }
            };

            // Popup types
            function popupTypes() {
                if (!cookieIsSet) {
                    if (settings.popupType === 'delayed') {
                        setTimeout(enableSlick, settings.delayTime);
                    } else if (settings.popupType === 'exit') {
                        var t = false;
                        $(document).on('mouseleave', function (e) {
                            if (e.clientY < 0 && !t) {
                                t = true;
                                enableSlick();
                            }
                        });
                    } else if (settings.popupType === 'scrolled') {
                        var s = false;
                        $(document).scroll(function() {
                            var scrollY = $(this).scrollTop();
                            if ((scrollY > settings.scrollTopDistance) && !s) {
                                s = true;
                                enableSlick();
                            }
                        });
                    }
                }
            };

            // Video autoplay
            function videoAutoplay() {
                if ((settings.videoSupport) && (settings.videoAutoPlay)) {
                    if (videoSel.length > 0) {
                        videoSel.attr('src', videoURL + '?autoplay=1');
                    }
                }
            };

            // Video stop
            function videoStop() {
                if ((settings.videoSupport) && (settings.videoStopOnClose)) {
                    if (videoSel.length > 0) {
                        videoSel.attr('src', videoURL + '?autoplay=0');
                    }
                }
            };

            // Set a cookie to hide modal
            function setSlickCookie() {
                days = settings.cookieDays;
                CookieDate = new Date();
                CookieDate.setTime(CookieDate.getTime() + (days * 24 * 60 * 60 * 1000));
                switch (settings.cookieScope) {
                    case 'domain':
                         scopeSetting = '/';
                         break;
                    case 'page':
                         scopeSetting = window.location.href;
                         break;
                };
                if (days > 0) {
                    document.cookie = settings.cookieName + '=true; path=' + scopeSetting + '; expires=' + CookieDate.toGMTString();
                } else if (days === 0) {
                    document.cookie = settings.cookieName + '=true; path=' + scopeSetting + ';';
                }
            };

            // Slick cookie triggers
            function cookieTriggers() {
                if (settings.setCookie) {
                    $('.' + settings.cookieTriggerClass).on('click', function() {
                        setSlickCookie();
                    });
                }
            };

            // Auto close popup
            function autoClosing() {
                if (settings.autoClose) {
                    setTimeout(disableSlick, overlaySpeed * 1000 + settings.autoCloseDelay);
                    if (settings.setCookie) {
                        setSlickCookie();
                    }
                }
            };

            // Statistics
            var views   = 0;
            var seconds = 0;
            var clicks  = 0;
            // Count modal visibility
            var timer = {
                interval: null,
                Start: function() {
                    this.interval = setInterval(function() {
                        seconds += 1;
                    }, 1000);
                },
                Stop: function() {
                    window.clearTimeout(this.interval);
                }
            }
            // Count cta clicks
            function countClicks() {
                $(self).find('.slickWindow .' + settings.callToAction).each(function() {
                    $(this).on('click', function() {
                        clicks = 1;
                        views  = 0;
                    });
                });
            };
            // Send data
            function sendStats(views, clicks, seconds) {
                var statsDATA = {
                    id : $(self).attr('id'),
                    name: settings.modalName,
                    summary: settings.modalSummary,
                    click: clicks,
                    impression: views,
                    time: seconds,
                    isAjax: 1,
                    origin: window.location.origin || window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
                };
                $.ajax({
                    url: settings.fileLocation,
                    type: 'POST',
                    data: JSON.stringify(statsDATA),
                    dataType: 'text',
                    contentType: 'application/json; charset=utf-8',
                    error: function() {
                        console.log('Data was not saved.');
                    }
                });
            };

            // Enable slick
            function enableSlick() {
                $(self).addClass('isActive');
                startPageEffects();
                addEffectClass();
                addContentClass();
                slickOnLoad();
                videoAutoplay();
                autoClosing();
                if (settings.enableStats) {
                    timer.Start();
                    views = 1;
                    sendStats(views, clicks, seconds);
                }
            };

            // Disable slick
            function disableSlick() {
                endPageEffects();
                removeEffectClass();
                removeContentClass();
                slickOnClose();
                videoStop();
                if (settings.enableStats) {
                    timer.Stop();
                    views   = 0;
                    sendStats(views, clicks, seconds);
                    clicks  = 0;
                    seconds = 0;
                }
                setTimeout(function() {
                    $(self).removeClass('isActive');
                }, (overlaySpeed + parseFloat(settings.popupAnimationDuration)) * 1000);
            };

            // Activate the modal
            if (canBeShown) {
                settings.mobileBreakPoint = parseInt(settings.mobileBreakPoint);
                // Initial elements
                showOverlay();
                appendCloseButton();
                activateESC();
                if (settings.showOnMobile) {
                    popupTypes();
                } else {
                    if ($(window).width() > settings.mobileBreakPoint) {
                        popupTypes();
                    }
                }
                popupStyling();
                cookieTriggers();
                wrapContent();
                if (settings.enableStats) {
                    countClicks();
                }
                // Close the modal
                $(self).find('.closeModal').on('click', function() {
                    disableSlick();
                });
                // Reopen the modal
                $('.' + settings.reopenClass).on('click', function() {
                    enableSlick();
                });
            }

        });
    }
}(jQuery));

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
            setCookie: true,
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

        /************************************************************

            Homepage

        ************************************************************/ 

        // CoverVid
        if($('.c-vid').length > 0) {
            $('.c-vid__bck').coverVid(640, 360);
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