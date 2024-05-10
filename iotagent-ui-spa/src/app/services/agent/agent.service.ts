import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private httpClient: HttpClient) { }

  testConnection(endpoint: string): any {
    return this.httpClient.get(`${endpoint}/version`);
  }

  getAbout() {
    return this.httpClient.get(`${environment.API_BASE_URL}/proxy/about`);
  }

  getVersion() {
    return this.httpClient.get(`${environment.API_BASE_URL}/proxy/version`);
  }

  getConfigGroups() {
    return this.httpClient.get(`${environment.API_BASE_URL}/proxy/services`);
  }

  createConfigGroup(body: any) {
    return this.httpClient.post(`${environment.API_BASE_URL}/proxy/services`, body);
  }

  editConfigGroup(resource: string, apikey: string, body: any) {
    return this.httpClient.put(`${environment.API_BASE_URL}/proxy/services?resource=${resource}&apikey=${apikey}`, body);
  }

  removeConfigGroup(resource: string, apikey: string) {
    return this.httpClient.delete(`${environment.API_BASE_URL}/proxy/services?resource=${resource}&apikey=${apikey}`);
  }

  getDevices(limit: number | null, offset: number | null) {
    let url = `${environment.API_BASE_URL}/proxy/devices`;
    if(limit !== null && offset !== null) {
      url += `?limit=${limit}&offset=${offset}`;
    }
    return this.httpClient.get(url);
  }

  createDevice(body: any) {
    return this.httpClient.post(`${environment.API_BASE_URL}/proxy/devices`, body);
  }

  getDeviceDetails(deviceId: string) {
    return this.httpClient.get(`${environment.API_BASE_URL}/proxy/devices/${deviceId}`);
  }

  editDevice(deviceId: string, body: any) {
    return this.httpClient.put(`${environment.API_BASE_URL}/proxy/devices/${deviceId}`, body);
  }

  removeDevice(deviceId: string) {
    return this.httpClient.delete(`${environment.API_BASE_URL}/proxy/devices/${deviceId}`);
  }

  batchRemoveDevices(body: any) {
    return this.httpClient.post(`${environment.API_BASE_URL}/proxy/op/delete`, body);
  }

}
