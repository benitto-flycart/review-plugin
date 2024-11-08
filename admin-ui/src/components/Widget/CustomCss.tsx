import React, { ContextType, useContext, useEffect } from "react";
import {Label} from "../ui/label";
import {Switch} from "../ui/switch";
import DetailHeading from "./Sidebar/DetailHeading";
import SidebarDetail from "./Sidebar/SidebarDetail";
import SidebarDetailSection from "./Sidebar/SidebarDetailSection";
import SidebarDetailWrapper from "./Sidebar/SidebarDetailWrapper";
import SidebarDetailField from "./Sidebar/SidebarDetailField";
import {SampleReviewsContext} from "./SampleReviewsAPI";
import {EditorChange} from "codemirror";
import {Controlled as CodeMirror} from "react-codemirror2"
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/css-hint.js';

const CustomCss = ({name,context}: { name: string ,context:any}) => {
  const {widget, updateWidgetFields} =context;
  const {setEmptyReview} = useContext<any>(SampleReviewsContext);

  useEffect(() => {
    return ()=>{
      setEmptyReview(false)
    }
  }, []);


  useEffect(() => {
    // @ts-ignore
    let iframe: any = window.frames["widget_preview_iframe"];

    if (iframe?.contentDocument) {
      const iframeHead = iframe.contentDocument.head;
      const styleElement = iframe.contentDocument.createElement("style");

      styleElement.setAttribute("data-review", "review");

      if (widget?.custom_css?.is_enabled) {
        styleElement.textContent = widget.custom_css.styles;
        iframeHead.appendChild(styleElement);
      }

      return () => {
        styleElement?.remove();
      };
    }
  }, [widget]);

  console.log(widget.custom_css)

  return (
    <SidebarDetailWrapper>
      <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>

      <SidebarDetail>
        <SidebarDetailSection title={"Display"}>
          <SidebarDetailField>
            <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
              <Switch
                id="show_sorting_options"
                defaultChecked={widget.custom_css.is_enabled}
                onCheckedChange={(value: boolean) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.custom_css.is_enabled = value;
                  });
                }}
              />
              <Label htmlFor="show_sorting_options">Enable CSS</Label>
            </div>
          </SidebarDetailField>
          { widget.custom_css.is_enabled ? <SidebarDetailField>
            <div className="frt-w-full frt-flex frt-flex-col frt-gap-3 frt-my-2">
              <Label htmlFor="css_code_label">CSS Code</Label>
              <CodeMirror
                className="frt-border frt-border-primary frt-p-2 frt-rounded-2xl"
                value={widget.custom_css.styles}
                options={{
                  mode: "css",
                  theme: "default",
                  lineNumbers: true,
                  indentUnit: 4,
                  indentWithTabs: true,
                  firstLineNumber: 1,
                  autofocus:true,
                  extraKeys: { "Ctrl-Space": "autocomplete" },
                }}
                onBeforeChange={(editor: any, data: EditorChange, value: String) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.custom_css.styles = value;
                  });
                }}
              />
              <Label htmlFor="auto_complete_label">Use Ctrl + Space to autocomplete</Label>
            </div>
          </SidebarDetailField> : null}
        </SidebarDetailSection>
      </SidebarDetail>
    </SidebarDetailWrapper>
  );
};

export default CustomCss;
