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
  // posts = [
  //     { title: 'First Post', content: 'The most obvious use of this is to put a class name only on certain custom element instances'},
  //     { title: 'Second Post', content: 'and then include the relevant class selector as the function argument'},
  //     { title: 'Third Post', content: 'You can\t use this with a descendant selector expression to select only instances of the custom element that are inside a particular ancestor'},
  // ]
  //posts: Post[] = [];

  contents: Content[];
  private postSub: Subscription;

  constructor(public postsService: PostsService) {
    this.contents = [];
  }

  ngOnInit() {
    // this.posts = this.postsService.getPosts();
    //this.postsService.getPosts();
    // this.postSub = this.postsService
    //   .getPostUpdateListener()
    //   .subscribe((posts: Post[]) => {
    //     this.posts = posts;
    //   });
    this.postsService.getPosts().subscribe((contents: Content[]) => {
      this.contents = contents;
    });
  }
}