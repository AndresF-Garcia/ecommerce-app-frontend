import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuCardButton } from "../../shared/components/menu-card-button/menu-card-button";
import { MenuProfileButton } from "../../shared/components/menu-profile-button/menu-profile-button";
import { Product } from '../../shared/interfaces/product.interface';
import { CartState } from '../../features/cart/store/cart.reducer';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  templateUrl: 'main-layout.component.html',
  imports: [RouterOutlet, MenuCardButton, MenuProfileButton]
})

export default class MainLayoutComponent{

  private store = inject(Store<{cart: CartState}>);

  public cartItems = toSignal(this.store.select(s => s.cart.items), { initialValue: [] });

  constructor() { }
}
