<?php
defined('ABSPATH') || exit;
?>

<div class="r_pw_all_reviews_container r_pw_r_m_all_reviews_container">
    <?php foreach ($data['reviews'] as $review) { ?>
        <?php $reviewObject = new \Flycart\Review\App\Helpers\ReviewHelper($review); ?>
        <div class="r_pw_r_container r_pw_r_m_container"
            onclick="REVIEW_DETAIL_WIDGET(<?php echo esc_attr($review['id']) ?>)">
            <div class="r_pw_r_m_review-details-container">
                <div class="r_pw_r_m_review-details">
                    <div class="r_pw_reviewer_name_container">
                        <span><?php echo $reviewObject->getReviewerName() ?></span>
                        <span class="r_pw_r--review-is-verified r_pw_r_m_container--review-is-verified">
                            <i class="farp farp-trophy"></i>
                        </span>
                    </div>
                    <?php if ($reviewObject->isRatingGiven()): ?>
                        <div class="r_pw_r_m_review-details--review-icons">
                            <?php foreach (range(0, 4) as $index) { ?>
                                <i class="farp farp-<?php echo $index < $reviewObject->getRatting() ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                            <?php } ?>
                        </div>
                    <?php endif ?>

                    <p><?php echo $reviewObject->getContent() ?></p>
                    <?php if ($reviewObject->hasImages()) { ?>
                        <img src="<?php echo $reviewObject->getFirstImage() ?>" width="60" height="60" />
                    <?php } ?>
                </div>
            </div>

            <?php if ($reviewObject->hasReplies()) { ?>
                <div class="r_pw_r_reply_container r_pw_r_m_review-details--reply-container">
                    <?php foreach ($reviewObject->getReplies() as $reply) { ?>
                        <div>
                            <span class="r_pw_r_g_container--reply--reviewer_name"><?php echo $reply->getReviewerName() ?> replied!</span>
                            <p class="r_pw_r_g_container--reply--content"><?php echo $reply->getContent() ?></p>
                        </div>
                    <?php } ?>
                </div>
            <?php } ?>

            <?php if ($reviewObject->isProductSet()) { ?>
                <div class="r_pw_r--product_container r_pw_r_m_review-details--product_container">
                    <div class="r_pw_r_m_review-details--product_img_container"><img
                            src="<?php echo $reviewObject->getProductImage() ?>" alt="" width="100px"
                            height="50px">
                    </div>
                    <div>
                        <span><?php echo $reviewObject->getProductName() ?></span>
                    </div>
                </div>
            <?php } ?>
        </div>
    <?php } ?>
</div>
