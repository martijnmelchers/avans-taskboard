import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Sprint} from '../../models/Sprint';
import {SprintService} from '../../services/sprint/sprint.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Status} from '../../models/status';
import {Userstory} from '../../models/Userstory';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnDestroy {
  sprint: Sprint;
  sprintSub: Subscription;
  todo: Userstory[] = [
  ];

  done: Userstory[] = [
  ];

  doing: Userstory[] = [
  ];


  constructor(private _route: ActivatedRoute, private _sprints: SprintService) {
    _route.params.subscribe((params) => {
      _sprints.getSprints(params.project).subscribe((sprints) => {
        this.sprintSub = this.sprint = sprints.find((spr) => spr.id === params.sprint);

      });
    });
  }
  ngOnDestroy(): void {
    this.sprintSub.unsubscribe();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
