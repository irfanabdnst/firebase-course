import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../model/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]>;
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courses$ = this.courseService.loadAllCourses();

    this.beginnersCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course => course.categories.includes('BEGINNER')))
    );

    this.advancedCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course => course.categories.includes('ADVANCED')))
    );
  }
}
