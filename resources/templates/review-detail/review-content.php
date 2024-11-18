<?php
defined('ABSPATH') || exit;
?>

<?php
$reviewObj = new \Flycart\Review\App\Helpers\ReviewHelper($review)
?>
<div class="r_rdw_container"
    style="<?php echo $styles ?>">
    <div class="r_rdw_close_icon">
        <i class="farp farp-cross-icon"></i>
    </div>
    <div class="r_rdw-main_content">
        <?php if ($reviewObj->hasImages()): ?>
            <div class="r_rdw-image-container">
                <div class="r_rdw_all_images">
                    <div class="r_rdw_all_images_wrapper">
                        <?php foreach ($reviewObj->getReviewImages() as $image) : ?>
                            <div class="r_rdw_active_image mySlides">
                                <img src="<?php echo esc_attr($image['variants']['full']) ?>"
                                    alt="<?php esc_attr($image['title'] ?? '') ?>">
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <?php if ($reviewObj->getImagesCount() != 1) : ?>
                        <div class="r_rdw-slide-actions">
                            <button class="prev "><i class="farp farp-caret-left"></i></button>
                            <button class="next disabled" disabled=""><i class="farp farp-caret-right"></i></button>
                        </div>
                    <?php endif ?>
                </div>
                <?php if ($reviewObj->getImagesCount() != 1) : ?>
                    <div class="row r_rdw_image_thumbnails">
                        <?php foreach ($reviewObj->getReviewImages() as $index => $image) : ?>
                            <div class="column r_rdw_image_thumbnail"
                                data-image-index="<?php echo esc_attr($index + 1) ?>">
                                <img class="r_rdw-image-options"
                                    src="<?php echo esc_attr($image['variants']['full']) ?>"
                                    alt="<?php echo esc_attr($image['title'] ?? '') ?>"
                                    style="width: 100%;">
                            </div>
                        <?php endforeach ?>
                    </div>
                <?php endif ?>
            </div>
        <?php endif ?>
        <div class="r_rdw-detail-wrapper">
            <div class="r_rdw-review-details">
                <div class="r_rdw-spread-container">
                    <div class="r_rdw-title"><?php echo esc_attr($reviewObj->getReviewerName()) ?></div>
                    <div class="r_rdw-overview">
                        <button class="r_rdw-button-info"><i class="farp farp-info"></i></button>
                        <div class="r_rdw-i-verified-notification r_rdw_verified-notification-info-toggle"><span>This review was written by a site visitor.</span>
                        </div>
                    </div>
                </div>
                <div class="r_rdw-spread-container">
                    <?php if ($reviewObj->isRatingGiven()): ?>
                        <div class="r_rdw-review-icons">
                            <?php foreach (range(0, 4) as $index) { ?>
                                <i class="farp farp-<?php echo $index < $reviewObj->getRatting() ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                            <?php } ?>
                        </div>
                    <?php endif ?>
                    <div class="r_rdw-spread-container__review-date"><?php echo esc_attr($reviewObj->getReviewDate()) ?></div>
                </div>
            </div>
            <div class="r_rdw-review-content-wrapper">
                <div class="r_rdw-review-content">
                    <!--                    Need to allow html here -->
                    <div class="r_rdw-review-content-text"><?php echo $reviewObj->getContent() ?></div>
                </div>
                <?php foreach ($reviewObj->getReplies() as $reply) : ?>
                    <div class="r_rdw-review-item-reply">
                        <div class="r_rdw-item-reply-title"><strong
                                class="r_rdw-small-text r_rdw-font-weight-bold"><?php echo esc_html__($reply->getReviewerName()) ?></strong> <?php echo esc_attr__('replied:', 'f-review') ?>
                        </div>
                        <div class="r_rdw-normal-text"><?php echo $reply->getContent() ?></div>
                    </div>
                <?php endforeach ?>
            </div>
        </div>
    </div>
</div>
