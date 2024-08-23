import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ProfileComponent } from './core/profile/profile.component';
import { EventsComponent } from './core/events/events.component';
import { LoginComponent } from './core/login/login.component';
import { authGuard } from './service/auth.guard';
import { NewEventComponent } from './core/new-event/new-event.component';
import { canDeactivateGuard } from './service/can-deactivate.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/home',pathMatch:'full'},
    {path:'home', component: HomeComponent,},
    {path:'profile',component: ProfileComponent, canActivate:[authGuard]},
    {path:'events',component: EventsComponent , canActivate:[authGuard]},
    {path:'login',component: LoginComponent},
    {path:'events/new',component: NewEventComponent, canDeactivate:[canDeactivateGuard] },

];
