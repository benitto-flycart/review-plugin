<?php
defined('ABSPATH') || exit;
?>

<div class="wd_preview_content review_form_widget review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-relative rating-widget-preview-desktop">
    <div class="r_rfw_container"
        style="--r-rfw-dialog-bg-color: #fffafd; --r-rfw-rating-icon-color: #f178bb; --r-rfw-input-label-color: #ff47d7; --r-rfw-input-border-color: #f4d4ed; --r-rfw-input-error-color: #ff0808; --r-rfw-title-color: #f20ba9; --r-rfw-description-color: #ec07a3; --r-rfw-btn-text-color: #f20ba9; --r-rfw-btn-bg-color: #fbddef;">
        <div class="r_rfw_header" style="float: right">
            <button class="r_rfw_btn r_rfw_dialog_close_icon"
                style="color: rgb(231, 6, 128); background-color: rgb(254, 210, 234);"><span
                    class="farp farp-cross-icon"></span></button>
        </div>
        <div class="r_rfw_main_content_wrapper" style="padding: 2rem;">
            <p>
                <?php echo esc_html__('Only logged in customers who have purchased this product may leave a review.', 'woocommerce'); ?>
            </p>
        </div>
    </div>
</div>
