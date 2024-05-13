import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from './session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public sessionService: SessionService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('/login')) {
            return next.handle(request);
        } else {
            // request = request.clone({
                //         setHeaders: {
                //             "Bearer ": this.sessionService.getLoggedUser().auth_token,
                //         }
                //     });
        }
        return next.handle(request);
    }

}
