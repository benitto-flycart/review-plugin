<?php
defined('ABSPATH') || exit;
?>

<div class="r_rw_rating_widget_outer_container_wrapper"
    data-reference-id="r_rpw_popup_widget_container-<?php echo $count ?>">
    <div class="r_rw_container_wrapper" style="<?php echo $widget->getStyleVars() ?>">
        <div class="r_rw_rating_details">
            <?php if (!$widget->isSingleIconEnabled()) : ?>
                <div class="r_rw_rating_icons">
                    <?php foreach (range(0, 4) as $index) { ?>
                        <i class="review review-<?php echo $index < $rating_count ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                    <?php } ?>
                </div>
            <?php endif ?>

            <?php if ($widget->isSingleIconEnabled()) : ?>
                <div class="r_rw_single_rating_icon">
                    <i class="review review-<?php echo $data['ratings']['rating_icon'] ?>"></i>
                </div>
            <?php endif ?>

            <?php if (!$widget->hideText()) : ?>
                <div class="r_rw_preview_element__text">
                    <?php echo $widget->getWidgetTextContent($rating_count, $review_count) ?>
                </div>
            <?php endif ?>
        </div>
    </div>
</div>
