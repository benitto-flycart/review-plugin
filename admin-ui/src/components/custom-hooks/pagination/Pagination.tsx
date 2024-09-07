import ReactPaginate from "react-paginate";
import React, {useState} from "react";
import Select from "react-select";
import {paginationDefault} from "./TPagination";

interface PaginationProps {
    handlePageClick: (data: any) => void,
    pageCount: number,
    limit: number,
    forcePage?: number,
    loading: boolean,
    updatePerPage?: (limit: number) => void
    selectedLimit?: number,
    hidePerPageSelect?: boolean
}

export const Pagination = ({
                               handlePageClick,
                               pageCount,
                               forcePage,
                               loading,
                               updatePerPage,
                               selectedLimit,
                               hidePerPageSelect = false
                           }: PaginationProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pages = [
        {'label': '5', 'value': 5},
        {'label': '10', 'value': 10},
        {'label': '20', 'value': 20},
        {'label': '100', 'value': 100},
    ]

    const getSelectedOption = (selectedLimit: number) => {

        return pages.filter((item: any) => {
            return item.value == selectedLimit
        })[0];
    }


    return (<div className="frt-flex frt-flex-row frt-justify-end frt-gap-1 frt-items-center">
        {hidePerPageSelect ? null : (
            <div
                className="frt-flex frt-justify-center frt-items-center frt-gap-1">

                <Select styles={{
                    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
                        return {
                            ...styles,
                            backgroundColor: isFocused ? "hsl(var(--primary))" : "hsl(var(--secondary))",
                            color: isFocused ? "hsl(var(--secondary))" : "hsl(var(--primary))"
                        };
                    }
                }}
                        classNamePrefix="frt-"
                        onChange={(selectedOption: any) => {
                            updatePerPage ? updatePerPage(selectedOption.value) : null
                        }}
                        options={pages}
                        defaultValue={getSelectedOption(selectedLimit ?? paginationDefault.per_page)}
                ></Select>
            </div>
        )}
        <div>
            <ReactPaginate
                previousLabel={
                    <i className="rwp rwp-back-arrow frt-w-4 frt-h-4 frt-flex frt-justify-center frt-items-center hover:frt-bg-light-gray"></i>
                }
                nextLabel={
                    <i className="rwp rwp-forward-arrow frt-w-4 frt-h-4 frt-flex frt-justify-center frt-items-center hover:frt-bg-light-gray"></i>
                }

                // prevPageRel={null}

                breakLabel={"..."}
                pageCount={pageCount}
                forcePage={forcePage}
                // marginPagesDisplayed={1}
                // pageRangeDisplayed={2}

                onPageChange={handlePageClick}
                breakClassName={""}

                breakLinkClassName={"frt-shadow-none frt-outline-none frt-border-0"}

                // previousClassName={`${loading && "frt-pointer-events-none"}`}

                nextClassName={`${loading && "frt-pointer-events-none"}`}
                disabledClassName="frt-disabled"

                // onPageActive={true}
                pageLinkClassName={
                    'frt-px-4 frt-py-3 frt-outline-none hover:frt-bg-secondary '
                }

                activeLinkClassName={
                    'frt-text-secondary frt-outline-none  frt-rounded frt-border frt-bg-primary  '
                }

                activeClassName={''}

                containerClassName={
                    "frt-flex frt-items-center frt-justify-end"
                }
            />
        </div>

    </div>)
};