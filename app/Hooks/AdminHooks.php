<?php

namespace Flycart\Review\App\Hooks;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Controllers\Api\PageController;

class AdminHooks extends RegisterHooks
{
    public static function register()
    {
        static::registerCoreHooks('admin-hooks.php');

        if (PluginHelper::isPRO()) {
            static::registerProHooks('admin-hooks.php');
        }
    }

    public static function init() {}

    public static function head() {}

    public static function addMenu()
    {
        // phpcs:ignore WordPress.WP.I18n.NonSingularStringLiteralText
        $pluginName = esc_html__(F_Review_PLUGIN_NAME, 'flycart-review');
        add_menu_page(
            $pluginName,
            $pluginName,
            'manage_options',
            'flycart-review',
            [PageController::class, 'show'],
            'dashicons-money',
            56
        );
    }
}
