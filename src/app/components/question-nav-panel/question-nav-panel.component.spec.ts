import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNavPanelComponent } from './question-nav-panel.component';

describe('QuestionNavPanelComponent', () => {
  let component: QuestionNavPanelComponent;
  let fixture: ComponentFixture<QuestionNavPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionNavPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionNavPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
