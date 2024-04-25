import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from '../../Models/Job.model';
import { JobService } from '../../Services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  //declarations
  private subscription: Subscription = new Subscription;
  jobs:Job[]=[];
  jobDetailsError: string | null = null;
  isFavorite: boolean = false; 
  favoriteJobIds: number[] = [];


  constructor(private jobservice:JobService,private localStorageService: LocalStorageService){}

  ngOnInit() {
    this.getAllJobs();    
    //calling to get favorite jobIds from local storage
    this.favoriteJobIds = this.localStorageService.getItem('favoriteJobIds') || [];
  }

  toggleFavorite(job: Job) {
    job.isFavorite = !job.isFavorite;
    if (job.isFavorite) {
      this.favoriteJobIds.push(job.id);
    } else {
      const index = this.favoriteJobIds.indexOf(job.id);
      if (index !== -1) {
        this.favoriteJobIds.splice(index, 1);
      }
    }
    this.localStorageService.setItem('favoriteJobIds', this.favoriteJobIds);
  }

  getAllJobs(){
    //get data from API endpoint using service
    this.subscription= this.jobservice.getJobs().subscribe({
      next:(jobs:Job[])=>{
        this.jobs=jobs
        this.updateFavoriteState();
      },
      error:(error:HttpErrorResponse)=>{
        console.error('Error loading job:', error);
      }
    })
  }

  updateFavoriteState() {
    //update the favorite jobs to job list
    this.jobs.forEach(job => {
      job.isFavorite = this.favoriteJobIds.includes(job.id);
    });
  }

  ngOnDestroy(): void {
    //unsubscribe to prevent memory leaks from the observable
    if (this.subscription) {
      this.subscription.unsubscribe();
    } 
  }
}