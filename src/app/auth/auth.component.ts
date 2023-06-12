import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  authType: string = '';
  title: string = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl(
          'firstName',
          new FormControl('', [Validators.required])
        );
        this.authForm.addControl(
          'lastName',
          new FormControl('', [Validators.required])
        );
      }
      this.cd.markForCheck();
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe({
      next: (data) => {
        if (this.authType === 'login') {
          this.router.navigateByUrl('/');
        } else if (this.authType === 'register') {
          this.router.navigateByUrl('/login');
        }
      },
      error: (err) => {
        this.authForm.reset();
        if (this.authType === 'login') {
          this.errors = { errors: { Incorrect: 'credentials' } };
        } else if (this.authType === 'register') {
          this.errors = { errors: { Please: 'try again' } };
        }
        this.isSubmitting = false;
      },
    });
  }
  get f() {
    return this.authForm.controls;
  }
}
