import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import {ProductWidgetContext} from "./ProductReviewContextAPI";
import ProductWidgetLayoutSetting from "./ProductWidgetLayoutSetting";
import ProductWidgetStyleSetting from "./ProductWidgetStyleSetting";
import PreviewProductWidget from "./Preview/PreviewProductWidget";
import ProductWidgetColorSetting from "./ProductWidgetColorSetting";
import ProductWidgetPreferenceSetting from "./ProductWidgetPreferenceSetting";
import "@/src/styles/widgets/widget.css";
import "../preview-mobile.css";
import {ColorWheelIcon, DashboardIcon, FontStyleIcon, LayoutIcon} from "@radix-ui/react-icons";
import WidgetPreviewHeader from "../WidgetPreviewHeader";
import WidgetSidebar from "../WidgetSidebar";
import ReviewFormWidgetPreview from "../ReviewFormWidget/ReviewFormWidgetPreview";

const ProductWidget = ({toggle}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    const settings = {
        title: 'Product Widget Configuration',
        widget_slug: 'product',
        options: [
            {
                key: 'layout',
                name: 'Layout',
                icon: <LayoutIcon/>,
                component: <ProductWidgetLayoutSetting name={'Layout'}/>,
            },
            {
                key: 'style',
                name: 'Style',
                icon: <FontStyleIcon/>,
                component: <ProductWidgetStyleSetting name={'Style'}/>
            },
            {
                key: 'color',
                name: 'Color',
                icon: <ColorWheelIcon/>,
                component: <ProductWidgetColorSetting name={'Color'}/>,
            },
            {
                key: 'preferences',
                name: 'Preferences',
                icon: <DashboardIcon/>,
                component: <ProductWidgetPreferenceSetting name={'Preferences'}/>,
            }
        ]
    }

    const showDropdownOptions = () => {
        return widget.show_setting == '';
    }

    return (
        <div>
            <Dialog open={true} onOpenChange={toggle}>
                <DialogContent
                    className={"wd_container widget_snippet review-widget-preview !frt-p-0"}>
                    <div
                        className={"wd__sidebar frt-divide-y frt-divide-black-400 frt-col-span-1 frt-flex frt-flex-col frt-gap-2 frt-border-r frt-border-black-400"}>
                        <WidgetSidebar settings={settings} widget={widget} updateWidgetFields={updateWidgetFields}/>
                    </div>
                    <div
                        className={"wd_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
                        <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
                        <div className={"wd_preview__main_content preview-widget wd_review_form_preview"}>
                            <PreviewProductWidget/>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductWidget;