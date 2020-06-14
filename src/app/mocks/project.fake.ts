import {Project} from '../models/Project';
import {of} from 'rxjs';

export class FakeProject {
  getProjectsCombined() {
    const fakeProjects: Project[] = [
      {name: 'Test project', description: 'Test description', owner: null, id: 'sadasdasdasdasd', archived: false, members: ['']}
    ];
    return of(fakeProjects);
  }
  getProjects$() {
    const fakeProjects: Project[] = [
      {name: 'Test project', description: 'Test description', owner: null, id: 'sadasdasdasdasd', archived: false, members: ['']}
    ];
    return of(fakeProjects);
  }
}
