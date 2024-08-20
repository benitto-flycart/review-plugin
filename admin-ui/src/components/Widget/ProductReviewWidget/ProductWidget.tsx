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
import {ArrowRightIcon, ColorWheelIcon, DashboardIcon, FontStyleIcon, LayoutIcon} from "@radix-ui/react-icons";
import WidgetPreviewHeader from "../WidgetPreviewHeader";
import SnippetWidgetConfigSetting from "../SnippetWidget/SnippetWidgetConfigSetting";
import SnippetWidgetColorSetting from "../SnippetWidget/SnippetWidgetColorSetting";
import WidgetSidebar from "../WidgetSidebar";

const ProductWidget = ({show, toggle}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    const settings = {
        title: 'Product Widget Configuration',
        widget_slug: 'product',
        options: [
            {
                key: 'layout',
                name: 'Layout',
                icon: <LayoutIcon/>,
                component: <ProductWidgetLayoutSetting/>,
            },
            {
                key: 'style',
                name: 'Style',
                icon: <FontStyleIcon/>,
                component: <ProductWidgetStyleSetting/>
            },
            {
                key: 'color',
                name: 'Color',
                icon: <ColorWheelIcon/>,
                component: <ProductWidgetColorSetting/>,
            },
            {
                key: 'preferences',
                name: 'Preferences',
                icon: <DashboardIcon/>,
                component: <ProductWidgetPreferenceSetting/>,
            }
        ]
    }

    const showDropdownOptions = () => {
        return widget.show_setting == '';
    }

    return (
        <div>
            <Dialog open={show} onOpenChange={toggle}>
                <DialogContent
                    className={"review-widget-preview !frt-p-0 !frt-max-w-[98vw] frt-min-h-[90vh] frt-max-h-[90vh] !frt-z-[50000] frt-overflow-scroll"}>
                    <div className={"frt-grid frt-grid-cols-5 frt-border-collapse"}>
                        <div
                            className={"frt-divide-y frt-divide-black-400 frt-col-span-1 frt-flex frt-flex-col frt-gap-2 frt-border-r frt-border-black-400"}>
                            <WidgetSidebar settings={settings} widget={widget} updateWidgetFields={updateWidgetFields}/>
                        </div>
                        <div
                            className={"frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
                            <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
                            <div className={"preview-widget review-preview-product-widget frt-min-h-[100vh]"}>
                                <PreviewProductWidget/>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductWidget;