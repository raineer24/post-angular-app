import { Content } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ImageService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();
    const url = `${this.baseUrl}/api/v1/content/upload`;
    formData.append("image", image);

    return this.http.post<any>(url, formData);
  }

  // addPost(content: Content): Observable<Content> {
  //   // const post: Content = data;
  //   // this.posts.push(post);
  //   // this.postsUpdated.next([...this.posts]);
  //   const url = `${this.baseUrl}/api/v1/content`;
  //   return this.http.post<Content>(url, content).pipe(
  //     tap(() => {
  //       this._refreshNeeded$.next();
  //     })
  //   );
  // }
}
