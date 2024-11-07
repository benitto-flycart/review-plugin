<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\Widget as WidgetModel;

class PopupWidget extends Widget implements WidgetInterface
{
    public function getWidgetType(): string
    {
        return WidgetModel::POPUP_WIDGET;
    }

    public function getRequestFromSettings(): array
    {
        return [
            'corner_radius' => $this->request->get('corner_radius'),
            'position' => $this->request->get('position'),
            'minimum_rating' => $this->request->get('minimum_rating'),
            'initial_delay' => $this->request->get('initial_delay'),
            'delay_between_popup' => $this->request->get('delay_between_popup'),
            'popup_display_time' => $this->request->get('popup_display_time'),
            'show_product_thumbnail' => Functions::getBoolValue(
                $this->request->get('show_product_thumbnail')
            ),
            'hide_on_mobile' => Functions::getBoolValue($this->request->get('hide_on_mobile')),
            'auto_play_video' => Functions::getBoolValue($this->request->get('auto_play_video')),
            'show_on_shop_page' => Functions::getBoolValue($this->request->get('show_on_shop_page')),
            'show_on_cart_page' => Functions::getBoolValue($this->request->get('show_on_cart_page')),
            'show_on_product_page' => Functions::getBoolValue($this->request->get('show_on_product_page')),
            'colors' => $this->request->get('colors'),
        ];
    }

    public function getSettings($settings)
    {
        $colors = $settings['colors'] ?? [];

        return [
            'corner_radius' => $settings['corner_radius'] ?? 'sharp',
            'position' => $settings['position'] ?? 'top_right',
            'minimum_rating' => $settings['minimum_rating'] ?? '3_stars',
            'initial_delay' => $settings['initial_delay'] ?? "1",
            'delay_between_popup' => $settings['delay_between_popup'] ?? "1",
            'popup_display_time' => $settings['popup_display_time'] ?? "1",
            'show_product_thumbnail' => $settings['show_product_thumbnail'] ?? false,
            'hide_on_mobile' => Functions::getBoolValue($settings['hide_on_mobile'] ?? false),
            'auto_play_video' => Functions::getBoolValue($settings['auto_play_video'] ?? false),
            'show_on_shop_page' => Functions::getBoolValue($settings['show_on_shop_page'] ?? false),
            'show_on_cart_page' => Functions::getBoolValue($settings['show_on_cart_page'] ?? false),
            'show_on_product_page' => Functions::getBoolValue($settings['show_on_product_page'] ?? false),

            'colors' => [
                'review' => [
                    'text_color' => $colors['review']['text_color'] ?? '#E70680',
                    'bg_color' => $colors['review']['bg_color'] ?? '#FED2EA',
                ],
                'product' => [
                    'text_color' => $colors['product']['text_color'] ?? '#6D033D',
                ],
                'close_icon' => [
                    'text_color' => $colors['close_icon']['text_color'] ?? '#E70680',
                    'bg_color' => $colors['close_icon']['bg_color'] ?? '#FED2EA',
                ]
            ]
        ];
    }

    public function getPosition()
    {
        return $this->settings['position'];
    }

    public function getDisplayTime()
    {
        return $this->settings['popup_display_time'] * 1000;
    }

    public function getDelayBetween()
    {
        return $this->settings['delay_between_popup'] * 1000;
    }

    public function getInitialDelay()
    {
        return $this->settings['initial_delay'] * 1000;
    }

    public function showProductThumbnail()
    {
        return Functions::getBoolValue($this->settings['show_product_thumbnail']);
    }

    public function showOnCartPage()
    {
        return Functions::getBoolValue($this->settings['show_on_cart_page']);
    }

    public function showOnShopPage()
    {
        return Functions::getBoolValue(($this->settings['show_on_shop_page'] ?? false));
    }

    public function showOnProductPage()
    {
        return Functions::getBoolValue($this->settings['show_on_product_page']);
    }

    public function hideOnMobile()
    {
        return Functions::getBoolValue($this->settings['hide_on_mobile']);
    }
    /**
     * @return string
     */
    public function getWidgetStyles(): string
    {
        $vars = [
            "--r-puw-text-color" => $this->settings['colors']['review']['text_color'],
            "--r-puw-bg-color" => $this->settings['colors']['review']['bg_color'],
            "--r-puw-product-text-color" => $this->settings['colors']['product']['text_color'],
            "--r-puw-close-icon-color" => $this->settings['colors']['close_icon']['text_color'],
            "--r-puw-close-icon-bg-color" => $this->settings['colors']['close_icon']['bg_color'],
        ];

        $style = '';

        foreach ($vars as $var => $value) {
            $style .= "$var:$value;";
        }

        return $style;
    }
    /**
     * Corner Radius
     *
     * Get Corner Radisu css class
     *
     * @return string
     */
    public function getCornerRadiusClass()
    {
        switch ($this->settings['corner_radius']) {
            case 'sharp':
                return 'r_puw-sharp';
            case 'slightly_rounded':
                return 'r_puw-popup_slightly_rounded';
            case 'rounded':
                return 'r_puw-popup_rounded';
            case 'extra_rounded':
                return 'r_puw-popup_extra_rounded';
            case 'none':
                return 'r_puw-popup_none';
        }
    }
}
