import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { ViewSubredditPostsComponent } from './post/view-subreddit-posts/view-subreddit-posts.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
  {path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [AuthGuard]},
  { path: 'list-subreddits', component: ListSubredditsComponent, pathMatch: 'full'},
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'view-post/:id', component: ViewPostComponent},
  {path: 'view-subreddit-posts/:id', component: ViewSubredditPostsComponent, pathMatch: 'full'}

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
