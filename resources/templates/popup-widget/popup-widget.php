<style>
    #r_rpw_popup_widget_container_wrapper {
        position: fixed;
        z-index: 99999;
    }

    .r_outer-puw-bottom_left {
        transition: bottom 0.5s ease, left 0.5s ease;
        bottom: 1rem;
        left: 1rem;
    }

    .r_outer-puw-bottom_right {
        transition: bottom 0.5s ease, right 0.5s ease;
        bottom: 1rem;
        right: 1rem;
    }

    .r_outer-puw-top_right {
        transition: top 0.5s ease, right 0.5s ease;
        top: 1rem;
        right: 1rem;
    }

    .r_outer-puw-top_left {
        transition: top 0.5s ease, left 0.5s ease;
        top: 1rem;
        left: 1rem;
    }
</style>

<div id="r_rpw_popup_widget_container_wrapper" class="">
    <template id="r_rpw_popup_widget_container">
        <link rel="stylesheet"
              href="<?php echo $popup_widget_css ?>">
        <link rel="stylesheet"
              href="<?php echo $popup_widget_font_css ?>">
        <div id="r_puw_container_wrapper">
        </div>
    </template>
</div>
<div class="r_f_toast_container">
    <div class="r_f_toast_title"></div>
</div>

