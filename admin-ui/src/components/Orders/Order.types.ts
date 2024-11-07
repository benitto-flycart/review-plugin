import {TPagination} from "../custom-hooks/pagination/TPagination";

export interface Order {
    order_id: string,
    customer: string,
    email_status: string,
    order_item_count: string,
    review_count: string,
    date_created_gmt: string,
    date_updated_gmt: string,
}

export type TOrderList = {
    orders: Order[]
} & TPagination;