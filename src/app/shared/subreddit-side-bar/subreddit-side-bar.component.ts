import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { SubredditService } from 'src/app/subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {
  
  subreddits: Array<SubredditModel>;
  displayViewAll: boolean;

  constructor(private subredditService: SubredditService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.subredditService.getAllSubreddits().subscribe(data => {
      if(data.length >= 6){
        this.subreddits = data.splice(0, 5);
        this.displayViewAll = true;
      }
      else{
        this.subreddits = data;
      }
    });

    
  }

  ngOnInit(): void {
    
  }

  goToPosts(id: number): void {
    this.router.navigateByUrl('/view-subreddit-posts/' + id).then(() => window.location.reload());
  }

  goToSubredditList(): void {
    this.router.navigateByUrl('/list-subreddits').then(() => window.location.reload());
  }


}
