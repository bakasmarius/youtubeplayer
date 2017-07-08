import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_ROUTES_PROVIDER } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VideoComponent } from './video/video.component';

import { YoutubeService } from './_services/youtube.service';

import { YoutubePlayerMiniModule }  from 'ng2-youtube-player-mini'
import { DropdownModule, InputTextModule } from 'primeng/primeng';
import 'moment-duration-format';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    APP_ROUTES_PROVIDER,
    YoutubePlayerMiniModule,
    DropdownModule, InputTextModule
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
