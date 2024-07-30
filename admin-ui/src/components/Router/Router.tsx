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


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/settings" element={<Setting/>}></Route>
            <Route path="/widgets" element={<Widget/>}></Route>
            <Route path="/email-settings" element={<EmailSetting/>}></Route>
            <Route  path="emails/review-request" element={<ReviewRequest/>}/>
            <Route  path="emails/review-reminder" element={<ReviewReminder/>}/>
            <Route  path="emails/photo-reminder" element={<PhotoReminder/>}/>
            <Route  path="emails/discount-reminder" element={<DiscountReminder/>}/>
            <Route  path="emails/reply-to-review" element={<ReplyToEmail/>}/>
            <Route  path="widgets/product-review-widget" element={<ProductReviewWidget/>}/>
        </Routes>
    );
}

export default Router;
