import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Switch} from "../../ui/switch";
import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import {Textarea} from "../../ui/textarea";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const RatingWidgetConfigSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(RatingWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"General"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Text</Label>
                        <Textarea value={widget.text_content} onChange={(e: any) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.text_content = e.target.value;
                            })
                        }}></Textarea>
                        <p>{`Use the following placeholders: {{count}} - Displays the total number of reviews. {{rating}} - Displays the average rating`}</p>

                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                checked={widget.hide_text_content}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.hide_text_content = value;
                                    })
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">Hide Text</Label>
                        </div>
                        <p>Hide the Text Content</p>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                checked={widget.show_empty_stars}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.show_empty_stars = value;
                                    })
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">Show Empty Stars</Label>
                        </div>
                        <p>Show empty stars when there are no reviews</p>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    )
}

export default RatingWidgetConfigSetting;