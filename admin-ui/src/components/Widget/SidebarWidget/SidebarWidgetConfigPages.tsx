import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Switch} from "../../ui/switch";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetailField from "../Sidebar/SidebarDetailField";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetail from "../Sidebar/SidebarDetail";


const SidebarWidgetConfigPages = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(SidebarWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail title={"Settings"}>
                <SidebarDetailSection>
                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2 frt-justify-center"}>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="home_page">Home Page</Label>
                            <Switch id="home_page"
                                    checked={widget.show_on_home_page}
                                    onCheckedChange={(value: boolean) => {
                                        updateWidgetFields((draftState: any) => {
                                            draftState.show_on_home_page = value
                                        })
                                    }}
                            />
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="product_page">Product Page</Label>
                            <Switch id="product_page"
                                    checked={widget.show_on_product_page}
                                    onCheckedChange={(value: boolean) => {
                                        updateWidgetFields((draftState: any) => {
                                            draftState.show_on_product_page = value
                                        })
                                    }}
                            />
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="cart_page">Cart Page</Label>
                            <Switch id="cart_page"
                                    checked={widget.show_on_cart_page}
                                    onCheckedChange={(value: boolean) => {
                                        updateWidgetFields((draftState: any) => {
                                            draftState.show_on_cart_page = value
                                        })
                                    }}
                            />
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
)
}

export default SidebarWidgetConfigPages;