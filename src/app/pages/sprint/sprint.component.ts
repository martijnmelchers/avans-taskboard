import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Sprint } from '../../models/Sprint';
import { SprintService } from '../../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Status } from '../../models/status';
import { Userstory } from '../../models/Userstory';
import { UserStoryService } from '../../services/userstory/user-story.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnDestroy {
  public sprint: Sprint;
  public showGraph: boolean;
  public projectId: string;
  public sprintId: string;
  public idMap: Map<string, Status> = new Map<string, Status>();
  public backlog: Userstory[] = [];
  public allStories: Userstory [] = [];
  public todo: Userstory[] = [];
  public done: Userstory[] = [];
  public doing: Userstory[] = [];
  public reloadEmitter: EventEmitter<void> = new EventEmitter<void>();
  private sprintSub: Subscription;

  constructor(private _route: ActivatedRoute, private _sprints: SprintService, private _userStory: UserStoryService, private _router: Router) {
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

      this._userStory.getUserStoriesSprint$(params.project, params.sprint).subscribe((stories) => {
        stories = stories.filter((story) => story.archived === false);

        this.doing = stories.filter((story) => story.status === Status.doing);
        this.todo = stories.filter((story) => story.status === Status.todo);
        this.done = stories.filter((story) => story.status === Status.done);
        this.allStories = stories;


        this._userStory.getUserStories$(params.project).subscribe((userstories) => {

          userstories = userstories.filter((story) => story.archived === false);
          this.backlog = userstories.filter((story) => !('inSprint' in story));
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
      this.reloadEmitter.emit();
    } else {

      const status = this.idMap.get(event.container.id);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const item: any = event.container.data[event.currentIndex];

      if (event.previousContainer.id === 'backlog') {
        await this._userStory.copyToSprint(this.projectId, this.sprintId, item.id, status);
      } else {
        await this._userStory.setStatus(this.sprintId, this.projectId, item.id, status);
      }

      this.reloadEmitter.emit();
    }
  }

  async cardClick(element: any) {
    await this._router.navigate(['/projects', this.projectId, 'backlog', element.id]);
  }
}
