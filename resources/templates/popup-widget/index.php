<?php
defined('ABSPATH') || exit;
?>

<?php
$reviewObj = new \Flycart\Review\App\Helpers\ReviewHelper($review);
?>
<div class="r_puw_container <?php echo $widget->getCornerRadiusClass() ?>"
    style="<?php echo $styles ?>" onclick="REVIEW_DETAIL_WIDGET(<?php echo esc_attr($reviewObj->getId()) ?>)">
    <span class="r_puw_close-icon">
        <i class="farp farp-cross-icon"></i>
    </span>
    <div class="r_puw-review_wrapper">
        <?php if ($reviewObj->hasImages()) { ?>
            <div class="r_puw-review_image_wrapper">
                <img class="r_puw-review_image" src="<?php echo $reviewObj->getFirstImage() ?>" alt="">
            </div>
        <?php } ?>
        <div class="r_puw-review-details-wrapper">
            <div class="r_puw-review-details-name"><?php echo $reviewObj->getReviewerName() ?></div>
            <?php if ($reviewObj->isRatingGiven()) : ?>
                <div class="r_puw-review-details-icons">
                    <?php foreach (range(0, 4) as $index) { ?>
                        <i class="farp farp-<?php echo $index < $reviewObj->getRatting() ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                    <?php } ?>
                </div>
            <?php endif ?>
            <div class="r_puw-review-details-content">
                <?php echo $reviewObj->getContent() ?>
            </div>
        </div>
        <?php if ($reviewObj->isProductSet() && $widget->showProductThumbnail()) { ?>
            <div class="r_puw-product_details_wrapper">
                <div class="r_puw-product_details-img_wrapper">
                    <img class="r_puw-product_details-img"
                        src="<?php echo $reviewObj->getProductImage() ?>"
                        alt="">
                </div>
                <div class="r_puw-product_details-product_title">
                    <?php echo $reviewObj->getProductName() ?>
                </div>
            </div>
        <?php } ?>
    </div>
</div>
