import {Component, OnDestroy} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Sprint} from '../../models/Sprint';
import {SprintService} from '../../services/sprint/sprint.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Status} from '../../models/status';
import {Userstory} from '../../models/Userstory';
import {UserStoryService} from '../../services/userstory/user-story.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnDestroy {
  sprint: Sprint;
  sprintSub: Subscription;
  userstorySub: Subscription;

  projectId: string;
  sprintId: string;
  idMap: Map<string, Status> = new Map<string, Status>();
  backlog: Userstory[] = [];
  allStories: Userstory [] = [];
  todo: Userstory[] = [
  ];

  done: Userstory[] = [
  ];

  doing: Userstory[] = [
  ];


  constructor(private _route: ActivatedRoute, private _sprints: SprintService, private _userstories: UserStoryService, private _router: Router) {
    this.idMap.set('todo', Status.todo);
    this.idMap.set('doing', Status.doing);
    this.idMap.set('done', Status.done);
    this.idMap.set('backlog', Status.created);

    _route.params.subscribe((params) => {
      this.projectId = params.project;
      this.sprintId = params.sprint;
      this.sprintSub = _sprints.getSprints(params.project).subscribe((sprints) => {
        this.sprint = sprints.find((spr) => spr.id === params.sprint);
      });

      this._userstories.getUserStoriesSprint$(params.project, params.sprint).subscribe((stories) => {
        this.doing = stories.filter((story) => story.status === Status.doing);
        this.todo = stories.filter((story) => story.status === Status.todo);
        this.done = stories.filter((story) => story.status === Status.done);
        this.allStories = stories;


        this._userstories.getUserStories$(params.project).subscribe((userstories) => {
          this.backlog = userstories.filter((story) =>  !('inSprint' in story));
        });
      });
    });
  }
  ngOnDestroy(): void {
    this.sprintSub.unsubscribe();
  }
  async drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // const dataZooi:any = event.container.data[0];
      const status = this.idMap.get(event.container.id);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const item:any = event.container.data[event.currentIndex];

      if(event.previousContainer.id === 'backlog'){
        await this._userstories.copyToSprint(this.projectId, this.sprintId, item.id, status);
      }
      else{
        await this._userstories.setStatus(this.sprintId, this.projectId, item.id, status);
      }

    }
  }

  async cardClick(element: any) {
    await this._router.navigate(['/projects', this.projectId, 'backlog', element.id]);
  }
}
