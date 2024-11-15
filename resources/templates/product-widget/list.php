<?php
defined('ABSPATH') || exit;
?>

<div class="r_pw_r_l_preview_container">
    <?php foreach ($data['reviews'] as $review) { ?>
        <?php $reviewObject = new \Flycart\Review\App\Helpers\ReviewHelper($review); ?>
        <div class="r_pw_r_container r_pw_r_l_container"
            onclick="REVIEW_DETAIL_WIDGET(<?php echo esc_attr($review['id']) ?>)">
            <div class="r_pw_r_l_container--review_details">
                <div class="r_pw_r_l_container--review_details-overview">
                    <div class="r_pw_r_l_container--review_details-overview-header">
                        <span class="r_pw_r_l_container--review_details-reviewer_name"><?php echo $reviewObject->getReviewerName() ?></span>
                        <span class="r_pw_r_l_container--review_details-review_verfied">Verified</span>
                    </div>
                    <span class="r_pw_r_l_container--review_details--review-date">
                        <?php echo $reviewObject->getReviewDate() ?>
                    </span>
                </div>
                <?php if ($reviewObject->isRatingGiven()): ?>
                    <div class="r_pw_r_l_container--review_details--rating_details">
                        <div class="r_pw_r_l_container--review_details--rating_details_icons">
                            <?php foreach (range(0, 4) as $index) { ?>
                                <i class="review review-<?php echo $index < $reviewObject->getRatting() ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                            <?php } ?>
                        </div>
                    </div>
                <?php endif ?>
            </div>
            <div class="r_pw_r_l_container--review_content_container">
                <p class="r_pw_r_l_container--review_content">
                    <?php echo $reviewObject->getContent() ?>
                </p>
                <?php if ($reviewObject->hasImages()) { ?>
                    <img class="r_pw_r_l_container--review_content_img"
                        src="<?php echo $reviewObject->getFirstImage() ?>"
                        alt="">
                <?php } ?>
            </div>

            <?php if ($reviewObject->hasReplies()) { ?>
                <div class="r_pw_r_reply_container r_pw_r_l_container--reply_container">
                    <?php foreach ($reviewObject->getReplies() as $reply) { ?>
                        <div class="r_pw_r_l_container--reply_container_details">
                            <span class="r_pw_r_l_container--reply_reviewer_name"><?php echo $reply->getReviewerName() ?> replied!</span>
                            <p class="r_pw_r_l_container--reply_content"><?php echo $reply->getContent() ?></p>
                        </div>
                    <?php } ?>
                </div>
            <?php } ?>

            <?php if ($reviewObject->isProductSet()) { ?>
                <div class="r_pw_r--product_container r_pw_r_l-product_container">
                    <img src="<?php echo $reviewObject->getProductImage() ?>"
                        class="r_pw_r_l-product_container-img"
                        alt=""
                        height="50px"
                        width="50px">
                    <span><?php echo $reviewObject->getProductName() ?></span>
                </div>
            <?php } ?>
        </div>
    <?php } ?>
</div>
