import {Userstory} from './Userstory';

export class Sprint {
  name: string;
  startDate: any;
  endDate: any;
  id?: string;
  userstories?: Array<Userstory>;
}
