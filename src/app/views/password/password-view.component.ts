
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdInputModule, MdFormFieldModule, MdButtonModule, MdInput } from '@angular/material';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { PasswordValidation } from '../login/match-password';
import { StringService } from '../../services/string.service';
import { UserService } from '../../services/user.service';
import { FlowService } from '../../services/flow.service';
import * as bcryptjs from 'bcryptjs';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'password-view',
  styleUrls: ['./password-view.component.scss'],
  templateUrl: './password-view.component.html'
})

export class PasswordViewComponent {

  passwordForm : FormGroup;

  constructor(private stringService: StringService, private fb: FormBuilder,
    private router: Router, private userService: UserService,
  private flow : FlowService) {
    this.passwordForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['']
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  submit() {
    if (this.passwordForm.valid) {
      let login = this.passwordForm.get('login').value;
      let pass = this.passwordForm.get('password').value;
      //pass = bcryptjs.hashSync(pass, 8);
      pass = Md5.hashStr(pass);
      this.flow.sendLoginAndPassword(login, pass);
    }
  }
}
