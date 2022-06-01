import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ViewUser } from 'src/app/user/view-user.model';
import { Reply } from '../reply.model';
import { Tweet } from '../tweet.model';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-tweet-items',
  templateUrl: './tweet-items.component.html',
  styleUrls: ['./tweet-items.component.css']
})
export class TweetItemsComponent implements OnInit {
  @Input() tweet: Tweet;
  userId: string | null;
  user:string;
  userid :string =  localStorage.getItem('user') as string;
  constructor(private router: Router, private authService: AuthService, private tweetService: TweetService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user');
  }

  onClick(){
    this.router.navigate(['tweetapp/reply']);
  }

  onDelete(tweetId: string){
    this.tweetService.deleteTweetFromHome(tweetId);
  }

  onLike(tweetId: string){
    this.tweetService.likeOrDisLikeTweet(tweetId,this.userid);
    this.router.navigate(['tweetapp/home']).then(() => {
    window.location.reload();
  });
  }
}
