import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MainService } from '../../services/main.service';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'main-view',
  styleUrls: ['./main-view.component.scss'],
  templateUrl: './main-view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MainViewComponent {

  @ViewChild('sidenav') side : MdSidenav;
  sidenavShown: boolean;
  content: boolean = true;
  content2: boolean = false;
  constructor(private auth : AuthService, private router: Router, private main : MainService) {
    this.main.toggleSidenav.subscribe(value => this.toggle(value));
  }

  toggle(value) {
    this.sidenavShown = !value;
    this.side.toggle();
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.auth.logout();
  }
  changeSidenavContent() {
    this.content = !this.content;
    this.content2 = !this.content2;
    this.side.close();
  }
}
