import { Component, Input } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { calcDiscount } from '../../Pipes/calc-discount-pipe.pipe';
import { DashFourNumbersPipe } from '../../Pipes/dash-four-numbers.pipe';
@Component({
  selector: 'products-parent',
  standalone: true,
  imports: [
    ProductsListComponent,
    CommonModule,
    FormsModule,
    calcDiscount,
    DashFourNumbersPipe,
  ],
  templateUrl: './products-parent.component.html',
  styleUrl: './products-parent.component.scss',
})
export class ProductsParentComponent {
  constructor() {}

  ngOnInit(): void {}

  listFilterValue: string = '';
  listFilterPrice: number = 0;
  showImgs = true;

  toggleImgs() {
    this.showImgs = !this.showImgs;
  }

  clearFilters(): void {
    this.listFilterValue = '';
    this.listFilterPrice = 0;
  }

  cart: any[] = [];

  addFunProd(product: any) {
    if (this.cart.indexOf(product) == -1) {
      console.log('not in cart');
      product.numOnCart = 1;
      this.cart.push(product);
    } else {
      console.log('already in cart');
      product.numOnCart++;
    }
    console.log(this.cart);
  }


  removeFromCart(id: number) {
    console.log(id);
    this.cart.splice(this.cart.indexOf(id), 1);
  }
  calcTotal() {
    let total = 0;
    this.cart.forEach((element) => {
      let discount = 0;
      if (typeof element.discount === 'string') {
        if (element.discount !== 'no-discount') {
          discount = parseFloat(element.discount.replace('%', '')) || 0;
        }
      } else if (typeof element.discount === 'number') {
        discount = element.discount;
      }
      const discountedPrice = element.price - (element.price * discount) / 100;
      total += discountedPrice * element.numOnCart;
    });
    return total;
  }
  

  calcDiscount(discount: number, price: number) {
    return price - (price * discount) / 100;
  }
}
