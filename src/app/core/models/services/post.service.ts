import { Content } from "../content";
import { Injectable } from "@angular/core";
import { Subject, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { map, tap, catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostsService {
  private baseUrl = environment.apiUrl;
  private posts: Content[] = [];
  // private postsUpdated = new Subject<Content[]>();
  // const datum: any;

  constructor(private http: HttpClient) {}

  //   httpOptions = {
  //     headers: new HttpHeaders({ "Content-Type": "application/json" })
  //   };

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeed$() {
    return this._refreshNeeded$;
  }

  getPosts(): Observable<any> {
    const url = `${this.baseUrl}`;
    console.log(url);
    return this.http.get(url).pipe(
      map(response => {
        return response["blogs"];
      })
    );
  }
  // getPostUpdateListener() {
  //   return this.postsUpdated.asObservable();
  // }

  addPost(content: Content): Observable<Content> {
    // const post: Content = data;
    // this.posts.push(post);
    // this.postsUpdated.next([...this.posts]);
    const url = `${this.baseUrl}`;
    return this.http.post<Content>(url, content).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  removeContent(id: number) {
    const url = `${this.baseUrl}/${id}`;
    console.log(url);

    return this.http.delete(url).pipe(
      tap(() => {
        this._refreshNeeded$.next();
        console.log(`deleted Product id=${id}`);
      })
    );
  }

  updateContent(id, content): Observable<any> {
    const url = `${this.baseUrl}${id}`;
    console.log(url);

    return this.http.put(url, content).pipe(
      // tap(_ => console.log(`updated content id =${id}`)),
      map(response => {
        console.log(response);

        console.log(`fetched product id=${id}`);
        console.log(response["content"]);

        return response["props"];
      }),
      catchError(this.handleError<any>("updateContent"))
    );
  }

  getPostId(id: number) {
    const url = `${this.baseUrl}${id}`;

    return this.http.get(url).pipe(
      // tap(() => {
      //   this._refreshNeeded$.next();
      //   console.log(`fetched product id=${id}`);
      // })
      map(response => {
        console.log(`fetched product id=${id}`);
        // console.log(response["content"]);

        return response["content"];
      })
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
