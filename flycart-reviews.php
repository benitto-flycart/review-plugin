<?php

/**
 * Plugin Name:          Flycart Reviews
 * Description:          Reviews for Woo Commerce
 * Version:              3.2
 * Requires at least:    5.9
 * Requires PHP:         7.3
 * Author:               FlycartReviews
 * Author URI:           https://www.wprelay.com
 * Text Domain:          flycart-review
 * Domain Path:          /i18n/languages
 * License:              GPL v3 or later
 * License URI:          https://www.gnu.org/licenses/gpl-3.0.html
 * Requires Plugins: woocommerce
 * WC requires at least: 7.0
 */

defined('ABSPATH') or exit;

defined('F_Review_PLUGIN_PATH') or define('F_Review_PLUGIN_PATH', plugin_dir_path(__FILE__));
defined('F_Review_PLUGIN_URL') or define('F_Review_PLUGIN_URL', plugin_dir_url(__FILE__));
defined('F_Review_PLUGIN_FILE') or define('F_Review_PLUGIN_FILE', __FILE__);
defined('F_Review_PLUGIN_NAME') or define('F_Review_PLUGIN_NAME', 'Review F');
defined('F_Review_PLUGIN_SLUG') or define('F_Review_PLUGIN_SLUG', "flycart-review");
defined('F_Review_VERSION') or define('F_Review_VERSION', "3.2");
defined('F_Review_PREFIX') or define('F_Review_PREFIX', "f_review_");

/**
 * Required PHP Version
 */
if (!defined('F_Review_REQUIRED_PHP_VERSION')) {
    define('F_Review_REQUIRED_PHP_VERSION', 7.2);
}

$php_version = phpversion();

if (version_compare($php_version, F_Review_REQUIRED_PHP_VERSION, '<=')) {
    $message = F_Review_PLUGIN_NAME . ": Minimum PHP Version Required Is " . F_Review_REQUIRED_PHP_VERSION;
    $status = 'warning';

    add_action('admin_notices', function () use ($message, $status) {
?>
        <div class="notice notice-<?php echo __('benitto', 'flycart-review'); ?>">
            <p><?php echo wp_kses_post($message); ?></p>
        </div>
        <?php
    }, 1);
    error_log($message);
    return;
}

/**
 * Required Woocommerce Version
 * e */
if (!defined('F_Review_WC_REQUIRED_VERSION')) {
    define('F_Review_WC_REQUIRED_VERSION', '7.0.0');
}

// To load PSR4 autoloader
if (file_exists(F_Review_PLUGIN_PATH . '/vendor/autoload.php')) {
    require F_Review_PLUGIN_PATH . '/vendor/autoload.php';
} else {
    error_log('Vendor directory is not found');
    //    wp_die('{plugin_name} is unable to find the autoload file.');
    return;
}


if (!function_exists('flycart_review_is_woo_commerce_installed')) {
    function flycart_review_is_woo_commerce_installed()
    {
        $plugin_path = trailingslashit(WP_PLUGIN_DIR) . 'woocommerce/woocommerce.php';
        if (

            in_array($plugin_path, wp_get_active_and_valid_plugins())

            || (is_multisite() && in_array($plugin_path, wp_get_active_network_plugins()))

        ) {
            return true;
            //woocommerce installed
        } else {
            $message = F_Review_PLUGIN_NAME . ": Woo Commerce Not Activated and it should be minimum version of => " . F_Review_WC_REQUIRED_VERSION;
            $status = 'warning';

            add_action('admin_notices', function () use ($message, $status) {
        ?>
                <div class="notice notice-<?php echo esc_attr($status); ?>">
                    <p><?php echo wp_kses_post($message); ?></p>
                </div>
            <?php
            }, 1);
            error_log($message);
            return false;
        }
    }
}


if (function_exists('flycart_review_is_woo_commerce_installed')) {
    if (flycart_review_is_woo_commerce_installed()) {
        if (defined('WC_VERSION') && version_compare(WC_VERSION, F_Review_WC_REQUIRED_VERSION, '<=')) {
            $message = F_Review_PLUGIN_NAME . ": Woo Commerce minimum version Should be => " . F_Review_WC_REQUIRED_VERSION;
            $status = 'warning';

            add_action('admin_notices', function () use ($message, $status) {
            ?>
                <div class="notice notice-<?php echo esc_attr($status); ?>">
                    <p><?php echo wp_kses_post($message); ?></p>
                </div>
        <?php
            }, 1);
            return false;
        }
    } else {
        return;
    }

    /**
     * To set plugin is compatible for WC Custom Order Table (HPOS) feature.
     */
    add_action('before_woocommerce_init', function () {
        if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
        }
    });
} else {
    $message = "Unable to register following function flycart_review_is_woo_commerce_installed";
    $status = 'warning';
    add_action('admin_notices', function () use ($message, $status) {
        ?>
        <div class="notice notice-<?php echo esc_attr($status); ?>">
            <p><?php echo wp_kses_post($message); ?></p>
        </div>
    <?php
    }, 1);
    error_log($message);
    return;
}

//Loading woo-commerce action schedular
require_once(plugin_dir_path(__FILE__) . '../woocommerce/packages/action-scheduler/action-scheduler.php');

if (!function_exists('flycart_review_app')) {
    function flycart_review_app()
    {
        return \Flycart\Review\App\App::make();
    }
}

//here __FILE__ Will Return the Included File Path so it the base of the starting point.
// To bootstrap the plugin
if (class_exists('Flycart\Review\App\App')) {
    $app = flycart_review_app();
    //If the Directory Exists it means it's a pro pack;
    //Check Whether it is PRO USER
    $proDirectoryPath = __DIR__ . '/Pro';

    if (is_dir($proDirectoryPath)) {
        $isPro = $app->set('is_pro_plugin', true);
    }

    $app->bootstrap(); // to load the plugin
} else {
    //    wp_die('Plugin is unable to find the App class.');
    return;
}


if (!function_exists('addWPRelayExtraPluginData')) {
    function addWPRelayExtraPluginData($header)
    {
        $header[] = 'WPRelay';
        $header[] = 'WPRelay Icon';
        $header[] = 'WPRelay Document Link';
        $header[] = 'WPRelay Page Link';
        return $header;
    }
}
add_filter('extra_plugin_headers', 'addWPRelayExtraPluginData');

add_action('admin_head', function () {
    // phpcs:ignore WordPress.Security.NonceVerification.Missing
    // phpcs:ignore WordPress.Security.NonceVerification.Recommended
    $page = !empty($_GET['page']) ? $_GET['page'] : '';
    if (in_array($page, array('flycart-review'))) {
    ?>
        <script type="text/javascript">
            jQuery(document).ready(function($) {
                self = window;
            });
        </script>
<?php
    }
}, 11);

add_action('farp_prefix_get_google_font_link_for_email_template', function () {
    return '<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">';
});

add_filter('farp_prefix_get_desired_font_style', function () {
    return [
        'class' => 'dm-serif-text-regular  dm-serif-text-regular-italic',
        'content' => 'font-weight: 400; font-style: normal;  font-family: "DM Serif Text", serif; font-weight: 400; font-style: italic;'
    ];
});
