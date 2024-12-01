import { Component, OnInit } from '@angular/core';
import { FobiaService } from '../../../core/services/fobia.service';
import { FobiaTimor } from '../../../core/interfaces/fobia-timor';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.component.html',
  styles: ``
})
export default class AgregarComponent implements OnInit{
  formGroup!: FormGroup;
 
  regFobia:FobiaTimor={
      idFobia:123,
      foto:'', 
      nombre: '',
      descripcion: '',
      precio: '',
      activa: 1,
  }
  constructor(private fb: FormBuilder,public fobiaTimor:FobiaService, private router:Router) { }
 
  ngOnInit(): void {
    this.formGroup=this.initForm();
    
  }
 
  initForm():FormGroup{
    return this.fb.group({
      idFobia: [{value:'', disabled:true}],
      nombre: [''],
      correo: [''],
      descripcion: [''],
      foto:[''], 
      precio: 1,
      activa: 1,
  })
 
    }

    onFileChange(event: any): void {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('foto', file);
  
      this.fobiaTimor.subirFoto(formData).subscribe({
        next: (res: any) => {
          this.formGroup.setValue({ foto: res.ruta });
        },
        error: (err) => {
          console.error('Error al subir la foto', err);
        },
      });
    }
 
    agregar(){
      this.fobiaTimor.agregarFobia(this.regFobia).subscribe({
        next:()=>console.log(),
 
        complete:()=>console.info()})
 
        this.regFobia={
          idFobia:123,
          foto:'',
          nombre:'',  
          descripcion:'',
          precio: '',
          activa: 1,
        }
 
        this.router.navigate(['/fobia/listafobias'])
 
    }
 
    onSubmit(): void {
        const {idFobia,nombre, descripcion, foto, precio, activa}= this.formGroup.value;
   
        this.regFobia.idFobia=idFobia,
        this.regFobia.nombre=nombre,
        this.regFobia.foto=foto,
        this.regFobia.descripcion=descripcion,
        this.regFobia.precio=precio,
        this.regFobia.activa=activa,
        this.agregar()
   
      }

}
