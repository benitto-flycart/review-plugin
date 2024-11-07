<div class="r_pw_main_container">
    <?php if (!empty($data['reviews'])) { ?>
        <?php
        if ($main_content == 'grid') {
            include 'grid.php';
        } else if ($main_content == 'list') {
            include 'list.php';
        } else if ($main_content == 'mosaic') {
            include 'mosaic.php';
        }
        ?>
    <?php } else { ?>
        <p><?php echo __('No reviews found', 'review-widget') ?></p>
    <?php } ?>

    <?php if (isset($data['total_pages']) && $data['total_pages'] > 1) { ?>
        <div class="r_w_pagination">
            <span class="r_w_pagination-link <?php echo $data['current_page'] == 1 ? ' disabled' : '' ?>" data-pagination-page="<?php echo $data['current_page'] - 1 ?>">«</span>
            <?php foreach (range(0, $data['total_pages'] - 1) as $index) { ?>
                <span class="r_w_pagination-link <?php echo ($data['current_page'] == $index + 1 ? ' active' : '') ?>" data-pagination-page="<?php echo $index + 1 ?>"><?php echo $index + 1 ?></span>
            <?php } ?>
            <span class="r_w_pagination-link <?php echo $data['current_page'] == $data['total_pages'] ? ' disabled' : '' ?>"" data-pagination-page=" <?php echo $data['current_page'] + 1 ?>">»</span>
        </div>
    <?php } ?>
</div>
