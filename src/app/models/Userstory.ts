import {DocumentReference} from '@angular/fire/firestore';

export class Userstory {
  id?: string;
  name: string;
  description: string;
  status: string;
  owner?: DocumentReference;
}
