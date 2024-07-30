<?php
namespace Flycart\Review\App;


class App extends Container
{

    public static $app;

    public static function make()
    {
        if (!isset(self::$app)) {
            self::$app = new static();
        }

        return self::$app;
    }

    /* Bootstrap plugin
     */
    public function bootstrap()
    {
        Setup::init();
        add_action('plugins_loaded', function () {
            do_action('flycart_review_before_init');
            Route::register();
            do_action('flycart_review_after_init');
        }, 1);
    }
}