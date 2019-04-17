import { Component, OnInit, Input } from "@angular/core";
import { Content } from "../post.model";
import { PostsService } from "../post.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-post-list",
  templateUrl: "post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  contents: Content[];

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.refreshNeed$.subscribe(() => {
      this.getAllContent();
    });

    this.getAllContent();
  }

  private getAllContent() {
    this.postsService
      .getPosts()
      .subscribe((posts: Content[]) => (this.contents = posts));
  }
}
