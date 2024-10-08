import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from, lastValueFrom, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AppInjector } from "../app-injector";
import { Dictionary, ErrorModel } from "../common";
import { AuthUser } from "./auth.model";

class AuthenticationRequest {
    usernameOrEmail?: string;
    password?: string;
}

class AuthenticationResponse {
    access_token?: string;
    refresh_token?: string;
}

class CheckCredentialsRequest{
    usernameOrEmail?: string;
}

class CheckCredentialsResponse{
    doesExist?: boolean;
}

class UserModel {
    firstName?: string;
    lastName?: string;
    roles?: string[];
}

export class Auth {

    static user?: AuthUser;
    static authorized: Dictionary = [];

    static setToken(token: string | undefined) {
        if (token) {
            sessionStorage.setItem('flow-token', token);
        } else {
            sessionStorage.removeItem('flow-token');
        }
    }

    static getToken(): string | null {
        return sessionStorage.getItem('flow-token');
    }

    static fetchUser(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.getToken()) {
                const headers = new HttpHeaders({'Authorization': `Bearer ${this.getToken()}`});

                lastValueFrom<UserModel>(this.getHttpClient().get<UserModel>(`${environment.apiUrl}/accounts/getcurrentuser`, { headers: headers })).then((response: UserModel) => {
                    this.user = undefined;
                    this.authorized = [];

                    if (response) {
                        this.user = new AuthUser();
                        this.user.firstName = response.firstName?.trim();
                        this.user.lastName = response.lastName?.trim();
                        this.user.initials = '';
                        this.user.initials += this.user?.firstName && this.user?.firstName.length > 0 ? this.user.firstName.substring(0, 1) : this.user.initials;
                        this.user.initials += this.user?.lastName && this.user?.lastName.length > 0 ? this.user.lastName.substring(0, 1) : this.user.initials;

                        if (response.roles) {
                            response.roles.forEach((value: string) => {
                                this.authorized[value] = true;
                            })
                        }
                    }
    
                    resolve();
                })
            } else {
                reject();
            }
        })
    }

    // static authenticate(usernameOrEmail: string, password: string): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         let model: AuthenticationRequest = new AuthenticationRequest();
    //         model.usernameOrEmail = usernameOrEmail;
    //         model.password = password;
    
    //         lastValueFrom<AuthenticationResponse>(this.getHttpClient().post<AuthenticationResponse>(`${environment.apiUrl}/auth/login`, model)).then((response: AuthenticationResponse) => {
    //             this.setToken(response?.access_token);
    //             this.fetchUser().then(() => {
    //                 resolve();
    //             });
    //         }).catch((error: any) => {
    //             console.log("error", error);
    //             reject(error); // Re-throw error to propagate it
    //         });
    //     });
    // }

    static authenticate(usernameOrEmail: string, password: string): Observable<void> {
        const model: AuthenticationRequest = new AuthenticationRequest();
        model.usernameOrEmail = usernameOrEmail;
        model.password = password;
    
        return from(
            lastValueFrom<AuthenticationResponse>(
                this.getHttpClient().post<AuthenticationResponse>(`${environment.apiUrl}/auth/login`, model)
            ).then((response: AuthenticationResponse) => {
                this.setToken(response?.access_token);
                return this.fetchUser();
            })
        );
    }
    

    static checkCredentials(usernameOrEmail: string): Promise<void> {
        return new Promise((resolve, reject) => {

            let model: CheckCredentialsRequest = new CheckCredentialsRequest();
            model.usernameOrEmail = usernameOrEmail;

            lastValueFrom<CheckCredentialsResponse>(this.getHttpClient().post<CheckCredentialsResponse>(`${environment.apiUrl}/accounts/checkcredentials`, model)).then((response: CheckCredentialsResponse) => {
                if (response.doesExist == true){
                    resolve();
                }
            }).catch((e: ErrorModel) => {
                reject(e);
            })
        })
    }

    static signOut() {
        this.user = undefined;
        this.setToken(undefined);
    }

    private static getHttpClient() {
        return AppInjector.instance.get(HttpClient);
    }
}