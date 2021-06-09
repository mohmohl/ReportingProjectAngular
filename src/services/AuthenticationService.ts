import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "src/models/User";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    hasRole(role: string) {
        var user: User;
        return this.currentUser.subscribe(x => user = x);
        return user.role.indexOf(role) === -1;
    }

    login(userId: string, password: string) {
        var username = userId;
        return this.http.post<any>(`${environment.baseUrl}/authenticate`, { userId, username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    applicationBackend_logout(userId: string) {
        var url = "/authenticate_logout?userId=" + userId;
        this.http.get(`${environment.baseUrl}` + url, { responseType: 'text' }).subscribe(res => {
            // remove user from local storage to log user out
            // localStorage.removeItem('currentUser');
            // this.currentUserSubject.next(null);
            // this.router.navigate(['/auth/login']);
        });
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }
}