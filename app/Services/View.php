<?php

namespace Flycart\Review\App\Services;


use Flycart\Review\App\App;
use Flycart\Review\App\Helpers\AssetHelper;

class View
{
    public static function instance()
    {
        return new static();
    }

    public static function render($path, $data = [])
    {
        return static::instance()->view($path, array_merge(['app' => App::make()], $data));
    }

    public function view($path, $data, $print = true)
    {
        $file = F_Review_PLUGIN_PATH . 'resources/' . $path . '.php';

        return AssetHelper::renderTemplate($file, $data);
    }
}
