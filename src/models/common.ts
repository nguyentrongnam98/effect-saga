export interface Pagination {
    _limit:number,
    _page:number,
    _totalRows:number
}

export interface Params {
    _limit:number,
    _page:number
}

export interface listResponse<T> {
    data:T[],
    pagination: Pagination
}

