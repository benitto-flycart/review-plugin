<?php
defined('ABSPATH') || exit;
?>

<div id="r_rfw_dialog_wrapper">
    <template id="r_rfw_shadow_template">
        <link rel="stylesheet"
            href="<?php echo $review_form_widget_css ?>">
        <link rel="stylesheet"
            href="<?php echo $font_css ?>">
        <dialog id="review_form_dialog"
            data-order-id="<?php echo $order_id ?>"
            data-product-id="<?php echo $product_id ?>">
        </dialog>
    </template>
</div>
