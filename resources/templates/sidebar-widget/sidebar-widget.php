<?php
defined('ABSPATH') || exit;
?>

<div class="r_sbw__container <?php echo $widget->getSidebarPositionClass() ?> <?php echo $widget->getOrientationClass() ?>"
    style="<?php echo $widget->getStyleVars(); ?>" onclick="FLOATING_WIDGET_DEFAULT(window)">
    <span class="r_sbw__btn_icon">
        <i class="review-icon farp farp-gem review-icon-filled "
            style="font-size: inherit; color: inherit;"></i>
    </span>
    <span class="r_sbw__btn_text">Reviews</span>
</div>
