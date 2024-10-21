<div class="r_pw_ch_container">
    <div class="r_pw_ch_rating_container">
        <div class="r_pw_ch_rating">
            <i class="review-icon review review-gem review-icon-filled"></i>
            <span><?php echo $data['ratings']['overall_rating'] ?></span>
        </div>
        <span><?php echo esc_attr__($data['total'] . " Reviews") ?></span>
    </div>
    <div class="r_pw_ratings-row-progress-bar-details r_pw_ch_rd_container <?php echo !$widget->showRatingOptions() ? 'r_pw_hide' : '' ?>">
        <?php $rating = $data['ratings']; ?>
        <?php foreach (range(0, 4) as $index) { ?>
            <div class="r_pw_h_rd_detail r_pw_ch_rd_detail" data-rating="<?php echo $index + 1 ?>">
                <div class="r_pw_ch_rd_detail_icon">
                    <?php foreach (range(0, 4) as $i) { ?>
                        <i class="review review-<?php echo $i <= $index ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                    <?php } ?>
                </div>
                <div class="r_pw_ch_rd_detail_progress_bar">
                    <div class="r_pw_progress_bar_bg">
                        <div class="r_pw_progress_bar_fill"
                            style="width: <?php echo $rating['details'][$index]['percentage'] . '%' ?>">
                            <span class="r_pw_progress_bar_label"></span>
                        </div>
                    </div>
                </div>
                <div class="r_pw_ch_rd_detail_progress_bar_count"><?php echo $rating['details'][$index]['count'] ?>
                </div>
            </div>
        <?php } ?>
    </div>
    <div class="r_pw_ch_actions">
        <div class="r_pw_ch_actions_new_review_btn_container <?php echo !$widget->showWriteAReview() ? 'r_pw_hide' : '' ?>">
            <button type="button"
                class="r_pw_write_a_review_btn r_pw_header_button r_pw_ch_actions_new_review_btn_container_btn">
                Write a Review
            </button>
        </div>
        <div class="r_pw_ch_actions_sorting_container <?php echo !$widget->showSortingOptions() ? 'r_pw_hide' : '' ?> " style="position:relative">
            <div class="r_pw_h_popover-container">
                <div class="r_pw_h_sorting_container--trigger r_pw_h_sorting_container--trigger r_pw_h_popover-trigger" aria-haspopup="true"
                    aria-expanded="false" aria-controls="popover-content">
                    <button type="button" class="r_pw_header_button r_pw_ch_actions_sorting_container_btn">
                        <i class="review review-rocket"></i>
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
