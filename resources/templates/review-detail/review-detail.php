<?php
defined('ABSPATH') || exit;
?>

<style>
    #r_rdw_review_detail_dialog {
        width: 100%;
        max-width: 500px;
        background-color: ghostwhite;
        overflow-x: hidden;
        margin: auto;
        border: none;
        outline: none;
        box-sizing: border-box;
        border-radius: 20px;
        padding: 0;
    }
</style>
<dialog id="r_rdw_review_detail_dialog">
    <div id="r_rdw_dialog_content">

    </div>
</dialog>

<template id="r_rdw_shadow_template">
    <link rel="stylesheet"
        href="<?php echo $review_detail_css ?>">
    <link rel="stylesheet"
        href="<?php echo $font_css ?>">
    <div id="r_rdw_shadow_root_content">

    </div>
</template>
