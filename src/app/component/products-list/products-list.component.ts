import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DiscountOffers } from '../../Model/DiscountOffers';
import { Store } from '../../Model/store';
import { IProduct } from '../../Model/IProdcut';
import { FormsModule } from '@angular/forms';
import { ImgStyleDirective } from '../../Directives/img-style.directive';
import { RouterModule, Router } from '@angular/router';
import { ICategory } from '../../Model/ICategory';
import { CommonModule } from '@angular/common';
import { calcDiscount } from '../../Pipes/calc-discount-pipe.pipe';
import { ProductsWithApiService } from '../../services/products-api.service';
import { CategoriesApiService } from '../../services/categories-api.service';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [
    FormsModule,
    calcDiscount,
    ImgStyleDirective,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  categories!: ICategory[];
  selectedCategory = 'All';

  showImgs = true;
  constructor(
    public router: Router,
    private prdserviceApi: ProductsWithApiService,
    private catserviceApi: CategoriesApiService
  ) {}
  trackItem(index: number, item: any): any {
    return item.id;  
  }
  productsFiltered: IProduct[] = [];

  ngOnInit(): void {

    this.prdserviceApi.getAllPrds().subscribe((data) => {
      this.productsFiltered = data;
    });

    this.catserviceApi.getAllCats().subscribe((data) => {
      this.categories = data;
    });
  }

  public discount1 = DiscountOffers['no-discount'];
  public discount2 = DiscountOffers['15%'];

  public ClientName = String;

  store1!: Store;

  @Input() set listFilterValue(value: string) {
    this.prdserviceApi.getAllPrds().subscribe((data) => {
      this.productsFiltered = data.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  @Input() set toggleImgs(value: boolean) {
    this.showImgs = value;
  }

  @Input() set listFilterPrice(value: number) {
    this.prdserviceApi.getAllPrds().subscribe((data) => {
      this.productsFiltered = data.filter((product) => product.price <= value);
    });
  }

  isPurshased = false;
  buy() {
    this.isPurshased = true;
  }

  hideBuyProduct(id: string) {

    const product = this.productsFiltered.find((product) => product.id === id);

    if (product) {
      product.quantity--;
    }
    this.productsFiltered = this.productsFiltered.filter(
      (product) => product.id !== id || product.quantity > 0
    );
    this.buy();
  }

  onProductChange(event: Event) {
   
    let value = (event.target as HTMLSelectElement).value;
    this.selectedCategory = value;
    if (value === 'All') {
      this.prdserviceApi.getAllPrds().subscribe((data) => {
        this.productsFiltered = data;
      });
    } else {
      this.prdserviceApi.getPrdsByCatID(+value).subscribe((data) => {
        this.productsFiltered = data;
      });
    }
  }

  getCategoryName(id: number) {
    return this.categories.find((cat) => cat.id === id)?.name;
  }

  date1 = new Date();

  @Output() addPrdsEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  buyProduct(product: IProduct) {
    console.log(product);
    this.hideBuyProduct(product.id);
    this.addPrdsEvent.emit(product);
  }

  goToProductDetails(prodId: string) {
    this.router.navigate(['/product', prodId]);
  }
}
