<?php

namespace Flycart\Review\App\Services;

defined('ABSPATH') || exit;

use Flycart\Review\Package\Request\Validation\Rules;
use Valitron\Validator;

class CustomRules extends Rules
{
    public function addCustomRules()
    {
        Validator::addRule('string_rwt', function ($field, $value, array $params, array $fields) {
            // Custom validation logic
            return preg_match('/^[_a-zA-Z0-9 -\/]+$/', $value);
        }, 'Not a valid string');

        Validator::addRule('bool_type', function ($field, $value, array $params, array $fields) {
            return true;
        }, 'Not a Bool Type');

        Validator::addRule('is_coupon_exists', function ($field, $value, $params, $fields) {
            return !WC::isCouponExists($value);
        }, 'The {field} is already taken');


        Validator::addRule('is_affiliate_email_already_exists', function ($field, $value, $params, $fields) {
            $items = Member::query()->where("email = %s", [$value])
                ->where("type = %s", ['affiliate'])->get();

            if (empty($items)) return true;

            return false;
        }, 'The {field} is already taken');

        Validator::addRule('uniqueColumn', function ($field, $value, array $params, array $fields) {

            return static::isColumnUnique($params[0], $params[1], $value, $params[2] ?? null, $params[3] ?? null);

            // $params[0] should contain the table name
            // $params[1] should contain the column name
            // Implement your logic to check uniqueness in the database
            // You might need to adapt this based on your database library

            //            $result = your_database_check_uniqueness($params[0], $params[1], $value);

        }, 'The {field} is already taken');
    }

    public static function isColumnUnique($table, $column, $value, $excludeColumnName = null, $excludeColumnId = null)
    {
        $items = (new Database($table))->where("$column = %s", [$value])
            ->when(!empty($excludeColumnName) && $excludeColumnId, function ($query) use ($column, $value, $excludeColumnId, $excludeColumnName) {
                $query->where("{$excludeColumnName} not in (%s)", [$excludeColumnId]);
            });

        $items = $items->get();

        if (empty($items)) return true;

        return false;
    }
}

