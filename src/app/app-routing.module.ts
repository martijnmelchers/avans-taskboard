import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {ProjectsComponent} from './pages/projects/projects.component';
import {CreateProjectComponent} from './pages/create-project/create-project.component';
import { ProjectComponent } from './pages/project/project.component';
import {BacklogComponent} from './pages/backlog/backlog.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'create-project', component: CreateProjectComponent},
  {path: 'projects/:project', component: ProjectComponent},
  {path: 'projects/:project/backlog', component: BacklogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
