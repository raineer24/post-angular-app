import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent, AdminComponent } from "./pages";
import { ProductAddComponent } from "./pages/product/product-add/product-add.component";
import { ProductDetailComponent } from "./pages/product/product-detail/product-detail.component";
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    pathMatch: "prefix",
    children: [
      { path: "products", component: ProductsComponent },
      { path: "product-add", component: ProductAddComponent },
      { path: "product-detail", component: ProductDetailComponent }
    ]
  }
  // {
  //   path: "",
  //   redirectTo: "admin/products",
  //   pathMatch: "full"
  // },
  // {
  //   path: "",
  //   redirectTo: "admin/add-product",
  //   pathMatch: "full"
  // }
];

// /app/src/admin/pages/admin.component.ts

// /app/src/admin/pages/rights/rights.component.ts

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
