import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfilComponent } from './components/profil/profil.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'list', component: ListComponent },
  { path: '**', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
