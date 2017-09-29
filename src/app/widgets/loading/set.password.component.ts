import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlowService } from '../../services/flow.service';

@Component({
  selector: 'set-password-folw',
  templateUrl: './loading.component.html'
})
export class SetPasswordFlowComponent {
  constructor(private router : Router, private flow : FlowService, private activatedRoute: ActivatedRoute){

  }
  ngOnInit() {
    var email= this.router.parseUrl(this.router.url).queryParams['email'];
    var code = this.router.parseUrl(this.router.url).queryParams['code'];
    window.localStorage.setItem('email', email);
    window.localStorage.setItem('code', code);
    this.flow.startPasswordResetByLink(this.router.url);
  }
}
