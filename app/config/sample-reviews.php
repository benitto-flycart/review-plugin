<?php

$items = [
    [
        'id' => 1,
        'reviewer_name' => 'benitto',
        'review_title' => 'Great Product',
        'is_verified' => false,
        'date' => "31/03/2024",
        'rating' => 5,
        "content" => "This product totally exceeded my expectations! The quality is off the charts and it's made my life so much easier. Seriously, I'm shouting from the rooftops!",
        "images" => [],
        "replies" => [],
        "product" => [
            "product_name" => 'Sample Product',
            'src' => '',
        ],
    ],
    [
        'id' => 2,
        'reviewer_name' => 'john',
        'review_title' => 'Amazing Quality',
        'rating' => 4,
        'is_verified' => true,
        'date' => "01/04/2024",
        'content' => "Yo, best decision ever! This product is a game-changer. It's reliable, efficient, and has made my life so much easier. I'm telling everyone I know to grab one ASAP.",
        'images' => [
            [
                'id' => 1,
                'src' => 'https://unsplash.it/500/987'
            ]
        ],
        'replies' => [],
        'product' => [
            'product_name' => 'Sample Product',
            'src' => 'https://unsplash.it/500/987'
        ],
    ],
    [
        'id' => 3,
        'reviewer_name' => 'alice',
        'review_title' => 'Worth the money',
        'rating' => 5,
        'is_verified' => true,
        'date' => "02/04/2024",
        'content' => "Alright, brace yourself because this product is a total game-changer! The design is slick, and it works like magic. It's a must-have for real, telling all my crew about this gem.",
        'images' => [],
        'replies' => [
            [
                'reviewer_name' => 'Mike',
                'reply_content' => "Thank you so much for your amazing review! We're thrilled to hear that our product exceeded your expectations and made your life easier ⭐",
                'images' => [],
            ],
        ],
        'product' => [
            'product_name' => 'Sample Product',
            'src' => 'https://unsplash.it/500/987'
        ]
    ],
    [
        'id' => 4,
        'reviewer_name' => 'mike',
        'review_title' => 'Awesome Experience',
        'rating' => 2,
        'is_verified' => false,
        'date' => "03/04/2024",
        'content' => "I'm low-key in love with this thing! Feels like it was made just for me. The features are dope, and I can't imagine my day without it now. It's the bomb, no doubt.",
        'images' => [
            [
                'id' => 1,
                'src' => 'https://unsplash.it/500/987'
            ]
        ],
        'replies' => [
            [
                'reviewer_name' => 'Nagu',
                'reply_content' => 'We appreciate your feedback! We’re glad you love it.',
                'images' => [],
            ]
        ],
        'product' => [
            'product_name' => 'Sample Product',
            'src' => 'https://unsplash.it/500/987'
        ]
    ],
    [
        'id' => 5,
        'reviewer_name' => 'alex',
        'review_title' => 'Best Purchase Ever',
        'rating' => 3,
        'is_verified' => true,
        'date' => "05/04/2024",
        'content' => "This product is incredible! It works flawlessly, and I couldn't be happier. It has made my daily tasks so much easier!",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Amazing Gadget',
            'src' => 'https://unsplash.it/500/500'
        ]
    ],
    [
        'id' => 6,
        'reviewer_name' => 'susan',
        'review_title' => 'Exceeded Expectations',
        'rating' => 4,
        'is_verified' => false,
        'date' => "06/04/2024",
        'content' => "Wow, just wow! I didn't expect this to be so good. It definitely surpassed all my expectations, and I'm thrilled!",
        'images' => [
            [
                'id' => 2,
                'src' => 'https://unsplash.it/500/600'
            ]
        ],
        'replies' => [],
        'product' => [
            'product_name' => 'Super Gadget',
            'src' => 'https://unsplash.it/500/600'
        ]
    ],
    [
        'id' => 7,
        'reviewer_name' => 'michael',
        'review_title' => 'Very Satisfied',
        'rating' => 3,
        'is_verified' => true,
        'date' => "07/04/2024",
        'content' => "I'm very satisfied with this purchase. It's reliable and exactly as described. Definitely worth every penny!",
        'images' => [],
        'replies' => [
            [
                'reviewer_name' => 'Support',
                'reply_content' => "Thank you for your feedback! We're happy to hear that you're satisfied with the product.",
                'images' => [],
            ]
        ],
        'product' => [
            'product_name' => 'Reliable Product',
            'src' => 'https://unsplash.it/500/700'
        ]
    ],
    [
        'id' => 8,
        'reviewer_name' => 'olivia',
        'review_title' => 'Not Bad',
        'rating' => 4,
        'is_verified' => false,
        'date' => "08/04/2024",
        'content' => "The product is okay, but I think there’s room for improvement. It does the job, but it could be better.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Decent Product',
            'src' => 'https://unsplash.it/500/800'
        ]
    ],
    [
        'id' => 9,
        'reviewer_name' => 'daniel',
        'review_title' => 'Worth the Hype',
        'is_verified' => true,
        'rating' => 5,
        'date' => "09/04/2024",
        'content' => "Everyone was talking about this, and now I see why! It's definitely worth the hype. Great quality and performance!",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Hyped Product',
            'src' => 'https://unsplash.it/500/900'
        ]
    ],
    [
        'id' => 10,
        'reviewer_name' => 'sarah',
        'review_title' => 'Could Be Better',
        'is_verified' => false,
        'rating' => 3,
        'date' => "10/04/2024",
        'content' => "It’s a good product, but I expected more. The performance is decent, but it lacks certain features I was looking for.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Okay Product',
            'src' => 'https://unsplash.it/500/1000'
        ]
    ],
    [
        'id' => 11,
        'reviewer_name' => 'chris',
        'review_title' => 'Highly Recommend',
        'rating' => 3,
        'is_verified' => true,
        'date' => "11/04/2024",
        'content' => "This is a fantastic product! I've recommended it to all my friends, and they love it too. Will definitely buy again.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Fantastic Product',
            'src' => 'https://unsplash.it/500/1100'
        ]
    ],
    [
        'id' => 12,
        'reviewer_name' => 'emma',
        'review_title' => 'Solid Product',
        'rating' => 2,
        'is_verified' => true,
        'date' => "12/04/2024",
        'content' => "This product is solid and well-built. It functions perfectly and feels like it will last for a long time. I'm very impressed.",
        'images' => [],
        'replies' => [
            [
                'reviewer_name' => 'Support',
                'reply_content' => "Thank you for the kind words! We're glad you're impressed with the quality.",
                'images' => [],
            ]
        ],
        'product' => [
            'product_name' => 'Solid Build',
            'src' => 'https://unsplash.it/500/1200'
        ]
    ],
    [
        'id' => 13,
        'reviewer_name' => 'jack',
        'review_title' => 'Totally Worth It',
        'is_verified' => true,
        'rating' => 4,
        'date' => "13/04/2024",
        'content' => "Absolutely worth every penny! It has exceeded my expectations, and I'm more than happy with this purchase.",
        'images' => [
            [
                'id' => 3,
                'src' => 'https://unsplash.it/500/1300'
            ]
        ],
        'replies' => [],
        'product' => [
            'product_name' => 'Worth Every Penny',
            'src' => 'https://unsplash.it/500/1300'
        ]
    ],
    [
        'id' => 14,
        'reviewer_name' => 'sophia',
        'review_title' => 'Amazing Value',
        'is_verified' => false,
        'rating' => 4,
        'date' => "14/04/2024",
        'content' => "For the price, this product offers amazing value. It performs well and looks great. I'm really satisfied with it.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Great Value',
            'src' => 'https://unsplash.it/500/1400'
        ]
    ],
    [
        'id' => 15,
        'reviewer_name' => 'lily',
        'review_title' => 'Impressive Design',
        'rating' => 2,
        'is_verified' => true,
        'date' => "15/04/2024",
        'content' => "The design of this product is very impressive. It looks stylish and modern while functioning exceptionally well.",
        'images' => [
            [
                'id' => 4,
                'src' => 'https://unsplash.it/500/1500'
            ]
        ],
        'replies' => [],
        'product' => [
            'product_name' => 'Stylish Product',
            'src' => 'https://unsplash.it/500/1500'
        ]
    ],
    [
        'id' => 16,
        'reviewer_name' => 'ethan',
        'review_title' => 'Perfect for Everyday Use',
        'rating' => 3,
        'is_verified' => true,
        'date' => "16/04/2024",
        'content' => "This product is perfect for everyday use. It’s durable, reliable, and does exactly what it promises. Highly recommended!",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Daily Essential',
            'src' => 'https://unsplash.it/500/1600'
        ]
    ],
    [
        'id' => 17,
        'reviewer_name' => 'mia',
        'review_title' => 'Exceeded My Expectations',
        'rating' => 5,
        'is_verified' => false,
        'date' => "17/04/2024",
        'content' => "I didn’t expect much, but this product really exceeded my expectations. It works great and is built to last.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Unexpected Gem',
            'src' => 'https://unsplash.it/500/1700'
        ]
    ],
    [
        'id' => 18,
        'reviewer_name' => 'noah',
        'review_title' => 'Decent but Could Improve',
        'rating' => 2,
        'is_verified' => true,
        'date' => "18/04/2024",
        'content' => "It’s a decent product overall, but there’s room for improvement. It works fine, but I expected a bit more.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Decent Quality',
            'src' => 'https://unsplash.it/500/1800'
        ]
    ],
    [
        'id' => 19,
        'reviewer_name' => 'amelia',
        'review_title' => 'Incredible Product!',
        'rating' => 4,
        'is_verified' => true,
        'date' => "19/04/2024",
        'content' => "This product is just incredible! It’s reliable, and I use it every day without any issues. Definitely worth buying!",
        'images' => [
            [
                'id' => 5,
                'src' => 'https://unsplash.it/500/1900'
            ]
        ],
        'replies' => [],
        'product' => [
            'product_name' => 'Incredible Device',
            'src' => 'https://unsplash.it/500/1900'
        ]
    ],
    [
        'id' => 20,
        'reviewer_name' => 'lucas',
        'review_title' => 'Great Value for Money',
        'rating' => 5,
        'is_verified' => true,
        'date' => "20/04/2024",
        'content' => "For the price, this product offers fantastic value. It performs well, looks good, and has a lot of great features.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Value Product',
            'src' => 'https://unsplash.it/500/2000'
        ]
    ],
    [
        'id' => 21,
        'reviewer_name' => 'zoe',
        'review_title' => 'Absolutely Love It',
        'rating' => 3,
        'is_verified' => false,
        'date' => "21/04/2024",
        'content' => "I absolutely love this product! It’s so easy to use and has made my life so much simpler. I can’t imagine not having it.",
        'images' => [
            [
                'id' => 6,
                'src' => 'https://unsplash.it/500/2100'
            ]
        ],
        'replies' => [],
        'product' => [
            'product_name' => 'Simple and Effective',
            'src' => 'https://unsplash.it/500/2100'
        ]
    ],
    [
        'id' => 22,
        'reviewer_name' => 'jackson',
        'review_title' => 'Good Overall',
        'rating' => 4,
        'is_verified' => true,
        'date' => "22/04/2024",
        'content' => "Overall, I’m satisfied with this product. It works as advertised, and I haven’t encountered any issues so far.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Satisfied User',
            'src' => 'https://unsplash.it/500/2200'
        ]
    ],
    [
        'id' => 23,
        'reviewer_name' => 'charlotte',
        'review_title' => 'Looks and Works Great',
        'rating' => 5,
        'is_verified' => false,
        'date' => "23/04/2024",
        'content' => "Not only does this product work great, but it also looks fantastic. It’s sleek and modern, exactly what I was looking for.",
        'images' => [],
        'replies' => [
            [
                'reviewer_name' => 'Support',
                'reply_content' => "Thanks for the feedback! We’re glad you’re enjoying both the design and functionality.",
                'images' => [],
            ]
        ],
        'product' => [
            'product_name' => 'Sleek Gadget',
            'src' => 'https://unsplash.it/500/2300'
        ]
    ],
    [
        'id' => 24,
        'reviewer_name' => 'harper',
        'review_title' => 'Good, But Expensive',
        'rating' => 2,
        'is_verified' => true,
        'date' => "24/04/2024",
        'content' => "The product works well, but it’s a bit expensive for what it offers. Still, the quality is undeniable.",
        'images' => [
            [
                'id' => 7,
                'src' => 'https://unsplash.it/500/2400'
            ]
        ],
        'replies' => [],
        'product' => [
            'product_name' => 'Premium Product',
            'src' => 'https://unsplash.it/500/2400'
        ]
    ],
    [
        'id' => 25,
        'reviewer_name' => 'james',
        'review_title' => 'Worth Every Penny',
        'rating' => 3,
        'is_verified' => false,
        'date' => "25/04/2024",
        'content' => "This product is worth every penny! It has surpassed my expectations and continues to perform wonderfully.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Great Investment',
            'src' => 'https://unsplash.it/500/2500'
        ]
    ],
    [
        'id' => 26,
        'reviewer_name' => 'sophia',
        'review_title' => 'It’s Okay, But Not Great',
        'rating' => 2,
        'is_verified' => true,
        'date' => "26/04/2024",
        'content' => "The product works, but it’s nothing special. It gets the job done, but I expected more based on the price.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Basic Item',
            'src' => 'https://unsplash.it/500/2600'
        ]
    ],
    [
        'id' => 27,
        'reviewer_name' => 'liam',
        'review_title' => 'Does What It Says, No More',
        'rating' => 2,
        'is_verified' => false,
        'date' => "27/04/2024",
        'content' => "It’s an average product. Does exactly what it says, but there’s nothing extraordinary about it. Pretty standard.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Standard Product',
            'src' => 'https://unsplash.it/500/2700'
        ]
    ],
    [
        'id' => 28,
        'reviewer_name' => 'oliver',
        'review_title' => 'Decent, But Overpriced',
        'rating' => 2,
        'is_verified' => true,
        'date' => "28/04/2024",
        'content' => "The product is decent, but it feels overpriced for what it offers. It works fine, but there are better options for the price.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Overpriced Gadget',
            'src' => 'https://unsplash.it/500/2800'
        ]
    ],
    [
        'id' => 29,
        'reviewer_name' => 'ava',
        'review_title' => 'Average Performance',
        'rating' => 2,
        'is_verified' => false,
        'date' => "29/04/2024",
        'content' => "It’s just average. The performance is neither impressive nor disappointing, but I wouldn’t rush to buy it again.",
        'images' => [],
        'replies' => [
            [
                'reviewer_name' => 'Support',
                'reply_content' => "Thanks for your feedback! We’ll consider your comments for future improvements.",
                'images' => [],
            ]
        ],
        'product' => [
            'product_name' => 'Average Performer',
            'src' => 'https://unsplash.it/500/2900'
        ]
    ],
    [
        'id' => 30,
        'reviewer_name' => 'elijah',
        'review_title' => 'It’s Okay, But Could Be Better',
        'rating' => 2,
        'is_verified' => true,
        'date' => "30/04/2024",
        'content' => "The product is okay, but it could definitely be improved. It works, but it feels like something is missing.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Room for Improvement',
            'src' => 'https://unsplash.it/500/3000'
        ]
    ],


    [
        'id' => 31,
        'reviewer_name' => 'grace',
        'review_title' => 'Very Disappointing',
        'rating' => 1,
        'is_verified' => false,
        'date' => "01/05/2024",
        'content' => "I’m really disappointed with this product. It didn’t work as advertised and was a total waste of money.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Faulty Product',
            'src' => 'https://unsplash.it/500/3100'
        ]
    ],
    [
        'id' => 32,
        'reviewer_name' => 'logan',
        'review_title' => 'Not Worth It',
        'rating' => 1,
        'is_verified' => true,
        'date' => "02/05/2024",
        'content' => "This product is not worth the price at all. It broke within a week, and the quality is terrible. Very disappointed.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Poor Build Quality',
            'src' => 'https://unsplash.it/500/3200'
        ]
    ],
    [
        'id' => 33,
        'reviewer_name' => 'henry',
        'review_title' => 'Terrible Experience',
        'rating' => 1,
        'is_verified' => false,
        'date' => "03/05/2024",
        'content' => "I had a terrible experience with this product. It doesn’t work properly, and customer support was no help either.",
        'images' => [],
        'replies' => [
            [
                'reviewer_name' => 'Support',
                'reply_content' => "We’re sorry to hear about your experience. Please contact us, and we’ll try to make things right.",
                'images' => [],
            ]
        ],
        'product' => [
            'product_name' => 'Bad Experience',
            'src' => 'https://unsplash.it/500/3300'
        ]
    ],
    [
        'id' => 34,
        'reviewer_name' => 'ella',
        'review_title' => 'Completely Useless',
        'rating' => 1,
        'is_verified' => true,
        'date' => "04/05/2024",
        'content' => "This product is completely useless. It doesn’t do anything it promises, and I regret buying it.",
        'images' => [
            [
                'id' => 8,
                'src' => 'https://unsplash.it/500/3400'
            ]
        ],
        'replies' => [],
        'product' => [
            'product_name' => 'Useless Item',
            'src' => 'https://unsplash.it/500/3400'
        ]
    ],
    [
        'id' => 35,
        'reviewer_name' => 'mason',
        'review_title' => 'Waste of Money',
        'rating' => 1,
        'is_verified' => true,
        'date' => "05/05/2024",
        'content' => "Total waste of money. The product stopped working after a few uses, and now I can’t even get a refund.",
        'images' => [],
        'replies' => [],
        'product' => [
            'product_name' => 'Refund Request',
            'src' => 'https://unsplash.it/500/3500'
        ]
    ]
];

return $items;