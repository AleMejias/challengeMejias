import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FakeJwtTokenService } from '../services/fake-jwt-token.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {


  constructor(
    private jwtFakeTokenService: FakeJwtTokenService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('users.json') && req.method === 'POST') {
      const { username, password } = req.body;

      return next.handle(req).pipe(
        map(event => {
          if (event instanceof HttpResponse) {
            const user = event.body.find((element: any) => element.username === username && element.password === password);

            if (user) {

              const fakeToken = this.jwtFakeTokenService.generateFakeJwtToken();
              const userToLocal = JSON.stringify( { ...user , token: fakeToken })
              localStorage.setItem('_ut', userToLocal);

              return event.clone({ body: user });
            } else {
              throw new HttpErrorResponse({
                status: 404,
                statusText: 'Credenciales invalidas'
              });
            }
          }
          return event;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
    }
    const fullUser = this.jwtFakeTokenService.getFromLocalStorage();
    

    if( !fullUser ) {
      return next.handle(req).pipe(
        map((event) => {
          this.router.navigate(['/no-permissions']);
          throw new HttpErrorResponse({
            status: 401,
            statusText: 'Necesitas un token de autorización para operar dentro de la aplicación'
          });
        })
      );
    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
