<?php

namespace Flycart\Review\App\Hooks;

defined('ABSPATH') || exit;

use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Controllers\Hooks\ShortCodeHandler;
use Flycart\Review\Core\Models\Widget;

class ConditionalHooks
{
    public static function register()
    {
        add_action('woocommerce_init', [__CLASS__, 'WcConditionalHooks']);
    }

    public static function WcConditionalHooks()
    {
        //Snippet Widget 
        $widgetFactory = new WidgetFactory(Widget::SNIPPET_WIDGET, get_locale(), null);

        $widget = $widgetFactory->widget;

        $snippetWidget = flycart_review_app()->set('snippet_widget', $widget);
        $position_to_show = $snippetWidget->getPositionToShow();

        if (!empty($position_to_show)) {
            add_filter($position_to_show, [ShortCodeHandler::class, 'snippetWidget'], 10, 1);
        }
    }
}
