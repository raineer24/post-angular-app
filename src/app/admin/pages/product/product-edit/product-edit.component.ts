import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { PostsService } from "../../../../core/models/services/post.service";
import { Content } from "../../../../core/models/content";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"]
})
export class ProductEditComponent implements OnInit {
  contentForm: FormGroup;
  id: string = "";
  title: string = "";
  describlogs: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getContent(this.route.snapshot.params["id"]);
    this.initForm();
    console.log(this.contentForm.value);
    console.log(this.route.snapshot.params["id"]);
    console.log(this.route.snapshot.params);
  }

  getContent(id) {
    this.postsService.getPostId(id).subscribe((data: Content[]) => {
      console.log(data[0]);
      console.log(data);

      this.id = data[0].id;
      console.log(this.id);

      console.log(this.contentForm.value);

      this.contentForm.setValue({
        title: data[0].title,
        describlogs: data[0].describlogs
      });
    });
  }

  // get title() {
  //   return this.contentForm.get("title");
  // }
  // get content() {
  //   return this.contentForm.get("content");
  // }

  initForm() {
    this.contentForm = this.fb.group({
      title: [null, Validators.required],
      describlogs: [null, Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    this.postsService.updateContent(this.id, form).subscribe(
      res => {
        console.log(res);
        let id = res["id"];

        this.router.navigate(["/admin/product-detail", id]);
      },
      err => {
        console.log(err);
      }
    );
  }
}