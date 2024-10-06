// Type for individual product details in a review
type Product = {
  id: number;
  name: string;
  product_url: string;
  product_image: string;
};

// Type for individual review
type Review = {
  id: string;
  reviewer_name: string;
  rating: string | null;
  is_verified: string; // "1" or "0" indicating verification status
  date: string; // Date in "YYYY-MM-DD" format
  content: string;
  is_approved: boolean;
  images: string[]; // Array of image URLs (empty if no images)
  from_order: string | null;
  replies: any[]; // Assuming replies structure is not defined in the data
  product: Product;
};

// Type for rating breakdown
type Ratings = {
  single_star: number;
  two_star: number;
  three_star: number;
  four_star: number;
  five_star: number;
  others: number;
};

// Main data structure
export type TReviewData = {
  total: number; // Total number of ratings
  per_page: number; // Items per page
  total_pages: number; // Total number of pages
  current_page: number; // Current page number
  ratings: Ratings; // Rating breakdown
  total_review_count: number; // Total number of reviews
  total_review_average: number; // Average rating
  reviews: Review[]; // Array of reviews
};
