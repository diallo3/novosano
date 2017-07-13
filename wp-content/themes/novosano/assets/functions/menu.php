<?php
// Register menus
register_nav_menus(
	array(
		'primary'      => __( 'Primary Menu', 'jointswp' ),   // Primary or Main menu usually the header
		'secondary'    => __( 'Secondary Menu', 'jointswp' ), // Secondary menu, usually the footer
        'mobile'       => __( 'Mobile', 'jointswp' ), // Offcanvas type menu
        'footer_left'  => __( 'Footer Left', 'jointswp' ), // Offcanvas type menu
        'footer_right' => __( 'Footer Right', 'jointswp' ) // Offcanvas type menu
	)
);


// Mega menu call
function mega_menu() {
	return wp_nav_menu(array(
        'echo'           => false,
        'menu'           => 'primary',
        'theme_location' => 'primary',
        'depth'          => 3,
        'container'      => false,
        'menu_class'     => 'c-menu c-menu--main u-float-right',
        'items_wrap'     => '<menu id="%1$s" class="%2$s">%3$s</menu>',
        'fallback_cb'    => '',
        'walker'         => new Opus_Walker_Default()
    ));
}

// Add Foundation active class to menu
function required_active_nav_class( $classes, $item ) {
    if ( $item->current == 1 || $item->current_item_ancestor == true ) {
        $classes[] = 'active';
    }
    return $classes;
}
add_filter( 'nav_menu_css_class', 'required_active_nav_class', 10, 2 );