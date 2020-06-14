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
import { EditStoryComponent } from './pages/edit-story/edit-story.component';
import { EditSprintComponent } from './pages/edit-sprint/edit-sprint.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberGuard } from './guards/member.guard';


const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'create-project', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'projects/:project', component: ProjectComponent, canActivate: [AuthGuard, MemberGuard] },
  { path: 'edit-project/:project', component: EditProjectComponent, canActivate: [AuthGuard, MemberGuard] },
  { path: 'projects/:project/backlog', component: BacklogComponent, canActivate: [AuthGuard, MemberGuard] },
  { path: 'projects/:project/backlog/:backlog', component: EditStoryComponent, canActivate: [AuthGuard, MemberGuard] },
  { path: 'projects/:project/sprints/:sprint', component: SprintComponent, canActivate: [AuthGuard, MemberGuard] },
  { path: 'projects/:project/sprints/:sprint/edit', component: EditSprintComponent, canActivate: [AuthGuard, MemberGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
