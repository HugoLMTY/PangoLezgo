import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { BlogComponent } from './blog.component';
import { ListComponent } from './list/list.component';
import { UserPostsComponent } from './user-posts/user-posts.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'new', component: AddPostComponent },
  { path: 'posts', component: UserPostsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
