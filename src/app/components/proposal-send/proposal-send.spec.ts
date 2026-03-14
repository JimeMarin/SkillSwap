import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalSend } from './proposal-send';

describe('ProposalSend', () => {
  let component: ProposalSend;
  let fixture: ComponentFixture<ProposalSend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalSend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalSend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
