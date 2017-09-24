
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { MainService } from '../../services/main.service';
import { StringService } from '../../services/string.service';
import { MdSidenav } from '@angular/material';
import { FlowService } from '../../services/flow.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html'
})

export class LoadingComponent {

constructor(private router : Router,private dlgService : DialogService, private flow : FlowService, private activatedRoute: ActivatedRoute){

}
ngOnInit() {
  var email= this.router.parseUrl(this.router.url).queryParams['email'];
  var code = this.router.parseUrl(this.router.url).queryParams['code'];
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('code', code);
  this.flow.startRegistartion(this.router.url);

}

}
