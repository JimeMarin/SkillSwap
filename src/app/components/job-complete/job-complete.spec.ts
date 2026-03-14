import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobComplete } from './job-complete';

describe('JobComplete', () => {
  let component: JobComplete;
  let fixture: ComponentFixture<JobComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobComplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobComplete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
