import {Injectable} from '@angular/core';
import {FirestoreService} from '../firestore/firestore.service';
import {Project} from '../../models/Project';
import {Sprint} from '../../models/Sprint';
import {Userstory} from '../../models/Userstory';

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

  public editSprint(projectId: string, sprintId: string, data: any) {
    const sprint: Sprint = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate
    };
    return this._firestore.col(`/projects/${projectId}/sprints`).doc(sprintId).update(data);
  }


  public getBurnDown(projectId: string, sprintId: string) {
    return new Promise<any>((resolve, reject) => {

      const sub = this._firestore.doc (`/projects/${projectId}/sprints/${sprintId}`).collection<Userstory>('userstories').valueChanges().subscribe((userstories) => {
        // this gives an object with dates as keys


        const grouped = {};
        let completedStories = 0;

        userstories.filter(story => story.status === 'done').sort((a, b) => a.updated.seconds - b.updated.seconds).forEach((story) => {
          completedStories++;
          const date = story.updated.toDate();
          const obKey = `${date.toDateString()}`;
          grouped[obKey] = userstories.length - completedStories;
        });


        sub.unsubscribe();
        resolve(grouped);
      });
    });
  }
}
