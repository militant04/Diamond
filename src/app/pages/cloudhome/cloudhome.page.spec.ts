import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudhomePage } from './cloudhome.page';

describe('CloudhomePage', () => {
  let component: CloudhomePage;
  let fixture: ComponentFixture<CloudhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudhomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
