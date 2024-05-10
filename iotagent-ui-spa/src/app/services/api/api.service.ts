/**
 * API docs: https://github.com/telefonicaid/iotagent-node-lib/blob/master/doc/api.md#api-routes
 */

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

  getAbout() {
    return this.httpClient.get(`${Utils.buildAgentBaseUrl(this.sessionService.getActiveAgent())}/about`);
  }

  getVersion() {
    return this.httpClient.get(`${Utils.buildAgentBaseUrl(this.sessionService.getActiveAgent())}/version`);
  }

  getConfigGroups() {
    return this.httpClient.get(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/services`);
  }

  createConfigGroup(body: any) {
    return this.httpClient.post(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/services`, body);
  }

  editConfigGroup(resource: string, apikey: string, body: any) {
    return this.httpClient.put(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/services?resource=${resource}&apikey=${apikey}`, body);
  }

  removeConfigGroup(resource: string, apikey: string) {
    return this.httpClient.delete(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/services?resource=${resource}&apikey=${apikey}`);
  }

  getDevices(limit: number | null, offset: number | null) {
    let url = `${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/devices`;
    if(limit !== null && offset !== null) {
      url += `?limit=${limit}&offset=${offset}`;
    }
    return this.httpClient.get(url);
  }

  createDevice(body: any) {
    return this.httpClient.post(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/devices`, body);
  }

  getDeviceDetails(deviceId: string) {
    return this.httpClient.get(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/devices/${deviceId}`);
  }

  editDevice(deviceId: string, body: any) {
    return this.httpClient.put(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/devices/${deviceId}`, body);
  }

  removeDevice(deviceId: string) {
    return this.httpClient.delete(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/devices/${deviceId}`);
  }

  batchRemoveDevices(body: any) {
    return this.httpClient.post(`${Utils.buildAgentUrl(this.sessionService.getActiveAgent())}/op/delete`, body);
  }

}
