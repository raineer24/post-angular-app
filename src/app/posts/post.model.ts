import { Injectable } from "@angular/core";
export interface Post {
  title: string;
  content: string;
}

export interface Adapter<T> {
  adapt(item: any): T;
}

export class Content {
  constructor(
    public id: number,
    public title: string,
    public content: string
  ) {}
}
@Injectable({
  providedIn: "root"
})
export class ContentAdapter {
  adapt(item: any): Content {
    return new Content(item.id, item.title, item.content);
  }
}
