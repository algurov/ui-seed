import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlowService } from '../../services/flow.service';

@Component({
  selector: 'password-folw',
  templateUrl: './loading.component.html'
})
export class PasswordFlowComponent {
  constructor(private router : Router, private flow : FlowService, private activatedRoute: ActivatedRoute){

  }
  ngOnInit() {
    this.flow.startPasswordRecovery();

  }
}
