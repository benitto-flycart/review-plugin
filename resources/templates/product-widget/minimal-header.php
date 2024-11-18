<?php
defined('ABSPATH') || exit;
?>

<div class="r_pw_mh_container">
    <div class="r_pw_header_rating_container r_pw_mh_rating_container">
        <div class="r_pw_mh_rating_details">
            <?php foreach (range(0, 4) as $i) { ?>
                <i class="farp farp-<?php echo $data['ratings']['overall_rating'] >= $i ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
            <?php } ?>
        </div>
        <div class="r_pw_mh_overall_reviews">
            <span
                class="r_pw_mh_overall_reviews_count">
                <?php echo esc_attr__($data['total'] . " Reviews") ?></span>
            <span class="r_pw_mh_filter r_pw_mh_filter_icon_closed <?php echo !$widget->showRatingOptions() ? 'r_pw_hide' : '' ?>">
                <i class="farp farp-caret-left"></i>
            </span>
            <div class="r_pw_ratings-row-progress-bar-details r_pw_mh_rd_container r_pw_hide">
                <?php $rating = $data['ratings']; ?>
                <?php foreach (range(0, 4) as $index) { ?>
                    <div class=" r_pw_h_rd_detail r_pw_mh_rd_detail" data-rating="<?php echo $index + 1 ?>">
                        <div class="r_pw_h_rd_detail_icon r_pw_mh_rd_detail_icon">
                            <?php foreach (range(0, 4) as $i) { ?>
                                <i class="farp farp-<?php echo $i <= $index ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                            <?php } ?>
                        </div>
                        <div class="r_pw_h_rd_detail_progress_bar r_pw_mh_rd_detail_progress_bar">
                            <div class="r_pw_progress_bar_bg">
                                <div class="r_pw_progress_bar_fill"
                                    style="width: <?php echo $rating['details'][$index]['percentage'] . '%' ?>"><span
                                        class="r_pw_progress_bar_label"></span></div>
                            </div>
                        </div>
                        <div class="r_pw_mh_rd_detail_progress_bar_count"><?php echo $rating['details'][$index]['count'] ?>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
    <div class="r_pw_mh_actions_container">
        <div class="r_pw_mh_actions_container--btn_container <?php echo !$widget->showWriteAReview() ? 'r_pw_hide' : '' ?>">
            <button type="button"
                class="r_pw_write_a_review_btn r_pw_header_button r_pw_mh_actions_container--btn_container-btn">
                Write a Review
            </button>
        </div>
        <div class="r_pw_mh_actions_container--sorting_container <?php echo !$widget->showSortingOptions() ? 'r_pw_hide' : '' ?> ">
            <div class="r_pw_h_sorting_container--trigger r_pw_h_popover-container">
                <div class="r_pw_h_popover-trigger" aria-haspopup="true"
                    aria-expanded="false" aria-controls="popover-content">
                    <button type="button" class="r_pw_header_button r_pw_mh_actions_sorting_container_btn">
                        <i class="farp farp-rocket"></i>
                    </button>
                </div>
            </div>
            <div id="r_pw_h_popover-content"
                class="r_pw_h_sorting_list-container r_pw_h_popover-content r_pw_hide"
                role="dialog"
                aria-modal="false"
                style="position:absolute;">
                <div>
                    <ul>
                        <li>Sort By</li>
                        <li data-sorting="newest" class="r_pw_h_sorting-link">Newest</li>
                        <li data-sorting="oldest" class="r_pw_h_sorting-link">Oldest</li>
                        <li data-sorting="highest" class="r_pw_h_sorting-link">Highest Rating</li>
                        <li data-sorting="lowest" class="r_pw_h_sorting-link">Lowest Rating</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
