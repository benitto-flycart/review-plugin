<div class="r_pw_r_l_preview_container">
    <?php foreach ($data['reviews'] as $review) { ?>
        <div class="r_pw_r_container r_pw_r_l_container">
            <div class="r_pw_r_l_container--review_details">
                <div class="r_pw_r_l_container--review_details-overview">
                    <div class="r_pw_r_l_container--review_details-overview-header">
                        <span class="r_pw_r_l_container--review_details-reviewer_name"><?php echo $review['reviewer_name'] ?></span>
                        <span class="r_pw_r_l_container--review_details-review_verfied">Verified</span>
                    </div>
                    <span class="r_pw_r_l_container--review_details--review-date">
                        <?php echo $review['date'] ?>
                    </span>
                </div>
                <div class="r_pw_r_l_container--review_details--rating_details">
                    <div class="r_pw_r_l_container--review_details--rating_details_icons">
                        <?php foreach (range(0, 4) as $index) { ?>
                            <i class="review review-<?php echo $index < $review['rating'] ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                        <?php } ?>
                    </div>
                </div>
            </div>
            <div class="r_pw_r_l_container--review_content_container">
                <p class="r_pw_r_l_container--review_content">
                    <?php echo $review['content'] ?>
                </p>
                <?php if (isset($review['images']) && count($review['images']) > 0) { ?>
                    <img class="r_pw_r_l_container--review_content_img"
                         src="<?php echo $review['images'][0]['src'] ?>"
                         alt=""
                         onError="function remove(e) {e?.target?.remove();}"
                    >
                <?php } ?>
            </div>

            <?php if (isset($review['replies']) && count($review['replies']) > 0) { ?>
                <div class="r_pw_r_reply_container r_pw_r_l_container--reply_container">
                    <?php foreach ($review['replies'] as $reply) { ?>
                        <div class="r_pw_r_l_container--reply_container_details">
                            <span class="r_pw_r_l_container--reply_reviewer_name"><?php echo $reply['reviewer_name'] ?> replied!</span>
                            <p class="r_pw_r_l_container--reply_content"><?php echo $reply['reply_content'] ?></p>
                        </div>
                    <?php } ?>
                </div>
            <?php } ?>

            <?php if (isset($review['product'])) { ?>
                <div class="r_pw_r_l-product_container">
                    <img src="<?php echo $review['product']['src'] ?>"
                         class="r_pw_r_l-product_container-img"
                         alt=""
                         height="50px"
                         onError="function(e) {e?.target?.remove();}"
                         width="50px"
                    >
                    <span><?php echo $review['product']['product_name'] ?></span>
                </div>
            <?php } ?>
        </div>
    <?php } ?>
</div>