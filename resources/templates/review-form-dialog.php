<?php
?>

<div class="wd_preview_content review_form_widget review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-relative rating-widget-preview-desktop">
    <div class="r_rfw_container"
        style="<?php echo $widget->getProductWidgetStylesVars() ?>">
        <div class="r_rfw_header">
            <button class="r_rfw_btn r_rfw_dialog_close_icon">
                <span class="review review-cross-icon"></span>
            </button>
        </div>

        <div class="r_rfw_main_content_wrapper">
            <?php if ($enabled['rating']) { ?>
                <div class="r_rfw_slide">
                    <div class="r_rfw_rating_container">
                        <div class="r_rfw_review_product_details">
                            <?php
                            $image_id = $product->get_image_id();
                            $image_url = wp_get_attachment_image_url($image_id, 'full');
                            ?>
                            <img class="r_rfw_product_image"
                                src="<?php echo $image_url ?>"
                                alt="Product Image">
                        </div>
                        <p class="r_rfw_rating_preview_title">How would you rate
                            <span class="r_rfw_rating-title__product_name "><?php echo $product->get_name() ?></span>
                        </p>
                        <div class="r_rfw_rating_icons_wrapper">
                            <div class="r_rwf_rating_icons_wrapper_with_text">
                                <i class="r_rfw_rating_icon review-icon review review-<?php echo $icon['outlined'] ?>"></i>
                                <span class="r_rwf_rating_icons_text">Dislike it</span>
                            </div>
                            <div class="r_rwf_rating_icons_wrapper_with_text">
                                <i class="r_rfw_rating_icon review-icon review  review-<?php echo $icon['outlined'] ?>"></i>
                            </div>
                            <div class="r_rwf_rating_icons_wrapper_with_text">
                                <i class="r_rfw_rating_icon review-icon review  review-<?php echo $icon['outlined'] ?>"></i>
                            </div>
                            <div class="r_rwf_rating_icons_wrapper_with_text">
                                <i class="r_rfw_rating_icon review-icon review review-<?php echo $icon['outlined'] ?>"></i>
                            </div>
                            <div class="r_rwf_rating_icons_wrapper_with_text">
                                <i class="r_rfw_rating_icon review-icon review review-<?php echo $icon['outlined'] ?>"></i>
                                <span class="r_rwf_rating_icons_text">Love it!</span>
                            </div>
                        </div>
                    </div>
                </div>
            <?php } ?>


            <?php if ($enabled['photo']) { ?>
                <div class="r_rfw_slide">
                    <div class="r_rfw_photo_slide_container">
                        <input type="file" accept="image/*" class="r_frw_file_input">
                        <div class="r_frw_photo_slide__text_container"><span
                                class="r_frw_photo_title">Show it Off</span><span
                                class="r_frw_photo_description">We'd love to see it again</span></div>
                        <div class="r_frw_add_photos_container">
                            <div class="r_frw_view_photos_container r_rfw_hide">
                                <div class="r_frw_photos_list">
                                    <div class="r_frw_img_container r_rfw_hide"><span class="review review-cross-icon r_frw_img_close_icon"></span>
                                        <img class="r_frw_img-uploaded" src="#" alt="Uploaded Preview 1">
                                    </div>
                                    <div class="r_rfw_add_photos_div wd_add_photos_btn">
                                        <i class="review-plus visible frt-text-inherit review-icon review"></i>
                                        <span class="r_frw_img_loader"></span>
                                    </div>
                                </div>
                            </div>
                            <!--                                    Initally it will show when minmum one photo added it will hided-->
                            <div class="r_rfw_empty_photo_section">
                                <p class="r_rfw_photo_discount_text">Get <?php echo $discountSettings->photoDiscountString();  ?> off your next
                                    purchase!
                                </p>
                                <button class="r_frw_add_photos_btn wd_add_photos_btn"> <span class="r_frw_img_loader"></span> Add Photos</button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php } ?>


            <?php if ($enabled['review']) { ?>
                <div class="r_rfw_slide">
                    <div class="r_rfw_review_content_container"><span
                            class="r_rfw_review_content_title">Tell us more!</span>
                        <textarea
                            class="r_rfw_review_content_text r_rfw_input_field" rows="8"
                            placeholder="Share your experience"></textarea>
                        <span class="r_rfw_review_text_error r_rfw_hide"></span>
                    </div>
                </div>
            <?php } ?>
            <?php if ($enabled['reviewer']) { ?>
                <div class="r_rfw_slide">
                    <div class="r_rfw_reviewer_detail_container"><span
                            class="r_rfw_reviewer_detail_title">About you</span>
                        <div class="r_rfw_review_names_info_container">
                            <div class="r_rfw_input_field_wrapper r_rfw_reviewer_first_name"><label for="">First
                                    Name</label>
                                <input class="r_rfw_input_field" placeholder="John Doe"
                                    value="" />
                                <span class="r_rfw_review_info_first_name_error  r_rfw_review_info_error">
                                </span>
                            </div>
                            <div class="r_rfw_input_field_wrapper r_rfw_reviewer_last_name"><label for="">Last
                                    Name</label><input class="r_rfw_input_field" placeholder="Doe"
                                    value=""><span
                                    class="r_rfw_review_info_error r_rfw_review_info_last_name_error"></span>
                            </div>
                        </div>
                        <div class="r_rfw_input_field_wrapper r_rfw_reviewer_email"><label
                                for="">Email</label><input class="r_rfw_input_field" placeholder="Email"
                                value=""><span
                                class="r_rfw_review_info_error r_rfw_review_info_email_error"></span></div>
                        <div class="r_rfw_reviewer_section_note">
                            <p>By Submitting, I acknowledge the Terms of
                                Service and Privacy Policy and that my review will be publicly posted and shared
                                online</p>
                        </div>
                    </div>
                </div>
            <?php } ?>
            <?php if ($enabled['thank_you']) { ?>
                <div class="r_rfw_slide">
                    <div class="r_rfw_thank_you_slide_wrapper wrapper" id="sparkle-wrapper"><span
                            class="r_rfw_thank_you_title">Thank you</span><span
                            class="r_rfw_thank_you_description">Your Review was submitted</span>
                        <div class="r_rfw_thank_you_discount_detail_wrapper r_rfw_hide">
                            <p>Use the following discount code for 15% off your next purchase</p>
                            <span class="r_rfw_thank_you_discount_code">LX-1FFRII</span>
                            <span>we'll also send it by email discount expires DD/MM/YYYY</span>
                        </div>
                        <?php if ($enabled['next_products']) { ?>
                            <div class="r_rfw_thank_you_proceed_next">
                                <button class="r_rfw_btn">Continue</button>
                                <button class="r_rfw_btn r_rfw_continue_btn">Review another item</button>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            <?php } ?>
            <?php if ($enabled['next_products']) { ?>
                <div class="r_rfw_slide">
                    <div class="r_rfw_remaining_items_wrapper"><span
                            class="r_rfw_remaining_items_title">Review Another Item</span>
                        <div class="r_rfw_review_remaining_available_items">
                            <?php foreach ($next_review_items as $review_item) {
                                $item_product = $review_item->get_product();
                                $image_id = $item_product->get_image_id();
                                $image_url = wp_get_attachment_image_url($image_id, 'full');
                            ?>
                                <div class="r_rfw_review_next_item">
                                    <div class="r_rfw_review_next_item_product_details">
                                        <img src="<?php echo $image_url ?>" alt="Product Image"><span
                                            class="r_rfw_review_next_item_product_name"><?php echo $item_product->get_name() ?></span>
                                    </div>
                                    <div class="r_rfw_review_next_item_write_a_review">
                                        <a class="r_rfw_btn"
                                            href="<?php echo \Flycart\Review\App\Helpers\PluginHelper::getReviewLink($order, $item_product->get_id()) ?>">
                                            Write a Review
                                        </a>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </div>
        <div class="r_rfw_footer_wrapper r_rfw_footer_wrapper_down">
            <button class="r_rfw_btn r_rfw_footer_btn r_rfw_footer_back_btn ">
                <span class="review review-arrow-left"></span>
            </button>
            <button class="r_rfw-submit_button r_rfw_btn r_rfw_footer_btn r_rfw_footer_forward_btn">
                <span class="r_rfw-button__text">Continue</span>
            </button>
        </div>
    </div>
</div>
