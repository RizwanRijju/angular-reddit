import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';

@Component({
  selector: 'app-view-subreddit-posts',
  templateUrl: './view-subreddit-posts.component.html',
  styleUrls: ['./view-subreddit-posts.component.css']
})
export class ViewSubredditPostsComponent implements OnInit {

  subredditId: number;
  posts: PostModel[];
  subreddits: Array<SubredditModel>;
  
  constructor(private postService: PostService, private activateRoute: ActivatedRoute) {
    this.subredditId = this.activateRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
    this.getPostsBySubreddit();
  }

  private getPostsBySubreddit(){
    this.postService.getPostsBySubreddit(this.subredditId).subscribe({
      next: (data) => this.posts = data,
      error: (e) => throwError(() => new Error(e))
    });
  }
}
