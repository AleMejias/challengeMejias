import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { GenericButtonActions } from './interfaces/generic-button.model';
import { SpinnerService } from '../../services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'generic-button',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.scss'
})
export class GenericButtonComponent
implements OnInit {

  @Input({required: true}) label!: string;
  @Input({required: true}) action!: GenericButtonActions;
  @Input() style : {} = {};
  @Output() buttonEvent = new EventEmitter<GenericButtonActions>();

  sending$!: Observable<boolean>;

  constructor(
    private spinnerService: SpinnerService
  ){}
  ngOnInit(): void {
    this.sending$ = this.spinnerService.sending$;
  }

  onClick(){
    this.buttonEvent.emit( this.action );
  }


}
