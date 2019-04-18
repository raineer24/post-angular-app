import { NgModule } from "@angular/core";
import { ProductsComponent, AdminComponent } from "./pages";
import { AdminRoutingModule } from "./admin.routing.module";
import { MatTableModule } from "@angular/material";

@NgModule({
  declarations: [ProductsComponent, AdminComponent],
  imports: [AdminRoutingModule, MatTableModule],
  providers: []
})
export class AdminModule {}
