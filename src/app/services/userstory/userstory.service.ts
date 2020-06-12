import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Userstory} from '../../models/Userstory';
import {Project} from '../../models/Project';
import {Status} from '../../models/status';
import {FirestoreService} from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserstoryService {
  constructor(private _firestore: FirestoreService) {
  }

  public getUserStories$(project: Project){
    return this._firestore.col<Project>('projects').doc<Project>(project.id).collection<Userstory>('userstories').valueChanges({idField: 'id'});
  }


  public createUserStory(project: Project, data: any){
    const userStory: Userstory = {
      name: data.name,
      description: data.description,
      status: Status.created,
    };

    this._firestore.col<Project>('projects')
      .doc<Project>(project.id).collection<Userstory>('userstories').add(userStory);
  }
}
