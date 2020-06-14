import {AuthService} from './services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProjectService} from './services/project/project.service';
import {UserStoryService} from './services/userstory/user-story.service';
import {DocPipe} from './doc.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';

export const providers =  [
  AuthService,
  MatSnackBar,
  ProjectService,
  UserStoryService,
  DocPipe,
  MatDatepickerModule
];
