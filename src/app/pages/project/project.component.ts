import {Component, OnDestroy, OnInit} from '@angular/core';
import { Project } from 'src/app/models/Project';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogAddUserComponent} from '../../dialog/dialog-add-user/dialog-add-user.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnDestroy {
  project: Project;
  private projectSubscription: Subscription;
  constructor(private _route: ActivatedRoute, private _project: ProjectService, private _toast: MatSnackBar, private _dialog: MatDialog) {
    this.projectSubscription = this._route.params.subscribe((params) => {
      this._project.getProjectsCombined().subscribe((projects) => {
        this.project = projects.find((proj) => proj.id === params.project);
      });
    });
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

  async archive(archive: boolean = true) {
    const updatedText = archive ? 'archive' : 'de-archive';
    try{
      await this._project.archiveProject(this.project.id, archive);
      this._toast.open(`The projects has been ${updatedText}d`, 'Ok');
    }
    catch(e){
      console.error(e);
      this._toast.open(`There has been an error ${updatedText}ing the project`, 'Close');
    }
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(DialogAddUserComponent, {
      width: '33%',
      data: {project: this.project}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
