
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { StringService } from '../../services/string.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-card',
  styleUrls: ['./user.card.component.scss'],
  templateUrl: './user.card.component.html'
})
export class UserCardComponent {

@Input('user') user: User;
constructor(public stringService: StringService){

}

getUserShortName() : string {
    return this.user.getShortName();
}

getUserProfession() : string {
  return this.user.getUserProfessionName();
  }

}
