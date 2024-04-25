import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Job } from '../../Models/Job.model';
import { Subscription } from 'rxjs';
import { JobService } from '../../Services/job.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  //declarations
  @Input() selectedJob: Job | null = null;
  jobDetailsError: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private jobService: JobService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //taken job id from url to get job by specific Id
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.getJobById(+jobId);
    }
  }

  getJobById(jodId: number) {
    //getting job by ID from API
    this.subscription = this.jobService.getJobById(jodId).subscribe({
      next: (job: Job) => {
        this.selectedJob = job;
      },
      error: (e: HttpErrorResponse) => {
        console.error('Error loading job details:', e);
      },
    });
  }

  

  goBack() {
    //back to previous page
    window.history.back();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}