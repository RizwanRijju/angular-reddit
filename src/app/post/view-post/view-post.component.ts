import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { of, Observable, throwError, switchMap, BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment-payload';
import { CommentService } from 'src/app/comment/comment.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { TmplAstBoundText } from '@angular/compiler';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];



  constructor(private postService: PostService, private activatedRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router, private authService: AuthService) {
    this.postId = this.activatedRoute.snapshot.params['id'];

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }
  postComment() {
    this.commentPayload.text = this.commentForm.get('text')!.value;
    this.commentService.postComment(this.commentPayload).subscribe({
      next: () => {
        this.commentForm.get('text')!.setValue('');
      },
      error: (e) => throwError(() => new Error(e)),
      complete: () => this.getCommentsForPost()
    });
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe({
      next: (data) => this.post = data,
      error: (e) => throwError(() => new Error(e))
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe({
      next: (data) => this.comments = data,
      error: (e) => throwError(() => new Error(e))
    });
      
  }

}