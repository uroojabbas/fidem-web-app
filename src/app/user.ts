import {Injectable} from '@angular/core';

@Injectable()
export class User {
  public id: number;
  public name: string = '';
  public password: string;
  constructor(){ }
}
