import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSearchPanelComponent } from './event-search-panel.component';

describe('EventSearchPanelComponent', () => {
  let component: EventSearchPanelComponent;
  let fixture: ComponentFixture<EventSearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSearchPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
