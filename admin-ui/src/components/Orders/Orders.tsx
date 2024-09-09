import React, {useEffect, useState} from "react";
import {useLocalState} from "../zustand/localState";
import {OrderListEmpty} from "./OrderListEmpty";
import {paginationDefault} from "../custom-hooks/pagination/TPagination";
import usePaginationHook from "../custom-hooks/pagination/usePaginationHook";
import useInputSearch from "../custom-hooks/useInputSearch";
import {OrderEntry} from "./OrderEntry";
import {getArrayForShimmering} from "../../helpers/utils";
import {axiosClient} from "../api/axios";
import {OrderEntrySkeleton} from "./OrderEntrySkelton";
import {TOrderList} from "./Order.types";
import {AxiosResponse} from "axios";
import {Pagination} from "../custom-hooks/pagination/Pagination";
import {ApiErrorResponse, ApiResponse} from "../api/api.types";

const Orders = () => {
    const [orders, setOrders] = useState<TOrderList>({
        orders: [],
        ...paginationDefault
    });

    const {localState} = useLocalState();
    const [loading, setLoading] = useState<boolean>(true)
    const {search, setSearch, searched, setIsSearched} = useInputSearch();

    const {
        handlePagination, updatePerPage,
        selectedLimit, perPage, currentPage
    } = usePaginationHook();


    const fetchOrders = (searchValue = '') => {
        setLoading(true);
        axiosClient.post(``, {
            method: "get_wc_orders",
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            per_page: perPage,
            current_page: currentPage,
            search: searchValue,
        }).then((response: AxiosResponse<ApiResponse<TOrderList>>) => {
            setOrders(response.data.data)
        }).catch((error: AxiosResponse<ApiErrorResponse>) => {
            // @ts-ignore
            toastrError(getErrorMessage(error));
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <div className="frt-flex frt-flex-col frt-gap-4">
                <div className='frt-flex frt-justify-between frt-mt-5 frt-w-full frt-px-4'>
                    <div
                        className='frt-flex-1 frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-uppercase'>Order
                    </div>
                    <div
                        className='frt-flex-1 frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-uppercase'>Email
                        Status
                    </div>
                    <div
                        className='frt-flex-1 frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-uppercase'>Order
                        Item Count
                    </div>
                    <div
                        className='frt-flex-1 frt-max-w-[200px] frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-uppercase'>Review
                        Count
                    </div>
                    <div
                        className='frt-flex-1 frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-uppercase'>Date
                        Created At
                    </div>
                    <div
                        className='frt-flex-1 frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-uppercase'>Customer
                    </div>
                </div>
                <div className='frt-flex frt-flex-col frt-gap-4'>
                    {
                        !loading && searched && orders?.orders.length == 0 ? (
                            <div
                                className="frt-flex frt-items-center frt-flex-col frt-justify-center frt-text-center frt-h-full">
                                <div className="frt-mx-auto frt-my-auto frt-flex frt-flex-col frt-gap-5 frt-p-5">
                                    <div><i className="rwp rwp-list-empty frt-text-6xl "></i></div>
                                    <div><span className="frt-text-lg frt-font-bold">The program you are looking for is not found</span>
                                    </div>
                                    <div>
                                        <p className="frt-text-sm">Uh oh, your program list is looking a little empty!
                                            Looks like the search didn't return any results</p>
                                    </div>

                                </div>
                            </div>
                        ) : !searched && orders?.orders.length == 0 ?
                            <OrderListEmpty/> :
                            !loading ? <>{(orders?.orders?.length ?? 0 > 0) && orders?.orders?.map((order: any, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        <OrderEntry order={order}
                                                    key={index}/>
                                    </React.Fragment>
                                )
                            })}
                                <div className="pagination frt-mt-4">
                                    <Pagination handlePageClick={handlePagination} updatePerPage={updatePerPage}
                                                selectedLimit={selectedLimit} pageCount={orders.total_pages || 1}
                                                limit={orders.per_page || 5} loading={false}
                                                forcePage={currentPage - 1}/>
                                </div>
                            </> : <div className="frt-gap-4 rwr-w-full frt-flex frt-flex-col">
                                {
                                    getArrayForShimmering().map((index: number) => {
                                        return <OrderEntrySkeleton key={index}/>
                                    })
                                }
                            </div>
                    }
                </div>
            </div>

        </div>
    );
}

export default Orders;
