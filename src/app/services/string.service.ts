import { Injectable } from '@angular/core';
import { Messages } from './messages';

@Injectable()
export class StringService {

  get(code: string) {
    if(code && Messages[code]) {
      return Messages[code];
    } else {
      return '!' + code + '!';
    }
  }
  
  constructor() {
  }
}
