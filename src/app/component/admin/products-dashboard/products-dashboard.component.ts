import { Component } from '@angular/core';
import { IProduct } from '../../../Model/IProdcut';
import { ProductsWithApiService } from '../../../services/products-api.service';

import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products-dashboard',
  standalone: true,
  imports: [NgxPaginationModule,CommonModule ],
  templateUrl: './products-dashboard.component.html',
  styleUrl: './products-dashboard.component.scss',
})
export class ProductsDashboardComponent {
  products: IProduct[] = [];
  p: number = 1; 
  message: string | null = null;  
  success: boolean = true;     
  constructor(
    private productsService: ProductsWithApiService,
    private router: Router
  ) {
    this.productsService.getAllPrds().subscribe((products) => {
      this.products = products;
    });
  }
  showMessage(msg: string, isSuccess: boolean): void {
    this.message = msg;
    this.success = isSuccess;
  }
  deleteProduct(id: string) {
    this.productsService.deletePrd(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
      const success = true; // or false if deletion fails
      const message = success ? 'Produit supprimé avec succès.' : 'Erreur lors de la suppression du produit.';
      this.showMessage(message, success);
    
    });
  }
  confirmDelete(productId: string): void {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      this.deleteProduct(productId);
    }
  }

  updateProduct(id: string) {
    this.router.navigate([`/add-product/${id}`]);
  }
  pageChanged(page: number): void {
    this.p = page; 
  }
}
