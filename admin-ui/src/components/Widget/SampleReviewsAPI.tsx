import React, {createContext, useEffect, useState} from "react";
import {axiosClient} from "../api/axios";
import {toastrError} from "../../helpers/ToastrHelper";
import {useLocalState} from "../zustand/localState";

export const SampleReviewsContext = createContext({});

function SampleReviewsContextAPI({children}: { children: any }) {
    const {localState} = useLocalState();

    const [reviews, setReviews] = useState<any>([])

    useEffect(() => {
        axiosClient.post('', {
            method: 'get_sample_reviews',
            language: localState.current_locale,
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            setReviews(response.data.data)
        }).catch((error: any) => {
            console.log('Unable to load sample reviews')
            toastrError('Unable to Load Sample Reviews');
        }).finally(() => {
        });
    }, []);

    return (
        <SampleReviewsContext.Provider value={{
            reviews: reviews,
        }}>
            {children}
        </SampleReviewsContext.Provider>
    )
}

export default SampleReviewsContextAPI;