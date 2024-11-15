<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Services\Encrypt;

class TemplateController
{
    public static function loadTemplate($template)
    {
        // Make the data globally available to the template
        if (is_page() && get_page_template_slug() === 'templates/review-form.php') {
            $encoded_order_id = $_GET['_review_order_id'] ?? 0;
            $encoded_product_id = $_GET['_review_product_id'] ?? 0;

            $order_id = Encrypt::decrypt($encoded_order_id);
            $product_id = Encrypt::decrypt($encoded_product_id);

            $pluginSlug = F_Review_PLUGIN_SLUG;
            $resourcePath = AssetHelper::getResourceURL();

            $review_form_widget_css = $resourcePath . "/widgets/review_form_widget.css?ver=3.0";
            $font_css = $resourcePath . "/admin/css/review-fonts.css?ver=3.0";

            $review_form_data = array(
                'order_id' => $order_id,
                'product_id' => $product_id,
                'review_form_widget_css' => $review_form_widget_css,
                'font_css' => $font_css,
            );

            set_query_var('review_form_data', $review_form_data);

            if (empty($order_id) || empty($product_id)) {
                $template = get_404_template();
            } else {
                $template = plugin_dir_path(F_Review_PLUGIN_FILE) . 'resources/templates/review-form/review-form.php';
            }
        }
        return $template;
    }

    public static function removeDefaultCommentsTab($tabs)
    {
        if (isset($tabs['reviews']))
            unset($tabs['reviews']);
        return $tabs;
    }
}
