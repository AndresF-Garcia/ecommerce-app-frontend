import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Product } from '../../../shared/interfaces/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,

  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.items.find(i => i.product.id === product.id);

    if(existingItem) {
      return {
        items: [...state.items.filter(i => i.product.id !== product.id), { product, quantity: existingItem.quantity + 1 }]
      }
    }

    return {
        items: [...state.items, { product, quantity: 1 }]
    };
  }),

  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(i => i.product.id !== productId)
  })),

  on(CartActions.clearCart, state => ({
    ...state,
    items: []
  }))
);
