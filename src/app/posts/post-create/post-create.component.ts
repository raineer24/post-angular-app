import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../post.service";
import { Subscription, Subject, Observable } from "rxjs";
import { Content } from "../post.model";
import { ImageService } from "../image.service";
import {
  FileUploader,
  FileSelectDirective
} from "ng2-file-upload/ng2-file-upload";
import { environment } from "../../../environments/environment";

class ImageSnippet {
  pending: boolean = false;
  status: string = "init";
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  selectedFile: ImageSnippet;
  private baseUrl = environment.apiUrl;
  private urlUpload = `${this.baseUrl}/api/v1/content/upload`;

  public uploader: FileUploader = new FileUploader({
    url: this.urlUpload,
    itemAlias: "image"
  });
  enteredTitle = "";
  enteredContent = "";
  postForm: FormGroup;
  postSubs: Subscription;
  private posts: Content[];
  private postsUpdated = new Subject<Content[]>();
  constructor(
    public postsService: PostsService,
    private fb: FormBuilder,
    private imageService: ImageService
  ) {}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = "ok";
  }
  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = "fail";
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        res => {
          this.onSuccess();
        },
        err => {
          this.onError();
        }
      );
    });

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.initForm();
    // this.postsService.refreshNeed$.subscribe(() => {
    //   this.getAllContent();
    // });
    // this.getAllContent();
    // this.uploader.onAfterAddingFile = file => {
    //   file.withCredentials = false;
    // };
    // this.uploader.onCompleteItem = (
    //   item: any,
    //   response: any,
    //   status: any,
    //   headers: any
    // ) => {
    //   console.log("FileUpload:uploaded:", item, status, response);
    //   alert("File uploaded successfully");
    // };
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
    });
  }
}
