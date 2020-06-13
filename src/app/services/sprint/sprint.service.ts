import {Injectable} from '@angular/core';
import {FirestoreService} from '../firestore/firestore.service';
import {Project} from '../../models/Project';
import {Sprint} from '../../models/Sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private _firestore: FirestoreService) {
  }


  public getSprints(project: string) {
    return this._firestore.colWithIds$<Sprint>(`/projects/${project}/sprints`);
  }

  public createSprint(project: Project, data: any) {
    const sprint: Sprint = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate
    };
    return this._firestore.col(`/projects/${project.id}/sprints`).add(data);
  }
}
