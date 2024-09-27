import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { passwordMinLength } from '../../../helpers/formValidators/password.validations';
import { FormErrorsMessageComponent } from '../../../shared/components/form-errors-message/form-errors-message.component';
import { AuthService } from '../../../core/services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipModule,
    ToastModule,
    FormErrorsMessageComponent,
    ProgressSpinnerModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export default class SigninComponent
implements OnInit {


  public form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, passwordMinLength(3)]),
  });

  sending$!: Observable<boolean>;


  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    
    this.sending$ = this.spinnerService.sending$;

  }

  get formControls() {
    return this.form.controls;
  }


  onSubmit() {

    this.spinnerService.displaySendingSpinner = true;
    const { username, password } = this.form.value;

    if (!username || !password) { return; }
    this.authService.login({ username, password }).subscribe({
      next: (resp) => {
        this.spinnerService.displaySendingSpinner = false;
        this.router.navigateByUrl('post')
      },
      error: (error) => {
        const [, message] = `${error.message}`.split('404 ');
        this.spinnerService.displaySendingSpinner = false;
        this.messageService.add({severity: 'error' ,detail: message });
      }
    });
  }

}
