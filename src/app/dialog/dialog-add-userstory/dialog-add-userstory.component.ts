import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../models/Project';
import {ProjectService} from '../../services/project/project.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DialogAddUserComponent} from '../dialog-add-user/dialog-add-user.component';
import {ScrumUser} from '../../models/ScrumUser';
import {UserStoryService} from '../../services/userstory/user-story.service';

export interface DialogData {
  project: Project;
}


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-userstory.component.html',
  styleUrls: ['./dialog-add-userstory.component.scss']
})
export class DialogAddUserStoryComponent implements OnInit {
  project: Project;
  members: ScrumUser[];
  public addUserStoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    storyPoints: new FormControl('', [Validators.required, Validators.min(1)]),
    owner: new FormControl('', []),
  });
  constructor(
    public dialogRef: MatDialogRef<DialogAddUserStoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackbar: MatSnackBar, private _dialog: MatDialog, private _project: ProjectService, private _userstory: UserStoryService) {
    this._project.getProjectsCombined().subscribe((projects) => {
      this.project = projects.find((proj) => proj.id === data.project.id);

    });
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  async createUserstory(data: FormData){
    try{
      await this._userstory.createUserStory(this.project, data);
      this._snackbar.open('Successfully created user story.');
    }
    catch (e) {
      this._snackbar.open('Failed creating user story');
    }
  }

}
