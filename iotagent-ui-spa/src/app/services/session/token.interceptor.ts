import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from './session.service';
import { Router } from '@angular/router';
import {tap} from "rxjs/operators";
import { MessageService } from 'primeng/api';
import {environment} from "../../environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public sessionService: SessionService,
        private router: Router,
        private messageService: MessageService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(environment.KEYCLOAK_URL) {
          return next.handle(request);
        }
        if (request.url.includes('/login')) {
            return next.handle(request);
        } else {
            if(!this.sessionService.getLoggedUser()?.token) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Login' });
                this.router.navigate(['/login']);
            }
            request = request.clone({
                setHeaders: {
                    "auth_token": this.sessionService.getLoggedUser().token,
                }
            });
            return next.handle(request).pipe( tap(() => {},
                (err: any) => {
                    // handle response
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return false;
                        }
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Token expired. Login again' });
                        return this.router.navigate(['login']);
                    } else {
                        return false;
                    }
            }));
        }

    }

}
