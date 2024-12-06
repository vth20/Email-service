import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@lib/services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);

    @Input() returnUrl!: string;
    loginForm: FormGroup;
    showPassword = false;

    constructor(private _fb: FormBuilder) {
        this.loginForm = this._fb.group({
            username: new FormControl('', [Validators.minLength(6)]),
            password: new FormControl('', [Validators.minLength(8)]),
        });
    }

    get username(): FormControl {
        return this.loginForm.get('username') as FormControl;
    }

    get password(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    login(): void {
        this._authService.login({ username: this.username.value as string, password: this.password.value as string });

        this._router.navigate([this.returnUrl ?? `/`]);
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            // Mark all controls as touched to trigger validation errors
            this.username.updateValueAndValidity();
            this.password.updateValueAndValidity();
            return;
        }
        this.login();
        console.log('Form Submitted:', this.loginForm.value);
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}
