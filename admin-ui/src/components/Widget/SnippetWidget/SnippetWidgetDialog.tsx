import React, {useContext} from "react";
import PreviewSnippetWidget from "./SnippetWidgetPreview";

import "@/src/styles/widgets/widget.css";
// import "./mobile.css";
import "./snippets-widget.css";
import SnippetWidgetConfigSetting from "./SnippetWidgetConfigSetting";
import SnippetWidgetColorSetting from "./SnippetWidgetColorSetting";
import {SnippetWidgetContext} from "./SnippetWidgetContextAPI";
import {FontStyleIcon} from "@radix-ui/react-icons";
import SnippetWidgetStyleSetting from "./SnippetWidgetStyleSetting";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";
import {PaletteIcon, SettingsIcon} from "lucide-react";

const SnippetWidgetDialog = ({ show, toggle, currentLocale }: any) => {
  const context = useContext<any>(SnippetWidgetContext);

  const settings = {
    title: "Snippet Widget Configuration",
    widget_slug: "snippet",
    options: [
      {
        key: "settings",
        name: "Settings",
        icon: <SettingsIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height} />,
        component: <SnippetWidgetConfigSetting name={"Settings"} />,
      },
      {
        key: "style",
        name: "Style",
        icon: <FontStyleIcon />,
        component: <SnippetWidgetStyleSetting name={"Style"} />,
      },
      {
        key: "colors",
        name: "Colors",
        icon: <PaletteIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height} />,
        component: <SnippetWidgetColorSetting name={"Colors"} />,
      },
    ],
  };

  return (
    <WidgetDialogWrapper
      show={show}
      currentLocale={currentLocale}
      toggle={toggle}
      settings={settings}
      context={context}
    >
      <PreviewSnippetWidget />
    </WidgetDialogWrapper>
  );
};

export default SnippetWidgetDialog;

