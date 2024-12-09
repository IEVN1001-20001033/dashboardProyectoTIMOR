import { Component, OnInit } from '@angular/core';
import { FobiaService } from '../../../core/services/fobia.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fobias-activas',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './fobias-activas.component.html',
  styles: ``
})
export default class FobiasActivasComponent implements OnInit {
 
  dataSource:any=[];

  constructor(public fobiasTimor:FobiaService){}
 
  ngOnInit(): void {
     this.fobiasTimor.getFobiasActivas().subscribe(
      {
        next: response=>{
 
      this.dataSource=response;
 
    },
    error: error=>console.log(error)
  }
    );
 
}
}
