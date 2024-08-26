<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

class Widget
{

    public $language;
    public $request;

    public function __construct($language, $request)
    {
        $this->language = $language;
        $this->request = $request;
    }

    public static function make($language, $request)
    {
        return new static($language, $request);
    }
}