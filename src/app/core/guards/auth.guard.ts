import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FakeJwtTokenService } from '../services/fake-jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private fakeJwtTokenService: FakeJwtTokenService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.fakeJwtTokenService.getFromLocalStorage()) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
