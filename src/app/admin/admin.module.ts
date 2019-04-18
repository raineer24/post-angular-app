import { NgModule } from "@angular/core";
import { ProductsComponent, AdminComponent } from "./pages";
import { AdminRoutingModule } from "./admin.routing.module";
import { MatTableModule, MatButtonModule } from "@angular/material";
import { ProductAddComponent } from "./pages/product/product-add/product-add.component";

@NgModule({
  declarations: [ProductsComponent, AdminComponent, ProductAddComponent],
  imports: [AdminRoutingModule, MatTableModule, MatButtonModule],
  providers: []
})
export class AdminModule {}
