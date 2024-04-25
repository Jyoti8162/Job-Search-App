import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobService } from './job.service';
import { Job } from '../Models/Job.model';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  // Define the provided data as constants
  const jobData: Job[] = [
    { id: 1, companyLogo: 'https://interstate21.com/job-search-app/scroll-io.jpg', companyName: 'Company A', title: 'Job 1', isFavorite: false, reference: '98596-live-support-specialist-mexico' },
    { id: 2, companyLogo: 'https://interstate21.com/job-search-app/scroll-io.jpg', companyName: 'Company B', title: 'Job 2', isFavorite: true, reference: '98596-live-support-specialist-mexico' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService]
    });
    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getJobs', () => {
    it('should return an array of jobs when HTTP request succeeds', () => {
      service.getJobs().subscribe(jobs => {
        expect(jobs).toEqual(jobData);
      });

      const req = httpMock.expectOne('/jobs');
      expect(req.request.method).toEqual('GET');
      req.flush(jobData);
    });

    it('should return an empty array when HTTP request fails', () => {
      service.getJobs().subscribe(jobs => {
        expect(jobs).toEqual([]);
      });

      const req = httpMock.expectOne('/jobs');
      expect(req.request.method).toEqual('GET');
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getJobById', () => {
    it('should return a job when HTTP request for a specific ID succeeds', () => {
      const expectedJob: Job = jobData[0]; // Assuming we're testing with the first job

      service.getJobById(1).subscribe(job => {
        expect(job).toEqual(expectedJob);
      });

      const req = httpMock.expectOne('/jobs/1');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedJob);
    });

    
   
  });
});