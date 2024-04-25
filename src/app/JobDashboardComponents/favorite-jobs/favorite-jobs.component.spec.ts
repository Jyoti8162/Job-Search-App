import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FavoriteJobsComponent } from './favorite-jobs.component';
import { JobService } from '../../Services/job.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('FavoriteJobsComponent', () => {
  let component: FavoriteJobsComponent;
  let fixture: ComponentFixture<FavoriteJobsComponent>;
  let jobServiceSpy: jasmine.SpyObj<JobService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    // Create spy objects for JobService and LocalStorageService
    const jobServiceSpyObj = jasmine.createSpyObj('JobService', ['getJobById']);
    const localStorageServiceSpyObj = jasmine.createSpyObj('LocalStorageService', ['getItem']);

    TestBed.configureTestingModule({
      imports: [FavoriteJobsComponent], // Add FavoriteJobsComponent to imports
      providers: [
        { provide: JobService, useValue: jobServiceSpyObj },
        { provide: LocalStorageService, useValue: localStorageServiceSpyObj }
      ]
    }).compileComponents();
    

    fixture = TestBed.createComponent(FavoriteJobsComponent);
    component = fixture.componentInstance;
    jobServiceSpy = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;
    localStorageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should fetch favorite jobs from local storage and call getJobById for each job ID', () => {
    // Mock favorite job IDs in local storage
    const favoriteJobIds = [1, 2, 3];
    localStorageServiceSpy.getItem.and.returnValue(favoriteJobIds);

    // Mock getJobById responses
    const mockJobs = [
      { id: 1, companyLogo: 'https://interstate21.com/job-search-app/scroll-io.jpg', companyName: 'Company A', title: 'Job 1', isFavorite: false, reference: '98596-live-support-specialist-mexico' },
      { id: 2, companyLogo: 'https://interstate21.com/job-search-app/scroll-io.jpg', companyName: 'Company B', title: 'Job 2', isFavorite: true, reference: '98596-live-support-specialist-mexico' },
      { id: 3, companyLogo: 'https://interstate21.com/job-search-app/scroll-io.jpg', companyName: 'Company B', title: 'Job 2', isFavorite: true, reference: '98596-live-support-specialist-mexico' }
    ];
    mockJobs.forEach((job, index) => {
      jobServiceSpy.getJobById.withArgs(job.id).and.returnValue(of(mockJobs[index]));
    });

    // Call the method to test
    component.getFavoriteJobs();

    // Check if getJobById has been called for each favorite job ID
    expect(jobServiceSpy.getJobById).toHaveBeenCalledTimes(favoriteJobIds.length);

    // Check if jobs array is populated with correct data
    expect(component.jobs.length).toEqual(mockJobs.length);
    expect(component.jobs).toEqual(mockJobs.map(job => ({
      id: job.id,
      companyName: job.companyName,
      title: job.title,
      companyLogo: job.companyLogo,
      reference: job.reference
    })));
  });

  // it('should handle errors when fetching jobs', () => {
  //   // Mock favorite job IDs in local storage
  //   const favoriteJobIds = [1, 2];
  //   localStorageServiceSpy.getItem.and.returnValue(favoriteJobIds);

  //   // Mock error response for getJobById
  //   const errorResponse: HttpErrorResponse = new HttpErrorResponse({ error: 'Test Error', status: 500 });
  //   jobServiceSpy.getJobById.and.returnValue(throwError(errorResponse));

  //   // Stub console.error method
  //   spyOn(console, 'error');

  //   // Call the method to test
  //   component.getFavoriteJobs();

  //   // Check if error handling is done properly
  //   expect(component.jobs.length).toBe(0);
  //   expect(console.error).toHaveBeenCalledWith('Error loading jobs:', errorResponse);
  // });
});