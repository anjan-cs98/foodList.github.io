import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() signup = { name: '', phone: '', email: '', pass1: '' };
  @Input() login = { email: '', pass1: '' };
  constructor(private uService: UserService, private route: Router) {}

  /*--------------USER  SIGNUP------------*/
  UserSignUP() {
    console.log(this.signup);
    this.uService.SIGNUP(this.signup).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('User signup api call successful');
      },
    });
  }

  /* -------------USER LOGIN -----------*/
  UserLogin() {
    console.log(this.login);
    this.uService.LOGIN(this.login).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
        /*-----Save User Info in Local Storage-----*/
        localStorage.setItem('User', res.activeUser);
        localStorage.setItem('token', res.token);

        /*--- Redirect to Admin Page-----*/
        this.route.navigateByUrl('/admin');
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('user login API call successful');
      },
    });
  }
}
