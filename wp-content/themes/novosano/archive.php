<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package 	WordPress
 * @subpackage 	Timber
 * @since 		Timber 0.2
 */

$templates = array('/views/archives/archive.twig');
if ($post->post_type == "service") {
	array_unshift($templates, '/views/archives/archive-service.twig');
}

if (function_exists('category_image_src')) {
	$category_image = category_image_src( array( 'size' => 'full' ) , false ); 
} else {
	$category_image = '';
}

$context = Timber::get_context(); 
$post = new TimberPost(); 
$context["post"] = $post;
$context['term'] = new TimberTerm();
/* post types */
$context['testimonial'] = Timber::get_posts( $testi_args );
$context["acf"] = get_field_objects($data["post"]->ID); 

/* custom function */
$context["tax"] = $category_image;


Timber::render($templates, $context);