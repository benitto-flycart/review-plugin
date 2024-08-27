import React from "react";
import ListCardPreview from "./Cards/ListCardPreview";

const ListWidgetPreview = () => {

    const gridItems = [
        {
            id: 1,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
                }
            ],
            replies: [
                {
                    reviewer_name: 'Nagu',
                    reply_content: 'jojojoo jojojojojo',
                    images: [],
                }
            ],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
            }
        },
        {
            id: 2,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
                }
            ],
            replies: [
                {
                    reviewer_name: 'Nagu',
                    reply_content: 'jojojoo jojojojojo',
                    images: [],
                }
            ],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
            }
        },
        {
            id: 3,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
                }
            ],
            replies: [
                {
                    reviewer_name: 'Nagu',
                    reply_content: 'jojojoo jojojojojo',
                    images: [],
                }
            ],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
            }
        },
        {
            id: 4,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
                }
            ],
            replies: [
                {
                    reviewer_name: 'Nagu',
                    reply_content: 'jojojoo jojojojojo',
                    images: [],
                }
            ],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
            }
        },
        {
            id: 5,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
                }
            ],
            replies: [
                {
                    reviewer_name: 'Nagu',
                    reply_content: 'jojojoo jojojojojo',
                    images: [],
                }
            ],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
            }
        },
        {
            id: 6,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
                }
            ],
            replies: [
                {
                    reviewer_name: 'Nagu',
                    reply_content: 'jojojoo jojojojojo',
                    images: [],
                }
            ],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
            }
        },
        {
            id: 7,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
                }
            ],
            replies: [
                {
                    reviewer_name: 'Nagu',
                    reply_content: 'jojojoo jojojojojo',
                    images: [],
                }
            ],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
            }
        }
    ];

    return (
        <div
            className="r_pw_r_l_preview_container"
        >
            {gridItems.map((item:any, index: number) => (
                <ListCardPreview review={item} key={index}/>
            ))}
        </div>
    )
}

export default ListWidgetPreview;