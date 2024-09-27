import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _loadingLayout = new BehaviorSubject<boolean>(false);
  public loadingLayout$ = this._loadingLayout.asObservable();

  private _sending = new BehaviorSubject<boolean>(false);
  public sending$ = this._sending.asObservable();


  constructor() { }



  set displayLayoutSpinner( status: boolean ) {
    this._loadingLayout.next( status );
  }
  set displaySendingSpinner( status: boolean ) {
    this._sending.next( status );
  }
}
