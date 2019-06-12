import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;
  lessons: Lesson[];
  lastPageLoaded: number = 0;
  loading: boolean = false;

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];

    this.loading = true;

    this.courseService
      .findLessons(this.course.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(lessons => (this.lessons = lessons));
  }

  loadMore() {
    this.loading = true;

    this.lastPageLoaded++;

    this.courseService
      .findLessons(this.course.id, 'asc', this.lastPageLoaded)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(lessons => (this.lessons = this.lessons.concat(lessons)));
  }
}
