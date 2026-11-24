import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProposalsPage } from './proposals-page';

describe('ProposalsPage', () => {
  let component: ProposalsPage;
  let fixture: ComponentFixture<ProposalsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalsPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProposalsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
