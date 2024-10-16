import { Routes } from "@angular/router";

import { CoursesComponent } from "./containers/courses/courses.component";
import { CourseFormComponent } from "./containers/course-form/course-form.component";


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
