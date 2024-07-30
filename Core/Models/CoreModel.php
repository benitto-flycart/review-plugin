<?php

namespace Flycart\Review\Core\Models;


use Flycart\Review\App\Model;

class CoreModel extends Model
{

    public function createTable()
    {
        // TODO: Implement createTable() method.
    }

    public static function getCoreModels()
    {
        return [
            //list of models to run migrations
            EmailSetting::class,
            NotificationHistory::class,
            OrderReview::class,
            Review::class,
            Review::class,
            ReviewConversion::class,
            ReviewSetting::class
        ];
    }
}