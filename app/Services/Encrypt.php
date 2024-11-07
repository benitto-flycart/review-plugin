<?php

namespace Flycart\Review\App\Services;

class Encrypt
{
    private const FIRST_KEY = 'Lk5Uz3slx3BrAghS1aaW5AYgWZRV0tIX5eI0yPchFz4=';
    private const SECOND_KEY = 'EZ44mFi3TlAey1b2w4Y7lVDuqO+SRxGXsa7nctnr/JmMrA2vN6EJhrvdVZbxaQs5jpSe34X3ejFK/o9+Y5c83w==';

    public static function encrypt($data, $urlSafe = false)
    {
        $first_key = base64_decode(static::FIRST_KEY);
        $second_key = base64_decode(static::SECOND_KEY);

        $method = "aes-256-cbc";
        $iv_length = openssl_cipher_iv_length($method);
        $iv = openssl_random_pseudo_bytes($iv_length);

        $first_encrypted = openssl_encrypt($data, $method, $first_key, OPENSSL_RAW_DATA, $iv);
        $second_encrypted = hash_hmac('sha3-512', $first_encrypted, $second_key, TRUE);

        $output = base64_encode($iv . $second_encrypted . $first_encrypted);
        if($urlSafe) {
            return static::urlSafe($output);
        }

        return $output;
    }

    public static function decrypt($input)
    {
        $first_key = base64_decode(static::FIRST_KEY);
        $second_key = base64_decode(static::SECOND_KEY);
        $mix = base64_decode($input);

        $method = "aes-256-cbc";
        $iv_length = openssl_cipher_iv_length($method);

        $iv = substr($mix, 0, $iv_length);
        $second_encrypted = substr($mix, $iv_length, 64);
        $first_encrypted = substr($mix, $iv_length + 64);

        $data = openssl_decrypt($first_encrypted, $method, $first_key, OPENSSL_RAW_DATA, $iv);
        $second_encrypted_new = hash_hmac('sha3-512', $first_encrypted, $second_key, TRUE);

        if (hash_equals($second_encrypted, $second_encrypted_new)) {
            return $data;
        }

        return false;
    }

    public static function urlSafe($data)
    {
        return urlencode($data);
    }

    public static function urlUnsafe($data)
    {
        return urldecode($data);
    }
}