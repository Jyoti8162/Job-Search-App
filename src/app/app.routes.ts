import { Routes } from '@angular/router';
import { JobListComponent } from './JobDashboardComponents/job-list/job-list.component';
import { JobDetailsComponent } from './JobDashboardComponents/job-details/job-details.component';
import { FavoriteJobsComponent } from './JobDashboardComponents/favorite-jobs/favorite-jobs.component';

export const routes: Routes = [
    { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobListComponent },
  { path: 'favorite-jobs', component: FavoriteJobsComponent },
  { path: 'job/job-details/:id', component: JobDetailsComponent }
];