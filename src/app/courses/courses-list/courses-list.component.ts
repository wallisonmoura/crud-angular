import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../model/course';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryPipe } from '../../shared/pipes/category.pipe';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, CategoryPipe],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {

  @Input() courses: Course[] = []
  @Output() add = new EventEmitter(false)


  readonly displayedColumns = ['name', 'category', 'actions']

  constructor() { }

  onAdd() {
    this.add.emit(true)
  }

}
