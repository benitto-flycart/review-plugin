<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

class WidgetFactory
{
    public $language;
    public $type;
    public $widget;
    public $request;

    public function __construct($type, $language, $request)
    {
        $this->type = $type;
        $this->language = $language;
        $this->request = $request;
        $this->widget = $this->getWidgetObject();
    }


    public function save()
    {
        return $this->widget->save();
    }

    public function get()
    {
        return $this->widget->get();
    }


    public function getWidgetObject()
    {
        switch ($this->type) {
            case 'product_widget':
                return ProductWidget::make($this->language, $this->request);
            case 'popup_widget':
                return PopupWidget::make($this->language, $this->request);
            case 'sidebar_widget':
                return SidebarWidget::make();
            case 'floating_product_widget':
                return FloatingProductWidget::make($this->language, $this->request);
            case 'snippet_widget':
                return SnippetWidget::make($this->language, $this->request);
            case 'rating_widget':
                return RatingWidget::make($this->language, $this->request);
            default:
                throw new \Error('Unknown widget type');
        }
    }

}