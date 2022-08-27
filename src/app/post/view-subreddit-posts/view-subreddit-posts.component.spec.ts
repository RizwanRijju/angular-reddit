import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubredditPostsComponent } from './view-subreddit-posts.component';

describe('ViewSubredditPostsComponent', () => {
  let component: ViewSubredditPostsComponent;
  let fixture: ComponentFixture<ViewSubredditPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubredditPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubredditPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
