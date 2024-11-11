import {useState} from "react";
import {paginationDefault} from "./TPagination";

const usePaginationHook = () => {


    const [selectedLimit,setSelectedLimit]=useState<any>(paginationDefault.per_page)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(paginationDefault.per_page)

    const handlePagination = (data: any) => {
        let selectedPage = data.selected;

        // @ts-ignore
        setCurrentPage(selectedPage + 1);
    }

    const updatePerPage = (limit: number) => {
        // @ts-ignore
        setPerPage(limit);
        setSelectedLimit(limit)
        setCurrentPage(1)
    }


    return {
        handlePagination, updatePerPage,
        selectedLimit, perPage, currentPage, setCurrentPage,
    }

}

export default  usePaginationHook;