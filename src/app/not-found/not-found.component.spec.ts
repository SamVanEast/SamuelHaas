import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { SectionNavigationService } from '../core/section-navigation.service';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    await fixture.whenStable();
  });

  it('should explain that the page does not exist', () => {
    expect(fixture.nativeElement.querySelector('.not_found_code').textContent).toBe('404');
    expect(fixture.nativeElement.querySelector('h1').textContent).toBe('Seite nicht gefunden');
  });

  it('should offer buttons to the homepage and to the portfolio', () => {
    const buttons = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('.not_found_actions .button'));
    expect(buttons.map(b => [b.textContent.trim(), b.getAttribute('href')])).toEqual([
      ['Zur Startseite', '/'],
      ['Portfolio ansehen', '/#portfolio'],
    ]);
  });

  it('should jump to the portfolio without a reload', () => {
    const goTo = vi.spyOn(TestBed.inject(SectionNavigationService), 'goTo').mockImplementation(() => undefined);
    fixture.nativeElement.querySelector('.button--secondary').click();
    expect(goTo).toHaveBeenCalledWith('portfolio', expect.any(MouseEvent));
  });
});
