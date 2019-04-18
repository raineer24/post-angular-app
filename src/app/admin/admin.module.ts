import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin.routing.module";
import { AdminComponent, ProductComponent } from "./pages";

@NgModule({
  declarations: [AdminComponent, ProductComponent],
  imports: [AdminRoutingModule],
  providers: []
})
export class AdminModule {}
