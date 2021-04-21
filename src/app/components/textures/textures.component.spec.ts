import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexturesComponent } from './textures.component';

describe('TexturesComponent', () => {
  let component: TexturesComponent;
  let fixture: ComponentFixture<TexturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TexturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TexturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
