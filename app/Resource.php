<?php

namespace Flycart\Review\App;


use Flycart\Review\Package\Request\Response;

abstract class Resource
{
    public static function resource(array $params, array $additional = [])
    {
        $response = (new static)->toArray(...$params);

        return Response::success(array_merge($response, $additional));
    }
}

