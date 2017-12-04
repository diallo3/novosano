$j = jQuery.noConflict();
$j(document).ready(function () {
    $j('.my-color-picker').wpColorPicker();

    $j('#wp_footer_pop_up_banner_link').change(function () {
        if ($j(this).val() == '') {
            $j('#fpub_link').val('');
        } else {
            $j('#fpub_link').val(location.protocol + "//" + location.hostname + "?p=" + $j(this).val());
        }
    });

    $j('#fpub_remove_image').click(function () {
        $j('#image_path').val('');
        $j('#show_upload_preview').hide();
    });

    $j('#fpb-live-preview').click(function (event) {
        event.preventDefault();

        $j('#fpb-link-live-view').attr('href', $j('#fpub_link').val());
        $j('#fpb-img-live-view').attr('src', $j('#image_path').val());
        $j('#fpb-img-live-view').attr('height', $j('#fpub_height').val() + 'px');
        $j('#fpb-img-live-view').attr('width', $j('#fpub_width').val() + 'px');


        fpub_border_height = $j('#fpub_border_height').val() == '' ? '1px' : $j('#fpub_border_height').val() + 'px';
        fpub_line_color = $j('#fpub_line_color').val();
        fpub_background_colr = convertHex($j('#fpub_background_colr').val() , $j('#fpub_background_fade').val())
  
        $j('#fpub-popup')
                .css('background-color', fpub_background_colr)
                .css('border-top', fpub_border_height + ' solid ' + fpub_line_color);
        

        $j('#fpub-popup').show('slow');

    });

    jQuery('.close-overlay').click(function () {
        jQuery('#fpub-popup').hide('slow');
    });


    var custom_uploader;

    /* user clicks button on custom field, runs below code that opens new window */
    $j('#upload_image').click(function (e) {

        e.preventDefault();

        //If the uploader object has already been created, reopen the dialog
        if (custom_uploader) {
            custom_uploader.open();
            return;
        }

        //Extend the wp.media object
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Choose Image'
            },
            multiple: false
        });

        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function () {
            attachment = custom_uploader.state().get('selection').first().toJSON();
            $j('#image_path').val(attachment.url);

            $j('#show_upload_preview').hide();
        });

        //Open the uploader dialog
        custom_uploader.open();

    });
});

function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}