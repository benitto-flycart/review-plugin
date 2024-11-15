<?php

namespace Flycart\Review\Core\Models;

defined('ABSPATH') || exit;


use Flycart\Review\App\Model;

class CoreModel extends Model
{

    public function createTable()
    {

        //code
    }

    public static function getCoreModels()
    {
        return [
            //list of models to run migrations
            // EmailSetting::class,
            NotificationHistory::class,
            OrderReview::class,
            Review::class,
            ReviewConversion::class,
            // ReviewSetting::class,
            // Widget::class,
            SettingsModel::class,
        ];
    }
}
