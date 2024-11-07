<div class="r_pw_eh_container">
    <div class="r_pw_header_rating_container r_pw_eh_rating_container">
        <div class="r_pw_eh_rating_overview">
            <i class="review-icon review review-gem review-icon-filled"></i>
            <span><?php echo $data['ratings']['overall_rating'] ?></span>
        </div>
        <span><?php echo esc_attr__($data['total'] . " Reviews") ?></span>
    </div>
    <div class="r_pw_ratings-row-progress-bar-details r_pw_header_rating_container r_pw_eh_rating_details_container <?php echo !$widget->showRatingOptions() ? 'r_pw_hide' : '' ?>">
        <?php $rating = $data['ratings']; ?>
        <?php foreach (range(0, 4) as $index) { ?>
            <div class="r_pw_h_rd_detail r_pw_eh_rating_details" data-rating="<?php echo $index + 1 ?>">
                <div class="r_pw_eh_rating_details--icons-info">
                    <?php foreach (range(0, 4) as $i) { ?>
                        <i class="review review-<?php echo $i <= $index ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                    <?php } ?>
                </div>
                <div class="r_pw_eh_rating_details--progress_bar_container">
                    <div class="r_pw_progress_bar_bg">
                        <div class="r_pw_progress_bar_fill"
                            style="width: <?php echo $rating['details'][$index]['percentage'] . '%' ?>"><span
                                class="r_pw_progress_bar_label"></span></div>
                    </div>
                </div>
                <div class="r_pw_eh_rating_details--review_count">
                    <?php echo $rating['details'][$index]['count'] ?>
                </div>
            </div>
        <?php } ?>
    </div>
    <div class="r_pw_eh_actions_container">
        <div class="r_pw_eh_actions_container--btn_container <?php echo !$widget->showWriteAReview() ? 'r_pw_hide' : '' ?>">
            <button type="button"
                class="r_pw_write_a_review_btn r_pw_header_button r_pw_eh_actions_container--btn_container-btn">
                Write a Review
            </button>
        </div>
        <div class="r_pw_eh_actions_container--sorting_container <?php echo !$widget->showSortingOptions() ? 'r_pw_hide' : '' ?>">
            <div class="r_pw_h_popover-container">
                <div class="r_pw_h_sorting_container--trigger r_pw_h_popover-trigger" aria-haspopup="true"
                    aria-expanded="false" aria-controls="popover-content">
                    <button type="button" class="r_pw_header_button r_pw_eh_actions_container--sorting_container-btn">
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
                        <li><?php echo esc_attr__('Sort By', 'f-review') ?></li>
                        <li data-sorting="newest" class="r_pw_h_sorting-link"><?php echo esc_attr__('Newest') ?></li>
                        <li data-sorting="oldest" class="r_pw_h_sorting-link"><?php echo esc_attr__('Oldest') ?></li>
                        <li data-sorting="highest" class="r_pw_h_sorting-link"><?php echo esc_attr__('Highest Rating') ?></li>
                        <li data-sorting="lowest" class="r_pw_h_sorting-link"><?php echo esc_attr__('Lowest Rating') ?></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
