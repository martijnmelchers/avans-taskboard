import {DocumentReference} from '@angular/fire/firestore';

export class Userstory {
  name: string;
  description: string;
  status: string;
  owner?: DocumentReference;
  id?: string;
}
