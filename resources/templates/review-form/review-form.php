<?php
wp_head();
$data = get_query_var('review_form_data', array());
$order_id = $data['order_id'];
$product_id = $data['product_id'];

include F_Review_PLUGIN_PATH . 'resources/templates/review-form/template.php';

wp_footer()
?>