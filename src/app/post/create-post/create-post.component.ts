import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { CreatePostPayload } from './create-post.payload';
import { subscribeOn, throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel>;

  constructor(private router: Router, private postService: PostService,
    private subredditService: SubredditService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe({
      next: (data) => this.subreddits = data,
      error: (e) => throwError(() => new Error(e))
    });
    
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')!.value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName')!.value;
    this.postPayload.url = this.createPostForm.get('url')!.value;
    this.postPayload.description = this.createPostForm.get('description')!.value;

    this.postService.createPost(this.postPayload).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (e) => throwError(() => new Error(e))
    });

    
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}