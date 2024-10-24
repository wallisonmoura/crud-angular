import { Component, OnInit, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/course-page';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatPaginatorModule, MatProgressSpinnerModule, CoursesListComponent, AsyncPipe],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  courses$: Observable<CoursePage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private coursesServices: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh()
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.courses$ = this.coursesServices.list(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        this.onError('Erro ao carregar cursos.')
        return of({ courses: [], totalElements: 0, totalPages: 0 })
      })
    )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  ngOnInit(): void { }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route })
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesServices.remove(course._id).subscribe({
          next: () => {
            this.refresh(),
              this.snackBar.open('Curso removido com sucesso.', 'X', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              })
          },
          error: () => this.onError('Erro ao tentar remover curso.')
        })
      }
    });
  }

}
