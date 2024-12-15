import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcDiscount',
  standalone: true,
})
export class calcDiscount implements PipeTransform {
  transform(price: number, discount: string | number): number {
    if (!price || price <= 0) {
      return 0;
    }
    if (typeof discount === 'string') {
      if (discount === 'no-discount') {
        return price;
      }
      discount = parseFloat(discount.replace('%', '')) || 0;
    }
    if (typeof discount === 'number' && discount > 0) {
      return price - (price * discount) / 100;
    }
    return price;
  }
}
