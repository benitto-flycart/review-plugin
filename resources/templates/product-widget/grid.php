<?php
defined('ABSPATH') || exit;
?>

<div class="r_pw_all_reviews_container r_pw_g_all_reviews_container">
    <?php foreach ($data['reviews'] as $review) { ?>
        <?php $reviewObject = new \Flycart\Review\App\Helpers\ReviewHelper($review); ?>
        <div class="r_pw_r_container r_pw_r_g_container"
            onclick="REVIEW_DETAIL_WIDGET(<?php echo esc_attr($reviewObject->getId()) ?>)">
            <div class="r_pw_r_g_container--review-details">
                <?php if ($reviewObject->hasImages()) { ?>
                    <img src="<?php echo $reviewObject->getFirstImage() ?>"
                        class="r_pw_r_g_container--review-details--image"
                        alt="" />
                <?php } ?>
                <div class="r_pw_r_g_container--review-info">
                    <div class="r_pw_reviewer_name_container">
                        <span class="r_pw_r_g_container--review-info-name">
                            <?php echo $reviewObject->getReviewerName() ?>
                        </span>
                        <span class="r_pw_r--review-is-verified r_pw_r_g_container--review-is-verified">
                            <i class="review review-trophy"></i>
                        </span>
                    </div>
                    <span class="r_pw_r_g_container--review-date <?php echo !$widget->isReviewDateEnabled() ? 'r_pw_hide' : '' ?>">
                        <?php echo $reviewObject->getReviewDate() ?>
                    </span>
                    <?php if ($reviewObject->isRatingGiven()): ?>
                        <div class="r_pw_r_g_container--review-rating-details">
                            <?php foreach (range(0, 4) as $index) { ?>
                                <i class="review review-<?php echo $index < $reviewObject->getRatting() ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                            <?php } ?>
                        </div>
                    <?php endif ?>
                    <p class="r_pw_r_g_container--review-content"><?php echo $reviewObject->getContent() ?></p>
                </div>
            </div>
            <?php if ($reviewObject->hasReplies()) { ?>
                <div class="r_pw_r_reply_container r_pw_r_g_container--reply-container">
                    <?php foreach ($reviewObject->getReplies() as $reply) { ?>
                        <div>
                            <span class="r_pw_r_g_container--reply--reviewer_name"><?php echo $reply->getReviewerName() ?> replied!</span>
                            <p class="r_pw_r_g_container--reply--content"><?php echo $reply->getContent() ?></p>
                        </div>
                    <?php } ?>
                </div>
            <?php } ?>
            <?php if (isset($review['product'])) { ?>
                <div class="r_pw_r--product_container r_pw_r_g_container--product_container">
                    <div class="r_pw_r_g_container--product_container--img_container">
                        <img src="<?php echo $reviewObject->getProductImage() ?>"
                            alt="<?php echo $reviewObject->getProductName() ?>" width="100px" height="50px">
                    </div>
                    <div class="r_pw_r_g_container--product_container--product_name">
                        <span><?php echo $reviewObject->getProductName() ?></span>
                    </div>
                </div>
            <?php } ?>
        </div>
    <?php } ?>
</div>
