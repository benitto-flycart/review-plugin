<?php
namespace Flycart\Review\App;

use Cartrabbit\Request\Response;

abstract class Resource
{
    public static function resource(array $params)
    {
        $response = (new static)->toArray(...$params);

       return Response::success($response);
    }
}