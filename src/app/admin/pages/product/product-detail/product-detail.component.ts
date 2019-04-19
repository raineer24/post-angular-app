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
  content: Content = { id: "", title: "", content: "" };

  constructor(
    private route: ActivatedRoute,
    public postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.params["id"]);
  }
}
