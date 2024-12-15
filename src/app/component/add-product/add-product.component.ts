import { Component } from '@angular/core';
import { IProduct } from '../../Model/IProdcut';
import { IMaterial } from '../../Model/IMaterial';
import { ProductsWithApiService } from '../../services/products-api.service';
import { CategoriesApiService } from '../../services/categories-api.service';
import { MaterialsApiService } from '../../services/materials-api.service';
import { ICategory } from '../../Model/ICategory';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, JsonPipe,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  product!: IProduct;
  categories!: ICategory[];
  materials!: IMaterial[];
  isFormSubmitted = false;
  successMessage: string = '';  // Add success message variable

  constructor(
    private productService: ProductsWithApiService,
    private categoryService: CategoriesApiService,
    private materialService: MaterialsApiService
  ) {
    this.product = {
      id: Math.floor(Math.random() * 1000).toString(),
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      img: '',
      categoryId: 0,
      material: '',
      discount: 10,
    };

    this.categoryService.getAllCats().subscribe((data) => {
      this.categories = data;
    });

    this.materialService.getAllMaterials().subscribe((data) => {
      this.materials = data;
    });
  }

  addProduct() {
    this.productService.addPrd(this.product).subscribe(
      (data) => {
        console.log(data);
        this.successMessage = 'Product added successfully!';  // Set success message
        setTimeout(() => {
          this.successMessage = ''; // Clear the message after 5 seconds
        }, 5000);
      },
      (error) => {
        console.error('Error adding product', error);
      }
    );
  }
}
