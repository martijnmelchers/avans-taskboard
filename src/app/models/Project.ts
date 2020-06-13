import {User} from 'firebase';
import {ScrumUser} from './ScrumUser';
import {Userstory} from './Userstory';
import {DocumentReference} from '@angular/fire/firestore';
import {Sprint} from './Sprint';

export class Project {
  id?: string;
  name: string;
  description: string;
  owner: DocumentReference;
  members: Array<string>;
  archived: boolean;
  userstories?: Array<Userstory>;
  sprints?: Array<Sprint>;
  activeSprint?: DocumentReference;
}



