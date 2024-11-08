import React, {useContext} from "react";
import {ProductWidgetContext} from "./ProductReviewContextAPI";
import ProductWidgetLayoutSetting from "./ProductWidgetLayoutSetting";
import ProductWidgetStyleSetting from "./ProductWidgetStyleSetting";
import PreviewProductWidget from "./Preview/PreviewProductWidget";
import ProductWidgetColorSetting from "./ProductWidgetColorSetting";
import ProductWidgetPreferenceSetting from "./ProductWidgetPreferenceSetting";
import "../preview-mobile.css";
import {FontStyleIcon,} from "@radix-ui/react-icons";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import { BracesIcon, LayoutDashboardIcon, PaletteIcon, Settings2Icon } from "lucide-react";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";
import CustomCss from "@/src/components/Widget/CustomCss";

const ProductWidget = ({ show, toggle, currentLocale }: any) => {
    const context = useContext<any>(ProductWidgetContext);
    const settings = {
        title: "Product Widget Configuration",
        widget_slug: "product",
        options: [
            {
                key: "layout",
                name: "Layout",
                icon: <LayoutDashboardIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height} />,
                component: <ProductWidgetLayoutSetting name={"Layout"} />,
            },
            {
                key: "style",
                name: "Style",
                icon: <FontStyleIcon />,
                component: <ProductWidgetStyleSetting name={"Style"} />,
            },
            {
                key: "color",
                name: "Color",
                icon: <PaletteIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height} />,
                component: <ProductWidgetColorSetting name={"Color"} />,
            },
            {
                key: "preferences",
                name: "Preferences",
                icon: <Settings2Icon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height} />,
                component: (
                    <ProductWidgetPreferenceSetting name={"Preferences"} />
                ),
            },
            {
                key: "advanced_css",
                name: "Advanced CSS",
                icon: <BracesIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height} />,
                component: (
                  <CustomCss name={"Advanced CSS"} context={context} />
                ),
            },
        ],
    };

    return (
        <WidgetDialogWrapper
            show={show}
            toggle={toggle}
            context={context}
            // widget={widget}
            // updateWidgetFields={updateWidgetFields}
            currentLocale={currentLocale}
            settings={settings}
        >
            <PreviewProductWidget view={context.widget.view} />
        </WidgetDialogWrapper>
    );
};

export default ProductWidget;

