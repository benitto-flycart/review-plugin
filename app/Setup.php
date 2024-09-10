<?php

namespace Flycart\Review\App;

use Flycart\Review\App\Helpers\AssetHelper;

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
        error_log('Executing Activation Hook');

        static::create_custom_page_programmatically();
    }

    // Hook into theme activation
    //add_action('after_switch_theme', 'create_custom_page_programmatically');
    //Need to execute this hook in theme switch
    public static function create_custom_page_programmatically()
    {
        // Define page details
        $page_title = 'Review Form';  // Page title
        $page_content = 'Review Form Page Content';  // Page content

        $page_template = "templates/review-form.php";  // Optional: set a custom template

        $page_id = get_option('flycart-review-form-page-id', 0);

        error_log('Checking page exists');

        // If the page doesn't exist, create it
        if (empty($page_id)) {
            // Prepare the page array
            $new_page = array(
                'post_title' => $page_title,
                'post_content' => $page_content,
                'post_status' => 'publish',
                'post_type' => 'page',
                'post_author' => 1, // Typically the admin ID
                'post_name' => sanitize_title($page_title), // Page slug
            );

            // Insert the page into the database
            $page_id = wp_insert_post($new_page);

            update_post_meta($page_id, '_wp_page_template', $page_template);
            // Optionally, assign a page template
            update_option('flycart-review-form-page-id', $page_id);

            error_log('page id for flycart-review form');

        }
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