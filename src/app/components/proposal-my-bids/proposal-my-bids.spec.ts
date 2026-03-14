import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalMyBids } from './proposal-my-bids';

describe('ProposalMyBids', () => {
  let component: ProposalMyBids;
  let fixture: ComponentFixture<ProposalMyBids>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalMyBids]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalMyBids);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
