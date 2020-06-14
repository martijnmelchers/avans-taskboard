import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAddUserComponent } from '../../dialog/dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogAddSprintComponent } from '../../dialog/dialog-add-sprint/dialog-add-sprint.component';
import { Sprint } from '../../models/Sprint';
import { SprintService } from '../../services/sprint/sprint.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnDestroy, OnInit {
  project: Project;
  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'markActive', 'open' ];
  sprints: Array<Sprint>;
  private projectSubscription: Subscription;
  private sprintSubscription: Subscription;

  constructor(private _route: ActivatedRoute, private _project: ProjectService, private _toast: MatSnackBar, private _dialog: MatDialog, private _sprints: SprintService) {
    this.projectSubscription = this._route.params.subscribe((params) => {
      this._project.getProjectsCombined().subscribe((projects) => {
        this.project = projects.find((proj) => proj.id === params.project);
      });


      this.sprintSubscription = this._sprints.getSprints(params.project).subscribe((sprints) => {
        this.sprints = sprints;
      });
    });
  }


  ngOnInit() {

  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

  async archive(archive: boolean = true) {
    const updatedText = archive ? 'archive' : 'de-archive';
    try {
      await this._project.archiveProject(this.project.id, archive);
      this._toast.open(`The projects has been ${updatedText}d`, 'Ok');
    } catch (e) {
      console.error(e);
      this._toast.open(`There has been an error ${updatedText}ing the project`, 'Close');
    }
  }

  openUserDialog(): void {
    const dialogRef = this._dialog.open(DialogAddUserComponent, {
      width: '33%',
      data: { project: this.project },
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  openSprintDialog(): void {
    const dialogRef = this._dialog.open(DialogAddSprintComponent, {
      width: '33%',
      data: { project: this.project }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  timeConverter(unixTimestamp: number) {
    const a = new Date(unixTimestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();

    const time = date + ' ' + month + ' ' + year;
    return time;
  }

  async markActiveSprint(element: any) {
     await this._project.markActiveSprint(this.project.id, element.id);
  }
}
