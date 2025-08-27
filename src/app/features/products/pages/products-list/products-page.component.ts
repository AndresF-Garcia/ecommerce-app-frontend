import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsState } from '../../store/products.reducer';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductItemCard } from "../../components/product-item-card/product-item-card";
import { Product } from '../../../../shared/interfaces/product.interface';
import { loadProducts } from '../../store/products.actions';
import * as ProductsActions from '../../store/products.actions';
import * as CartActions from '../../../cart/store/cart.actions';
import { CartState } from '../../../cart/store/cart.reducer';

@Component({
  selector: 'app-products-page',
  imports: [ProductItemCard],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsPageComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private store = inject(Store<{products: ProductsState, cart: CartState}>);

  private page: Signal<number> = toSignal(this.store.select(s => s.products.page), { initialValue: 1 });
  private pageSize: Signal<number> = toSignal(this.store.select(s => s.products.recordsPerPage), { initialValue: 10 });

  public products = toSignal(this.store.select(s => s.products.items));
  public loading = toSignal(this.store.select(s => s.products.loading));

  constructor() {
    this.ensureUrlParams();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private ensureUrlParams() {
    this.route.queryParams.subscribe(params => {
      const page = (params['page'] ?? 1);
      const pageSize = (params['pageSize'] ?? 10);

      //redirige automáticamente si no están definidos
      if (!params['page'] || !params['pageSize']) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: this.page, pageSize: this.pageSize },
          queryParamsHandling: 'merge'
        });
      }

      this.store.dispatch(ProductsActions.setPage({ page }));
      this.store.dispatch(ProductsActions.setPageSize({ pageSize }));
      this.loadProducts();
    });
  }

  public loadProducts() {
    this.store.dispatch(loadProducts({ page: this.page(), recordsPerPage: this.pageSize() }));
  }

  public addToCart(product: Product) {
    this.store.dispatch(CartActions.addToCart({ product }));
  }

  public nextPage() {
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: Number(this.page()) + 1, pageSize: 10 },
        queryParamsHandling: 'merge'
    });
  }

  public prevPage() {
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: Math.max(1, Number(this.page()) - 1), pageSize: 10 },
        queryParamsHandling: 'merge'
    });
  }

}
