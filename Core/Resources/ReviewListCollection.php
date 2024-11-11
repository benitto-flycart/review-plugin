<?php

namespace Flycart\Review\Core\Resources;

use Flycart\Review\App\Collection;

class ReviewListCollection extends Collection
{
    public function toArray($review_overview, $items, $totalCount, $perPage, $currentPage)
    {

        $data = [];
        foreach ($items as $item) {
            $data[] = $item;
        }

        return [
            "total" => $totalCount,
            "per_page" => $perPage,
            "total_pages" => $totalCount ? ceil($totalCount / $perPage) : 0,
            "current_page" => $currentPage,
            'ratings' => $review_overview['ratings'],
            'total_review_count' => $review_overview['total_count'],
            'total_review_average' => $review_overview['total_average'],
            'reviews' => $data
        ];
    }
}
