import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorsMessageComponent } from '../../components/form-errors-message/form-errors-message.component';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-post-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorsMessageComponent,
    TooltipModule,
    ToastModule
  ],
  templateUrl: './post-modal.component.html',
  styleUrl: './post-modal.component.scss'
})
export class PostModalComponent
implements OnInit {

  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
  });

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig<{ title: string , body: string , modalTitle: string , btnSubmitTitle: string}>
  ) {}

  modalTitle: string = "";
  btnSubmitTitle: string = "";

  ngOnInit(): void {

    let title = "";
    let body = "";


    if( this.config.data ) {
      title = this.config.data.title;
      body = this.config.data.body;

      this.form.patchValue( { title , body } )

      this.modalTitle = this.config.data.modalTitle;
      this.btnSubmitTitle = this.config.data.btnSubmitTitle || "Guardar";

    }
  }

  get formControls() {
    return this.form.controls;
  }


  onSubmit() {

    if (this.form.valid) {
      this.ref.close(this.form.value);
    }
  }

}
