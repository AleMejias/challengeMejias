import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.moldel';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    private http: HttpClient
  ) { }



  getAllPosts(){

    return this.http.get<Post[]>(this.apiUrl)
  }

  add( post: Partial<Post> ) {
    return this.http.post<Post>(this.apiUrl, post)
  }
  update( post: Partial<Post> ) {
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post)
  }
  delete( postId: number ) {
    return this.http.delete<Post>(`${this.apiUrl}/${postId}`)
  }
}
