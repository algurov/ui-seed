
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
userImage: string = "https://image.flaticon.com/teams/slug/freepik.jpg";
userProfession: string = "Lead";
constructor(public stringService: StringService){

}

getUserShortName() : string {
    return this.user.getShortName();
}

getUserProfession() : string {
  if (this.user.positions) {
      return this.user.positions.toString();
  } else {
    return '';
  }

}

ngAfterContentInit() {

}

ngAfterInit() {

}

}
