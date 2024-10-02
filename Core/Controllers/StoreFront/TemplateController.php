<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

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

            $review_form_data = array(
                'order_id' => $order_id,
                'product_id' => $product_id
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

    public function removeDefaultCommentsTab($tabs)
    {
        if (isset($tabs['reviews']))
            unset($tabs['reviews']);
        return $tabs;
    }
}

