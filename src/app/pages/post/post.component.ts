import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderMenuBarComponent } from '../../shared/components/header-menu-bar/header-menu-bar.component';
import { GenerictableComponent } from '../../shared/components/genericTable/generictable.component';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.moldel';
import { GenericTableColumns } from '../../shared/components/genericTable/interfaces/generic-table.model';
import { SpinnerService } from '../../shared/services/spinner.service';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import {PaginatorState  } from 'primeng/paginator';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PostModalComponent } from '../../shared/modals/post-modal/post-modal.component';
import { MessageService } from 'primeng/api';
import { buildUserId } from '../../helpers/max-id-generator';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    HeaderMenuBarComponent,
    GenerictableComponent,
    DynamicDialogModule,
    SpinnerComponent,
    ToastModule
  ],
  providers: [
    MessageService,
    DialogService
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export default class PostComponent
implements OnInit {

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private postService: PostsService,
    private spinnerService: SpinnerService
  ){}

  posts: Post[] = [];
  genericTableData: Post[] = [];
  cols: GenericTableColumns[] = [
    {
      field : 'id',
      header: 'Id'
    },
    {
      field : 'title',
      header: 'Título'
    },
    {
      field : 'body',
      header: 'Descripción'
    }
  ]

  currentPage: number = 0;
  rows: number = 10;

  searchValue: string = "";


  loadingLayout$!: Observable<boolean>;

  ngOnInit(): void {
    this.loadingLayout$ = this.spinnerService.loadingLayout$;
    this.spinnerService.displayLayoutSpinner = true;

    this.postService.getAllPosts().subscribe({
      next: ( resp ) => {
        this.posts = resp;
        this.genericTableData = this.posts.slice( 0 , 10 );

        this.spinnerService.displayLayoutSpinner = false;
      },
      error: ( error ) => {
        this.spinnerService.displayLayoutSpinner = false;
      }
    })
    
  }

  onFilter( value: string ) {
    this.searchValue = value.toLowerCase();
    
    const from = this.currentPage * 10;
    const to = from + 10;
    
    if( value.length === 0 ) {

      this.genericTableData = this.posts.slice( from, to );
      return;
    }

    this.refreshTable();

  }

  onPagination( pagination: PaginatorState ) {

    this.currentPage = pagination.page!;
    this.rows = pagination.rows!;

    this.refreshTable()

  }

  onDeletePost( post: Post ) {
    this.spinnerService.displaySendingSpinner = true;
    this.postService.delete( post.id ).subscribe({
      next: ( resp ) => {

        this.messageService.add({severity: 'success' ,detail: `Post #${post.id} eliminado correctamente!` });

        this.posts = this.posts.filter(( element ) => element.id !== post.id);
        this.refreshTable();
        this.spinnerService.displaySendingSpinner = false;

      },
      error: ( error ) => {
        const [, message] = `${error.message}`.split('404 ');
        this.spinnerService.displaySendingSpinner = false;
        this.messageService.add({severity: 'error' ,detail: message });
      } 
    })

  }
  onEditPost( post: Post ) {

    const ref = this.dialogService.open(PostModalComponent, {
      data: { modalTitle: 'Editar post' , btnSubmitTitle: 'Editar' ,title: post.title , body: post.body}
    });

    ref.onClose.subscribe((data: any) => {
      if (data) {
        this.spinnerService.displaySendingSpinner = true;
        const request: Post = {
          body: data.body,
          title: data.title,
          userId: post.userId,
          id: post.id
        }
        this.postService.update(request).subscribe({
          next: ( resp ) => {

            this.messageService.add({severity: 'success' ,detail: `Post #${post.id} editado correctamente!` });

            this.posts = this.posts.map(( element ) => {

              if( element.id  === post.id) {
                element.body = resp.body
                element.title = resp.title
                return { ...element }
              }

              return element;

            })
            this.posts.push( resp );
            this.refreshTable();
            this.spinnerService.displaySendingSpinner = false;
          },
          error: (error) => {
            const [, message] = `${error.message}`.split('404 ');
            this.spinnerService.displaySendingSpinner = false;
            this.messageService.add({severity: 'error' ,detail: message });
          }
        })
      }
    });

  }

  onAddNewPost(){
    const ref = this.dialogService.open(PostModalComponent, {
      data: { modalTitle: 'Nuevo post' }
    });

    ref.onClose.subscribe((data: any) => {
      if (data) {

        this.spinnerService.displaySendingSpinner = true;

        const request: Post = {
          body: data.body,
          title: data.title,
          userId: 1,
          id: buildUserId(this.posts)
        }
        this.postService.add(request).subscribe({
          next: ( resp ) => {

            this.messageService.add({severity: 'success' ,detail: 'Elemento agregado correctamente!' });
            this.posts.push( resp );
            this.refreshTable();
            this.spinnerService.displaySendingSpinner = false;
          },
          error: (error) => {
            const [, message] = `${error.message}`.split('404 ');
            this.messageService.add({severity: 'error' ,detail: message });
            this.spinnerService.displaySendingSpinner = false;
          }
        })
      }
    });
  }

  private refreshTable() {
    const from = this.currentPage * 10;
    const to = from + 10;
    this.genericTableData = this.posts.slice( from , to ).filter(( row ) => {
      return `${row.id}`.toLowerCase().includes(this.searchValue) ||
      `${row.body}`.toLowerCase().includes(this.searchValue) ||
      `${row.title}`.toLowerCase().includes(this.searchValue)
    });
  }

}
