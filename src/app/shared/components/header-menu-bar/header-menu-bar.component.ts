import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../../core/services/auth.service';
import { FullUser } from '../../../core/interfaces/user';
import { GenericButtonComponent } from '../genericbutton/generic-button.component';
import { GenericButtonActions } from '../genericbutton/interfaces/generic-button.model';
import { Router } from '@angular/router';
import { FakeJwtTokenService } from '../../../core/services/fake-jwt-token.service';

@Component({
  selector: 'header-menu-bar',
  standalone: true,
  imports: [
    CommonModule, 
    BadgeModule,
    AvatarModule,
    MenubarModule,
    GenericButtonComponent
  ],
  templateUrl: './header-menu-bar.component.html',
  styleUrl: './header-menu-bar.component.scss'
})
export class HeaderMenuBarComponent {

  currentUser: FullUser | null =  null;

  constructor(
    private authService: AuthService,
    private fakeJwtTokenService: FakeJwtTokenService,
    private router: Router
  ){

    this.currentUser = this.authService.getCurrentUserFromLocal();

  }

  onButtonEvent(action: GenericButtonActions) {

    switch (action) {
      case 'logout':
        this.fakeJwtTokenService.clearFakeJwtToken();
        this.router.navigateByUrl('signin');
        break;
    }

  }



}
