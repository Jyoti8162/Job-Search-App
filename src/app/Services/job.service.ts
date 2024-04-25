import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Import catchError from operators
import { Job } from '../Models/Job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsUrl = '/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl)
      .pipe(
        catchError(err => {
          console.error('Error retrieving jobs:', err);
          return of([] as Job[]); 
        })
      );
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.jobsUrl}/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error retrieving job by ID:', err);
          return of(err); 
        })
      );
  }

}