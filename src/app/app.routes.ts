import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VideoComponent } from './video/video.component';

const APP_ROUTES = [
  { path: '', component: HomeComponent, data: {title: 'FMSet Home'} },
  { path: 'video/:id', component: VideoComponent, data: {title: 'FMSet Login'} },
  { path: '**', component: NotFoundComponent, data: {title: 'FMSet Not Found'} }
];

export const APP_ROUTES_PROVIDER = RouterModule.forRoot(APP_ROUTES);
