import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FormDiveDayComponent } from './features/formdiveday/formdiveday.component';



export const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'formDiveDay', component: FormDiveDayComponent }
];
