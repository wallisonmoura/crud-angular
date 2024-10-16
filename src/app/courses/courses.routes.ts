import { Routes } from "@angular/router";
import { CoursesComponent } from "./courses/courses.component";
import { CourseFormComponent } from "./course-form/course-form.component";

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'new',
    component: CourseFormComponent
  }
]
