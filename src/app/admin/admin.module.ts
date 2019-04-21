import { NgModule } from "@angular/core";
import { ProductsComponent, AdminComponent } from "./pages";
import { AdminRoutingModule } from "./admin.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule
} from "@angular/material";
import { ProductAddComponent } from "./pages/product/product-add/product-add.component";
import { ProductDetailComponent } from "./pages/product/product-detail/product-detail.component";
import { ProductEditComponent } from "./pages/product/product-edit/product-edit.component";

@NgModule({
  declarations: [
    ProductsComponent,
    AdminComponent,
    ProductAddComponent,
    ProductDetailComponent,
    ProductEditComponent
  ],
  imports: [
    AdminRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class AdminModule {}
