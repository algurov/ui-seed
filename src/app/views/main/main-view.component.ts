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
  @ViewChild('content') sideContent: ElementRef;

  subItems: any;

  constructor(private auth : AuthService, private router: Router, private main : MainService) {
    this.main.toggleSidenav.subscribe(value => this.toggle(value));
  }

  toggle(value) {
    this.subItems = value.arr;
    this.sideContent.nativeElement.innerHTML = value.html;
    console.log(value);
    this.side.toggle();
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.auth.logout();
  }
  changeSidenavContent() {
    this.side.close();
  }

  changeRoute(link) {
    this.router.navigateByUrl(link);
  }
}
