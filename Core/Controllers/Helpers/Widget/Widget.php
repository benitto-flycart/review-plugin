<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\Widget as WidgetModel;

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

    public function get()
    {
        $widgetType = $this->getWidgetType();

        $widget = WidgetModel::query()
            ->where("language = %s AND widget_type = %s", [$this->language, $widgetType])
            ->first();

        $settings = Functions::jsonDecode($widget->settings ?? null);
        $settings = $this->getSettings($settings);

        $data = [
            'settings' => $settings,
            'message' => sprintf(__('%s Widget Fetched Successfully'), 'Product')
        ];

        return $data;
    }

    public function save()
    {
        $widgetType = $this->getWidgetType();
        $widget = WidgetModel::query()
            ->where("language = %s AND widget_type = %s", [$this->language, $widgetType])
            ->first();

        $settings = $this->getRequestFromSettings();

        $settingsAsArray = $this->getSettings($settings);
        $settings = Functions::jsonEncode($settingsAsArray);

        if (empty($widget)) {
            WidgetModel::query()->create([
                'language' => $this->language,
                'widget_type' => $widgetType,
                'status' => WidgetModel::ACTIVE,
                'theme' => 'default',
                'settings' => $settings
            ]);
        } else {
            WidgetModel::query()->update([
                'settings' => $settings
            ], [
                'id' => $widget->id
            ]);
        }

        $data = [
            'message' => sprintf(__('%s Widget Saved Successfully'), 'Product'),
            'settings' => $settingsAsArray
        ];

        return $data;
    }
}