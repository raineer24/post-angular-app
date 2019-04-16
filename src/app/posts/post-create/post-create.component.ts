import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../post.service";
import { Subscription } from "rxjs";

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
        //  if (error)
      });
    }
  }

  // onAddPost(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.postsService.addPost(form.value.title);
  //   form.resetForm();
  // }

  ngOnInit() {
    this.initForm();
  }
}
