import { inject, Injectable } from "@angular/core";
import { ProductService } from "../../../core/services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductActions from "./products.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class ProductsEffects {

  private productService = inject(ProductService);
  private actions$ = inject(Actions);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(action =>

        this.productService.getProducts(action.page, action.recordsPerPage).pipe(
          map(res => {
              if (res.success && res.data) {
                return ProductActions.loadProductsSuccess({ data: res.data });
              }
              return ProductActions.loadProductsFailure({ error: res.message })
            }
          ),
          catchError(err =>
            of(ProductActions.loadProductsFailure({ error: err }))
          )
        )

      )
    )
  );

}
