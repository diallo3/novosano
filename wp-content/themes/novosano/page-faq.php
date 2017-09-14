<?php 
/*
 * Template Name: Page FAQ
 
 * The template for displaying FAQs.
 *
 * @package  WordPress
 * @subpackage  Opus
 * @since    Opus 0.1
 */

$context = Timber::get_context(); 
$post = new TimberPost(); 
$context["post"] = $post;
$context['testimonial'] = Timber::get_posts( $testi_args );
$context["acf"] = get_field_objects($data["post"]->ID); 
Timber::render("/views/pages/page-faq.twig", $context); 

?>