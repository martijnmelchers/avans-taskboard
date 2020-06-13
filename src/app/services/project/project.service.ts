import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {combineLatest, Observable, of} from 'rxjs';
import {Project} from '../../models/Project';
import {AuthService} from '../auth/auth.service';
import {combineAll, map, switchMap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {ScrumUser} from '../../models/ScrumUser';
import * as firebase from 'firebase/app';

import FieldValue = firebase.firestore.FieldValue;
import {UserstoryService} from '../userstory/userstory.service';
import {FirestoreService} from '../firestore/firestore.service';



@Injectable({
  providedIn: 'root'
})


export class ProjectService {
  projects$: Observable<Project[]>;
  constructor(private _firestore: FirestoreService, private _auth: AuthService, private _fireAuth: AngularFireAuth, private _userstories: UserstoryService, private _afs: FirestoreService) {
    this.projects$ = _afs.colWithIds$<Project>('projects',
      ref => ref.where('members', 'array-contains', this._auth.getUser().uid));
  }

  public getProjects$(): Observable<Project[]> {
    return this.projects$;
  }

  // public getProjects$(): Observable<Project[]> {
  //   const users$ = this._firestore.collection<ScrumUser>('users').valueChanges({idField: 'uid'});
  //   return combineLatest([users$, this.projects$]).pipe(map((results) => {
  //     let proj: Project[];
  //     proj = results[1];
  //
  //     results[0].forEach((user, userIndex) => {
  //       results[1].forEach((project, projectIndex) => {
  //         if(results[1][projectIndex].owner === results[0][userIndex].uid){
  //           proj[projectIndex].owner = results[0][userIndex].email;
  //         }
  //       });
  //     });
  //
  //     return proj;
  //   }));
  // }

  public getProjectsCombined(): any {
    const users$ = this._firestore.colWithIds$<ScrumUser>('users');
    const subscription = combineLatest([users$, this.projects$]).pipe(map((results) => {
       console.log(results);
        // foreach project.
       results[1].forEach((project, index) => {
          // Foreach member
          results[1][index].members.forEach((member, memberIndex) => {
            results[0].forEach((user) => {
              if(user.id === member){
                console.log(user);
                // @ts-ignore
                results[1][index].members[memberIndex] = user;
              }
            });
          });
        });

       return results[1];
      })
    );

    return subscription;
  }

  public createProject(data: any): Promise<DocumentReference> {
      const userRef = this._firestore.doc(`users/${this._auth.getUser().uid}`).ref;
      const project: Project = {
        name: data.name,
        description: data.description,
        owner: userRef,
        members: [this._auth.getUser().uid],
        archived: false,
      };
      return this._firestore.col<Project>('projects').add(project);
  }

  public async addProjectUser(projectUid: string, data: any): Promise<void>{
    const user = await this._auth.getUserByEmail(data.email);
    return this._firestore.col('projects').doc(projectUid).update({members: FieldValue.arrayUnion(user.id)});
  }

  public async removeProjectUser(projectUid: string, user: ScrumUser): Promise<void>{
    return this._firestore.col<Project>('projects').doc(projectUid).update({members: FieldValue.arrayRemove(user.id)});
  }
  public archiveProject(projectUid: string, archive: boolean = true): Promise<void> {
    return this._firestore.col<Project>('projects').doc(projectUid).update({archived: archive});
  }
}
