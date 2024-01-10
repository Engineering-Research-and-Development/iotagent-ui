import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) { }

  testConnection(endpoint: string): any {
    return this.httpClient.get(`${endpoint}/version`);
  }

  getVersion() {
    return this.httpClient.get(`${this.sessionService.getActiveEndpoint()}/version`);
  }

  getServices() {
    return this.httpClient.get(`${this.sessionService.getActiveEndpoint()}/${this.sessionService.getActiveApiKey()}/services`);
  }

  getDevices() {
    return this.httpClient.get(`${this.sessionService.getActiveEndpoint()}/${this.sessionService.getActiveApiKey()}/devices`);
  }

}
