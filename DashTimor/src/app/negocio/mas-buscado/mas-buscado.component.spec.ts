import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasBuscadoComponent } from './mas-buscado.component';

describe('MasBuscadoComponent', () => {
  let component: MasBuscadoComponent;
  let fixture: ComponentFixture<MasBuscadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasBuscadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasBuscadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
