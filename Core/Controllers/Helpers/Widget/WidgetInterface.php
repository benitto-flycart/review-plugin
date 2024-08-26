<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

interface WidgetInterface
{
    public function save();

    public static function make($language, $request);

    public function get();

    public function getSettings($settings);

}