<?php

defined('ABSPATH') || exit;
return [
    //settings goes here.
    'brand_settings' => [
        'logo' => '',
        'corner_radius' => 'rounded',
        'enable_email_banner' => false,
        'banner' => '',
        'rating_icon_symbol' => 'star',
        'rating_icon_bg_color' => '#5e1135',
        'appearance' => 'default',
        'appearance_options' => [
            'email_bg_color' => '#00000',
            'content_bg_color' => '#00000',
            'email_text_color' => '#00000',
            'button_bg_color' => '#00000',
            'button_border_color' => '#00000',
            'button_title_color' => '#00000',
            'font_type' => 'arial',
            'font_size' => '16',
        ],
    ],

    'floating_review_widget_settings' => [
        'is_active' => true,
        'title' => 'Reviews',
        'title_bg_color' => '#adb4ba',
        'title_text_color' => '#adb4ba',
        'product_thumbnail_enabled' => true,
        'link_to_product_page_enabled' => false
    ],
    'sidebar_review_widget_settings' => [
        'is_active' => true,
        'position' => 'left',
        'orientation' => 'top_to_bottom',
        'button_text' => 'Reviews',
        'button_bg_color' => '#adb4ba',
        'button_text_color' => '#adb4ba',
        'hide_on_mobile' => false,
        'show_in_home_page' => true,
        'show_in_product_page' => true,
        'show_in_cart_page' => false
    ]
];

