import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { GenericTableColumns } from './interfaces/generic-table.model';
import { GenericButtonComponent } from "../genericbutton/generic-button.component";
import { FadeInAnimation } from '../../animations/generic-table.animations';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { PaginatorModule, PaginatorState  } from 'primeng/paginator';
import { GenericButtonActions } from '../genericbutton/interfaces/generic-button.model';
import { FullUser, Roles } from '../../../core/interfaces/user';
import { FakeJwtTokenService } from '../../../core/services/fake-jwt-token.service';
import { Post } from '../../../interfaces/post.moldel';
import { SpinnerService } from '../../services/spinner.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'generictable',
  standalone: true,
  animations: [
    FadeInAnimation
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    TagModule,
    SliderModule,
    DropdownModule,
    ButtonModule,
    GenericButtonComponent,
    TooltipModule,
    PaginatorModule
],
  templateUrl: './generictable.component.html',
  styleUrl: './generictable.component.scss'
})
export class GenerictableComponent<T>
implements OnInit {

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  @Input({required: true}) cols: GenericTableColumns[] = [];

  @Input({required: true}) data: T[] = [];
  @Input() paginator: boolean = false;
  @Input() totalRecords: number = 0;

  @Output() searchEvent = new EventEmitter<string>();
  @Output() addNewEvent = new EventEmitter<void>();
  @Output() editRowEvent = new EventEmitter<Post>();
  @Output() deleteRowEvent = new EventEmitter<Post>();
  @Output() paginationEvent = new EventEmitter<PaginatorState>();

  currentPage: number = 0;
  rows: number = 10;
  roles = Roles
  currentFullUser!: FullUser | null;
  searchValue: string | undefined = "";

  sending$!: Observable<boolean>;


  constructor(
    private fakeJwtTokenService: FakeJwtTokenService,
    private spinnerService: SpinnerService
  ){}
  
  ngOnInit(): void {
    this.currentFullUser =  this.fakeJwtTokenService.getFromLocalStorage();
    this.sending$ = this.spinnerService.sending$;
  }


  clear(table: Table) {
      table.clear();
      this.searchValue = ''
  }

  onInput(event: Event){
    this.searchValue = (event.target as HTMLInputElement).value;
    if( this.searchValue.length === 0 ) {
      this.searchEvent.emit( this.searchValue );
    }else if( this.searchValue.trim().length === 0 ) { return; }

    this.searchEvent.emit( this.searchValue );
  }

  onPageChange(event: PaginatorState) {

    this.currentPage = event?.first || 0;
    this.rows = event?.rows || 10;

    this.paginationEvent.emit( event );
  }


  onClick(action: GenericButtonActions) {

    if( action === 'clear' ) {
      this.searchValue = "";
      this.searchEvent.emit( this.searchValue );
    }else if( action === 'add' ) {
      this.addNewEvent.emit();
    }
  }

  onEdit( row: Post ){
    this.editRowEvent.emit( row );
  }
  onDelete( row: Post ){
    this.deleteRowEvent.emit( row );
  }

 

}
