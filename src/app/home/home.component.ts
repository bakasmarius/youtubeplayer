import { Component } from '@angular/core';
import { YoutubeService } from '../_services/youtube.service';
import { Observable} from 'rxjs/Rx';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  public title = 'Youtube Player';
  public search: string;
  public results: Array<any> = [];

  constructor(public youtube_s: YoutubeService) { }

  onSearch(query) {
    this.results = [];
    this.youtube_s.getSnippet(query).forEach(result => {
      result.forEach(el => {
        if (el['id']['kind'] === 'youtube#video') {
          this.youtube_s.getContent(el['id']['videoId']).forEach(content => {
            this.results.push({
              thumbnails: el['snippet']['thumbnails'],
              id: el['id']['videoId'],
              title: el['snippet']['title'],
              duration: moment.duration(content[0]['contentDetails']['duration'], "minutes").format('HH:mm:ss', { trim: false }),
              url: 'https://www.youtube.com/watch?v=' + el['id']['videoId']
            });
          });
        }     
      });
    });
  }

}
