import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DollartrackerPage } from './dollartracker.page';

describe('DollartrackerPage', () => {
  let component: DollartrackerPage;
  let fixture: ComponentFixture<DollartrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DollartrackerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DollartrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
