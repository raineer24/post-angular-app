import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostsService } from "../../../../core/models/services/post.service";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";
import { Content } from "../../../../core/models/content";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.scss"]
})
export class ProductAddComponent implements OnInit {
  isLoadingResults = true;

  contentForm: FormGroup;

  constructor(
    private router: Router,
    private postsService: PostsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  get title() {
    return this.contentForm.get("title");
  }
  get content() {
    return this.contentForm.get("content");
  }

  initForm() {
    this.contentForm = this.fb.group({
      title: ["", Validators.compose([Validators.required])],
      content: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
    this.postsService.getPosts();
  }

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

    this.postsService.addPost(this.contentForm.value).subscribe(posts => {
      console.log(`SAVED SUCCESSFULLY. ${JSON.stringify(posts)}`);
      //this.postForm.reset();
    });
  }
}
