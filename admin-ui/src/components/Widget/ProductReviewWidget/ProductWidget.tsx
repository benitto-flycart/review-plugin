import React, {useContext} from "react";
import {ProductWidgetContext} from "./ProductReviewContextAPI";
import ProductWidgetLayoutSetting from "./ProductWidgetLayoutSetting";
import ProductWidgetStyleSetting from "./ProductWidgetStyleSetting";
import PreviewProductWidget from "./Preview/PreviewProductWidget";
import ProductWidgetColorSetting from "./ProductWidgetColorSetting";
import ProductWidgetPreferenceSetting from "./ProductWidgetPreferenceSetting";
import "../preview-mobile.css";
import {ColorWheelIcon, DashboardIcon, FontStyleIcon, LayoutIcon} from "@radix-ui/react-icons";
import WidgetDialogWrapper from "../WidgetDialogWrapper";

const ProductWidget = ({show, toggle}: any) => {
    const context = useContext<any>(ProductWidgetContext)

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

    return (
        <WidgetDialogWrapper
            show={show}
            toggle={toggle}
            context={context}
            // widget={widget}
            // updateWidgetFields={updateWidgetFields}
            settings={settings}
        >
            <PreviewProductWidget view={context.widget.view}/>
        </WidgetDialogWrapper>
    )
}

export default ProductWidget;