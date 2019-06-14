import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CourseResolver } from './services/course.resolver';

const redirectCourses = redirectLoggedInTo(['courses']);
const redirectLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    ...canActivate(redirectLogin)
  },
  {
    path: 'about',
    component: AboutComponent,
    ...canActivate(redirectLogin)
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectCourses)
  },
  {
    path: 'courses/:courseUrl',
    component: CourseComponent,
    resolve: {
      course: CourseResolver
    },
    ...canActivate(redirectLogin)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
