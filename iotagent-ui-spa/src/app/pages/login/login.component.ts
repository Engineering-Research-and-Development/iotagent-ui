import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submitted = false;
  loading = false;

  constructor(private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authService.login(this.f['username'].value, this.f['password'].value).subscribe((data: any) => {
      this.loading = false;
      this.sessionService.setLoggedUser(this.f['username'].value, data.auth_token);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signin Successful' });
      setTimeout(() => {
        this.router.navigate(['agent-list']);
      }, 2000);
    }, err => {
      console.log(err)
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    });
  }

}
