<?php

namespace Flycart\Review\App;

class Setup
{
    /**
     * Init setup
     */
    public static function init()
    {
        register_activation_hook(F_Review_PLUGIN_FILE, [__CLASS__, 'activate']);
        register_deactivation_hook(F_Review_PLUGIN_FILE, [__CLASS__, 'deactivate']);
        register_uninstall_hook(F_Review_PLUGIN_FILE, [__CLASS__, 'uninstall']);

        add_action('plugins_loaded', [__CLASS__, 'maybeRunMigration']);
    }

    /**
     * Run plugin activation scripts
     */
    public static function activate()
    {
        //code
    }

    /**
     * Run plugin activation scripts
     */
    public static function deactivate()
    {
//        wp_clear_scheduled_hook('f_review_update_affiliate_coupons');
    }

    /**
     * Run plugin activation scripts
     */
    public static function uninstall()
    {
//        $models = static::getModels();
//
//        global $wpdb;
//        foreach ($models as $model) {
//            $object = (new $model);
//
//            if ($object instanceof Model) {
//                $query = $object->deleteTable();
//                $wpdb->query("set foreign_key_checks = 0;");
//                $wpdb->query($query);
//                $wpdb->query("set foreign_key_checks = 1;");
//            }
//        }
//        delete_option('f_review_current_version');
//        delete_option('f_review_plugin_settings');
    }

    /**
     * Maybe run database migration
     */
    public static function maybeRunMigration()
    {
        $current_version = get_option('f_review_current_version', 0);

        if (version_compare(F_Review_VERSION, $current_version) > 0) {
            if (!is_admin()) {
                return;
            }

            static::runMigration();
            update_option('f_review_current_version', F_Review_VERSION);
        }
    }

    /**
     * Run database migration
     */
    private static function runMigration()
    {
        $models = static::getModels();

        foreach ($models as $model) {
            $object = (new $model);

            if ($object instanceof Model) {
                $query = $object->createTable();
                $object->executeDatabaseQuery($query);
            }
        }
    }

    /**
     * @return string[]
     */
    public static function getModels(): array
    {
        return apply_filters('flycart_review_get_models', []);
    }
}