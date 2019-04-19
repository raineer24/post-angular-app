import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent, AdminComponent } from "./pages";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    pathMatch: "prefix",
    children: [{ path: "products", component: ProductsComponent }]
  },
  {
    path: "",
    redirectTo: "admin/products",
    pathMatch: "full"
  }
];

// /app/src/admin/pages/admin.component.ts

// /app/src/admin/pages/rights/rights.component.ts

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
