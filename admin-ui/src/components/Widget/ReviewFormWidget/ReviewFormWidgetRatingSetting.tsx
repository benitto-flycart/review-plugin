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

const RatingWidgetRatingSetting = ({ name }: any) => {
  const { widget, updateWidgetFields } = useContext<any>(
    ReviewFormWidgetContext,
  );
  return (
    <SidebarDetailWrapper>
      <DetailHeading name={name} updateWidgetFields={updateWidgetFields} />
      <SidebarDetail>
        <SidebarDetailSection title={"Rating"}>
          <SidebarDetailField>
            <Label className={"frt-text-xs"} htmlFor="none">
              Rating
            </Label>
            <div className={"frt-flex frt-flex-row frt-gap-2"}>
              <Textarea
                className={"frt-grow-2 frt-bg-primary"}
                value={widget.rating.title}
                onChange={(e: any) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.rating.title = e.target.value;
                  });
                }}
              ></Textarea>
            </div>
          </SidebarDetailField>
        </SidebarDetailSection>
      </SidebarDetail>
    </SidebarDetailWrapper>
  );
};

export default RatingWidgetRatingSetting;

