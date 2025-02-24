<?php

namespace Flycart\Review\App\Helpers;

defined('ABSPATH') || exit;

class AssetHelper
{

    /**
     * Render template file
     *
     * @param string $file
     * @param array $data
     * @return false|string
     */
    public static function renderTemplate($file, $data = [])
    {
        if (file_exists($file)) {
            ob_start();
            extract($data);
            include $file;
            return ob_get_clean();
        }
        return false;
    }

    public static function getResourceURL()
    {
        return F_Review_PLUGIN_URL . 'resources';
    }

    public static function getReactAssetURL()
    {
        return F_Review_PLUGIN_URL . 'admin-ui/dist';
    }
}

