<?php
namespace Flycart\Review\Core\Resources;

use Flycart\Review\App\Collection;

class OrderListCollection extends Collection
{
    public function toArray($items)
    {
        $data = [];
        foreach ($items as $item) {
            $data[] = [
                'order_id' => $item->order_id,
                "email_status" => $item->email_status,
                "order_item_count" => $item->order_item_count,
                "review_count" => $item->review_count,
                "date_created_gmt" => $item->date_created_gmt,
                "date_updated_gmt" => $item->date_updated_gmt
            ];
        }

        return [
            'orders' => $data
        ];

    }
}