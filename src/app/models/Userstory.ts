import {DocumentReference} from '@angular/fire/firestore';
import { ScrumUser } from './ScrumUser';

export class Userstory {
  id?: string;
  name: string;
  description: string;
  status: string;
  owner?: DocumentReference|ScrumUser;
  storyPoints: number;
  inSprint?: DocumentReference;
  archived?: boolean;
  updated?: any;
}
