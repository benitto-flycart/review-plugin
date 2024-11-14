import React, {useState} from "react";
import {CalendarCheck2Icon, Clock, HourglassIcon, Send, ShoppingCart, XIcon} from "lucide-react";
import {Card, CardContent} from "@/src/components/ui/card";
import {axiosClient} from "../api/axios";
import {AxiosResponse} from "axios";
import {ApiErrorResponse, ApiResponse} from "../api/api.types";
import {TOrderList} from "./Order.types";
import {useLocalState} from "../zustand/localState";
import {LoadingSpinner} from "../ui/loader";
import {getErrorMessage} from "../../helpers/helper";
import {toastrError} from "../../helpers/ToastrHelper";
import {CheckIcon} from "@radix-ui/react-icons";

interface OrderItem {
  product_name: string;
  order_item_id: string;
  product_id: string;
  review_product_id: string | null;
  review_added_at: string | null;
  email_status: string | null;
  email_send_at: string | null;
}

interface Order {
  order_id: string;
  created_at: string;
  order_url: string;
  order_status: string;
  email: string;
  email_status:string,
  order_items: OrderItem[];
}

interface OrderEntryProps {
  order: Order;
  fetchOrders: () => void;
}

interface OrderEntryLoadingState {
  is_loading: boolean;
  type: string;
}

export const OrderEntry = <T extends OrderEntryProps>({
  order,
  fetchOrders,
}: T) => {
  const { localState } = useLocalState();
  const [loading, setLoading] = useState<OrderEntryLoadingState>({
    is_loading: false,
    type: "",
  });

  const sendMail = (type: string) => {
    setLoading({
      is_loading: true,
      type,
    });
    axiosClient
      .post(``, {
        method: "update_order_meta",
        type: type,
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        order_id: order.order_id,
      })
      .then((response: AxiosResponse<ApiResponse<TOrderList>>) => {
        fetchOrders();
      })
      .catch((error: AxiosResponse<ApiErrorResponse>) => {
        toastrError(getErrorMessage(error));
      })
      .finally(() => {
        setLoading({
          is_loading: false,
          type: "",
        });
      });
  };

  const emailStatusMapping: { [key: string]: { icon: JSX.Element; label: string } } = {
    awaiting_fullfillment: { icon: <Send className="frt-h-4 frt-w-4 frt-mr-2" />, label: "Send now" },
    success: { icon: <Send className="frt-h-4 frt-w-4 frt-mr-2" />, label: "Sent" },
    processing: { icon: <HourglassIcon className="frt-h-4 frt-w-4 frt-mr-2" />, label: "Processing" },
    cancelled: { icon: <XIcon className="frt-h-4 frt-w-4 frt-mr-2" />, label: "Cancelled" },
    scheduling: { icon: <CalendarCheck2Icon className="frt-h-4 frt-w-4 frt-mr-2" />, label: "Scheduling" },
  };

  return (
    <div className="frt-space-y-4">
      <Card key={order.order_id} className="frt-overflow-hidden">
        <CardContent className="!frt-p-0">
          <div className="frt-grid frt-grid-cols-[1fr,auto] frt-gap-4">
            <div className="frt-p-6 frt-space-y-4">
              <div className="frt-flex frt-justify-between frt-items-center">
                <h2 className="frt-text-lg frt-font-semibold">{order.email}</h2>
                <div className="frt-flex frt-justify-start frt-items-center">
                  <a
                      href={order.order_url}
                      className="frt-whitespace-nowrap frt-flex frt-items-center frt-mr-[10px] frt-border-r frt-border-r-gray-300 frt-border-solid frt-pr-[10px] frt-cursor-pointer frt-text-sm frt-font-normal"
                  >
                    <ShoppingCart className="frt-h-4 frt-w-4 frt-mr-2" />
                    Go to order #{order.order_id}
                  </a>

                  {order.email_status === "awaiting_fullfillment" ? (
                      <a
                          onClick={() => sendMail("send_mail")}
                          className="frt-whitespace-nowrap frt-flex frt-items-center frt-mr-[10px] frt-border-r frt-border-r-gray-300 frt-border-solid frt-pr-[10px] frt-cursor-pointer frt-text-sm frt-font-normal"
                      >
                        {loading.is_loading && loading.type === "send_mail" ? (
                            <LoadingSpinner width={"18px"} height={"18px"} className={"!frt-mr-2"} />
                        ) : (
                            emailStatusMapping[order.email_status]?.icon
                        )}
                        {emailStatusMapping[order.email_status]?.label}
                      </a>
                  ) : (
                      emailStatusMapping[order.email_status] && (
                          <div
                              className={
                                "frt-whitespace-nowrap frt-flex frt-items-center frt-mr-[10px] frt-border-r frt-border-r-gray-300 frt-border-solid frt-pr-[10px] frt-text-sm frt-font-normal"
                              }
                          >
                            {emailStatusMapping[order.email_status].icon}
                            {emailStatusMapping[order.email_status].label}
                          </div>
                      )
                  )}

                  {order.email_status === "scheduling" && (
                      <a
                          onClick={() => sendMail("cancel_mail")}
                          className="frt-whitespace-nowrap frt-flex frt-items-center frt-mr-[10px] frt-border-r frt-border-r-gray-300 frt-border-solid frt-pr-[10px] frt-cursor-pointer frt-text-sm frt-font-normal"
                      >
                        {loading.is_loading && loading.type === "cancel_mail" ? (
                            <LoadingSpinner width={"18px"} height={"18px"} className={"!frt-mr-2"} />
                        ) : (
                            <XIcon className="frt-h-4 frt-w-4 frt-mr-2" />
                        )}
                        Cancel
                      </a>
                  )}

                  <div className="frt-text-right frt-text-muted-foreground">
                    <Clock className="frt-h-4 frt-w-4 frt-inline frt-mr-2" />
                    <span>{order.created_at}</span>
                  </div>
                </div>
              </div>

              {order.order_items.map((item: any) => (
                  <div key={item.order_item_id} className="frt-flex frt-justify-between frt-items-center">
                    <span className="frt-font-medium">{item.product_name}</span>
                    <div className="frt-flex frt-gap-5">
                      {item.review_added_at ? (
                          <div className="frt-flex frt-items-center frt-text-green-500">
                            <CheckIcon className="frt-h-5 frt-w-5 frt-mr-2 frt-fill-current" />
                            <span>Review received</span>
                          </div>
                      ) : (
                          <div className="frt-flex frt-items-center frt-text-yellow-500">
                            <span>Review not received</span>
                          </div>
                      )}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
