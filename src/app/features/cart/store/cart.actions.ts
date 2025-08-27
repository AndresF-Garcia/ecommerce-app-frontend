import { createAction, props } from '@ngrx/store';
import { Product } from '../../../shared/interfaces/product.interface';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

export const clearCart = createAction('[Cart] Clear');
