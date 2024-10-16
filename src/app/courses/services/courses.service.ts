import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // private readonly API = 'api/courses'
  private readonly API = '/assets/courses.json'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      // delay(3000)
    );
  }

  save(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(
      first()
    )
  }
}
