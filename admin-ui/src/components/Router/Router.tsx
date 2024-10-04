import * as React from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Setting from "@/src/components/Setting";
import EmailSetting from "../EmailSetting";
import Widget from "../Widget";
import UpdateReviewRequest from "../EmailSetting/UpdateReviewRequest";
import UpdateReviewReminder from "../EmailSetting/UpdateReviewReminder";
import UpdatePhotoRequest from "../EmailSetting/UpdatePhotoRequest";
import UpdateDiscountReminder from "../EmailSetting/UpdateDiscountReminder";
import UpdateReplyToReview from "../EmailSetting/UpdateReplyToReview";
import Orders from "../Orders";
import {Reviews} from "../Reviews/Reviews";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/settings" element={<Setting/>}></Route>
            <Route path="/widgets" element={<Widget/>}></Route>
            <Route path="/email-settings" element={<EmailSetting/>}></Route>
            <Route path="/emails/review-request" element={<UpdateReviewRequest/>}/>
            <Route path="/emails/review-reminder" element={<UpdateReviewReminder/>}/>
            <Route path="/emails/photo-request" element={<UpdatePhotoRequest/>}/>
            <Route path="/emails/discount-reminder" element={<UpdateDiscountReminder/>}/>
            <Route path="/emails/reply-to-review" element={<UpdateReplyToReview/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/manage" element={<Reviews/>}/>

            {/*<Route  path="/emails/discount-reminder" element={<UpdateDiscountReminder/>}/>*/}
            {/*<Route  path="/emails/reply-to-review" element={<UpdateReplyToReview/>}/>*/}
        </Routes>
    );
}

export default Router;
