import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SessionService } from '../session/session.service';
import Utils from 'src/app/utils';

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
    return this.httpClient.get(`${Utils.buildAgentBaseUrl(this.sessionService.getActiveAgent())}/version`);
  }

  getServices() {
    return this.httpClient.get(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/services`);
  }

  getDevices() {
    return this.httpClient.get(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/devices`);
  }

}
