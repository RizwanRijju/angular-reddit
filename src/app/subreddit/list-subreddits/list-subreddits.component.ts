import { Component, OnInit } from '@angular/core';
import { SubredditModel } from '../subreddit-response';
import { SubredditService } from '../subreddit.service';
import { subscribeOn, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits: Array<SubredditModel>;
  constructor(private subredditService: SubredditService, private router: Router) { }

  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe({
      next: (data) => this.subreddits = data,
      error: (e) => throwError(() => new Error(e))
    })
  }

  goToPosts(id: number): void {
    this.router.navigateByUrl('/view-subreddit-posts/' + id);
  }
}