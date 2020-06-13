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
  projectId: string;

  idMap: Map<string, Status> = new Map<string, Status>();

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
    _route.params.subscribe((params) => {
      this.projectId = params.project;
      _sprints.getSprints(params.project).subscribe((sprints) => {
        this.sprintSub = this.sprint = sprints.find((spr) => spr.id === params.sprint);

      });

      this._userstories.getUserStoriesSprint$(params.project, params.sprint).subscribe((stories) => {
        console.log(stories);
        this.doing = stories.filter((story) => story.status === Status.doing);
        this.todo = stories.filter((story) => story.status === Status.todo);
        this.done = stories.filter((story) => story.status === Status.done);
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
      const previousStatus = this.idMap.get(event.previousContainer.id);

      let item = null;
      switch(previousStatus){
        case Status.created:
          break;
        case Status.doing:
          item = this.doing[event.previousIndex];
          break;
        case Status.done:
          item = this.done[event.previousIndex];
          break;
        case Status.todo:
          item = this.todo[event.previousIndex];
          break;
      }
       this._userstories.setStatus(this.sprint.id, this.projectId, item.id, status);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
