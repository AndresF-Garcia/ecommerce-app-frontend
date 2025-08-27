import { createAction, props } from "@ngrx/store";
import { PagedResult } from "../../../shared/interfaces/pagedResult.interface";
import { Product } from "../../../shared/interfaces/product.interface";

export const loadProducts = createAction('[Products] Load Products', props<{page: number, recordsPerPage: number}>());
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ data: PagedResult<Product> }>());
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{error: any}>());
export const setPage = createAction('[Products] Set Page', props<{page: number}>());
export const setPageSize = createAction('[Products] Set Page Size', props<{pageSize: number}>());
