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
  content: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  getContent(id) {
    this.postsService.getPostId(id).subscribe(data => {
      this.id = data.id;
      this.contentForm.setValue({
        title: data.title,
        content: data.content
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
      content: [null, Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    this.postsService.updateContent(this.id, form).subscribe(
      res => {
        let id = res["id"];
        //console.log(id);

        this.router.navigate(["/admin/product-details", id]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
