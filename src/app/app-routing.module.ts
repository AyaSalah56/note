import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:"" , redirectTo:"signIn" , pathMatch:"full"} ,
  {path:"signIn" , component:SigninComponent , title:'sign in'} ,
  {path:"signup" , component:SignupComponent , title:'sign up'} ,
  {path:"notes", canActivate:[authGuard] , component:NotesComponent, title:'notes'} ,
  {path:"**" , component:NotfoundComponent, title:'not found'} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
