import {Userstory} from './Userstory';

export class Sprint {
  name: string;
  startDate: Date;
  endDate: Date;
  id?: string;
  userstories?: Array<Userstory>;
}
