import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'', redirectTo:'/home',pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path:'profile',component: ProfileComponent},
    {path:'events',component: EventsComponent},
    {path:'login',component: LoginComponent}

];
