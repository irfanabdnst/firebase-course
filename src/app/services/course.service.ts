import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private db: AngularFirestore) {}

  loadAllCourses(): Observable<Course[]> {
    return this.db
      .collection('courses')
      .snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            return {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            } as Course;
          });
        }),
        first() // Not live stream to database
      );
  }
}
