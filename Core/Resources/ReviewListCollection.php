<?php

namespace Flycart\Review\Core\Resources;

use Flycart\Review\App\Collection;

class ReviewListCollection extends Collection
{
    public function toArray($review_overview, $items, $totalCount, $perPage, $currentPage)
    {

        error_log('logging total count per page current page');
        error_log(print_r([$totalCount, $perPage, $currentPage], true));

        $data = [];
        foreach ($items as $item) {
            $data[] = $item;
        }

        return [
            "total" => $totalCount,
            "per_page" => $perPage,
            "total_pages" => ceil($totalCount / $perPage),
            "current_page" => $currentPage,
            'ratings' => $review_overview['ratings'],
            'total_review_count' => $review_overview['total_count'],
            'total_review_average' => $review_overview['total_average'],
            'reviews' => $data
        ];
    }
}
