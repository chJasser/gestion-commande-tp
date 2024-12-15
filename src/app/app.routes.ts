import { Routes } from '@angular/router';
import { ProductsParentComponent } from './component/products-parent/products-parent.component';
import { MainComponent } from './component/main/main.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { GroupRoutesComponent } from './component/group-routes/group-routes.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ProductsDashboardComponent } from './component/admin/products-dashboard/products-dashboard.component';
export const routes: Routes = [
  {
    path: '',
    component: GroupRoutesComponent,
    children: [
      {
        path: 'products',
        component: ProductsParentComponent,
        title: 'Products',
      },
      {
        path: 'product/:prdId',
        component: ProductDetailsComponent,
        title: 'Product Details',
      },
      { path: 'home', component: MainComponent, title: 'Home' },
      { path: 'contactus', component: ContactUsComponent, title: 'Contact Us' },

      {
        path: 'admin/insertproduct',
        component: AddProductComponent,
        title: 'Add Product',
      },
      {
        path: 'admin/products',
        component: ProductsDashboardComponent,
        title: 'Products Dashboard',
      },

      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  // { path: 'aboutus', component: AboutUsComponent, title: 'About Us' },
  // { path: 'products', component: ProductsParentComponent, title: 'Products' },
  // { path: 'products/:id', component: ProductsListComponent, title: 'Product' },
  // { path: '', component: MainComponent, title: 'Home' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
