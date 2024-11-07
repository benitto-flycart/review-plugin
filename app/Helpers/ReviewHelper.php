<?php

namespace Flycart\Review\App\Helpers;

class ReviewHelper
{
    public $review;

    public function __construct($review)
    {
        $this->review = $review;
    }

    public function getId()
    {
        return $this->review['id'];
    }

    public function isRatingGiven()
    {
        return $this->review['rating'] != 0;
    }

    public function getRatting()
    {
        return $this->review['rating'];
    }

    public function hasImages()
    {
        return isset($this->review['images']) && count($this->review['images']) > 0;
    }

    public function getFirstImage()
    {
        if (!$this->hasImages()) {
            return '';
        }

        $image = $this->review['images'][0];

        return $image['variants']['full'];
    }

    public function getFirstImageTitle()
    {
        if (!$this->hasImages()) {
            return '';
        }

        $image = $this->review['images'][0];

        return $image['title'];
    }

    public function getReviewerName()
    {
        return $this->review['reviewer_name'];
    }

    public function getReviewDate()
    {
        return $this->review['date'];
    }

    public function getContent()
    {
        return $this->review['content'];
    }

    public function hasReplies()
    {
        return isset($this->review['replies']) && count($this->review['replies']) > 0;
    }

    public function getReplies()
    {
        $replyObjects = [];

        foreach ($this->review['replies'] as $reply) {
            $replyObjects[] = new static($reply);
        }

        return $replyObjects;
    }

    public function isProductSet()
    {
        return isset($this->review['product']) && count($this->review['product']);
    }

    public function getProductImage()
    {
        return $this->review['product']['product_image'];
    }

    public function getProductName()
    {
        return $this->review['product']['name'];
    }

    public function getReviewImages()
    {
        return $this->review['images'];
    }

    public function getImagesCount()
    {
        return count($this->review['images']);
    }
}