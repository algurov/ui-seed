
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdInputModule, MdFormFieldModule, MdButtonModule, MdInput } from '@angular/material';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { PasswordValidation } from './match-password';
import { StringService } from '../../services/string.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'login-view',
  styleUrls: ['./login-view.component.scss'],
  templateUrl: './login-view.component.html'
})

export class LoginViewComponent {
  TABS = { LOGIN:0, REGISTRATION:1, FORGOT:2};
  loginForm : FormGroup;
  forgotForm : FormGroup;
  registrationForm : FormGroup;
  users: User[];
  user: User;

  public selectedTab : number = this.TABS.LOGIN;

  @ViewChild('loginSubmit')loginSubmit : ElementRef;
  @ViewChild('registrationSubmit')registrationSubmit : ElementRef;
  @ViewChild('forgotSubmit')forgotSubmit : ElementRef;

  constructor(private stringService: StringService, public fb: FormBuilder, private router: Router, private userService: UserService,
    private dlgService: DialogService) {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      login: ['', Validators.required]
    });
    this.forgotForm = this.fb.group({
      email: ['', Validators.email]
    });
    this.registrationForm = this.fb.group({
      login: ['', Validators.required],
      email: ['', Validators.email],
      // password: ['', Validators.required],
      // passwordConfirm: ['']
    }, {
      // validator: PasswordValidation.MatchPassword
    });
  }

  public buttonClicked() {
      switch (this.selectedTab) {
        case this.TABS.LOGIN: this.loginSubmit.nativeElement.click(); break;
        case this.TABS.REGISTRATION: this.registrationSubmit.nativeElement.click(); break;
        case this.TABS.FORGOT: this.forgotSubmit.nativeElement.click(); break;
      }
  }

  public login() {
    if (this.loginForm.valid) {

      localStorage.setItem('currentUser', 'user');
      this.router.navigate(['/main']);
       this.userService.getUserById(this.loginForm.get('login')).subscribe(
         res => {
           this.user = res;
           console.log(this.users);
         });

      console.log('login action');
    }
  }

  public registration() {
    if (this.registrationForm.valid) {
      let user = {
        password: this.registrationForm.get('login').value
      };
      this.userService.registration(user).subscribe(data => console.log(data),
        err => this.dlgService.showMessageDlg('Error', err));
      console.log('regitration action');
    }
  }

  public forgot() {
    if (this.forgotForm.valid) {
      console.log('forgot action');
    }
  }
  public getButtonTitle() {
      switch(this.selectedTab) {
        case this.TABS.LOGIN: return this.stringService.get('LOGIN_BTN');
        case this.TABS.REGISTRATION: return this.stringService.get('REGISTRATION_BTN');
        case this.TABS.FORGOT: return this.stringService.get('FORGOT_BTN');
      }
  }

  public setSelectedTab(event) {
    this.selectedTab = event.index;
  }
}
