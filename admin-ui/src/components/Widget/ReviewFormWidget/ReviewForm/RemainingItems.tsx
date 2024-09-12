import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";


const RemainingItems = ({handleNextClick}: any) => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"r_rfw_remaining_items_wrapper"}>
            <span
                className={"r_rfw_remaining_items_title"}>Review Another Item</span>
            <div className={"r_rfw_review_remaining_available_items"}>
                <div className={"r_rfw_review_next_item"}>
                    <div className={"r_rfw_review_next_item_product_details"}>
                        <img src="https://unsplash.it/200/200" alt="Product Image"/>
                        <span className={"r_rfw_review_next_item_product_name"}>The Multi-Managed Snowboard</span>
                    </div>
                    <div className={"r_rfw_review_next_item_write_a_review"}>
                        <button className={"r_rfw_btn"}>Write a Review</button>
                    </div>
                </div>
                <div className={"r_rfw_review_next_item"}>
                    <div className={"r_rfw_review_next_item_product_details"}>
                        <img src="https://unsplash.it/200/200" alt="Product Image"/>
                        <span className={"r_rfw_review_next_item_product_name"}>The Multi-Managed Snowboard</span>
                    </div>
                    <div className={"r_rfw_review_next_item_write_a_review"}>
                        <button className={"r_rfw_btn"}>Write a Review</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RemainingItems;