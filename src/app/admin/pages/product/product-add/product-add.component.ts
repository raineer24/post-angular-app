import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
  returnUrl: string;
  contentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    this.initForm();
  }

  get title() {
    return this.contentForm.get("title");
  }
  get describlogs() {
    return this.contentForm.get("describlogs");
  }

  initForm() {
    this.contentForm = this.fb.group({
      title: ["", Validators.compose([Validators.required])],
      describlogs: [
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
      let id = posts["content"][0].id;

      this.router.navigate(["/admin/product-detail", id]);
      //this.postForm.reset();
    });
  }
}
