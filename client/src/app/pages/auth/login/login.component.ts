import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@lib/services';

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    @Input() returnUrl!: string;

    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);

    login(): void {
        this._authService.login({ username: 'vth20@yopmail.com', password: '123456789' });

        this._router.navigate([this.returnUrl ?? `/`]);
    }
}
