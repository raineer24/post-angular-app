import { Component, OnInit, Input } from "@angular/core";
import { PostsService } from "../../../core/models/services/post.service";
import { Content } from "../../../core/models/content";
@Component({
  selector: "app-products",
  templateUrl: "products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ["title", "content"];
  data: Content[] = [];
  isLoadingResults = true;
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe(
      res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
      }
    );
  }
}
