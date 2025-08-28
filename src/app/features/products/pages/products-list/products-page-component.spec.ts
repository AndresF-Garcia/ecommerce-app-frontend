import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as CartActions from '../../../cart/store/cart.actions';
import { Product } from '../../../../shared/interfaces/product.interface';
import { initialState as productsInitial } from '../../store/products.reducer';
import { initialState as cartInitial } from '../../../cart/store/cart.reducer';
import ProductsPageComponent from './products-page.component';

describe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPageComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            products: productsInitial,
            cart: cartInitial
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    const fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
  });

  it('should dispatch addToCart action when addToCart is called', () => {
    const product: Product = {
      id: 1,
      title: 'Laptop',
      price: 2000,
      description: 'Desc'
    };

    spyOn(store, 'dispatch');

    component.addToCart(product);

    expect(store.dispatch).toHaveBeenCalledWith(CartActions.addToCart({ product }));
  });
});
