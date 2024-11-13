import React, {useEffect, useState} from "react";
import {useLocalState} from "../zustand/localState";
import usePaginationHook from "../custom-hooks/pagination/usePaginationHook";
import useInputSearch from "../custom-hooks/useInputSearch";
import {OrderEntry} from "./OrderEntry";
import {axiosClient} from "../api/axios";
import {TOrderList} from "./Order.types";
import {AxiosResponse} from "axios";
import {Pagination} from "../custom-hooks/pagination/Pagination";
import {ApiErrorResponse, ApiResponse} from "../api/api.types";
import {Button} from "@/src/components/ui/button";
import {Input} from "@/src/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/src/components/ui/select";
import {paginationDefault} from "../custom-hooks/pagination/TPagination";
import {OrderListEmpty} from "./OrderListEmpty";
import {getErrorMessage} from "../../helpers/helper";
import {toastrError} from "../../helpers/ToastrHelper";
import {SelectGroup} from "@radix-ui/react-select";
import {LoadingSpinner} from "@/src/components/ui/loader";
import {defaultOrderFilterState} from "@/src/components/Orders/index";

interface Option {
    value: string;
    label: string;
}

interface FilterStateTypes {
    search: string;
    order_status: any;
    range: any;
    start_date: string;
    end_date: string;
}

const Orders = () => {
    const [orders, setOrders] = useState<TOrderList>({
        orders: [],
        ...paginationDefault,
    });

    const [filterState, setFilterState] = useState<FilterStateTypes>(defaultOrderFilterState);

    const {localState} = useLocalState();
    const [loading, setLoading] = useState<boolean>(true);

    const {search, setSearch, searched, setIsSearched} = useInputSearch();

    const {
        handlePagination,
        updatePerPage,
        selectedLimit,
        perPage,
        currentPage,
        setCurrentPage,
    } = usePaginationHook();

    const filterRange = [
        {value: "all_time", label: "All time"},
        {value: "custom", label: "Custom"},
    ];

    const fetchOrders = (searched?: boolean) => {
        setLoading(true);
        if (searched) {
            setIsSearched(true);
        }
        axiosClient
            .post("", {
                method: "get_wc_orders",
                _wp_nonce_key: "flycart_review_nonce",
                _wp_nonce: localState?.nonces?.flycart_review_nonce,
                per_page: perPage,
                current_page: currentPage,
                search: filterState.search,
                order_status: filterState.order_status,
                range: filterState.range,
                start_date: filterState.start_date,
                end_date: filterState.end_date,
            })
            .then((response: AxiosResponse<ApiResponse<TOrderList>>) => {
                setOrders(response.data.data);
            })
            .catch((error: AxiosResponse<ApiErrorResponse>) => {
                toastrError(getErrorMessage(error));
            })
            .finally(() => {
                if (searched) {
                    setIsSearched(false);
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, [perPage, currentPage]);

    return (
        <div>
            <div className="frt-flex frt-flex-col frt-gap-4">
                <div className="frt-container frt-mx-auto frt-p-6 frt-max-w-4xl">
                    <h1 className="!frt-text-xl !frt-font-bold frt-text-gray-900 !frt-mb-6 frt-flex frt-items-center frt-gap-2">
                        Orders
                    </h1>
                    <div
                        className="frt-bg-white frt-rounded-lg frt-shadow-sm frt-border frt-border-gray-200 frt-p-6 frt-mb-6">
                        <div className="frt-flex frt-gap-4 frt-mb-4">
                            <Input
                                type="email"
                                value={filterState.search}
                                onChange={(e) =>
                                    setFilterState({...filterState, search: e.target.value})
                                }
                                placeholder="Search by billing email"
                                className="frt-w-full"
                            />
                            <Select
                                value={filterState.order_status}
                                onValueChange={(value: string) =>
                                    setFilterState({...filterState, order_status: value})
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Order Status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem key={"all"} value={"all"}>
                                            All Orders
                                        </SelectItem>
                                        {Object.entries(localState.order_statuses)?.map(
                                            (obj: any, index: number) => {
                                                return (
                                                    <SelectItem key={index} value={obj[0]}>
                                                        {obj[1]}
                                                    </SelectItem>
                                                );
                                            },
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select
                                value={filterState.range}
                                onValueChange={(value: string) =>
                                    setFilterState({...filterState, range: value})
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Date Range"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {filterRange.map((range, index) => (
                                        <SelectItem key={index} value={range.value}>
                                            {range.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {filterState.range === "custom" && (
                            <div className="frt-flex frt-gap-4 frt-mb-4 frt-w-full">
                                <div className="frt-relative frt-w-1/2">
                                    <Input
                                        type="date"
                                        placeholder="Start date"
                                        className="frt-w-full"
                                        value={filterState.start_date}
                                        onChange={(e) =>
                                            setFilterState({
                                                ...filterState,
                                                start_date: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="frt-relative frt-w-1/2">
                                    <Input
                                        type="date"
                                        placeholder="End date"
                                        className="frt-w-full"
                                        value={filterState.end_date}
                                        onChange={(e) =>
                                            setFilterState({
                                                ...filterState,
                                                end_date: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        <div className="frt-flex frt-justify-end">
                            <div className={"frt-flex frt-gap-x-4"}>
                                <Button
                                    disabled={loading}
                                    className="frt-bg-gray-900 frt-text-white frt-hover:bg-gray-800"
                                    onClick={() => currentPage == 1 ? fetchOrders(true) : setCurrentPage(1)}
                                >
                                    Filter
                                </Button>
                                <Button
                                    className="frt-bg-gray-900 frt-text-white frt-hover:bg-gray-800"
                                    onClick={() => setFilterState(defaultOrderFilterState)}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="frt-flex frt-flex-col frt-gap-4">
                        {!loading ? (
                            <>
                                {orders.orders.length === 0 ? (
                                    <OrderListEmpty/>
                                ) : (
                                    <>
                                        {orders.orders.map((order: any, index) => (
                                            <OrderEntry
                                                key={index}
                                                order={order}
                                                fetchOrders={fetchOrders}
                                            />
                                        ))}
                                        <Pagination
                                            handlePageClick={handlePagination}
                                            updatePerPage={updatePerPage}
                                            selectedLimit={selectedLimit}
                                            pageCount={orders.total_pages || 1}
                                            limit={orders.per_page || 5}
                                            loading={false}
                                            forcePage={currentPage - 1}
                                        />
                                    </>
                                )}
                            </>
                        ) : (
                            <div className={"frt-h-[300px]"}>
                                <LoadingSpinner/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
