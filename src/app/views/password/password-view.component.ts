
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdInputModule, MdFormFieldModule, MdButtonModule, MdInput } from '@angular/material';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { PasswordValidation } from '../login/match-password';
import { StringService } from '../../services/string.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'password-view',
  styleUrls: ['./password-view.component.scss'],
  templateUrl: './password-view.component.html'
})

export class PasswordViewComponent {

  passwordForm : FormGroup;

  constructor(private stringService: StringService, private fb: FormBuilder,
    private router: Router, private userService: UserService) {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      passwordConfirm: ['']
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  submit() {
    if (this.passwordForm.valid) {
      console.log('submited');
    }
  }
}
