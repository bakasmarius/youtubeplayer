import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../_services/youtube.service';
import { Observable, Subject } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title = 'Youtube Player';
  public search: string;
  public results: Array<any> = [];
  public ddResultCount: Array<any> = [];
  public maxResults = '5';
  private searchStream$ = new Subject();
  public pageInfo: any = {};
  private pageToken = '';

  constructor(public youtube_s: YoutubeService) {
    this.ddResultCount = [];
    this.ddResultCount.push({ label: '5', value: '5' });
    this.ddResultCount.push({ label: '10', value: '10' });
    this.ddResultCount.push({ label: '20', value: '20' });
    this.ddResultCount.push({ label: '50', value: '50' });
  }

  ngOnInit() {
    this.searchStream$
      .debounceTime(500)
      .switchMap(e => this.youtube_s.getSnippet(this.search, this.maxResults, this.pageToken))
      .do(data => {
        this.pageInfo = data.pageInfo;
        this.pageInfo.nextPageToken = data.nextPageToken;
        this.pageInfo.prevPageToken = data.prevPageToken;
        let ids = '';
        data.items.forEach(item => {
          if (item.id.kind === 'youtube#video') {
            ids = ids ? `${ids},${item.id.videoId}` : item.id.videoId;
          }
        });
        this.doSearch(ids);
      })
      .subscribe();
  }

  onSearch(query, maxResults) {
    this.search = query;
    this.maxResults = maxResults;
    this.pageToken = '';
    this.results = [];
    if (query) {
      this.searchStream$.next();
    }
  }

  doSearch(ids) {
    this.youtube_s.getContent(ids).forEach(items => {
      items.forEach(item => {
        this.results.push(this.formatVideoData(item));
      });
    });
  }

  formatVideoData(item) {
    return {
      thumbnails: item.snippet.thumbnails,
      id: item.id,
      title: item.snippet.title,
      duration: moment.duration(item.contentDetails.duration, 'minutes').format('HH:mm:ss', { trim: false })
    }
  }

  nextPage() {
    this.results = [];
    this.pageToken = this.pageInfo.nextPageToken
    this.searchStream$.next();
  }

  previousPage() {
    this.results = [];
    this.pageToken = this.pageInfo.prevPageToken
    this.searchStream$.next();
  }

}
