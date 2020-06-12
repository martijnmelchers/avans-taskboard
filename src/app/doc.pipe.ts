import {Pipe, PipeTransform} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {FirestoreService} from './services/firestore/firestore.service';
import {combineAll, combineLatest, merge} from 'rxjs/operators';

@Pipe({
  name: 'doc',
})
export class DocPipe implements PipeTransform {
  constructor(private db: FirestoreService) {}

  transform(value: any):Observable<any> {
    return this.db.doc$(value.path);
  }
}
