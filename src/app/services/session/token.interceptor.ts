import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from './session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public sessionService: SessionService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('/version')) {
            return next.handle(request);
        }
        if(this.sessionService.getActiveService() && this.sessionService.getActiveServicePath()) {
            request = request.clone({
                setHeaders: {
                    "fiware-service": this.sessionService.getActiveService(),
                    "fiware-servicepath": this.sessionService.getActiveServicePath()
                }
            });
        }
        return next.handle(request);
    }

}
