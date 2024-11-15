<?php
defined('ABSPATH') || exit;
?>

<div class="r_pw_h_container">

    <?php
    if ($header == 'compact') {
        include 'compact-header.php';
    } else if ($header == 'minimal') {
        include 'minimal-header.php';
    } else if ($header == 'expanded') {
        include 'expand-header.php';
    }
    ?>
</div>
