<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

use Flycart\Review\App\Helpers\AssetHelper;

class TemplateController
{
    public static function loadTemplate($template)
    {
        if (is_page() && get_page_template_slug() === 'templates/review-form.php') {
            $template = plugin_dir_path(F_Review_PLUGIN_FILE) . 'resources/templates/review-form.php';
        }
        return $template;
    }
}