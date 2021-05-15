import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationTwoComponent } from './animation-two.component';

describe('AnimationTwoComponent', () => {
  let component: AnimationTwoComponent;
  let fixture: ComponentFixture<AnimationTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
