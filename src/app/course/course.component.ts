import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../model/course';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
  }

  loadMore() {}
}
