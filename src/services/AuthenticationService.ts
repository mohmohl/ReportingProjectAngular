import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MenuItem } from "src/models/menuItem";
import { User } from "src/models/User";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public permission: string[];
    constructor(private http: HttpClient, private router: Router) {

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        //for permission list
        this.permission = [];
        this.permission.push("/home");
        this.permission.push("/change-password");
        this.permission.push("/access-denied");
   
        if (this.currentUserSubject.value != null) {
            debugger
            if(typeof this.currentUserSubject.value.userId != "undefined"){
            const menuMap = new Map(Object.entries(this.currentUserSubject.value.menuItem));
            menuMap.forEach((value, key) => {
                const menuList: MenuItem[] = value;
                menuList.forEach(e => {
                    this.permission.push("/" + e.url1);
                });
            });
        }
        else{
            this.router.navigate(['/auth/login']);
        }
        }
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
        localStorage.removeItem('currentUser');
        var username = userId;
        return this.http.post<any>(`${environment.baseUrl}/user/authenticate`, { userId, username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                
                //for permission list
                this.permission = [];
                this.permission.push("/home");
                this.permission.push("/change-password");
                this.permission.push("/access-denied");
                if (this.currentUserSubject.value != null) {
                    this.currentUserValue;
                    const menuMap = new Map(Object.entries(this.currentUserSubject.value.menuItem));
                    menuMap.forEach((value, key) => {
                        const menuList: MenuItem[] = value;
                        menuList.forEach(e => {
                            this.permission.push("/" + e.url1);
                        });
                    });
                }

                return user;
            }));
    }

    logout() {
        var userId = this.currentUserValue.userId;
        console.log("Currnet Login userId for logout = "+userId);
        var url = "/user/authenticate_logout?userId=" + userId;
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

    applicationBackend_logout(userId: string) {
        var url = "/user/authenticate_logout?userId=" + userId;
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