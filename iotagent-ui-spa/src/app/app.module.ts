import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/session/token.interceptor';
import { JsonPipe } from '@angular/common';
import { DevicesModule } from './pages/devices/devices.module';
import { AgentListModule } from './pages/agent-list/agent-list/agent-list.module';
import { MessageService } from 'primeng/api';
import { ConfigGroupsModule } from './pages/config-groups/config-groups.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AgentListModule,
    DevicesModule,
    ConfigGroupsModule,
    ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: JsonPipe },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
