import { Component, OnInit } from "@angular/core";
import { PostsService } from "../../../../core/models/services/post.service";
import { Content } from "../../../../core/models/content";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  content: Content[] = [];
  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute,
    public postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.params["id"]);
    this.getContentDetail(this.route.snapshot.params["id"]);
    
  }

  getContentDetail(id) {
    this.postsService.getPostId(id).subscribe((res: Content[]) => {
      this.content = res;
      //console.log(res["blogs"]);
      console.log(this.content);
    });
  }

  deleteContent(id) {
    this.postsService.removeContent(id).subscribe(
      res => {
        console.log(res);
        this.router.navigate(["/admin/products"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
