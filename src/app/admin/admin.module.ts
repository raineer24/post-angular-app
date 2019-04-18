import { NgModule } from "@angular/core";
import { ProductsComponent, AdminComponent } from "./pages";
import { AdminRoutingModule } from "./admin.routing.module";

@NgModule({
  declarations: [ProductsComponent, AdminComponent],
  imports: [AdminRoutingModule],
  providers: []
})
export class AdminModule {}
