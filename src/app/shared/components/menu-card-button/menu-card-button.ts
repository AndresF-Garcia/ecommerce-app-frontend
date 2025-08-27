import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'shared-menu-card-button',
  imports: [CurrencyPipe],
  templateUrl: './menu-card-button.html',
  styleUrl: './menu-card-button.css'
})
export class MenuCardButton {

  public cartItems = input.required<Product[]>();
  public cartItemsPriceCount = computed(() => {
    let count = 0;
    this.cartItems().forEach(item => count += item.price);
    return count
  });
}
