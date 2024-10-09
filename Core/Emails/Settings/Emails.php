<?php

namespace Flycart\Review\Core\Emails\Settings;

abstract class Emails
{
    public $status;
    public $locale;

    public function getStatus()
    {
        return $this->status;
    }

    public function getLocale()
    {
        return $this->locale;
    }

    public static function make($language)
    {
        return new static($language);
    }


    abstract public function getTemplatePreview();
}
