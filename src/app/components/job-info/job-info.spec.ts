import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInfo } from './job-info';

describe('JobInfo', () => {
  let component: JobInfo;
  let fixture: ComponentFixture<JobInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
