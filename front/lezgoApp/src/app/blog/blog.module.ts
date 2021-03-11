import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { ListComponent } from './list/list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { UserPostsComponent } from './user-posts/user-posts.component';


@NgModule({
  declarations: [BlogComponent, ListComponent, AddPostComponent, UserPostsComponent],
  imports: [
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
