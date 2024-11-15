<?php
defined('ABSPATH') || exit;
?>

<style>
    #r_rfw_floating_widget_dialog_wrapper {
        height: 80%;
        width: 80%;
        border: none;
        border-radius: 10px;
        padding: 0;
        /*align-items:center;*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*z-index: 1000000;*/
    }
</style>

<link rel="stylesheet"
    href="<?php echo $font_css ?>">

<dialog data-modal id="r_rfw_floating_widget_dialog_wrapper">

    <div id="r_rfw_floating_widget_container_wrapper">
        <!--    <template id="r_rfw_shadow_template">-->
        <template id="r_rfw_floating_widget_container">
            <link rel="stylesheet"
                href="<?php echo $floating_widget_css ?>">
            <link rel="stylesheet"
                href="<?php echo $font_css ?>">
            <div id="r_rfw_container_wrapper">
                <div class="r_fpw-container" style="<?php echo $styles ?>">
                    <div class="r_fpw-close_icon wd_fp_header_container__close_icon">
                        <i class="review review-cross-icon"></i>
                    </div>
                    <div class="r_fpw-text_content_wrapper">
                        <span class="r_fpw-text_content_text">Reviews</span>
                    </div>
                </div>
            </div>
            <?php include F_Review_PLUGIN_PATH . 'resources/templates/product-widget/product-widget.php'; ?>
        </template>
        <!--    </template>-->
    </div>
</dialog>
