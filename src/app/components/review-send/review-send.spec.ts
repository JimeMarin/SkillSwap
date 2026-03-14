import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSend } from './review-send';

describe('ReviewSend', () => {
  let component: ReviewSend;
  let fixture: ComponentFixture<ReviewSend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
