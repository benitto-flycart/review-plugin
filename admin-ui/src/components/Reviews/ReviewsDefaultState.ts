import { TReviewData } from "./ReviewsType.type";

export const reviewDefaultState: TReviewData = {
  total: 0,
  per_page: 10,
  total_pages: 0,
  current_page: 1,
  ratings: {
    single_star: 0,
    two_star: 0,
    three_star: 0,
    four_star: 0,
    five_star: 0,
    others: 0,
  },
  total_review_count: 0,
  total_review_average: 0,
  reviews: [],
};
