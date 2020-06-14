import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';
import { Project } from '../../models/Project';
import { Sprint } from '../../models/Sprint';
import { Userstory } from '../../models/Userstory';

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


  public getBurnDown(projectId: string, sprintId: string, startDate: Date, endDate: Date): Promise<Array<{ date: string, open: number, optimal: number }>> {
    return new Promise<any>((resolve, reject) => {

      const sub = this._firestore.doc(`/projects/${projectId}/sprints/${sprintId}`).collection<Userstory>('userstories').valueChanges().subscribe((userstories) => {
        // this gives an object with dates as keys

        const grouped: Array<{ date: string, open: number, optimal: number }> = [];

        let day = 0;
        let storiesPerDay = userstories.length / (Math.floor(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        for (const d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          grouped.push({
            date: d.toLocaleDateString(),
            open: userstories.length - userstories.filter(x => {
              const date = x.updated.toDate();
              return x.status === 'done' && date.getDate() <= d.getDate() && date.getMonth() <= d.getMonth()
            }).length,
            optimal: Math.ceil(userstories.length - (storiesPerDay * day++))
          });
        }

        sub.unsubscribe();
        resolve(grouped);
      });
    });
  }
}
