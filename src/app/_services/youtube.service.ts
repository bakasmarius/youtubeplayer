import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

const searchUrl = 'https://www.googleapis.com/youtube/v3/search';
const videoUrl = 'https://www.googleapis.com/youtube/v3/videos';
const key = 'AIzaSyB_H0y9g6R0MwcIjev-0mG0RSTCu62M3F4';

@Injectable()
export class YoutubeService {

  constructor(private http: Http) { }

  getSnippet(query, maxResults, pageToken = undefined) {
    pageToken = pageToken ? `&pageToken=${pageToken}` : '';
    let qUrl = `${searchUrl}?q=${query}&maxResults=${maxResults}&part=snippet${pageToken}&key=${key}`;
    return this.http.get(qUrl).debounceTime(500)
      .map((res:Response) => res.json())
      .map(json => json);
  }

  getContent(ids) {
    return this.http.get(`${videoUrl}?id=${ids}&part=snippet,contentDetails,statistics&key=${key}`)
      .map((res:Response) => res.json())
      .map(json => json.items);
  }

}
