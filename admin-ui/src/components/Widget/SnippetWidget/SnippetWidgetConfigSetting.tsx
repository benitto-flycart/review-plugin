import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Switch} from "../../ui/switch";
import {SnippetWidgetContext} from "./SnippetWidgetContextAPI";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";
import InputFontSize from "../utils/InputFontSize";

const SnippetWidgetConfigSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(SnippetWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"General"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Review Font Size</Label>
                        <InputFontSize min={12}
                                       max={16}
                                       step={1}
                                       value={widget.font_size}
                                       onChange={(value: number) => {
                                           updateWidgetFields((draftState: any) => {
                                               draftState.font_size = value;
                                           })
                                       }}/>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Name Font Size</Label>
                        <InputFontSize min={12}
                                       max={30}
                                       step={1}
                                       value={widget.name_font_size}
                                       onChange={(value: number) => {
                                           updateWidgetFields((draftState: any) => {
                                               draftState.name_font_size = value;
                                           })
                                       }}/>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Icon Font Size</Label>
                        <InputFontSize min={12}
                                       max={30}
                                       step={1}
                                       value={widget.icon_font_size}
                                       onChange={(value: number) => {
                                           updateWidgetFields((draftState: any) => {
                                               draftState.icon_font_size = value;
                                           })
                                       }}/>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">No of Reviews to Display</Label>
                        <InputFontSize
                            min={5}
                            max={10}
                            value={widget.no_of_reviews_to_display}
                            onChange={(value: number) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.no_of_reviews_to_display = value;
                                })
                            }}
                        />
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_review_rating"
                                checked={widget.show_rating}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.show_rating = value;
                                    })
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">Show Review Rating</Label>
                        </div>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_review_image"
                                checked={widget.show_review_image}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.show_review_image = value;
                                    })
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">Show Review Image</Label>
                        </div>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="hide_arrows_on_mobile"
                                checked={widget.hide_arrows_on_mobile}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.hide_arrows_on_mobile = value;
                                    })
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">Hide Arrows on Mobile</Label>
                        </div>
                        <p>Check store to view this change</p>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default SnippetWidgetConfigSetting;