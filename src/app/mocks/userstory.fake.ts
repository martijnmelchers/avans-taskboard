import {Project} from '../models/Project';
import {of} from 'rxjs';
import {Userstory} from '../models/Userstory';
import {Status} from '../models/status';

export class FakeUserStory {
  getUserStories$(data:any) {
    const fakeStories: Userstory[] = [
      {name: 'Non Archived story', description: 'Non Archived description', status: Status.todo, storyPoints: 10, archived: false, id: 'testid1'},
      {name: 'Archived story', description: 'Acrhived description', status: Status.todo, storyPoints: 11, archived: true, id: 'testid2'}
    ];
    return of(fakeStories);
  }
}
