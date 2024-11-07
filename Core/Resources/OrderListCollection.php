<?php

namespace Flycart\Review\Core\Resources;

use Flycart\Review\App\Collection;

class OrderListCollection extends Collection
{
    public function toArray($items, $totalCount, $perPage, $currentPage)
    {

        return [
            'orders' => $items,
            "total" => $totalCount,
            "per_page" => $perPage,
            "total_pages" => ceil($totalCount / $perPage),
            "current_page" => $currentPage,
        ];
    }
}
