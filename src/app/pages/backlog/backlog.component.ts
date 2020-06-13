import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Project} from '../../models/Project';
import {Subscription} from 'rxjs';
import {Userstory} from '../../models/Userstory';
import {UserstoryService} from '../../services/userstory/userstory.service';
import {DialogAddUserStoryComponent} from '../../dialog/dialog-add-userstory/dialog-add-userstory.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnDestroy {
  project: Project;
  userStories: Userstory[];
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['name', 'description', 'owner', 'status'];

  constructor(private _route: ActivatedRoute, private _project: ProjectService, private _userStories: UserstoryService, private _dialog: MatDialog) {
      this.subscriptions.push(_route.params.subscribe((params) => {
        const projectId = params.project;
        this.subscriptions.push(this._project.getProjectsCombined().subscribe((projects) => {
          this.project = projects.find((proj) => proj.id === projectId);
          const userStorySub = this._userStories.getUserStories$(this.project).subscribe((userstories) => {
            this.userStories = userstories;
          });
          this.subscriptions.push(userStorySub);
        }));
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(DialogAddUserStoryComponent, {
      width: '33vw',
      data: {project: this.project}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
