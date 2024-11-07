export type TPagination = {
    total: number,
    per_page: number,
    current_page: number,
    total_pages: number,
}

export const paginationDefault = {
    total: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 0
}