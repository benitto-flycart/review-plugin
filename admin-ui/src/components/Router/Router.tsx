import * as React from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Setting from "@/src/components/Setting";
import EmailSetting from "../EmailSetting";
import ReviewRequest from "../EmailSetting/ReviewRequest";
import ReviewReminder from "../EmailSetting/ReviewReminder";
import PhotoReminder from "../EmailSetting/PhotoReminder";
import DiscountReminder from "../EmailSetting/DiscountReminder";
import ReplyToEmail from "../EmailSetting/ReplyToReview";
import Widget from "../Widget";
import ProductReviewWidget from "../Widget/ProductReviewWidget";
import PopupWidget from "../Widget/PopupWidget/PopupWidget";
import {ReviewSidebarWidget} from "../Widget/ReviewSidebarWidget/ReviewSidebarWidget";
import {FloatingProductReviewsWidget} from "../Widget/FloatingProductReviewsWidget/FloatingProductReviewsWidget";
import SnippetWidget from "../Widget/SnippetWidget/SnippetWidget";
import RatingWidget from "../Widget/RatingWidget/RatingWidget";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/settings" element={<Setting/>}></Route>
            <Route path="/widgets" element={<Widget/>}></Route>
            <Route path="/email-settings" element={<EmailSetting/>}></Route>
            <Route path="emails/review-request" element={<ReviewRequest/>}/>
            <Route path="emails/review-reminder" element={<ReviewReminder/>}/>
            <Route path="emails/photo-reminder" element={<PhotoReminder/>}/>
            <Route path="emails/discount-reminder" element={<DiscountReminder/>}/>
            <Route path="emails/reply-to-review" element={<ReplyToEmail/>}/>
            <Route path="widgets/product-review-widget" element={<ProductReviewWidget/>}/>
            <Route path="widgets/popup-widget" element={<PopupWidget/>}/>
            <Route path="widgets/review-sidebar-widget" element={<ReviewSidebarWidget/>}/>
            <Route path="widgets/floting-product-widget" element={<FloatingProductReviewsWidget/>}/>
            <Route path="widgets/snippets-widget" element={<SnippetWidget/>}/>
            <Route path="widgets/rating-widget" element={<RatingWidget/>}/>
        </Routes>
    );
}

export default Router;
