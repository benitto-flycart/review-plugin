<?php

namespace Flycart\Review\Core\Controllers\Api;

defined('ABSPATH') || exit;

use Flycart\Review\App\Services\View;

class PageController
{
    /*
     *
     * instead of return just use echo when returning page in word-press plugin
     */

    public static function show()
    {
        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo View::render('admin');
    }
}

