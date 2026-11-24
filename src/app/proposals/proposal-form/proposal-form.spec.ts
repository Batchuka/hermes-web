import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProposalForm } from './proposal-form';

describe('ProposalForm', () => {
  let component: ProposalForm;
  let fixture: ComponentFixture<ProposalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalForm],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProposalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the fields that came back in the 400', async () => {
    const http = TestBed.inject(HttpTestingController);

    fixture.nativeElement.querySelector('button').click();

    http
      .expectOne('/proposals')
      .flush(
        { detail: 'Invalid proposal', fields: { farmer: 'must not be blank' } },
        { status: 400, statusText: 'Bad Request' },
      );
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('must not be blank');
  });
});
