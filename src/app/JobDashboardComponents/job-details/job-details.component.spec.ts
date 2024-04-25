import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailsComponent } from './job-details.component';
import { JobService } from '../../Services/job.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('JobDetailsComponent', () => {
  let component: JobDetailsComponent;
  let fixture: ComponentFixture<JobDetailsComponent>;
  let jobServiceSpy: jasmine.SpyObj<JobService>;
  let activatedRouteMock: { snapshot: { paramMap: { get: jasmine.Spy<() => string | null> } } };

  beforeEach(() => {
    const jobServiceSpyObj = jasmine.createSpyObj('JobService', ['getJobById']);
    activatedRouteMock = { snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('1') } } };

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        JobDetailsComponent, // Import the component here
        { provide: JobService, useValue: jobServiceSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });

    fixture = TestBed.createComponent(JobDetailsComponent);
    component = fixture.componentInstance;
    jobServiceSpy = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;
  });




  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should set selectedJob if getJobById returns a job', () => {
    const job = { id: 1, companyLogo: 'https://interstate21.com/job-search-app/scroll-io.jpg', companyName: 'Company A', title: 'Job 1', isFavorite: false, reference: '98596-live-support-specialist-mexico' };
    jobServiceSpy.getJobById.and.returnValue(of(job));
    
    component.ngOnInit();

    expect(component.selectedJob).toEqual(job);
  });

});