import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../models/Project';
import {ProjectService} from '../../services/project/project.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Observable} from 'rxjs';
import {ScrumUser} from '../../models/ScrumUser';
import {DocPipe} from '../../doc.pipe';
import {combineLatest} from 'rxjs/operators';

export interface DialogData {
  project: Project;
}


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  project: Project;
  displayedColumns: string[] = ['email', 'role', 'remove'];
  addUserForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });
  members: Observable<ScrumUser[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _project: ProjectService, public auth: AuthService, private _snackbar: MatSnackBar, private docPipe: DocPipe) {
    this._project.getProjectsCombined().subscribe((projects) => {
      this.project = projects.find((proj) => proj.id === data.project.id);
      // let observables = [];

      // console.log("Project", this.project);
      // this.project.members.forEach((member) => {
      //   const observable = docPipe.transform(member);
      //   observables.push(observable);
      // });
      // this.members = forkJoin<ScrumUser>(observables);
      //
      // this.members.subscribe((res) => {
      //   console.log( res);
      // })
    });
  }

  ngOnInit(): void {
  }

  async removeUser(user: any){
    try{
      await this._project.removeProjectUser(this.project.id, user);
      this._snackbar.open('User removed successfully', 'Close');
    }
    catch(e){
      this._snackbar.open('Could not remove user', 'Close');
    }
  }

  async addUser(data: any){
    try{
      await this._project.addProjectUser(this.project.id, data);
      this._snackbar.open('User added successfully', 'Close');
    }
    catch (e) {
      this._snackbar.open('Error while adding user check if the user exists', 'Close');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
