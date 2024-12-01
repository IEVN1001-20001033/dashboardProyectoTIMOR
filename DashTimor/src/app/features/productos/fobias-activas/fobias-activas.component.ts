import { Component, OnInit } from '@angular/core';
import { FobiaService } from '../../../core/services/fobia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fobias-activas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fobias-activas.component.html',
  styles: ``
})
export default class FobiasActivasComponent implements OnInit {
  fobias: any[] = [];

  constructor(private fobiaService: FobiaService) {}

  ngOnInit(): void {
    this.fobiaService.getFobias().subscribe({
      next: (data) => {
        if (data) {
          this.fobias = data;
        }
      },
      error: (err) => {
        console.error('Error al obtener las fobias:', err);
      }
    });
  }

}
