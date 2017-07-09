import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  public videoId: string;
  public player: any;

  constructor(private route: ActivatedRoute) {
      this.videoId = route.snapshot.params['id'];
    }

  ngOnInit() {
  }

}
