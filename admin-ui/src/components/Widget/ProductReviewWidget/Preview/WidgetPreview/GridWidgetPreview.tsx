import React, {useLayoutEffect, useRef, useState} from "react";
import GridCardPreview from "./Cards/GridCardPreview";

const GridWidgetPreview: () => React.JSX.Element = () => {

    const columnCount = 4;

    const [columns, setColumns] = useState<any>(Array(columnCount).fill([]));
    const [heightCalculated, setHeightCalculated] = useState<boolean>(false);
    const itemRefs = useRef<any>([]);


    const items: any = [
        {
            id: 1,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "This product totally exceeded my expectations! The quality is off the charts and it's made my life so much easier. Seriously, I'm shouting from the ro...",
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
            content: "Yo, best decision ever! This product is a game-changer. It's reliable, efficient, and has made my life so much easier. I'm telling everyone I know to grab one ASAP.",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/10kEcxhZV.jpg',
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
                }
            ],
            replies: [],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
            }
        },
        {
            id: 3,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "Alright, brace yourself because this product is a total game-changer! The design is slick, and it works like magic. It's a must-have for real, telling all my crew about this gem",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
                }
            ],
            replies: [
                {
                    reviewer_name: 'Nagu',
                    reply_content: "Thank you so much for your amazing review! We're thrilled to hear that our product exceeded your expectations and made your life easier ⭐",
                    images: [],
                }
            ],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/3/31/cbq7gq0YbL.jpg',
            }
        },
        {
            id: 4,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "I'm low-key in love with this thing! Feels like it was made just for me. The features are dope, and I can't imagine my day without it now. It's the bomb, no doubt.",
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
            content: "Lifesaver alert! This product's quality is off the charts. The results speak for themselves, seriously. I've even bought one for each of my squad because it's that good.",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/3/31/cbq7gq0YbL.jpg',
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
            content: "Okay, I was skeptical at first, but now I'm hooked. This product is legit a part of my daily grind. It's a game-changer and deserves two big thumbs up. You won't regret it.",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/aPDidEEc4p.jpg',
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
                src: 'https://images.loox.io/uploads/2024/1/31/10kEcxhZV.jpg',
            }
        },
        {
            id: 7,
            reviewer_name: 'benitto',
            review_title: 'First Title',
            is_verified: false,
            date: "31/03/2024",
            content: "I can't believe I lived without this thing before. It's super innovative, reliable, and has made my life way more convenient. Five stars all the way, hands down.",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/bkHgcNVq2.jpg',
                }
            ],
            replies: [
                {
                    reviewer_name: 'Nagu',
                    reply_content: "This product has me shook! It's mad user-friendly, and the results are seriously impressive. Told all my homies and fam to get one. It's a game-changer, for real.",
                    images: [],
                }
            ],
            product: {
                product_name: 'Sample Product',
                src: 'https://images.loox.io/uploads/2024/1/31/10kEcxhZV.jpg',
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
                    const itemHeight: any = itemRef.clientHeight;

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
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {columns.map((column: any, columnIndex: number) => (
                <div key={columnIndex} style={{flex: 1, flexWrap: 'wrap', margin: '0 10px'}}>
                    {column?.map((item: any, itemIndex: any) => (
                        <GridCardPreview review={item} key={itemIndex}/>
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

export default GridWidgetPreview;