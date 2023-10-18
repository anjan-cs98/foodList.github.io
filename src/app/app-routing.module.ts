import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
{path:'',component:HomeComponent,pathMatch:'full'},
{path:'home',component:HomeComponent},
{ path: 'food', loadChildren: () => import('./foods/foods.module').then(m => m.FoodsModule) }, 
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[AuthGuard] },
{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
{path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
