<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Package\Request\Response;

class ProductWidgetController
{

    public static function getProductWidgetTemplate()
    {
        try {
            $path = F_Review_PLUGIN_PATH . 'resources/templates/product-widget/';

            $header = 'compact';
            $main_content = 'grid';
            ob_start(); // Start output buffering
            include $path . 'index.php'; // Include the PHP file
            $template_content = ob_get_clean();

            Response::success([
                'template' => $template_content,
            ]);

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}