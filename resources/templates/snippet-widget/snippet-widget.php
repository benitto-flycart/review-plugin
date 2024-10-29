<style>
    #r_sw_widget_container_wrapper {
        margin: 1rem 0;
    }
</style>
<div id="r_sw_widget_container_wrapper">
    <!--    <template id="r_rpw_shadow_template">-->
    <template id="r_sw_widget_container">
        <link rel="stylesheet"
            href="<?php echo $snippet_widget_css ?>">
        <link rel="stylesheet"
            href="<?php echo $snippet_widget_font_css ?>">
        <div id="r_sw_container_wrapper" class="r_sw_container_wrapper" style="<?php echo $styles; ?>">
            <div class="r_sw__carousel">
                <?php foreach ($reviews as $review): ?>
                    <?php $reviewObj = new \Flycart\Review\App\Helpers\ReviewHelper($review) ?>
                    <div class="r_sw__carousel-item r_sw__carousel-item-visible"
                        onclick="REVIEW_DETAIL_WIDGET(<?php echo $reviewObj->getId() ?>)">
                        <?php if ($reviewObj->hasImages()) { ?>
                            <img class="r_sw__carousel-item_image"
                                src="<?php echo $reviewObj->getFirstImage() ?>"
                                alt="<?php echo $reviewObj->getFirstImageTitle() ?>" />
                        <?php } ?>
                        <div class="r_sw__review_details_wrapper">
                            <div class="r_sw__review_details">
                                <div><?php echo $reviewObj->getReviewerName() ?></div>
                                <div class="r_sw__review_details_icons">
                                    <?php foreach (range(0, 4) as $index) { ?>
                                        <i class="review review-<?php echo ($index < $reviewObj->getRatting()) ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="r_sw__review_text"><?php echo $reviewObj->getContent() ?></div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <?php if (!empty($reviews)) { ?>
                <div class="r_sw__carousel-actions">
                    <button class="r_sw__carousel-button-prev">

                        <i class="review review-caret-left"></i>
                    </button>
                    <button class="r_sw__carousel-button-next"
                        >
                        <i class="review review-caret-right"></i>
                    </button>
                </div>
            <?php } ?>
        </div>
    </template>
    <!--    </template>-->
</div>
