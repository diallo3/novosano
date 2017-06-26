jQuery(document).ready(function () {
    jQuery('#fpub-popup').hide();

    setTimeout('open_banner()', fpub_delay * 1000);

    jQuery('.close-overlay').click(function () {
        close_banner();

        SetCookie('wordpress_fpb_close', 1, 1);
    });
});

function open_banner() {
    jQuery('#fpub-popup').show('slow');

    if (fpub_persist !== null && fpub_persist !== undefined) {
        if (fpub_persist > 0) {
            setTimeout('close_banner()', fpub_persist * 1000)
        }
    }
}

function close_banner() {
    jQuery('#fpub-popup').hide('slow');
}

function SetCookie(cookieName, cookieValue, nDays) {
    var today = new Date();
    var expire = new Date();
    if (nDays === null || nDays === 0) {
        nDays = 1;
    }

    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
    document.cookie = cookieName + "=" + escape(cookieValue)
            + ";expires=" + expire.toGMTString() + ";path=/";
}