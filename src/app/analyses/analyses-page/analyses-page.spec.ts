import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AnalysesPage } from './analyses-page';

describe('AnalysesPage', () => {
  let component: AnalysesPage;
  let fixture: ComponentFixture<AnalysesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysesPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
