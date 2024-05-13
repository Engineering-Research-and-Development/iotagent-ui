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

  testConnection(endpoint: string): any {
    return this.httpClient.get(`${endpoint}/version`);
  }

  getAbout() {
    return this.httpClient.get(`${environment.API_BASE_URL}/auth/proxy/about`);
  }

  getVersion() {
    return this.httpClient.get(`${environment.API_BASE_URL}/auth/proxy/version`);
  }

  getConfigGroups() {
    const idAgent = this.sessionService.getActiveAgent()._id;
    const idService = this.sessionService.getActiveService()._id;
    return this.httpClient.get(`${environment.API_BASE_URL}/auth/agent/${idAgent}/service/${idService}/proxy/services`);
  }

  createConfigGroup(body: any) {
    return this.httpClient.post(`${environment.API_BASE_URL}/auth/proxy/services`, body);
  }

  editConfigGroup(resource: string, apikey: string, body: any) {
    return this.httpClient.put(`${environment.API_BASE_URL}/auth/proxy/services?resource=${resource}&apikey=${apikey}`, body);
  }

  removeConfigGroup(resource: string, apikey: string) {
    return this.httpClient.delete(`${environment.API_BASE_URL}/auth/proxy/services?resource=${resource}&apikey=${apikey}`);
  }

  getDevices(limit: number | null, offset: number | null) {
    const idAgent = this.sessionService.getActiveAgent()._id;
    const idService = this.sessionService.getActiveService()._id;

    let url = `${environment.API_BASE_URL}/auth/agent/${idAgent}/service/${idService}/proxy/devices`;
    if(limit !== null && offset !== null) {
      url += `?limit=${limit}&offset=${offset}`;
    }
    return this.httpClient.get(url);
  }

  createDevice(body: any) {
    const idAgent = this.sessionService.getActiveAgent()._id;
    const idService = this.sessionService.getActiveService()._id;
    return this.httpClient.post(`${environment.API_BASE_URL}/auth/agent/${idAgent}/service/${idService}/proxy/devices`, body);
  }

  getDeviceDetails(deviceId: string) {
    return this.httpClient.get(`${environment.API_BASE_URL}/auth/proxy/devices/${deviceId}`);
  }

  editDevice(deviceId: string, body: any) {
    return this.httpClient.put(`${environment.API_BASE_URL}/auth/proxy/devices/${deviceId}`, body);
  }

  removeDevice(deviceId: string) {
    return this.httpClient.delete(`${environment.API_BASE_URL}/auth/proxy/devices/${deviceId}`);
  }

  batchRemoveDevices(body: any) {
    return this.httpClient.post(`${environment.API_BASE_URL}/auth/proxy/op/delete`, body);
  }

}
