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
  contents: Content[] = [];
  editContent: Content;

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

  private removePost(id: number) {
    this.postsService
      .removeContent(id)
      .subscribe(() => console.log(`${id} deleted`), error => alert(error));
  }

  edit(content) {
    this.editContent = content;
    console.log("tae");
  }
  // updateContent() {
  //   if (this.editContent) {
  //     this.postsService.updateContent(this.editContent).subscribe(content => {
  //       const ix = content
  //         ? this.contents.findIndex(c => c.id === content.id)
  //         : -1;
  //       if (ix > -1) {
  //         this.contents[ix] = content;
  //       }
  //     });
  //     this.editContent = undefined;
  //   }
  // }
}
