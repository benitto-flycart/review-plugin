<style>
    #r_sw_widget_container_wrapper {
        margin: 1rem 0;
    }
</style>
<div id="r_sw_widget_container_wrapper">
    <!--    <template id="r_rpw_shadow_template">-->
    <template id="r_sw_widget_container">
        <link rel="stylesheet"
              href="<?php echo $snippet_widget_css ?>">
        <link rel="stylesheet"
              href="<?php echo $snippet_widget_font_css ?>">
        <div id="r_sw_container_wrapper" class="r_sw_container_wrapper">
            <div class="r_sw__carousel">
                <div class="r_sw__carousel-item r_sw__carousel-item-visible"
                     style="margin: 0px auto 0px 0px; background-color: rgb(254, 225, 241); border-color: rgb(75, 11, 11); box-shadow: rgb(231, 6, 128) 0px 6px 14px; border-radius: 16px;">
                    <img class="r_sw__carousel-item_imgae"
                         src="https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg" alt="Alternative Text"
                         width="50px">
                    <div class="r_sw__review_details_wrapper">
                        <div class="r_sw__review_details">
                            <div style="color: rgb(109, 3, 61); font-size: 16px;">Benitto</div>

                            <div class="r_sw__review_details_icons"
                                 style="color: rgb(231, 6, 128); font-size: 16px;">
                                <?php foreach (range(0, 4) as $index) { ?>
                                    <i class="review review-<?php echo $index < $review['rating'] ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                                <?php } ?>
                            </div>
                        </div>
                        <div class="r_sw__review_text " style="color: rgb(109, 3, 61); font-size: 16px;">Item 15
                            with
                            lots of content to create a taller item lorem ipsu Item 6 with lots of content to create
                            a
                            taller item lorem ipsu Item 6 with lots of content to create a taller item lorem
                            ipsuItem 6
                            with lots of content to create a taller item lorem ipsuItem 6 with lots of content to
                            create
                            a taller item lorem ipsuItem 6 with lots of content to create a taller item lorem ipsu
                        </div>
                    </div>
                </div>
                <div class="r_sw__carousel-item r_sw__carousel-item-visible"
                     style="margin: 0px auto 0px 0px; background-color: rgb(254, 225, 241); border-color: rgb(75, 11, 11); box-shadow: rgb(231, 6, 128) 0px 6px 14px; border-radius: 16px;">
                    <?php if (false) : ?>
                        <img class="r_sw__carousel-item_imgae"
                             src="https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg" alt="Alternative Text"
                             width="50px">
                    <?php endif ?>
                    <div class="r_sw__review_details_wrapper">
                        <div class="r_sw__review_details">
                            <div style="color: rgb(109, 3, 61); font-size: 16px;">Mccullum</div>
                            <div class="r_sw__review_details_icons"
                                 style="color: rgb(231, 6, 128); font-size: 16px;">
                                <?php foreach (range(0, 4) as $index) { ?>
                                    <i class="review review-<?php echo $index < $review['rating'] ? $data['ratings']['rating_icon'] : $data['ratings']['rating_outline_icon']; ?>"></i>
                                <?php } ?>
                            </div>
                        </div>
                        <div class="r_sw__review_text " style="color: rgb(109, 3, 61); font-size: 16px;">Item 15
                            with
                            lots of content to create a taller item lorem ipsu Item 6 with lots of content to create
                            a
                            taller item lorem ipsu Item 6 with lots of content to create a taller item lorem
                            ipsuItem 6
                            with lots of content to create a taller item lorem ipsuItem 6 with lots of content to
                            create
                            a taller item lorem ipsuItem 6 with lots of content to create a taller item lorem ipsu
                        </div>
                    </div>
                </div>
            </div>
            <div class="r_sw__carousel-actions">
                <button class="r_sw__carousel-button-prev"
                        style="background-color: rgb(254, 225, 241); color: rgb(109, 3, 61); border-radius: 50%;">
                    <i class="review review-caret-left"></i>
                </button>
                <button class="r_sw__carousel-button-next"
                        style="background-color: rgb(254, 225, 241); color: rgb(109, 3, 61); border-radius: 50%;">
                    <i class="review review-caret-right"></i>
                </button>
            </div>
        </div>
    </template>
    <!--    </template>-->
</div>

