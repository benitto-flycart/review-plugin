<?php

namespace Flycart\Review\App;

use Flycart\Review\App\Services\Database;
use Flycart\Review\App\Traits\Conditionable;
use Flycart\Review\App\Traits\ForwardCalls;

abstract class Model
{
    use ForwardCalls, Conditionable;

    protected static $table;

    protected static $flycart_table_prefix = 'flycart_review_';

    abstract public function createTable();

    public function deleteTable()
    {
        $table = static::getTableName();

        return "DROP TABLE IF EXISTS {$table}";
    }

    public static function getTableName($table = null)
    {
        $relayTablePrefix = static::getRelayWpTablePrefix();

        $table = $table ?: static::$table;

        return "{$relayTablePrefix}{$table}";
    }

    public static function getRelayWpTablePrefix()
    {
        global $wpdb;

        $wpPrefix = $wpdb->prefix;

        $pluginTablePrefix = static::$flycart_table_prefix;

        return "{$wpPrefix}{$pluginTablePrefix}";
    }

    protected static function getCharSetCollate()
    {
        global $wpdb;
        $wpdb->hide_errors();
        return $wpdb->get_charset_collate();
    }

    public function __call(string $name, array $arguments)
    {
        $table = static::getTableName();
        return $this->forwardCallTo(new Database($table), $name, $arguments);
    }

    public static function __callStatic($method, $parameters)
    {
        return (new static)->$method(...$parameters);
    }

    public static function query()
    {
        $table = static::getTableName();
        return (new Database($table));
    }

    public function executeDatabaseQuery(string $query): array
    {
        if (!function_exists('dbDelta')) {
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        }

        return dbDelta($query);
    }
}