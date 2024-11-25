<?php

namespace Flycart\Review\Core\Controllers\Hooks;

defined('ABSPATH') || exit;

class ShortCodeHandler
{
    public static function popupWidget($content)
    {
        $allow_register = apply_filters('frap_before_register_sidebar_widget_shortcode', true, 'popup');

        if (!$allow_register) {
            return;
        }

        echo do_shortcode('[review_popup_widget]');
    }

    public static function sidebarWidget($content)
    {
        $allow_register = apply_filters('frap_before_register_sidebar_widget_shortcode', true, 'sidebar');

        if (!$allow_register) {
            return;
        }


        echo do_shortcode('[review_sidebar_widget_shortcode]');
    }

    public static function productWidget($content)
    {

        $allow_register = apply_filters('frap_before_register_sidebar_widget_shortcode', true, 'product');

        if (!$allow_register) {
            return;
        }

        echo do_shortcode('[review_product_widget_shortcode]');
    }

    public static function ratingWidget($content)
    {
        $allow_register = apply_filters('frap_before_register_sidebar_widget_shortcode', true, 'rating');

        if (!$allow_register) {
            return;
        }

        echo do_shortcode('[review_rating_shortcode]');
    }

    public static function snippetWidget($content)
    {

        $allow_register = apply_filters('frap_before_register_sidebar_widget_shortcode', true, 'snippet');

        if (!$allow_register) {
            return;
        }

        echo do_shortcode('[review_snippet_widget]');
    }

    public static function reviewFormWidget($content)
    {
        if (is_product()) {
            echo do_shortcode('[review_form_widget]');
        }
    }

    public static function reviewDetailWidget($content)
    {
        $allow_register = apply_filters('frap_before_register_sidebar_widget_shortcode', true, 'review_detail');

        if (!$allow_register) {
            return;
        }

        echo do_shortcode('[review_detail_widget_shortcode]');
    }

    public static function floatingProductWidget($content)
    {
        $allow_register = apply_filters('frap_before_register_sidebar_widget_shortcode', true, 'floating');

        if (!$allow_register) {
            return;
        }
        echo do_shortcode('[review_floating_widget_shortcode]');
    }

    public static function allowRegisterShortcode($allow, $type)
    {
        if ($type == 'sidebar' || $type == 'popup' || $type == 'floating' || $type == 'review_detail') {
            return !(isset($_GET['_review_order_id']));
        }

        return $allow;
    }
}
