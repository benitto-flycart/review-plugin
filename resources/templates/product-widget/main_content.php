<?php
defined('ABSPATH') || exit;
?>

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
            <?php foreach ($data['pagination'] as $page) { ?>
                <?php error_log('printing page: ' . $page); ?>
                <?php if ($page == '...') { ?>
                    <span class="ellipsis" data-pagination-page="<?php echo $page ?>">
                        <?php echo esc_attr('...') ?>
                    </span>
                <?php } else { ?>
                    <span class="r_w_pagination-link <?php echo ($data['current_page'] == $page ? ' active' : '') ?>" data-pagination-page="<?php echo $page ?>">
                        <?php echo esc_attr($page) ?>
                    </span>

                <?php } ?>
            <?php } ?>
            <span class="r_w_pagination-link <?php echo $data['current_page'] == $data['total_pages'] ? ' disabled' : '' ?>"" data-pagination-page=" <?php echo $data['current_page'] + 1 ?>">»</span>
        </div>
    <?php } ?>
</div>
