import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './service/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/home',pathMatch:'full'},
    {path:'home', component: HomeComponent, canActivate:[authGuard]},
    {path:'profile',component: ProfileComponent, canActivate:[authGuard]},
    {path:'events',component: EventsComponent , canActivate:[authGuard]},
    {path:'login',component: LoginComponent}

];
