import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeclomeSectionComponent } from './welcome-section.component';

describe('WeclomeSectionComponent', () => {
  let component: WeclomeSectionComponent;
  let fixture: ComponentFixture<WeclomeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeclomeSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeclomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
