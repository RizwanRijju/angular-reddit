import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { CommentPayload } from 'src/app/comment/comment-payload';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts: PostModel[];
  // commentedPosts: PostModel[];
  // eachPost: PostModel;
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;
  hasCommentedAtleastOnce: boolean;
  hasPostedEver: boolean;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService) {
    this.name = this.activatedRoute.snapshot.params['name'];

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
      if(this.postLength > 0)
      this.hasPostedEver = true;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
      if(this.commentLength > 0){
        this.hasCommentedAtleastOnce = true;
      }
    });

    

    // for (let i = 0; i < this.postLength; i++) {
    //   let postId = this.comments[i].postId;

    //   this.postService.getPost(postId).subscribe({
    //     next: (data) => this.eachPost = data,
    //     error: (e) => throwError(() => new Error(e))
    //   });
    //   this.commentedPosts.push(this.eachPost);
    // }
  }

  ngOnInit(): void {
    this.hasCommentedAtleastOnce = false;
    this.hasPostedEver = false;
  }


}