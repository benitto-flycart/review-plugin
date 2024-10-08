<?php

namespace Flycart\Review\Core\Emails\Settings;

class Emails
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
}
