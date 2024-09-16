<?php
wp_head();
$data = get_query_var('review_form_data', array());
$order_id = $data['order_id'];
$product_id = $data['product_id'];
?>
    <div id="r_rfw_dialog_wrapper">
        <template id="r_rfw_shadow_template">
            <link rel="stylesheet"
                  href="http://localhost:8004/wp-content/plugins/flycart-reviews/resources/widgets/review_form_widget.css?ver=2.0">
            <link rel="stylesheet"
                  href="http://localhost:8004/wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css?ver=2.0">
            <dialog id="review_form_dialog" open
                    data-order-id="<?php echo $order_id ?>"
                    data-product-id="<?php echo $product_id ?>"
            >
            </dialog>
        </template>
    </div>
<?php
wp_footer()
?>