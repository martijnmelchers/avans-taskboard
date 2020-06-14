import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Project} from '../../models/Project';
import {Subscription} from 'rxjs';
import {Userstory} from '../../models/Userstory';
import {UserStoryService} from '../../services/userstory/user-story.service';
import {DialogAddUserStoryComponent} from '../../dialog/dialog-add-userstory/dialog-add-userstory.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnDestroy {
  project: Project;
  userStories: Userstory[];
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['name', 'description','storyPoints', 'owner', 'status'];

  constructor(private _route: ActivatedRoute, private _project: ProjectService, private _userStories: UserStoryService, private _dialog: MatDialog, private _router: Router, private _snackbar: MatSnackBar) {
      this.subscriptions.push(_route.params.subscribe((params) => {
        const projectId = params.project;
        this.subscriptions.push(this._project.getProjectsCombined().subscribe((projects) => {
          this.project = projects.find((proj) => proj.id === projectId);
          const userStorySub = this._userStories.getUserStories$(this.project.id).subscribe((userstories) => {
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
      data: { project: this.project }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openStory(id: any) {
    this._router.navigate(['projects', this.project.id, 'backlog', id]);
  }


  async deArchive($event, element: any) {
    $event.stopPropagation();
    try{
      await this._userStories.archiveUserStory(this.project.id, element, false);
      this._snackbar.open('Successfully de-archived user story.', 'Close');
    }
    catch (e) {
      this._snackbar.open('Failed de-archiving user story.', 'Close');
    }
  }
}
