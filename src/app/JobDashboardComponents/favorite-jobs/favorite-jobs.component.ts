import { Component, Input } from '@angular/core';
import { Job } from '../../Models/Job.model';
import { JobService } from '../../Services/job.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FavoriteJob } from '../../Models/FavoriteJob.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.css'
})
export class FavoriteJobsComponent {
  //declarations 
  private subscription: Subscription = new Subscription;
  jobs:FavoriteJob[]=[];
  
  constructor(private jobservice:JobService,private localStorageService:LocalStorageService ){}

  ngOnInit() {
    this.getFavoriteJobs();
  }

   getFavoriteJobs() {
    //get favorite jobIds from local storage and fetch job on that Ids
    const favoriteJobIds = this.localStorageService.getItem('favoriteJobIds') || [];

    favoriteJobIds.forEach((jobId: number) => {
      this.subscription= this.jobservice.getJobById(jobId).subscribe({
        next:(job:Job)=>{
          //mapping required job data to display in Favorite tab
          const displayJob:FavoriteJob={
            id:job.id,
            companyName:job.companyName,
            title:job.title,
            companyLogo:job.companyLogo,
            reference:job.reference
          }
          this.jobs.push(displayJob);          
        },
        error:(error:HttpErrorResponse)=>{
          console.error('Error loading jobs:', error);
        }
      })      
    });
  }

  ngOnDestroy(): void {
    //unsubscribe to prevent memory leaks from the observable
    if (this.subscription) {
      this.subscription.unsubscribe();
    } 
  }
}