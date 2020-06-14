import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { RegisterComponent } from './pages/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectService } from './services/project/project.service';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { ProjectComponent } from './pages/project/project.component';
import { MatDividerModule } from '@angular/material/divider';
import { DialogAddUserComponent } from './dialog/dialog-add-user/dialog-add-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { UserstoryService } from './services/userstory/userstory.service';
import { DialogAddUserStoryComponent } from './dialog/dialog-add-userstory/dialog-add-userstory.component';
import { DocPipe } from './doc.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddSprintComponent } from './dialog/dialog-add-sprint/dialog-add-sprint.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { EditStoryComponent } from './pages/edit-story/edit-story.component';
import { EditSprintComponent } from './pages/edit-sprint/edit-sprint.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProjectsComponent,
    CreateProjectComponent,
    ProjectComponent,
    DialogAddUserComponent,
    BacklogComponent,
    SprintComponent,
    DialogAddUserStoryComponent,
    DocPipe,
    DialogAddSprintComponent,
    EditProjectComponent,
    EditStoryComponent,
    EditSprintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    DragDropModule,
    MatRippleModule
  ],
  entryComponents: [
    DialogAddUserComponent
  ],
  providers: [
    AuthService,
    MatSnackBar,
    ProjectService,
    UserstoryService,
    DocPipe,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
