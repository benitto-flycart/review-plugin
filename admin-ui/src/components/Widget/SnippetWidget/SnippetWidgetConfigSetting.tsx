import React, { useContext } from "react";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { SnippetWidgetContext } from "./SnippetWidgetContextAPI";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const SnippetWidgetConfigSetting = ({ name }: any) => {
  const { widget, updateWidgetFields } = useContext<any>(SnippetWidgetContext);

  return (
    <SidebarDetailWrapper>
      <DetailHeading name={name} updateWidgetFields={updateWidgetFields} />
      <SidebarDetail>
        <SidebarDetailSection title={"General"}>
          <SidebarDetailField>
            <Label className={"frt-text-xs"} htmlFor="none">
              Position to show
            </Label>
            <Select
              value={widget.position_to_show}
              onValueChange={(value: string) => {
                updateWidgetFields((draftState: any) => {
                  draftState.position_to_show = value;
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Widget Width" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="woocommerce_before_add_to_cart_button">
                    Before Add to Cart Button
                  </SelectItem>
                  <SelectItem value="woocommerce_before_add_to_cart_quantity">
                    Before Add to Cart Quantity
                  </SelectItem>
                  <SelectItem value="woocommerce_after_add_to_cart_quantity">
                    After Add to Cart Quantity
                  </SelectItem>
                  <SelectItem value="woocommerce_after_add_to_cart_button">
                    After Add to Cart Button
                  </SelectItem>
                  <SelectItem value="woocommerce_after_add_to_cart_form">
                    After Add to Cart Form
                  </SelectItem>
                  <SelectItem value="woocommerce_product_meta_start">
                    Product Meta Start
                  </SelectItem>
                  <SelectItem value="woocommerce_product_meta_end">
                    Product Meta End
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarDetailField>
          <SidebarDetailField>
            <Label className={"frt-text-xs"} htmlFor="none">
              Minimum Rating to display
            </Label>
            <Select
              value={widget.minimum_rating}
              onValueChange={(value: string) => {
                updateWidgetFields((draftState: any) => {
                  draftState.minimum_rating = value;
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3">3 stars up</SelectItem>
                  <SelectItem value="4">4 stars up</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p>Check store to view this change</p>
          </SidebarDetailField>
          <SidebarDetailField>
            <Label className={"frt-text-xs"} htmlFor="none">
              No of Reviews to display
            </Label>
            <Select
              value={widget.no_of_reviews_to_display}
              onValueChange={(value: string) => {
                updateWidgetFields((draftState: any) => {
                  draftState.no_of_reviews_to_display = value;
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="14">14</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p>Check store to view this change</p>
          </SidebarDetailField>
          <SidebarDetailField>
            <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
              <Switch
                id="show_review_rating"
                checked={widget.show_rating}
                onCheckedChange={(value: boolean) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.show_rating = value;
                  });
                }}
              />
              <Label className={"frt-text-xs"} htmlFor="none">
                Show Review Rating
              </Label>
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
                  });
                }}
              />
              <Label className={"frt-text-xs"} htmlFor="none">
                Show Review Image
              </Label>
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
                  });
                }}
              />
              <Label className={"frt-text-xs"} htmlFor="none">
                Hide Arrows on Mobile
              </Label>
            </div>
            <p>Check store to view this change</p>
          </SidebarDetailField>
        </SidebarDetailSection>
      </SidebarDetail>
    </SidebarDetailWrapper>
  );
};

export default SnippetWidgetConfigSetting;
