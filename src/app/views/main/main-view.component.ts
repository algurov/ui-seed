import { Component, ViewEncapsulation, ViewChild, ElementRef, ViewContainerRef, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MainService } from '../../services/main.service';
import { MdSidenav } from '@angular/material';
import { menuItems } from '../panel/menu.items';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'main-view',
  styleUrls: ['./main-view.component.scss'],
  templateUrl: './main-view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MainViewComponent {

  @ViewChild('sidenav') side : MdSidenav;
  @ViewChild('content') sideContent: ElementRef;
  @ViewChild('content', {read: ViewContainerRef}) target: ViewContainerRef;
  inner: string = '';
  subItems: any;
  menuItems: Array<any> = menuItems;
  constructor(private auth : AuthService, private router: Router, private main : MainService, private stringService: StringService) {
  
  }

  changeSidenavContent() {
    this.side.close();
  }

  changeRoute(link) {
    this.router.navigateByUrl(link);
  }
}
