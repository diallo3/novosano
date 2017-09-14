<?php 
/*
 * Template Name: Page Service
 
 * The template for displaying Services.
 *
 * @package  WordPress
 * @subpackage  Opus
 * @since    Opus 0.1
 */

 $service_args = array( 
  "post_type"			=> "service",
 ); 

$context = Timber::get_context(); 
$post = new TimberPost(); 
$context["post"] = $post;
/* post types */
$context["service"] = Timber::get_posts($service_args);
$context['testimonial'] = Timber::get_posts( $testi_args );
$context["acf"] = get_field_objects($data["post"]->ID); 
Timber::render("/views/pages/page-service.twig", $context); 

?>