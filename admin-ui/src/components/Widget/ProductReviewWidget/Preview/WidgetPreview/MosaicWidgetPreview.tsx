import React, {useLayoutEffect, useRef, useState} from "react";
import GridCardPreview from "./Cards/GridCardPreview";
import MosaicCardPreview from "./Cards/MosaicCardPreview";

const MosaicWidgetPreview = () => {

    const columnCount = 2;

    const [columns, setColumns] = useState(Array(columnCount).fill([]));
    const itemRefs = useRef<any>([]);

    const [heightCalculated, setHeightCalculated] = useState<boolean>(false);

    const items = [
        {
            id: 1,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "test content",
            images: [],
            replies: [],
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
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/m5mpj28dj.jpg',
                }
            ],
            replies: [],
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
            content: "Item 15 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu ipsuItem 6 with lots of content to create a taller item lorem   ipsuipsuItem 6 with lots of content to create a taller item lorem   ipsu ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
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
            content: "Item 15 with lots of content to create a taller item lorem ",
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
            content: "Item 15 with lots of content to create a taller item lorem  Item 15 with lots of content to create a taller item lorem Item 15 with lots of content to create a taller item lorem Item 15 with lots of content to create a taller item lorem Item 15 with lots of content to create a taller item lorem Item 15 with lots of content to create a taller item lorem Item 15 with lots of content to create a taller item lorem Item 15 with lots of content to create a taller item lorem Item 15 with lots of content to create a taller item lorem ",
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

    useLayoutEffect(() => {
        // Function to calculate the height of each item and assign it to the shortest column
        const calculateHeights = () => {
            if (heightCalculated) {
                return;
            }

            const columnHeights: any = Array(columnCount).fill(0);
            const newColumns: any = Array(columnCount).fill(0).map(() => []);

            itemRefs.current.forEach((itemRef: any, index: number) => {
                if (itemRef) {
                    const itemHeight = itemRef.clientHeight;

                    // Find the shortest column
                    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

                    // Add the item to the shortest column
                    newColumns[shortestColumnIndex].push(items[index]);

                    // Update the height of the column
                    columnHeights[shortestColumnIndex] += itemHeight;
                }
            });

            setColumns(newColumns);
            setHeightCalculated(true)
        };

        const timeout = setTimeout(calculateHeights, 1000);

        return () => clearTimeout(timeout);

    }, [items]);

    return (
        <div className="masonry-grid" style={{display: 'flex'}}>
            {columns.map((column: any, columnIndex: number) => (
                <div key={columnIndex} className="masonry-column" style={{flex: 1, margin: '0 10px'}}>
                    {column?.map((item: any, itemIndex: any) => (
                        <MosaicCardPreview review={item}/>
                    ))}
                </div>
            ))}
            <div style={{visibility: 'hidden', position: 'absolute', top: 0, left: 0}}>
                {items.map((item: any, itemIndex: number) => (
                    <div
                        key={itemIndex}
                        ref={(el: any) => (itemRefs.current[itemIndex] = el)}
                        className="masonry-item"
                    >
                        {item.content}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MosaicWidgetPreview;