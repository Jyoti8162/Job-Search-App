import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Job } from './Models/Job.model';
import { JobService } from './Services/job.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { JobListComponent } from './JobDashboardComponents/job-list/job-list.component';
import { FavoriteJobsComponent } from './JobDashboardComponents/favorite-jobs/favorite-jobs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [JobListComponent, FavoriteJobsComponent, RouterModule],
})

export class AppComponent {
  //declarations 
  title = 'ng-job-search';
  currentView!: 'jobs' | 'favorite-jobs';

  ngOnInit() {
    // retrieve the current view from local storage
    this.currentView =
      (localStorage.getItem('currentView') as 'jobs' | 'favorite-jobs') ||
      'jobs';
  }

  constructor(private router: Router) {}

  navigateTo(route: 'jobs' | 'favorite-jobs') {
    //naviagte based on tab location
    localStorage.setItem('currentView', route);
    this.currentView = route;
    this.router.navigate([route]);
  }
}