export interface Pagination {
    _limit:number,
    _page:number,
    _totalRows:number
}

export interface Params {
    _limit?:number,
    _page?:number,
    _sort?:string,
    _order?:string,
    gender?:string,
    mark_gte?:number,
    mark_lte?:number,
    [key:string]:any
}

export interface listResponse<T> {
    data:T[],
    pagination: Pagination
}

