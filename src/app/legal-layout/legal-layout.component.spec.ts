import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LegalLayoutComponent } from './legal-layout.component';

describe('LegalLayoutComponent', () => {
  let fixture: ComponentFixture<LegalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalLayoutComponent);
    await fixture.whenStable();
  });

  it('should frame the page content with header and footer', () => {
    expect(fixture.nativeElement.querySelector('app-header')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('main router-outlet')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('app-footer')).not.toBeNull();
  });
});
