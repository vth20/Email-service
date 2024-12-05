import { Injectable } from '@angular/core';
import { storage } from '@lib/utils/storage/storage.utils';
import { BehaviorSubject } from 'rxjs';
import { PayloadLogin, AuthResponse, UserData, Token } from '@lib/types';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private _http: HttpClient) {}

    private readonly _apiUrl = environment.apiUrl;
    isAuthenticated$ = new BehaviorSubject<boolean>(!!storage.getItem('appSession'));
    userData = new BehaviorSubject<UserData>({ username: '', avatar: '' });
    token = new BehaviorSubject<Token>({ accessToken: '', refreshToken: '' });

    get isAuthenticated(): boolean {
        return this.isAuthenticated$.getValue();
    }

    login(payload: PayloadLogin): void {
        this._http.post<AuthResponse>('/api/login', payload).subscribe({
            next: (response: AuthResponse) => {
                // Handle successful response
                this.userData.next({ username: response.username, avatar: response.avatar });
                storage.setItem('appSession', { user: response.username, token: response.accessToken });
                this.isAuthenticated$.next(true);
            },
            error: (err) => {
                console.error('Login failed', err);
            },
        });
    }

    logout(): void {
        storage.removeItem('appSession');
        this.isAuthenticated$.next(false);
    }
}
