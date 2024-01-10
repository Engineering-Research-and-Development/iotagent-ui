import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent {

  form = new FormGroup({
    endpoint: new FormControl(null, [
      Validators.required
    ]),
    apiKey: new FormControl(null, [
      Validators.required
    ])
  });
  loading = false;
  emojis = ['&#x1F499;','&#x1F49C;'];

  constructor(private messageService: MessageService,
              private router: Router,
              private sessionService: SessionService,
              private apiService: ApiService) {
      if(this.sessionService.getActiveEndpoint() && this.sessionService.getActiveApiKey()) {
        this.router.navigate(['/connection']);
      }
    }

  onSubmit() {
    this.loading = true;
    if(!this.form.valid) {
      this.messageService.add({severity: 'error', summary:  'Error', detail: 'Invalid fields' });
      this.loading = false;
      return;
    }
    const endpoint = this.form.controls.endpoint.value;
    const apiKey = this.form.controls.apiKey.value;
    if(!endpoint) {
      this.messageService.add({severity: 'error', summary:  'Error', detail: 'Invalid endpoint' });
      this.loading = false;
      return;
    }
    if(!apiKey) {
      this.messageService.add({severity: 'error', summary:  'Error', detail: 'Invalid API Key' });
      this.loading = false;
      return;
    }
    this.apiService.testConnection(endpoint).subscribe((data: any) => {
      this.sessionService.setActiveEndpoint(endpoint);
      this.sessionService.setActiveApiKey(apiKey);
      this.loading = false;
      this.messageService.add({severity: 'success', summary:  'Success', detail: 'Connected to server' });
      this.router.navigate(['/connection']);
    }, (err: any) => {
      this.messageService.add({severity: 'error', summary:  'Connection failed', detail: err?.error });
      this.loading = false;
    });
  }

}
