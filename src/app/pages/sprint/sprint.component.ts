import {Component, OnDestroy} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Sprint} from '../../models/Sprint';
import {SprintService} from '../../services/sprint/sprint.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Status} from '../../models/status';
import {Userstory} from '../../models/Userstory';
import {UserstoryService} from '../../services/userstory/userstory.service';

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


  constructor(private _route: ActivatedRoute, private _sprints: SprintService, private _userstories: UserstoryService) {

    this.idMap.set('cdk-drop-list-1', Status.todo);
    this.idMap.set('cdk-drop-list-2', Status.doing);
    this.idMap.set('cdk-drop-list-3', Status.done);
    this.idMap.set('cdk-drop-list-0', Status.created);
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
          this.backlog = userstories.filter((story) => {
            const foundItem = this.allStories.find((item) => item.id === story.id);
            return (foundItem === undefined);
          });
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
      //This is the backlog item.
      if(event.previousContainer.id === 'cdk-drop-list-0'){
        await this._userstories.copyToSprint(this.projectId, this.sprintId, item.id, status);
      }
      else{
        await this._userstories.setStatus(this.sprintId, this.projectId, item.id, status);
      }

    }
  }


  cardClick(element: any) {
  }
}
