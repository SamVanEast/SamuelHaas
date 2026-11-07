import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeSectionComponent } from './welcome-section.component';

describe('WelcomeSectionComponent', () => {
  let fixture: ComponentFixture<WelcomeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeSectionComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should introduce Samuel Haas', () => {
    const headline: HTMLElement = fixture.nativeElement.querySelector('.welcome_headline');
    expect(headline.textContent).toContain('Samuel Haas');
  });

  it('should show the profile picture', () => {
    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(image.getAttribute('src')).toContain('assets/img/profil_imges/6.jpg');
  });
});
