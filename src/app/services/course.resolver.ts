import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Course } from '../model/course';
import { CourseService } from './course.service';

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private courseService: CourseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    const courseUrl = route.paramMap.get('courseUrl');

    return this.courseService.findCourseByUrl(courseUrl);
  }
}
