(function($) {

  // Foundation init
  $(document).foundation();

  $(document).ready(function() {
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






/*
These functions make sure WordPress
and Foundation play nice together.
*/


