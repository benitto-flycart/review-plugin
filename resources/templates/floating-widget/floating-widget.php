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

<dialog data-modal id="r_rfw_floating_widget_dialog_wrapper">
    <div id="r_rfw_floating_widget_container_wrapper">
        <!--    <template id="r_rfw_shadow_template">-->
        <template id="r_rfw_floating_widget_container">
            <link rel="stylesheet"
                  href="http://localhost:8004/wp-content/plugins/flycart-reviews/resources/widgets/floating_widget.css?ver=3.0">
            <link rel="stylesheet"
                  href="http://localhost:8004/wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css?ver=3.0">
            <div id="r_rfw_container_wrapper">
                <div class="r_fpw-container" style="background-color: rgb(252, 228, 228); color: rgb(20, 16, 16);">
                    <div class="r_fpw-close_icon wd_fp_header_container__close_icon">
                        <i class="review review-close-icon">close icon</i>
                    </div>
                    <div class="r_fpw-text_content_wrapper">
                        <span>Reviews</span>
                    </div>
                </div>
            </div>
            <?php include F_Review_PLUGIN_PATH . 'resources/templates/product-widget/product-widget.php'; ?>
        </template>
        <!--    </template>-->
    </div>
</dialog>

