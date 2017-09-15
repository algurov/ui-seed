import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'main-view',
  styleUrls: ['./main-view.component.scss'],
  templateUrl: './main-view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MainViewComponent {

  constructor(private auth : AuthService) {}

  logout() {
    this.auth.logout();
  }
}
