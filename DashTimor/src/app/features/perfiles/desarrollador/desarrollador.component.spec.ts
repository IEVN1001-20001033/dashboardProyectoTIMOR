import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrolladorComponent } from './desarrollador.component';

describe('DesarrolladorComponent', () => {
  let component: DesarrolladorComponent;
  let fixture: ComponentFixture<DesarrolladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesarrolladorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesarrolladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
