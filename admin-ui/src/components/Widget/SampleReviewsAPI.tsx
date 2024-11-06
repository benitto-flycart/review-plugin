import React, {createContext, useEffect, useState} from "react";
import {axiosClient} from "../api/axios";
import {toastrError} from "../../helpers/ToastrHelper";
import {useLocalState} from "../zustand/localState";

export const SampleReviewsContext = createContext({});

function SampleReviewsContextAPI({children}: { children: any }) {
    const {localState} = useLocalState();

    const [reviews, setReviews] = useState<any>([])
    const [tempReviewsState,setTempReviewsState]=useState<any>([])

    const fetch = () => {
        axiosClient.post('', {
            method: 'get_sample_reviews',
            language: localState.current_locale,
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            current_page: reviews.current_page ?? 1,
            per_page: 15,
        }).then((response: any) => {
            setReviews(response.data.data)
            setTempReviewsState(response.data.data)
        }).catch((error: any) => {
            console.log('Unable to load sample reviews')
            toastrError('Unable to Load Sample Reviews');
        }).finally(() => {
        });
    }

    const setEmptyReview = (setEmptyReview:boolean) => {
        const emptyState: any = {
            total: 0,
            per_page: reviews.per_page,
            total_pages: 1,
            current_page: 1,
            reviews: [],
            ratings: {
                rating_icon: reviews.ratings.rating_icon,
                rating_outline_icon: reviews.ratings.rating_outline_icon,
                overall_rating: 0,
                details: [
                    { count: 0, percentage: 0 },
                    { count: 0, percentage: 0 },
                    { count: 0, percentage: 0 },
                    { count: 0, percentage: 0 },
                    { count: 0, percentage: 0 }
                ]
            }
        };

        if(setEmptyReview){
            setReviews(emptyState)
        }
        else{
            setReviews(tempReviewsState)
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <SampleReviewsContext.Provider value={{
            reviews: reviews,
            refetch: fetch,
            setEmptyReview
        }}>
            {children}
        </SampleReviewsContext.Provider>
    )
}

export default SampleReviewsContextAPI;