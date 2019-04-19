import { NgModule } from "@angular/core";
import { ProductsComponent, AdminComponent } from "./pages";
import { AdminRoutingModule } from "./admin.routing.module";
import { MatTableModule, MatButtonModule } from "@angular/material";
import { ProductAddComponent } from "./pages/product/product-add/product-add.component";
import { ProductDetailComponent } from "./pages/product/product-detail/product-detail.component";

@NgModule({
  declarations: [
    ProductsComponent,
    AdminComponent,
    ProductAddComponent,
    ProductDetailComponent
  ],
  imports: [AdminRoutingModule, MatTableModule, MatButtonModule],
  providers: []
})
export class AdminModule {}
