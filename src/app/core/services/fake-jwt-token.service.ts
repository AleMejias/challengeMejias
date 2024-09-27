import { Injectable } from '@angular/core';
import { FullUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FakeJwtTokenService {

  constructor() { }


  getFromLocalStorage(): FullUser | null{
    const token = localStorage.getItem('_ut');


    if( token ) { return JSON.parse(token) as FullUser; }

    return null;

  }

  clearFakeJwtToken(){
    localStorage.clear();
  }

  generateFakeJwtToken() {
    const timestamp = Date.now(); // Genero un timestamp
    const randomValue = Math.random().toString(36).substring(2); // tomo el timestamp , lo transformo a base 36 y extraigo los dos primeros caracteres ( 0.imsyvk9yoj9) 
    return `${timestamp}${randomValue}`;
  }



}
