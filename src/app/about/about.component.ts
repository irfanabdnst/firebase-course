import 'firebase/firestore';

import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { Course } from '../model/course';

var config = {
  apiKey: 'AIzaSyBBLNRK6pJ5VljkzAFYNGQuRiQAS2BtQeo',
  authDomain: 'fir-course-5ca52.firebaseapp.com',
  databaseURL: 'https://fir-course-5ca52.firebaseio.com',
  projectId: 'fir-course-5ca52',
  storageBucket: 'fir-course-5ca52.appspot.com',
  messagingSenderId: '27950687905',
  appId: '1:27950687905:web:006bb8df9eaa5453'
};

firebase.initializeApp(config);

const db = firebase.firestore();

// const settings = { timestampsInSnapshots: true };

// db.settings(settings);

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    db.collection('courses')
      .get()
      .then(snaps => {
        const courses: Course[] = snaps.docs.map(snap => {
          return <Course>{
            id: snap.id,
            ...snap.data()
          };
        });

        console.log(courses);
      });
  }
}
