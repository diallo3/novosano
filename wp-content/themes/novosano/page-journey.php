<?php 
/*
 * Template Name: Page Journey
 
 * The template for displaying the home page.
 *
 * @package  WordPress
 * @subpackage  Opus
 * @since    Opus 0.1
 */
$context = Timber::get_context(); 
$post = new TimberPost(); 
$context["post"] = $post; 
Timber::render("/views/pages/page-journey.twig", $context); 

?>