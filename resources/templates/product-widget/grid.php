<div class="r_pw_g_all_reviews_container">
    <?php foreach ($data['reviews'] as $review) { ?>
        <div class="r_pw_r_container r_pw_r_g_container">
            <div class="r_pw_r_g_container--review-details">
                <!--                <span class="r_pw_r_g_container--review-details--title"></span>-->
                <?php if (isset($review['images']) && count($review['images']) > 0) { ?>
                    <img src="<?php echo $review['images'][0]['src'] ?>"
                         class="r_pw_r_g_container--review-details--image"
                         alt="" onError="function remove(e) {e?.target?.remove();}"/>
                <?php } ?>
                <div class="r_pw_r_g_container--review-info"><span
                            class="r_pw_r_g_container--review-info-name"><?php echo $review['reviewer_name'] ?></span>
                    <span class="r_pw_r_g_container--review-date"><?php echo $review['date'] ?></span>
                    <div class="r_pw_r_g_container--review-rating-details">
                        <?php foreach (range(0, 4) as $index) { ?>
                            <i class="review review-<?php echo $index < $review['rating'] ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                        <?php } ?>
                    </div>
                    <p class="r_pw_r_g_container--review-content"><?php echo $review['content'] ?></p>
                </div>
            </div>
            <?php if (isset($review['replies']) && count($review['replies']) > 0) { ?>
                <div class="r_pw_r_g_container--reply-container">
                    <?php foreach ($review['replies'] as $reply) { ?>
                        <div>
                            <span class="r_pw_r_g_container--reply--reviewer_name"><?php echo $reply['reviewer_name'] ?> replied!</span>
                            <p class="r_pw_r_g_container--reply--content"><?php echo $reply['reply_content'] ?></p>
                        </div>
                    <?php } ?>
                </div>
            <?php } ?>
            <?php if (isset($review['product'])) { ?>
                <div class="r_pw_r_g_container--product_container">
                    <div class="r_pw_r_g_container--product_container--img_container">
                        <img
                                src="<?php echo $review['product']['src'] ?>" alt="" width="100px" height="50px"
                                onError="function(e) {e?.target?.remove();}"
                        >
                    </div>
                    <div class="r_pw_r_g_container--product_container--product_name">
                        <span><?php echo $review['product']['product_name'] ?></span></div>
                </div>
            <?php } ?>
        </div>
    <?php } ?>
</div>