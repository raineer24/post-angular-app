import { Content, ContentAdapter } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostsService {
  private baseUrl = environment.apiUrl;
  private posts: Content[] = [];
  private postsUpdated = new Subject<Content[]>();
  // const datum: any;

  constructor(private http: HttpClient, private adapter: ContentAdapter) {}

  //   httpOptions = {
  //     headers: new HttpHeaders({ "Content-Type": "application/json" })
  //   };

  getPosts(): Observable<Content[]> {
    const url = `${this.baseUrl}/api/v1/content`;
    console.log(url);
    return this.http
      .get(url)
      .pipe(map((data: any[]) => data.map(item => this.adapter.adapt(item))));
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(data): Observable<Content> {
    const post: Content = data;
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
    const url = `${this.baseUrl}/api/v1/content`;
    return this.http.post<Content>(url, data);
  }

  // private posts: Post[] = [];
  // private postsUpdated = new Subject<Content[]>();

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
}
