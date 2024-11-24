<?php

namespace Flycart\Review\App\Helpers;

defined('ABSPATH') || exit;

class Transient
{
    public static function setTransient($transient_name, $transient_value, $expiration = WEEK_IN_SECONDS)
    {
        return set_transient($transient_name, $transient_value, $expiration);
    }

    public static function getTransient($transient_name)
    {
        return get_transient($transient_name);
    }

    public static function deleteTransient($transient_name)
    {
        return delete_transient($transient_name);
    }
}
