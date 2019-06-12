import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Course } from '../model/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;
  description: string;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    const titles = course.titles;

    this.form = fb.group({
      description: [titles.description, Validators.required],
      longDescription: [titles.longDescription, Validators.required]
    });
  }

  ngOnInit() {}

  save() {
    const changes: Partial<Course> = {
      titles: this.form.value
    };

    this.courseService.saveCourse(this.course.id, changes).subscribe(() => this.dialogRef.close(this.form.value));
  }

  close() {
    this.dialogRef.close();
  }
}
