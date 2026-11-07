import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
  });

  it('should explain that the page does not exist and link back home', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toBe('Seite nicht gefunden');
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('/');
  });
});
