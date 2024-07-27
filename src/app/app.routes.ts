import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FormDiveDayComponent } from './features/formdiveday/formdiveday.component';
import { DiveDayComponent } from './features/dive-day/dive-day.component';
import { FishFormComponent } from './features/fish-form/fish-form.component';
import { FishFactsComponent } from './features/fish-facts/fish-facts.component';



export const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'formDiveDay', component: FormDiveDayComponent },
   { path: 'dive-day/:id', component: DiveDayComponent },
   { path: 'fish-form', component: FishFormComponent },
   { path: 'fish-facts/:id', component: FishFactsComponent }
];
