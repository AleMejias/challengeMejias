import { Component } from '@angular/core';
import { GenericButtonComponent } from '../../../shared/components/genericbutton/generic-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-permissions',
  standalone: true,
  imports: [
    GenericButtonComponent,
  ],
  templateUrl: './no-permissions.component.html',
  styleUrl: './no-permissions.component.scss'
})
export default class NoPermissionsComponent {

  constructor(
    private router: Router
  ){}


  onClick( action: string ) {


    this.router.navigate(['/signin']);

  }

}
