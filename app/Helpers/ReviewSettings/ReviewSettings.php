<?php

namespace Flycart\Review\App\Helpers\ReviewSettings;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\SettingsModel;

defined('ABSPATH') || exit;

class ReviewSettings
{
    public $settings_type = '';

    public function save($data)
    {
        $data = Functions::jsonEncode($data);

        $discount_settings = SettingsModel::query()
            ->where(
                "type = %s AND sub_type = %s",
                [
                    'settings',
                    $this->settings_type
                ]
            )
            ->first();

        if (empty($discount_settings)) {
            SettingsModel::query()->create([
                'sub_type' => $this->settings_type,
                'type' => 'settings',
                'settings' => $data,
            ]);
        } else {
            SettingsModel::query()->update([
                'settings' => $data,
            ], [
                'id' => $discount_settings->id,
            ]);
        }
    }
}
