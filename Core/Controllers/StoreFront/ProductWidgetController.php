<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Widget;
use Flycart\Review\Package\Request\Response;

class ProductWidgetController
{
    public static function getProductWidgetTemplate()
    {
        try {
            $path = F_Review_PLUGIN_PATH . 'resources/templates/product-widget/';

            $widgetFactory = new WidgetFactory(Widget::PRODUCT_WIDGET, get_locale(), null);

            $widget = $widgetFactory->widget;


            $header = $widget->getHeaderLayout(); //$settings['layout']['header_layout'];
            $main_content = $widget->getMainContentLayout(); //$settings['layout']['widget_layout'];

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