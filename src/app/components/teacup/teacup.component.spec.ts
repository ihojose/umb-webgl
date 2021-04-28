import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacupComponent } from './teacup.component';

describe('TeacupComponent', () => {
  let component: TeacupComponent;
  let fixture: ComponentFixture<TeacupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
