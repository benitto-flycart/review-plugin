<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\SettingsModel;

abstract class Widget
{
    public $language;
    public $request;
    public $settings;

    public function __construct($language, $request = null)
    {
        $this->language = $language;
        $this->request = $request;
        $this->settings = $this->retrieveSettings();
    }

    public static function make($language, $request = null)
    {
        return new static($language, $request);
    }

    abstract function getWidgetType();
    abstract function getSettings($settings);
    abstract function getRequestFromSettings();

    public function retrieveSettings()
    {
        //phpcs:ignore
        $widgetType = $this->getWidgetType();

        $widget = SettingsModel::query()
            ->where("language = %s AND type = %s AND sub_type = %s", [
                $this->language,
                'widget',
                $widgetType
            ])
            ->first();

        $settings = Functions::jsonDecode($widget->settings ?? null);
        $settings = $this->getSettings($settings);

        return $settings;
    }

    public function get()
    {
        $settings = $this->retrieveSettings();
        $data = [
            'settings' => $settings,
            'message' => sprintf(__('%s Widget Fetched Successfully'), 'Product')
        ];

        return $data;
    }

    public function save()
    {
        $widgetType = $this->getWidgetType();

        $widget = SettingsModel::query()
            ->where("language = %s AND type = %s AND sub_type = %s", [
                $this->language,
                'widget',
                $widgetType
            ])
            ->first();

        $settings = $this->getRequestFromSettings();

        $settingsAsArray = $this->getSettings($settings);
        $settingsAsArray['theme'] = 'default';

        $settings = Functions::jsonEncode($settingsAsArray);

        if (empty($widget)) {
            SettingsModel::query()->create([
                'language' => $this->language,
                'type' => 'widget',
                'sub_type' => $widgetType,
                'settings' => $settings
            ]);
        } else {
            SettingsModel::query()->update([
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

    public function updateWidgetStatus()
    {
        $widget_type = $this->getWidgetType();
        $is_enabled = Functions::getBoolValue($this->request->get('is_enabled')) ? SettingsModel::ACTIVE : SettingsModel::DRAFT;
        $current_locale = $this->language;

        $settings = SettingsModel::getPluginStatusSettings();

        $settings['widgets'][$current_locale][$widget_type] = $is_enabled;

        SettingsModel::updatePluginStatusSettings($settings);
    }
}
