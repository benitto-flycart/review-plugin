import React, { useState } from "react";
import { Clock, Send, ShoppingCart, Star } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { axiosClient } from "../api/axios";
import { AxiosResponse } from "axios";
import { ApiErrorResponse, ApiResponse } from "../api/api.types";
import { TOrderList } from "./Order.types";
import { useLocalState } from "../zustand/localState";
import { LoadingSpinner } from "../ui/loader";
import { getErrorMessage } from "../../helpers/helper";
import { toastrError } from "../../helpers/ToastrHelper";

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
  order_items: OrderItem[];
}

interface OrderEntryProps {
  order: Order;
  fetchOrders: () => void;
}

export const OrderEntry = <T extends OrderEntryProps>({
  order,
  fetchOrders,
}: T) => {
  const { localState } = useLocalState();
  const [loading, setLoading] = useState<boolean>(false);

  const sendMail = () => {
    setLoading(true);
    axiosClient
      .post(``, {
        method: "send_mail",
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
        setLoading(false);
      });
  };
  const areAllEmailsSent = () => {
    return order.order_items.every((item) => item.email_send_at);
  };
  return (
    <div className="frt-space-y-4">
      <Card key={order.order_id} className="frt-overflow-hidden">
        <CardContent className="!frt-p-0">
          <div className="frt-grid frt-grid-cols-[1fr,auto] frt-gap-4">
            <div className="frt-p-6 frt-space-y-4">
              <div className="frt-flex frt-justify-between frt-items-center">
                <h2 className="frt-text-lg frt-font-semibold">{order.email}</h2>
                <div className=" frt-flex frt-justify-start frt-items-center">
                  <a
                    href={order.order_url}
                    className="frt-whitespace-nowrap frt-flex frt-items-center frt-mr-[10px] frt-border-r frt-border-r-gray-300 frt-border-solid frt-pr-[10px] frt-cursor-pointer frt-text-sm frt-font-normal"
                  >
                    <ShoppingCart className="frt-h-4 frt-w-4 frt-mr-2" />
                    Go to order
                  </a>
                  {areAllEmailsSent() ? (
                    <a
                      onClick={sendMail}
                      className="frt-whitespace-nowrap frt-flex frt-items-center frt-mr-[10px] frt-border-r frt-border-r-gray-300 frt-border-solid frt-pr-[10px] frt-cursor-pointer frt-text-sm frt-font-normal"
                    >
                      {loading ? (
                        <LoadingSpinner />
                      ) : (
                        <Send className="frt-h-4 frt-w-4 frt-mr-2" />
                      )}
                      Send now
                    </a>
                  ) : null}
                  <div className="frt-text-right frt-text-muted-foreground">
                    <Clock className="frt-h-4 frt-w-4 frt-inline frt-mr-2" />
                    <span>{order.created_at}</span>
                  </div>
                </div>
              </div>
              {order.order_items.map((item: any, index: number) => (
                <div
                  key={item.order_item_id}
                  className="frt-flex frt-justify-between frt-items-center"
                >
                  <span className="frt-font-medium">{item.product_name}</span>
                  <div className={"frt-flex frt-gap-5"}>
                    {item.review_added_at ? (
                      <div className="frt-flex frt-items-center frt-text-yellow-500">
                        <Star className="frt-h-5 frt-w-5 frt-mr-2 frt-fill-current" />
                        <span>Review received</span>
                      </div>
                    ) : null}
                    {item.email_status == "success" ? (
                      <div className="frt-flex frt-items-center">
                        <Send className="frt-h-4 frt-w-4 frt-mr-2" />
                        <span>Sent : {item.email_send_at}</span>
                      </div>
                    ) : (
                      <span>{item.email_status}</span>
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
