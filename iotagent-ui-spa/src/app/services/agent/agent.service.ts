import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/app/environment';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService
  ) { }

  buildProxyPath() {
    const idAgent = this.sessionService.getActiveAgent()._id;
    const idService = this.sessionService.getActiveService()._id;
    return `${environment.API_BASE_URL}/auth/agent/${idAgent}/service/${idService}/proxy`;
  }

  testConnection(endpoint: string): any {
    const idAgent = this.sessionService.getActiveAgent()._id;
    return this.httpClient.get(`${environment.API_BASE_URL}/auth/agent/${idAgent}/proxy/version`);
  }

  getAbout() {
    const idAgent = this.sessionService.getActiveAgent()._id;
    return this.httpClient.get(`${environment.API_BASE_URL}/auth/agent/${idAgent}/proxy/about`);
  }

  getConfigGroups() {
    return this.httpClient.get(`${this.buildProxyPath()}/services`);
  }

  createConfigGroup(body: any) {
    return this.httpClient.post(`${this.buildProxyPath()}/services`, body);
  }

  editConfigGroup(resource: string, apikey: string, body: any) {
    return this.httpClient.put(`${this.buildProxyPath()}/services?resource=${resource}&apikey=${apikey}`, body);
  }

  removeConfigGroup(resource: string, apikey: string) {
    return this.httpClient.delete(`${this.buildProxyPath()}/services?resource=${resource}&apikey=${apikey}`);
  }

  getDevices(limit: number | null, offset: number | null) {let url = `${this.buildProxyPath()}/devices`;
    if(limit !== null && offset !== null) {
      url += `?limit=${limit}&offset=${offset}`;
    }
    return this.httpClient.get(url);
  }

  createDevice(body: any) {
    return this.httpClient.post(`${this.buildProxyPath()}/devices`, body);
  }

  getDeviceDetails(deviceId: string) {
    return this.httpClient.get(`${this.buildProxyPath()}/devices/${deviceId}`);
  }

  editDevice(deviceId: string, body: any) {
    return this.httpClient.put(`${this.buildProxyPath()}/devices/${deviceId}`, body);
  }

  removeDevice(deviceId: string) {
    return this.httpClient.delete(`${this.buildProxyPath()}/devices/${deviceId}`);
  }

  batchRemoveDevices(body: any) {
    return this.httpClient.post(`${this.buildProxyPath()}/op/delete`, body);
  }

}
