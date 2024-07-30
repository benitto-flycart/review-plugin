<?php

namespace Flycart\Review\Package\Request\Validation;


use Flycart\Review\Package\Request\Request;

interface FormRequest
{
    public function rules(Request $request);

    public function messages();
}