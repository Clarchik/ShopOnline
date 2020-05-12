export interface Pager {
    currentPage: number;
    endIndex: number;
    endPage: number;
    pageSize: number;
    pages: Array<number>;
    startIndex: number;
    startPage: number;
    totalItems: number;
    totalPages: number;
}
