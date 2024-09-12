<?php
wp_head();
?>

    <div id="r_rfw_dialog_wrapper">
    </div>
    <template id="r_rfw_shadow_template">
        <link rel="stylesheet"
              href="http://localhost:8004/wp-content/plugins/flycart-reviews/resources/widgets/review_form_widget.css?ver=2.0">
        <link rel="stylesheet"
              href="http://localhost:8004/wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css?ver=2.0">
        <dialog id="review_form_dialog" open>
            <div class="wd_preview_content review_form_widget review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-relative rating-widget-preview-desktop">
                <div class="r_rfw_container" style="background-color: rgb(254, 210, 234);">


                    <div class="r_rfw_header" style="background-color: rgb(254, 210, 234);">
                        <button class="r_rfw_btn r_rfw_dialog_close_icon"
                                style="color: rgb(231, 6, 128); background-color: rgb(254, 210, 234);"><span
                                    class="review review-cross-icon"></span></button>
                    </div>

                    <div class="r_rfw_main_content_wrapper" style="transform: translateX(0%);">
                        <div class="r_rfw_slide">
                            <div class="r_rfw_rating_container" style="background-color: rgb(254, 210, 234);">
                                <div class="r_rfw_review_product_details"><img class="r_rfw_product_image"
                                                                               src="https://unsplash.it/200/200"
                                                                               alt="Product Image"><span
                                            class="r_rfw_product_name">Product Name</span></div>
                                <span class="r_rfw_rating_preview_title" style="color: rgb(109, 3, 61);">How would you rate this item?</span>
                                <div class="r_rfw_rating_icons_wrapper"><i
                                            class="r_rfw_rating_icon review-icon review review-gem review_rating review_rating_1 null"
                                            style="color: rgb(109, 3, 61);"></i><i
                                            class="r_rfw_rating_icon review-icon review review-gem review_rating review_rating_2 null"
                                            style="color: rgb(109, 3, 61);"></i><i
                                            class="r_rfw_rating_icon review-icon review review-gem review_rating review_rating_3 null"
                                            style="color: rgb(109, 3, 61);"></i><i
                                            class="r_rfw_rating_icon review-icon review review-gem review_rating review_rating_4 null"
                                            style="color: rgb(109, 3, 61);"></i><i
                                            class="r_rfw_rating_icon review-icon review review-gem review_rating review_rating_5 null"
                                            style="color: rgb(109, 3, 61);"></i></div>
                            </div>
                        </div>
                        <div class="r_rfw_slide">
                            <div class="r_rfw_photo_slide_container" style="background-color: rgb(254, 210, 234);">
                                <div class="r_frw_photo_slide__text_container"><span class="r_frw_photo_title"
                                                                                     style="color: black;">Show it Off</span><span
                                            class="r_frw_photo_description" style="color: black;">We'd love to see it again</span>
                                </div>
                                <div class="r_frw_add_photos_container">
                                    <div class="r_frw_view_photos_container">
                                        <div class="r_frw_photos_list">
                                            <div class="r_frw_img_container" style="display:none">
                                                <span class="review review-cross-icon r_frw_img_close_icon"></span>
                                                <img
                                                        src="#"
                                                        alt="Uploaded Preview"
                                                        style="height=100%;object-fit=cover;margin-right=10px;"
                                                />
                                            </div>
                                            <div class="r_frw_add_photos_div wd_add_photos_btn">
                                                <i class="review-plus  review-icon review"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <input type="file" style="display: none;" class="r_frw_file_input"/>
                                    <button class="r_frw_add_photos_btn wd_add_photos_btn"
                                            style="color: rgb(231, 6, 128); background-color: rgb(254, 210, 234); border-color: rgb(231, 6, 128);">
                                        Add Photos
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="r_rfw_slide">
                            <div class="r_rfw_review_content_container" style="background-color: rgb(254, 210, 234);">
                                <span class="r_rfw_review_content_title"
                                      style="color: black;">Tell us more!</span><textarea
                                        class="r_rfw_review_content_text r_rfw_input_field" rows="15"
                                        placeholder="Share your experience" style="border-color: white;"></textarea>
                                <div class="r_rfw_review_content_continue_btn r_rfw_continue_btn">
                                    <button class="r_rfw_btn"
                                            style="color: rgb(231, 6, 128); background-color: rgb(254, 210, 234);">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="r_rfw_slide">
                            <div class="r_rfw_reviewer_detail_container" style="background-color: rgb(254, 210, 234);">
                                <span class="r_rfw_reviewer_detail_title" style="color: purple;">About you</span>
                                <div class="r_rfw_review_names_info_container">
                                    <div class="r_rfw_input_field_wrapper r_rfw_reviewer_first_name"><label for=""
                                                                                                            style="color: purple;">First
                                            Name</label><input class="r_rfw_input_field" placeholder="John Doe" value=""
                                                               style="border-color: white;"></div>
                                    <div class="r_rfw_input_field_wrapper r_rfw_reviewer_last_name"><label for=""
                                                                                                           style="color: purple;">Last
                                            Name</label><input class="r_rfw_input_field" placeholder="John Doe" value=""
                                                               style="border-color: white;"></div>
                                </div>
                                <div class="r_rfw_input_field_wrapper r_rfw_reviewer_email"><label for=""
                                                                                                   style="color: purple;">Email</label><input
                                            class="r_rfw_input_field" placeholder="Email" value=""
                                            style="border-color: white;"></div>
                                <div class="r_rfw_reviewer_section_note"><p style="color: purple;">By Submitting, I
                                        acknowledge the Terms of Service and Privacy Policy and that my review will be
                                        publicly posted and shared online</p></div>
                                <div class="r_rfw_reviewer_continue_btn">
                                    <button class="r_rfw_btn"
                                            style="color: rgb(231, 6, 128); background-color: rgb(254, 210, 234);">
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="r_rfw_slide">
                            <div class="r_rfw_thank_you_slide_wrapper wrapper " id="sparkle-wrapper"
                                 style="background-color: rgb(254, 210, 234);"><span class="r_rfw_thank_you_title"
                                                                                     style="color: purple;">Thank you</span><span
                                        class="r_rfw_thank_you_description" style="color: purple;">Your Review was submitted</span>
                                <div class="r_rfw_thank_you_discount_detail_wrapper"><p>Use the following discount code
                                        for 15% off your next purchase</p><span class="r_rfw_thank_you_discount_code">LX-1FFRII</span><span>we'll also send it by email discount expires DD/MM/YYYY</span>
                                </div>
                                <div class="r_rfw_thank_you_proceed_next">
                                    <button class="r_rfw_btn"
                                            style="color: rgb(231, 6, 128); background-color: rgb(254, 210, 234);">
                                        Continue
                                    </button>
                                    <button class="r_rfw_btn">Review another item</button>
                                </div>
                            </div>
                        </div>
                        <div class="r_rfw_slide">
                            <div class="r_rfw_remaining_items_wrapper" style="background-color: rgb(254, 210, 234);">
                                <span class="r_rfw_remaining_items_title"
                                      style="color: purple;">Review Another Item</span>
                                <div class="r_rfw_review_remaining_available_items">
                                    <div class="r_rfw_review_next_item">
                                        <div class="r_rfw_review_next_item_product_details"><img
                                                    src="https://unsplash.it/200/200" alt="Product Image"><span
                                                    class="r_rfw_review_next_item_product_name">The Multi-Managed Snowboard</span>
                                        </div>
                                        <div class="r_rfw_review_next_item_write_a_review">
                                            <button class="r_rfw_btn">Write a Review</button>
                                        </div>
                                    </div>
                                    <div class="r_rfw_review_next_item">
                                        <div class="r_rfw_review_next_item_product_details"><img
                                                    src="https://unsplash.it/200/200" alt="Product Image"><span
                                                    class="r_rfw_review_next_item_product_name">The Multi-Managed Snowboard</span>
                                        </div>
                                        <div class="r_rfw_review_next_item_write_a_review">
                                            <button class="r_rfw_btn">Write a Review</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r_rfw_footer_wrapper r_rfw_footer_wrapper_down">
                        <button class="r_rfw_btn r_rfw_footer_btn r_rfw_footer_back_btn">
                            <span class="review review-arrow-left"></span>
                        </button>
                        <button class="r_rfw_btn r_rfw_footer_btn r_rfw_footer_skip_btn r_rfw_footer_forward_btn">Skip</button>
                    </div>
                </div>
            </div>
        </dialog>
    </template>
<?php
wp_footer()
?>