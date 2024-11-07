<?php

namespace Flycart\Review\Core\Controllers\Hooks;

class ShortCodeHandler
{

    public static function popupWidget($content)
    {
        echo do_shortcode('[review_popup_widget]');
    }

    public static function sidebarWidget($content)
    {
        echo do_shortcode('[review_sidebar_widget_shortcode]');
    }

    public static function productWidget($content)
    {
        echo do_shortcode('[review_product_widget_shortcode]');
    }

    public static function ratingWidget($content)
    {

        echo do_shortcode('[review_rating_shortcode]');
    }

    public static function snippetWidget($content)
    {
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
        echo do_shortcode('[review_detail_widget_shortcode]');
    }

    public static function floatingProductWidget($content)
    {
        echo do_shortcode('[review_floating_widget_shortcode]');
    }
}
