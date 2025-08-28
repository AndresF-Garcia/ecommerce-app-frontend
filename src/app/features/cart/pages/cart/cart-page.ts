import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartItem, CartState } from '../../store/cart.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../../store/cart.actions';
import { removeFromCart } from '../../store/cart.actions';

@Component({
  selector: 'app-cart-page',
  imports: [],
  templateUrl: './cart-page.html'
})
export default class CartPageComponent {

  private store = inject(Store<{cart: CartState}>);

  public cartItems = toSignal<CartItem[]>(this.store.select(s => s.cart.items));

  public removeOneItem(id: number) {
    this.store.dispatch(CartActions.removeOneItem({ productId: id }));
  }

  public addOneItem(id: number) {
    this.store.dispatch(CartActions.addOneItem({ productId: id }));
  }

  public removeItem(id: number) {
    this.store.dispatch(CartActions.removeFromCart({ productId: id }));
  }

}
