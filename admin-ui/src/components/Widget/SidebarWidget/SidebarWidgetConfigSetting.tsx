import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Switch} from "../../ui/switch";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";
import {Input} from "../../ui/input";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";


const SidebarWidgetConfigSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(SidebarWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"Settings"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Position</Label>
                        <Select value={widget.position} onValueChange={(value: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.position = value;
                            })
                        }}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Position"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="left">Left</SelectItem>
                                    <SelectItem value="right">Right</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Orientation</Label>
                        <Select value={widget.orientation} onValueChange={(value: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.orientation = value;
                            })
                        }}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Position"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="top_bottom">Top-bottom</SelectItem>
                                    <SelectItem value="bottom_top">Bottom-top</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="hide_on_mobile">Button text</Label>
                        <Input
                            defaultValue={widget.button_text}
                            onChange={(e: any) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.button_text = e.target.value;
                                })
                            }}
                        />
                    </SidebarDetailField>

                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Button background color </Label>
                            <PopOverColorPicker color={widget.button_bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.button_bg_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Text </Label>
                            <PopOverColorPicker color={widget.button_text_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.button_text_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>

                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="hide_on_mobile"
                                checked={widget.hide_on_mobile}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.hide_on_mobile = value
                                    })
                                }}
                            />

                            <Label className={"frt-text-xs"} htmlFor="hide_on_mobile">Hide on Mobile</Label>
                        </div>
                        <p>Check store to view this change</p>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    )
}

export default SidebarWidgetConfigSetting;