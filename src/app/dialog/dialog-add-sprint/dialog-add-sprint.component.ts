import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../models/Project';
import {ProjectService} from '../../services/project/project.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogAddUserComponent} from '../dialog-add-user/dialog-add-user.component';
import {ScrumUser} from '../../models/ScrumUser';
import {UserstoryService} from '../../services/userstory/userstory.service';
import {SprintService} from '../../services/sprint/sprint.service';

export interface DialogData {
  project: Project;
}


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-sprint.component.html',
  styleUrls: ['./dialog-add-sprint.component.scss']
})
export class DialogAddSprintComponent implements OnInit {
  project: Project;
  members: ScrumUser[];
  displayedColumns: string[] = ['email', 'role', 'remove'];
  public addSprintForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });
  constructor(
    public dialogRef: MatDialogRef<DialogAddSprintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackbar: MatSnackBar, private _dialog: MatDialog, private _project: ProjectService, private _sprints: SprintService) {
    this._project.getProjectsCombined().subscribe((projects) => {
      this.project = projects.find((proj) => proj.id === data.project.id);
    });
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
    this.addSprintForm.reset();
  }


  async createSprint(data: FormData){
    try{
      await this._sprints.createSprint(this.project, data);
      this._snackbar.open('Successfully created sprint.');
      this.addSprintForm.reset();
      this.addSprintForm.updateValueAndValidity();
      this.dialogRef.close();
    }
    catch (e) {
      this._snackbar.open('Failed creating sprint');
    }
  }

}
