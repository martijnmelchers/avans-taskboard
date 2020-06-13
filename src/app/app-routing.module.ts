import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectComponent } from './pages/project/project.component';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'projects/:project', component: ProjectComponent },
  { path: 'edit-project/:project', component: EditProjectComponent },
  { path: 'projects/:project/backlog', component: BacklogComponent },
  { path: 'projects/:project/sprints/:sprint', component: SprintComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
