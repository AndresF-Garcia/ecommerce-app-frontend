import { Component, input, output } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'product-item-card',
  imports: [],
  templateUrl: './product-item-card.html',
  styles: ``
})
export class ProductItemCard {

  public product = input.required<Product>();
  public onAddToCart = output<Product>();

  public addToCart(): void {
    this.onAddToCart.emit(this.product());
  }

}
