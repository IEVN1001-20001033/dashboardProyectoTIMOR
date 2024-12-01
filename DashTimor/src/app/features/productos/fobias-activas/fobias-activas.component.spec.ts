import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FobiasActivasComponent } from './fobias-activas.component';

describe('FobiasActivasComponent', () => {
  let component: FobiasActivasComponent;
  let fixture: ComponentFixture<FobiasActivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FobiasActivasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FobiasActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
