import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../post.service";
import { Subscription, Subject, Observable } from "rxjs";
import { Content, ContentAdapter } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  postForm: FormGroup;
  postSubs: Subscription;
  private posts: Content[] = [];
  private postsUpdated = new Subject<Content[]>();
  constructor(public postsService: PostsService, private fb: FormBuilder) {}

  initForm() {
    this.postForm = this.fb.group({
      title: ["", Validators.compose([Validators.required])],
      content: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  onSubmit() {
    const values = this.postForm.value;

    if (this.postForm.valid) {
      const data = {
        title: values.title,
        content: values.content
      };
      this.postSubs = this.postsService.addPost(data).subscribe(data => {
        //  const error = data.error;
        console.log(data);
        this.posts.push(data);
        this.postsUpdated.next([...this.posts]);
        console.log(...this.posts);
      });
    }
  }

  // private postsUpdated = new Subject<Post[]>();

  // getPosts() {
  //     return [...this.posts];
  // }
  // getPostUpdateListener() {
  //     return this.postsUpdated.asObservable();
  // }

  // addPost(title: string, content: string) {
  //     const post: Post = { title: title, content: content };
  //     this.posts.push(post);
  //     this.postsUpdated.next([...this.posts]);
  // }

  ngOnInit() {
    this.initForm();
  }
}
