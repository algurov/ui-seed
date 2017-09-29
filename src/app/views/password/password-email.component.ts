
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdInputModule, MdFormFieldModule, MdButtonModule, MdInput } from '@angular/material';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { StringService } from '../../services/string.service';
import { FlowService } from '../../services/flow.service';

@Component({
  selector: 'password-email',
  styleUrls: ['./password-view.component.scss'],
  templateUrl: './password-email.component.html'
})

export class PasswordEmailComponent {

  emailForm : FormGroup;

  constructor(private stringService: StringService, private fb: FormBuilder,
    private router: Router,
  private flow : FlowService) {
    this.emailForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  submit() {
    if (this.emailForm.valid) {
      let email = this.emailForm.get('email').value;
      this.flow.sendEmailRecovery(email);
    }
  }
}
