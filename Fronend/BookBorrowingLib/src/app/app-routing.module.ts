import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { LoginComponent } from './components/login/login.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { loginGuard } from './login.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PagenotavilComponent } from './components/pagenotavil/pagenotavil.component';

const routes: Routes = [
  {path:'home',component:HomeComponent },
  {path:'',component:HomeComponent },
  {path:'book/:id',component:BookComponent,canActivate:[loginGuard]},
  {path:'login',component:LoginComponent},
  {path:'add_user',component:AddUserComponent},
  {path:'add_book',component:AddBookComponent,canActivate:[loginGuard]},
  {path:'user',component:UserpageComponent,canActivate:[loginGuard]},
  {path:'search/:searchterm',component:HomeComponent,canActivate:[loginGuard]},
  {path:'**',component:PagenotavilComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
