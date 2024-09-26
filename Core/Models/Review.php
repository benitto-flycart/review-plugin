<?php

namespace Flycart\Review\Core\Models;

use Flycart\Review\App\Model;

class Review extends Model
{
    protected static $table = 'reviews';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                review_id BIGINT UNSIGNED,
                product_id BIGINT UNSIGNED,
                order_id BIGINT UNSIGNED NULL,
                woo_order_id BIGINT UNSIGNED NULL,
                customer_email VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                deleted_at TIMESTAMP NULL,
                PRIMARY KEY (id)
                ) {$charset};";
    }





    public function has_user_purchased_product( $product_id ) {
        global $wpdb;

        // Get the current user ID
        $user_id = get_current_user_id();

        if ( !$user_id ) {
            return false;
        }

        // Custom SQL query to check if the user has purchased the product
        $results = $wpdb->get_var( $wpdb->prepare(
            "
        SELECT COUNT(*)
        FROM {$wpdb->prefix}woocommerce_order_items AS order_items
        JOIN {$wpdb->prefix}woocommerce_order_itemmeta AS itemmeta ON order_items.order_item_id = itemmeta.order_item_id
        JOIN {$wpdb->prefix}posts AS posts ON order_items.order_id = posts.ID
        WHERE itemmeta.meta_key = '_product_id'
        AND itemmeta.meta_value = %d
        AND posts.post_type = 'shop_order'
        AND posts.post_status = 'wc-completed'
        AND posts.post_author = %d
        ",
            $product_id, $user_id
        ));

        return $results > 0; // Return true if at least one order contains the product
    }


    public function has_user_purchased_product_hpos( $product_id ) {
        global $wpdb;

        // Get the current user ID
        $user_id = get_current_user_id();
        if ( !$user_id ) {
            return false;
        }

        // Custom SQL query to check if the user has purchased the product (for HPOS-enabled sites)
        $results = $wpdb->get_var( $wpdb->prepare(
            "
        SELECT COUNT(*)
        FROM {$wpdb->prefix}wc_order_items AS order_items
        JOIN {$wpdb->prefix}wc_order_itemmeta AS itemmeta ON order_items.order_item_id = itemmeta.order_item_id
        JOIN {$wpdb->prefix}wc_orders AS orders ON order_items.order_id = orders.id
        WHERE itemmeta.meta_key = '_product_id'
        AND itemmeta.meta_value = %d
        AND orders.customer_id = %d
        AND orders.status = 'wc-completed'
        ",
            $product_id, $user_id
        ));

        return $results > 0; // Return true if at least one order contains the product
    }



}