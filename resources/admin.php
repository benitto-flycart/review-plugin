<?php
defined('ABSPATH') || exit;
?>

<div class="wrap">
    <div>
        <input type="hidden" name="_wp_post_mark_nonce" id="_wp_post_mark_nonce"
            value="<?php echo esc_attr(wp_create_nonce('auth_ajax')) ?>">
    </div>
    <div id="flycart-reviews-admin-main">
        <!--        The Content will be rendered from react-->
        <div>Flycart review app showing here...</div>
    </div>
</div>
