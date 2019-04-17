import { Component } from "@angular/core";
import { Content } from "./posts/post.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  storedPosts: Content[] = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
    console.log(this.storedPosts);
  }
}
