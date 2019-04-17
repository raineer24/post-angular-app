import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../post.service";
import { Subscription, Subject, Observable } from "rxjs";
import { Content } from "../post.model";

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
  private posts: Content[];
  private postsUpdated = new Subject<Content[]>();
  constructor(public postsService: PostsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    // this.postsService.refreshNeed$.subscribe(() => {
    //   this.getAllContent();
    // });
    // this.getAllContent();
  }

  get title() {
    return this.postForm.get("title");
  }
  get content() {
    return this.postForm.get("content");
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ["", Validators.compose([Validators.required])],
      content: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
    this.postsService.getPosts();
  }

  // private getAllContent() {
  //   this.postsService
  //     .getPosts()
  //     .subscribe((posts: Content[]) => (this.posts = posts));
  // }

  onSubmit() {
    //const values = this.postForm.value;

    // if (this.postForm.valid) {
    //   const data = {
    //     title: values.title,
    //     content: values.content
    //   };
    //   this.postSubs = this.postsService.addPost(data).subscribe(data => {
    //     console.log(data);
    //   });
    // }

    this.postsService.addPost(this.postForm.value).subscribe(posts => {
      console.log(`SAVED SUCCESSFULLY. ${JSON.stringify(posts)}`);
      this.postForm.reset();
    });
  }
}
