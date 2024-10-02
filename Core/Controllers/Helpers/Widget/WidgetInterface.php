<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

interface WidgetInterface
{
    /**
     * @return void
     */
    public function save();

    /**
     * @return void
     * @param mixed $language
     * @param mixed $request
     */
    public static function make($language, $request);

    /**
     * @return void
     */
    public function get();

    /**
     * @return void
     * @param mixed $settings
     */
    public function getSettings($settings);

    /**
     * @return void
     */
    public function getWidgetType();

    /**
     * @return void
     */
    public function getRequestFromSettings();

    /**
     * @return void
     */
    public function updateWidgetStatus();
}
