import { TestBed, ComponentFixture } from '@angular/core/testing';
import { JobListComponent } from './job-list.component';
import { JobService } from '../../Services/job.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { CommonModule } from '@angular/common'; // Import CommonModule if needed
import { of } from 'rxjs';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let jobServiceSpy: jasmine.SpyObj<JobService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  const mockJobs = [
    { id: 1, companyLogo: 'https://interstate21.com/job-search-app/scroll-io.jpg', companyName: 'Company A', title: 'Job 1', isFavorite: false, reference: '98596-live-support-specialist-mexico' },
    { id: 2, companyLogo: 'https://interstate21.com/job-search-app/scroll-io.jpg', companyName: 'Company B', title: 'Job 2', isFavorite: true, reference: '98596-live-support-specialist-mexico' }
  ];
  beforeEach(() => {
    const jobServiceSpyObj = jasmine.createSpyObj('JobService', ['getJobs']);
    const localStorageServiceSpyObj = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem']);

    TestBed.configureTestingModule({
      imports: [CommonModule], // Import CommonModule if needed
      providers: [
        { provide: JobService, useValue: jobServiceSpyObj },
        { provide: LocalStorageService, useValue: localStorageServiceSpyObj }
      ]
    });

    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    jobServiceSpy = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;
    localStorageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should retrieve jobs and favorite jobIds on initialization', () => {
    jobServiceSpy.getJobs.and.returnValue(of(mockJobs));
    localStorageServiceSpy.getItem.and.returnValue([2]); // Mock favorite job IDs

    component.ngOnInit();

    expect(jobServiceSpy.getJobs).toHaveBeenCalled();
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith('favoriteJobIds');
    expect(component.jobs).toEqual(mockJobs);
    expect(component.favoriteJobIds).toEqual([2]);
  });

  it('should toggle favorite status of a job', () => {
    const job = mockJobs[0];
    component.favoriteJobIds = [2]; // Mock favorite job IDs

    component.toggleFavorite(job);

    expect(job.isFavorite).toBeTruthy();
    expect(component.favoriteJobIds).toEqual([2, 1]);
    expect(localStorageServiceSpy.setItem).toHaveBeenCalledWith('favoriteJobIds', [2, 1]);
  });

});