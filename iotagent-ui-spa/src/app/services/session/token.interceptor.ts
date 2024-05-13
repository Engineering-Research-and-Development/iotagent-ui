import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from './session.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public sessionService: SessionService,
        private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('/login')) {
            return next.handle(request);
        } else {
            if(!this.sessionService.getLoggedUser().token) {
                this.router.navigate(['/login']);
            }
            request = request.clone({
                setHeaders: {
                    "auth_token": this.sessionService.getLoggedUser().token,
                }
            });
            return next.handle(request);
        }
        
    }

}
