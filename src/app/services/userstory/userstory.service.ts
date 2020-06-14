import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Userstory} from '../../models/Userstory';
import {Project} from '../../models/Project';
import {Status} from '../../models/status';
import {FirestoreService} from '../firestore/firestore.service';
import {Sprint} from '../../models/Sprint';

@Injectable({
  providedIn: 'root'
})
export class UserstoryService {
  constructor(private _firestore: FirestoreService) {
  }

  public getUserStories$(projectId: string){
    return this._firestore.col<Project>('projects').doc<Project>(projectId).collection<Userstory>('userstories').valueChanges({idField: 'id'});
  }

  public getUserStoriesSprint$(project: string, sprint: string){
    return this._firestore.colWithIds$<Userstory>(`projects/${project}/sprints/${sprint}/userstories`);
  }

  public async copyToSprint(projectId: string, sprintId: string, userstoryId: string, status: Status){
    const projectStory = this._firestore.col<Project>('projects').doc<Project>(projectId).collection<Userstory>('userstories').doc<Userstory>(userstoryId);
    const story = await projectStory.get().toPromise();
    const data = story.data();

    const storyId = story.id;
    delete data.id;

    data.status = status;

    return this._firestore.col(`projects/${projectId}/sprints/${sprintId}/userstories`).doc(storyId).set(data);
  }

  public setStatus(sprintId: string, projectId: string, userstoryId: string, status: Status){
    return this._firestore.col(`projects/${projectId}/sprints/${sprintId}/userstories`).doc(userstoryId).update({status: status});
  }

  public createUserStory(project: Project, data: any){
    const userStory: Userstory = {
      name: data.name,
      description: data.description,
      status: Status.created,
    };

    if(data.owner){
      const userRef = this._firestore.doc(`/users/${data.owner}`).ref;
      userStory.owner = userRef;
    }

    return this._firestore.col<Project>('projects')
      .doc<Project>(project.id).collection<Userstory>('userstories').add(userStory);
  }
}
