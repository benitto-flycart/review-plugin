<div class="r_puw_container <?php echo $widget->getCornerRadiusClass()?>"
     style="<?php echo $styles ?>">
    <span class="r_puw_close-icon">
        <i class="review review-cross-icon"></i>
    </span>
    <div class="r_puw-review_wrapper">
        <?php if (isset($review['images']) && count($review['images']) > 0) { ?>
            <div class="r_puw-review_image_wrapper">
                <img class="r_puw-review_image" src="<?php echo $review['images'][0]['src'] ?>" alt="">
            </div>
        <?php } ?>
        <div class="r_puw-review-details-wrapper">
            <div class="r_puw-review-details-name"><?php echo $review['reviewer_name'] ?></div>
            <div class="r_puw-review-details-icons">
                <?php foreach (range(0, 4) as $index) { ?>
                    <i class="review review-<?php echo $index < $review['rating'] ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                <?php } ?>
            </div>
            <div class="r_puw-review-details-content">
                <?php echo $review['content'] ?>
            </div>
        </div>
        <div class="r_puw-product_details_wrapper">
            <div class="r_puw-product_details-img_wrapper">
                <img class="r_puw-product_details-img"
                        src="<?php echo $review['product']['src'] ?>"
                        alt="" >
            </div>
            <div class="r_puw-product_details-product_title">
                <?php echo $review['product']['product_name'] ?>
            </div>
        </div>
    </div>
</div>