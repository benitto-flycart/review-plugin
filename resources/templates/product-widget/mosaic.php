<div class="r_pw_all_reviews_container r_pw_r_m_all_reviews_container">
    <?php foreach ($data['reviews'] as $review) { ?>
        <div class="r_pw_r_container r_pw_r_m_container">
            <div class="r_pw_r_m_review-details-container">
                <div class="r_pw_r_m_review-details">
                    <span><?php echo $review['reviewer_name'] ?></span>
                    <span><?php echo $review['date'] ?></span>
                    <div class="r_pw_r_m_review-details--review-icons">
                        <?php foreach (range(0, 4) as $index) { ?>
                            <i class="review review-<?php echo $index < $review['rating'] ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                        <?php } ?>
                    </div>
                    <p><?php echo $review['content'] ?></p>
                    <?php if (isset($review['images']) && count($review['images']) > 0) { ?>
                        <img src="<?php echo $review['images'][0]['src'] ?>" width="60" height="60">
                    <?php } ?>
                </div>
            </div>

            <?php if (isset($review['replies']) && count($review['replies']) > 0) { ?>
                <div class="r_pw_r_reply_container r_pw_r_m_review-details--reply-container">
                    <?php foreach ($review['replies'] as $reply) { ?>
                        <div>
                            <span class="r_pw_r_g_container--reply--reviewer_name"><?php echo $reply['reviewer_name'] ?> replied!</span>
                            <p class="r_pw_r_g_container--reply--content"><?php echo $reply['reply_content'] ?></p>
                        </div>
                    <?php } ?>
                </div>
            <?php } ?>

            <?php if (isset($review['product'])) { ?>
                <div class="r_pw_r_m_review-details--product_container">
                    <div class="r_pw_r_m_review-details--product_img_container"><img
                                src="<?php echo $review['product']['src'] ?>" alt="" width="100px"
                                height="50px">
                    </div>
                    <div>
                        <span><?php echo $review['product']['product_name'] ?></span>
                    </div>
                </div>
            <?php } ?>
        </div>
    <?php } ?>
</div>