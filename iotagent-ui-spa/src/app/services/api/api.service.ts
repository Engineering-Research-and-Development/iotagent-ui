/**
 * API docs: https://github.com/telefonicaid/iotagent-node-lib/blob/master/doc/api.md#api-routes
 */

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/app/environment';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
  private sessionService: SessionService) { }


  // Agent CRUD

  addAgent(agent: any) {
    return this.httpClient.post(`${environment.API_BASE_URL}/auth/agent`, agent);
  }
  
  getAllAgents() {
    return this.httpClient.get(`${environment.API_BASE_URL}/auth/agent`);
  }

  getAgent(idAgent: any) {
    return this.httpClient.get(`${environment.API_BASE_URL}/auth/agent/${idAgent}`);
  }

  deleteAgent(idAgent: any) {
    return this.httpClient.delete(`${environment.API_BASE_URL}/auth/agent/${idAgent}`);
  }

  updateAgent(agent: any) {
    return this.httpClient.put(`${environment.API_BASE_URL}/auth/agent/${agent._id}`, agent);
  }

  // Service CRUD  

  getAllServices(idAgent: any) {
    return this.httpClient.get(`${environment.API_BASE_URL}/auth/agent/${idAgent}/service`);
  }

  addService(idAgent: any, service: any) {
    return this.httpClient.post(`${environment.API_BASE_URL}/auth/agent/${idAgent}/service`, service);
  }

  deleteService(idAgent: any, idService: any) {
    return this.httpClient.delete(`${environment.API_BASE_URL}/auth/agent/${idAgent}/service/${idService}`);
  }

}
