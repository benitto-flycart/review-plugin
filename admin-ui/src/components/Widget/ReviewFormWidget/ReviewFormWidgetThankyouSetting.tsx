import React, { useContext } from "react";
import { Label } from "../../ui/label";
import { ReviewFormWidgetContext } from "./ReviewFormWidgetContextAPI";
import { Input } from "../../ui/input";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";
import { Textarea } from "../../ui/textarea";

const ReviewFormWidgetThankyouSetting = ({ name }: any) => {
  const { widget, updateWidgetFields } = useContext<any>(
    ReviewFormWidgetContext,
  );

  return (
    <SidebarDetailWrapper>
      <DetailHeading name={name} updateWidgetFields={updateWidgetFields} />
      <SidebarDetail>
        <SidebarDetailSection title={"General"}>
          <SidebarDetailField>
            <Label className={"frt-text-xs"} htmlFor="none">
              Title
            </Label>
            <div className={"frt-flex frt-flex-row frt-gap-2"}>
              <Input
                className={"frt-grow-2 frt-bg-primary"}
                id="title"
                type={"text"}
                defaultValue={widget.thank_you.title}
                onChange={(e: any) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.thank_you.title = e.target.value;
                  });
                }}
              />
            </div>
          </SidebarDetailField>

          <SidebarDetailField>
            <Label className={"frt-text-xs"} htmlFor="none">
              Description
            </Label>
            <div className={"frt-flex frt-flex-row frt-gap-2"}>
              <Input
                className={"frt-grow-2 frt-bg-primary"}
                id="title"
                type={"text"}
                defaultValue={widget.thank_you.description}
                onChange={(e: any) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.thank_you.description = e.target.value;
                  });
                }}
              />
            </div>
          </SidebarDetailField>

          <SidebarDetailField>
            <Label className={"frt-text-xs"} htmlFor="none">
              Discount Title
            </Label>
            <div className={"frt-flex frt-flex-row frt-gap-2"}>
              <Textarea
                className={"frt-grow-2 frt-bg-primary"}
                id="title"
                defaultValue={widget.thank_you.discount_info_title}
                onChange={(e: any) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.thank_you.discount_info_title = e.target.value;
                  });
                }}
              ></Textarea>
            </div>
            <p>Make sure the discount is enabled in discount settings</p>
          </SidebarDetailField>

          <SidebarDetailField>
            <Label className={"frt-text-xs"} htmlFor="none">
              Discount Description
            </Label>
            <div className={"frt-flex frt-flex-row frt-gap-2"}>
              <Textarea
                className={"frt-grow-2 frt-bg-primary"}
                id="title"
                defaultValue={widget.thank_you.discount_info_description}
                onChange={(e: any) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.thank_you.discount_info_description =
                      e.target.value;
                  });
                }}
              ></Textarea>
            </div>
            <p>Make sure the discount is enabled in discount settings</p>
          </SidebarDetailField>
        </SidebarDetailSection>
      </SidebarDetail>
    </SidebarDetailWrapper>
  );
};

export default ReviewFormWidgetThankyouSetting;
