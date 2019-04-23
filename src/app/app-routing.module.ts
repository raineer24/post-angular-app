import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostListComponent } from "./posts/post-list/post-list.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./admin/admin.module#AdminModule"
  }
  // {
  //   path: "admin",
  //   redirectTo: "/admin",
  //   pathMatch: "full"
  // }
  //{ path: "admin", loadChildren: "./admin/admin.module#AdminModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
