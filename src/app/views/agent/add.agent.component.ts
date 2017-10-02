import { Component } from '@angular/core';
import { StringService } from '../../services/string.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-agent',
  templateUrl: './add.agent.component.html',
  styleUrls: ['./add.agent.component.scss']
})
export class AddAgentComponent {
  full: boolean = false;
  agentForm: FormGroup;
  constructor(private stringService: StringService, private fb: FormBuilder) {
    this.agentForm = this.fb.group({
      agentType: [''],
      documentType: [''],
      number: [''],
      givenBy: [''],
      title: [''],
      address: [''],
      phoneNumber: [''],
      fax: ['']
    });
  }

  toggleView() {
    this.full = !this.full;
  }
}
