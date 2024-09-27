import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LoginRequest } from '../interfaces/auth';
import { FullUser, User } from '../interfaces/user';
import { Post } from '../../interfaces/post.moldel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = "assets/users.json";

  constructor(
    private http: HttpClient
  ) {}

  login( credentials: LoginRequest ): Observable<User> {
    return this.http.post<User>(this.usersUrl,credentials)
    .pipe(
      delay(2500)
    )
  }


  getCurrentUserFromLocal(){


    const fullUser = localStorage.getItem('_ut');


    if( fullUser ) { return JSON.parse( fullUser ) as FullUser; }

    return null;


  }

}
