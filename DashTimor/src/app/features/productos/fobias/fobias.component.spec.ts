import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FobiasComponent } from './fobias.component';

describe('FobiasComponent', () => {
  let component: FobiasComponent;
  let fixture: ComponentFixture<FobiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FobiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FobiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
