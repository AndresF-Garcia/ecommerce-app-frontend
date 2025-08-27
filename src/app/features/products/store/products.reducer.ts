import { createReducer, on } from "@ngrx/store";
import { Product } from "../../../shared/interfaces/product.interface";
import * as ProductsActions  from "./products.actions";

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: any;
  page: number;
  recordsPerPage: number;
  total: number;
}

export const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  recordsPerPage: 10,
  total: 0
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state, { page, recordsPerPage }) => ({
    ...state,
    loading: true,
    page,
    recordsPerPage
  })),

  on(ProductsActions.loadProductsSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    items: data.items,
    total: data.totalCount
  })),

  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProductsActions.setPage, (state, { page }) => ({
    ...state,
    page
  })),

  on(ProductsActions.setPageSize, (state, { pageSize }) => ({
    ...state,
    recordsPerPage: pageSize
  }))
);
