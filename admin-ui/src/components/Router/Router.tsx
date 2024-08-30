import * as React from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Setting from "@/src/components/Setting";
import EmailSetting from "../EmailSetting";
import Widget from "../Widget";
import ProductReviewWidget from "../Widget/ProductReviewWidget";
import PopupWidget from "../Widget/PopupWidget/PopupWidget";
import {ReviewSidebarWidget} from "../Widget/ReviewSidebarWidget/ReviewSidebarWidget";
import {FloatingProductReviewsWidget} from "../Widget/FloatingProductWidget/FloatingProductReviewsWidget";
import SnippetWidget from "../Widget/SnippetWidget/SnippetWidget";
import RatingWidget from "../Widget/RatingWidget/RatingWidget";
import FloatingProductWidget from "../Widget/FloatingProductWidget/FloatingProductWidget";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/settings" element={<Setting/>}></Route>
            <Route path="/widgets" element={<Widget/>}></Route>
            <Route path="/email-settings" element={<EmailSetting/>}></Route>
        </Routes>
    );
}

export default Router;
