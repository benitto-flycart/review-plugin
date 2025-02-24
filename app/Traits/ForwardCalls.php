<?php

namespace Flycart\Review\App\Traits;

defined('ABSPATH') || exit;

use BadMethodCallException;
use Error;

trait ForwardCalls
{
    /**
     * Forward a method call to the given object.
     *
     * @param mixed $object
     * @param string $method
     * @param array $parameters
     * @return mixed
     *
     * @throws \BadMethodCallException
     */
    protected function forwardCallTo($object, $method, $parameters)
    {
        try {
            return $object->{$method}(...$parameters);
        } catch (Error | BadMethodCallException $e) {
            $pattern = '~^Call to undefined method (?P<class>[^:]+)::(?P<method>[^\(]+)\(\)$~';

            if (!preg_match($pattern, $e->getMessage(), $matches)) {
                throw $e;
            }

            if (
                $matches['class'] != get_class($object) ||
                $matches['method'] != $method
            ) {
                throw $e;
            }

            static::throwBadMethodCallException($method);
        }
    }

    /**
     * Forward a method call to the given object, returning $this if the forwarded call returned itself.
     *
     * @param mixed $object
     * @param string $method
     * @param array $parameters
     * @return mixed
     *
     * @throws \BadMethodCallException
     */
    protected function forwardDecoratedCallTo($object, $method, $parameters)
    {
        $result = $this->forwardCallTo($object, $method, $parameters);

        if ($result === $object) {
            return $this;
        }

        return $result;
    }

    /**
     * Throw a bad method call exception for the given method.
     *
     * @param string $method
     * @return void
     *
     * @throws \BadMethodCallException
     */
    protected static function throwBadMethodCallException($method)
    {

        $error = sprintf('Call to undefined method %s::%s()', static::class, $method);
        // phpcs:ignore WordPress.Security.EscapeOutput.ExceptionNotEscaped
        throw new BadMethodCallException($error);
    }
}

